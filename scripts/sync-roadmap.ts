import fs from 'fs/promises';
import path from 'path';

// Attempt to load .env for local execution
try {
  const dotenv = await import('dotenv');
  dotenv.config();
} catch (e) {
  // Ignore if dotenv is missing
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY;

if (!GITHUB_TOKEN) {
  console.error('❌ Error: GITHUB_TOKEN environment variable is not set.');
  process.exit(1);
}

if (!GITHUB_REPOSITORY) {
  console.error(
    "❌ Error: GITHUB_REPOSITORY environment variable is not set (expected format 'owner/repo')."
  );
  process.exit(1);
}

const API_BASE = `https://api.github.com/repos/${GITHUB_REPOSITORY}`;
const HEADERS = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
  'Content-Type': 'application/json',
};

async function fetchGithub(endpoint: string, options: RequestInit = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: { ...HEADERS, ...options.headers },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `GitHub API error: ${res.status} ${res.statusText} - ${text}`
    );
  }
  return res.json();
}

async function getMilestones() {
  return fetchGithub('/milestones?state=all&per_page=100');
}

async function createMilestone(title: string) {
  return fetchGithub('/milestones', {
    method: 'POST',
    body: JSON.stringify({ title }),
  });
}

async function getIssues() {
  const allIssues = [];
  let page = 1;
  while (true) {
    const issues = await fetchGithub(
      `/issues?state=all&per_page=100&page=${page}`
    );
    if (issues.length === 0) break;
    allIssues.push(...issues);
    page++;
  }
  return allIssues;
}

async function createIssue(
  title: string,
  body: string,
  milestoneNumber?: number
) {
  const payload: any = { title, body, labels: ['enhancement'] };
  if (milestoneNumber) payload.milestone = milestoneNumber;
  return fetchGithub('/issues', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

async function updateIssue(
  issueNumber: number,
  title: string,
  body: string,
  milestoneNumber?: number
) {
  const payload: any = { title, body };
  if (milestoneNumber) payload.milestone = milestoneNumber;
  return fetchGithub(`/issues/${issueNumber}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

async function run() {
  console.log('🚀 Starting Roadmap Sync with GitHub...');

  // 1. Read ROADMAP.md to map specs to milestones
  const roadmapContent = await fs.readFile('docs/ROADMAP.md', 'utf-8');
  const specToMilestone = new Map<string, string>();
  let currentMilestone: string | null = null;

  for (const line of roadmapContent.split('\n')) {
    const milestoneMatch = line.match(/\*\*GitHub Milestone:\*\*\s+`([^`]+)`/);
    if (milestoneMatch) {
      currentMilestone = milestoneMatch[1];
    }

    const specMatch = line.match(/_\(Spec:\s+`([^`]+)`\)_/);
    if (specMatch && currentMilestone) {
      const fileName = path.basename(specMatch[1]);
      specToMilestone.set(fileName, currentMilestone);
    }
  }

  // 2. Fetch remote Milestones and map them
  const remoteMilestones = await getMilestones();
  const milestoneMap = new Map<string, any>(); // title -> milestone object
  for (const m of remoteMilestones) {
    milestoneMap.set(m.title, m);
  }

  // 3. Ensure required Milestones exist
  const uniqueRequiredMilestones = new Set(specToMilestone.values());
  for (const title of uniqueRequiredMilestones) {
    if (!milestoneMap.has(title)) {
      console.log(`✨ Creating Milestone: ${title}`);
      const newMilestone = await createMilestone(title);
      milestoneMap.set(title, newMilestone);
    }
  }

  // 4. Fetch all Issues to find existing specs
  const remoteIssues = await getIssues();
  const featureToIssue = new Map<string, any>();
  for (const issue of remoteIssues) {
    if (issue.pull_request) continue; // Skip PRs
    const match = issue.body?.match(/\*\*Feature ID\*\*:\s+`([^`]+)`/);
    if (match) {
      featureToIssue.set(match[1], issue);
    }
  }

  // 5. Read all specs and sync
  const specsDir = 'docs/specs';
  const specFiles = await fs.readdir(specsDir);

  for (const file of specFiles) {
    if (!file.endsWith('.md')) continue;

    const content = await fs.readFile(path.join(specsDir, file), 'utf-8');

    const titleMatch = content.match(/^#\s+(.+)$/m);
    const featureIdMatch = content.match(/\*\*Feature ID\*\*:\s+`([^`]+)`/);

    if (!titleMatch || !featureIdMatch) {
      console.warn(
        `⚠️  Skipping ${file} - Could not parse Title or Feature ID.`
      );
      continue;
    }

    const rawTitle = titleMatch[1];
    // Strip "Spec [001]: " or similar prefixes if preferred, or keep full
    const title = rawTitle.replace(/^Spec\s*\[\d+\]:\s*/, '');
    const issueTitle = `Feature: ${title}`;

    const featureId = featureIdMatch[1];
    const milestoneTitle = specToMilestone.get(file);
    const milestoneObj = milestoneTitle
      ? milestoneMap.get(milestoneTitle)
      : null;

    // Extract tasks
    const tasksMatch = content.match(/## Implementation Tasks[\s\S]*/);
    const tasksText = tasksMatch ? tasksMatch[0] : '';

    const issueBody = `### Specification: [${title}](docs/specs/${file})\n\n**Feature ID**: \`${featureId}\`\n\nThis issue tracks the implementation of the ${title} feature. Please refer to the linked specification document for User Scenarios and Technical Details.\n\n${tasksText}`;

    const existingIssue = featureToIssue.get(featureId);

    if (existingIssue) {
      if (existingIssue.state === 'closed') {
        console.log(
          `🔒 Issue for [${featureId}] is closed (Issue #${existingIssue.number}). Skipping.`
        );
        continue;
      }

      // Check if update is needed (body, title, or milestone changed)
      const needsUpdate =
        existingIssue.title !== issueTitle ||
        existingIssue.body !== issueBody ||
        (milestoneObj &&
          existingIssue.milestone?.number !== milestoneObj.number);

      if (needsUpdate) {
        console.log(`🔄 Updating Issue #${existingIssue.number} for: ${title}`);
        await updateIssue(
          existingIssue.number,
          issueTitle,
          issueBody,
          milestoneObj?.number
        );
      } else {
        console.log(
          `✅ Issue #${existingIssue.number} for [${featureId}] is up to date.`
        );
      }
    } else {
      console.log(`✨ Creating new Issue for: ${title}`);
      const newIssue = await createIssue(
        issueTitle,
        issueBody,
        milestoneObj?.number
      );
      console.log(`   ✅ Created Issue #${newIssue.number}`);
    }
  }

  console.log('\n🎉 Sync Complete!');
}

run().catch(console.error);
