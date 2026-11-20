#!/usr/bin/env node
// Ticket wall and milestone progress (simplified port of Brevly's scripts/tickets.mjs).
//
//   node scripts/tickets.mjs list                open tickets, with blockers that are still open
//   node scripts/tickets.mjs progress [--write]  milestone progress lines in docs/specs/README.md
//
// A ticket file in docs/tickets/ is an open ticket; its PR deletes it (docs/agents/workflow.md).
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const TICKETS_DIR = 'docs/tickets';
const TICKET_FILE = /^\d{4}-\d{2}-.+\.md$/;
const SPECS_README = 'docs/specs/README.md';

// Frontmatter subset: `key: value`, `key: [a, b]`, and `key:` followed by `  - item` lines.
function parseFrontmatter(text, file) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) throw new Error(`${file}: missing frontmatter`);
  const data = {};
  let listKey = null;
  for (const raw of m[1].split('\n')) {
    const line = raw.replace(/(?:^|\s+)#.*$/, '');
    if (!line.trim()) continue;
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && listKey) {
      data[listKey].push(unquote(item[1]));
      continue;
    }
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (!kv) throw new Error(`${file}: cannot parse frontmatter line "${raw}"`);
    const [, key, value] = kv;
    if (value === '') {
      data[key] = [];
      listKey = key;
    } else if (value.startsWith('[')) {
      data[key] = value.slice(1, -1).split(',').map(unquote).filter(Boolean);
      listKey = null;
    } else {
      data[key] = unquote(value);
      listKey = null;
    }
  }
  return data;
}

const unquote = (s) => s.trim().replace(/^['"]|['"]$/g, '');

function openTickets() {
  if (!existsSync(TICKETS_DIR)) return [];
  return readdirSync(TICKETS_DIR)
    .filter((f) => TICKET_FILE.test(f))
    .sort()
    .map((f) => {
      const file = join(TICKETS_DIR, f);
      const fm = parseFrontmatter(readFileSync(file, 'utf8'), file);
      if (!f.startsWith(`${fm.id}-`))
        throw new Error(`${file}: id ${fm.id} doesn't match the file name`);
      return {
        id: fm.id,
        title: fm.title,
        status: fm.status,
        dependsOn: fm.depends_on ?? [],
        ghIssue: fm.gh_issue,
      };
    });
}

function cmdList() {
  const open = openTickets();
  if (!open.length) return console.log('No open tickets.');
  const openIds = new Set(open.map((t) => t.id));
  for (const t of open) {
    const blockers = t.dependsOn.filter((id) => openIds.has(id));
    const state =
      t.status === 'ready'
        ? blockers.length
          ? 'ready (blocked)'
          : 'ready ✓'
        : t.status;
    const gh = t.ghIssue ? ` #${t.ghIssue}` : '';
    const deps = blockers.length ? ` ← ${blockers.join(', ')}` : '';
    console.log(`${t.id}  ${state.padEnd(16)} ${t.title}${gh}${deps}`);
  }
}

// Each "## M<n> …" section's table rows are specs; a row is done when its Readiness cell
// (3rd column) is "Done". The section carries one line "**Progress:** d/t specs done".
function cmdProgress({ write }) {
  const lines = readFileSync(SPECS_README, 'utf8').split('\n');
  const sections = [];
  let cur = null;
  lines.forEach((line, i) => {
    if (/^## M\d+/.test(line)) {
      cur = { heading: line.slice(3), progressLine: -1, total: 0, done: 0 };
      sections.push(cur);
    } else if (/^(## |---)/.test(line)) cur = null;
    else if (cur) {
      if (line.startsWith('**Progress:**')) cur.progressLine = i;
      if (/^\| \[\d{4}\]/.test(line)) {
        cur.total++;
        if (line.split('|').map((c) => c.trim())[3] === 'Done') cur.done++;
      }
    }
  });

  const stale = [];
  for (const s of sections) {
    const want = `**Progress:** ${s.done}/${s.total} specs done`;
    console.log(`${s.heading} — ${s.done}/${s.total}`);
    if (s.progressLine < 0)
      throw new Error(
        `${SPECS_README}: "${s.heading}" has no **Progress:** line`
      );
    if (lines[s.progressLine] !== want) {
      stale.push(`${s.heading}: "${lines[s.progressLine]}" → "${want}"`);
      lines[s.progressLine] = want;
    }
  }
  if (!stale.length) return console.log('progress: up to date');
  if (write) {
    writeFileSync(SPECS_README, lines.join('\n'));
    console.log(`updated:\n  ${stale.join('\n  ')}`);
  } else {
    console.error(`stale (run progress --write):\n  ${stale.join('\n  ')}`);
    process.exitCode = 1;
  }
}

const [cmd, ...args] = process.argv.slice(2);
if (cmd === 'list') cmdList();
else if (cmd === 'progress') cmdProgress({ write: args.includes('--write') });
else {
  console.error('usage: node scripts/tickets.mjs <list | progress [--write]>');
  process.exitCode = 1;
}
