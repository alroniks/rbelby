# Feature Spec: 0017 - Workflow & Quality Baseline

## 1. Context & Specification (The "What")

- **Goal:** Adopt Brevly's spec + ticket workflow in a simplified form and add the minimum checks the tickets rely on, before feature work starts.
- **User Flow:** _Operator:_ runs `node scripts/tickets.mjs list` to see open tickets; every PR runs check + build in CI.
- **Affected Areas:** `docs/`, `scripts/`, `.github/workflows/`, `package.json`.

## 2. Technical Plan (The "How" for this specific feature)

- **Specs:** 4-section template (`docs/specs/_template.md`), index in `docs/specs/README.md` (milestones + progress), finished specs in `docs/specs/done/NNNN-*.done.md`. `docs/ROADMAP.md` and `scripts/sync-roadmap.ts` are retired.
- **Tickets:** `docs/tickets/NNNN-TT-slug.md` (`docs/tickets/_template.md`); a ticket's PR deletes its file. `scripts/tickets.mjs` ports only `list` and `progress [--write]` from Brevly; no scope guard, no PR-body checks.
- **Checks:** `npm run check` = Prettier check + `astro check`; `npm run tests` = Vitest (API client only, spec 0018). One CI workflow on pull requests: `npm ci`, check, build. ESLint is removed (installed, never used). npm is the package manager (drop the `packageManager: pnpm` field).
- Process doc: `docs/agents/workflow.md`.

## 3. Execution Tasks (The "Checklist")

### Phase 1: Docs

- [x] Spec and ticket templates, `docs/specs/README.md` index, `docs/agents/workflow.md`.
- [x] Done specs moved to `docs/specs/done/` with 4-digit numbers.
- [x] Update `GEMINI.md`, `CONTRIBUTING.md`, `README.md` to the new workflow and data model.

### Phase 2: Tooling

- [ ] Delete `docs/ROADMAP.md`, `scripts/sync-roadmap.ts`, `.github/workflows/sync-roadmap.yml`.
- [ ] Add `scripts/tickets.mjs` (`list`, `progress [--write]`).
- [ ] `npm run check` (Prettier + `astro check`, add `@astrojs/check`); remove ESLint deps; drop the `packageManager` field.
- [ ] `.github/workflows/ci.yml`: check + build on pull requests.

### Phase 3: GitHub cleanup (operator approval)

- [ ] Close issues #71–#110 with a comment pointing to `docs/specs/README.md`; close milestones v0.2–v1.0.

## 4. Drafts & Notes (Living Document)

- **2026-10-24:** decided in the rbel.by re-plan grilling (Q20, Q21, Q27): keep it simple — a public site without user data.
