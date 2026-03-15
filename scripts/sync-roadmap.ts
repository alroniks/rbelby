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
// Use beta headers as sub-issues are likely part of a newer or preview API
// if natively supported, or we just rely on tasklists format in the body.
// Wait, currently, "Sub-issues" in GitHub Projects/Issues is primarily driven by tasklists in the markdown body:
// e.g. `- [ ] task #issue_number` or just `- [ ] description`.
// We will create actual issues for the tasks and reference them in the parent issue body.
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

  // 4. Fetch all Issues to find existing specs and tasks
  const remoteIssues = await getIssues();
  const featureToIssue = new Map<string, any>();
  const parentIdToSubIssues = new Map<string, any[]>();

  for (const issue of remoteIssues) {
    if (issue.pull_request) continue; // Skip PRs

    // Check if it's a main feature issue
    const featureMatch = issue.body?.match(/\*\*Feature ID\*\*:\s+`([^`]+)`/);
    if (featureMatch && !issue.body?.includes('**Parent Feature ID**:')) {
      featureToIssue.set(featureMatch[1], issue);
      continue;
    }

    // Check if it's a sub-issue
    const subIssueMatch = issue.body?.match(
      /\*\*Parent Feature ID\*\*:\s+`([^`]+)`/
    );
    if (subIssueMatch) {
      const parentId = subIssueMatch[1];
      if (!parentIdToSubIssues.has(parentId)) {
        parentIdToSubIssues.set(parentId, []);
      }
      parentIdToSubIssues.get(parentId)!.push(issue);
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
    const title = rawTitle.replace(/^Spec\s*\[\d+\]:\s*/, '');
    const issueTitle = `Feature: ${title}`;

    const featureId = featureIdMatch[1];
    const milestoneTitle = specToMilestone.get(file);
    const milestoneObj = milestoneTitle
      ? milestoneMap.get(milestoneTitle)
      : null;

    // Parse Implementation Tasks
    const tasksSectionMatch = content.match(
      /## Implementation Tasks([\s\S]*?)(?=^## |\n*$)/m
    );
    const tasks = [];
    if (tasksSectionMatch) {
      const taskLines = tasksSectionMatch[1].split('\n');
      for (const line of taskLines) {
        const taskMatch = line.match(/^-\s+\[(.)\]\s+(.+)$/);
        if (taskMatch) {
          tasks.push({
            completed: taskMatch[1].toLowerCase() === 'x',
            title: taskMatch[2].trim(),
            raw: line,
          });
        }
      }
    }

    // Sync Sub-Issues
    const existingSubIssues = parentIdToSubIssues.get(featureId) || [];
    const taskLinks: string[] = [];

    // Check if the main issue is closed, if so, we should probably skip processing entirely based on golden rule
    const existingMainIssue = featureToIssue.get(featureId);
    if (existingMainIssue && existingMainIssue.state === 'closed') {
      console.log(
        `🔒 Issue for [${featureId}] is closed (Issue #${existingMainIssue.number}). Skipping entire spec.`
      );
      continue;
    }

    for (const task of tasks) {
      // Find matching sub-issue by title
      const existingTaskIssue = existingSubIssues.find(
        (i) => i.title === `Task: ${task.title}`
      );

      const taskIssueBody = `This is a sub-task for feature: [${title}](../../blob/main/docs/specs/${file}).\n\n**Parent Feature ID**: \`${featureId}\`\n\n### Task Description\n${task.title}`;

      let taskIssueNumber;

      if (existingTaskIssue) {
        taskIssueNumber = existingTaskIssue.number;
        // Don't modify closed sub-issues
        if (existingTaskIssue.state !== 'closed') {
          const needsUpdate =
            existingTaskIssue.body !== taskIssueBody ||
            (milestoneObj &&
              existingTaskIssue.milestone?.number !== milestoneObj.number);
          if (needsUpdate) {
            console.log(
              `   🔄 Updating Sub-Issue #${existingTaskIssue.number} for: ${task.title}`
            );
            await updateIssue(
              existingTaskIssue.number,
              `Task: ${task.title}`,
              taskIssueBody,
              milestoneObj?.number
            );
          }
        } else {
          console.log(
            `   🔒 Sub-Issue #${existingTaskIssue.number} for: ${task.title} is closed. Skipping.`
          );
        }
      } else {
        console.log(`   ✨ Creating new Sub-Issue for: ${task.title}`);
        const newTaskIssue = await createIssue(
          `Task: ${task.title}`,
          taskIssueBody,
          milestoneObj?.number
        );
        taskIssueNumber = newTaskIssue.number;
        console.log(`      ✅ Created Sub-Issue #${taskIssueNumber}`);
      }

      // Keep track of the link to build the parent issue body
      taskLinks.push(
        `- [${task.completed ? 'x' : ' '}] #${taskIssueNumber} ${task.title}`
      );
    }

    // Build Parent Issue Body
    // Fix absolute link to the file
    const absoluteFileUrl = `https://github.com/${GITHUB_REPOSITORY}/blob/main/docs/specs/${file}`;

    let issueBody = `### Specification: [${title}](${absoluteFileUrl})\n\n**Feature ID**: \`${featureId}\`\n\nThis issue tracks the implementation of the ${title} feature. Please refer to the linked specification document for User Scenarios and Technical Details.\n\n### Implementation Tasks\n\n`;

    if (taskLinks.length > 0) {
      issueBody += taskLinks.join('\n');
    } else {
      // Fallback if no tasks were parsed
      issueBody += tasksSectionMatch
        ? tasksSectionMatch[0].replace('## Implementation Tasks\n', '')
        : '';
    }

    if (existingMainIssue) {
      // We already checked if it's closed above, but to be safe
      if (existingMainIssue.state === 'closed') continue;

      const needsUpdate =
        existingMainIssue.title !== issueTitle ||
        existingMainIssue.body !== issueBody ||
        (milestoneObj &&
          existingMainIssue.milestone?.number !== milestoneObj.number);

      if (needsUpdate) {
        console.log(
          `🔄 Updating Issue #${existingMainIssue.number} for: ${title}`
        );
        await updateIssue(
          existingMainIssue.number,
          issueTitle,
          issueBody,
          milestoneObj?.number
        );
      } else {
        console.log(
          `✅ Issue #${existingMainIssue.number} for [${featureId}] is up to date.`
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
