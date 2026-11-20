# Running plan — rbelby on Brevly (2026-10-28)

Short-lived; the canonical index is `docs/specs/README.md`. Delete when all checked.

## Decisions

- Repo `brevlylabs/rbelby`, public; tasks may come from the org Project board (`gh_issue:` + `Closes #N` only).
- One Worker: `main` → `dev-rbelby.<subdomain>.workers.dev` (Access, dev.brevly.app data); release → `rbel.by` (prod data).
- Connect-ES client; REST/OpenAPI is for other sites. No club logo at launch (Brevly 0095 stays M4).
- No Access on dev.brevly.app for now; a banner instead.

## Deferred (2026-11-21)

- Vault stays as is, with all its data.
- Transfer to `brevlylabs/rbelby` (+ remote, folder move, Cloudflare reconnect, org Project) — later.

## Checkpoints

- [x] Docs: workflow (GitHub + Deploy), ticket template `gh_issue`, specs 0017/0018/0019, ADR-0003, README.
- [x] Stray `packageManager: pnpm` reverted in `package.json`.
- [x] Brevly: repo name in `docs/agents/issue-tracker.md`; draft ticket `0000-09` dev banner.
- [x] Re-plan committed (`62d0056`, on `main`); Brevly doc changes committed.
- [ ] Brevly `0000-09` (dev banner) left the wall in #311 without code (`APP_ENV` not in `src/`): re-add or confirm dropped.
- [x] Spec 0017 done: tooling + CI (#163), old issues closed, milestones and the old project deleted.
- [ ] 0018: `/to-tickets` → smoke test first, then runtime/deploy, then client.
- [ ] Operator: Cloudflare Access on the Worker's preview URLs (after 0018 deploy lands).
