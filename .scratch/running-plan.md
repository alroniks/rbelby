# Running plan — rbelby on Brevly (2026-10-28)

Short-lived; the canonical index is `docs/specs/README.md`. Delete when all checked.

## Decisions

- Repo `brevlylabs/rbelby`, public; tasks may come from the org Project board (`gh_issue:` + `Closes #N` only).
- One Worker: `main` → `dev-rbelby.<subdomain>.workers.dev` (Access, dev.brevly.app data); release → `rbel.by` (prod data).
- Connect-ES client; REST/OpenAPI is for other sites. No club logo at launch (Brevly 0095 stays M4).
- No Access on dev.brevly.app for now; a banner instead.

## Checkpoints

- [x] Docs: workflow (GitHub + Deploy), ticket template `gh_issue`, specs 0017/0018/0019, ADR-0003, README.
- [x] Stray `packageManager: pnpm` reverted in `package.json`.
- [x] Brevly: repo name in `docs/agents/issue-tracker.md`; draft ticket `0000-09` dev banner.
- [ ] Operator: check `rbelby/` vault for personal data before it's public in the org.
- [ ] Operator: transfer repo to `brevlylabs/rbelby`, move folder, `git remote set-url origin git@github.com:brevlylabs/rbelby.git`.
- [ ] Operator: reconnect Cloudflare and Crowdin GitHub integrations.
- [ ] Commit the re-plan on a branch → PR (rbelby); commit the Brevly doc changes separately.
- [ ] 0017 Phase 2: tooling + CI, one PR.
- [ ] 0017 Phase 3: close old issues/milestones, add repo to org Project (operator go-ahead).
- [ ] 0018: `/to-tickets` → smoke test first, then runtime/deploy, then client.
- [ ] Operator: Cloudflare Access on the Worker's preview URLs (after 0018 deploy lands).
- [ ] Brevly architect: detail `0000-09` → `ready`.
