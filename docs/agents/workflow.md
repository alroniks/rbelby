# Workflow: specs → tickets → PRs

A simplified copy of Brevly's spec-driven workflow. rbel.by is a public site with no user data, so the checks stay light.

## Specs

- One feature = one file: `docs/specs/NNNN-feature-name.md` from [`_template.md`](../specs/_template.md), numbered sequentially (4 digits).
- [`docs/specs/README.md`](../specs/README.md) is the only index: milestones, readiness, dependencies, progress. There is no `ROADMAP.md` and no GitHub issue per task.
- Architecture decisions go in `docs/adr/`.
- A spec is done when every checklist item is `[x]`: `git mv` it to `docs/specs/done/NNNN-….done.md`, update the README row, run `node scripts/tickets.mjs progress --write`.

## Tickets

- A spec that takes more than one PR is split into tickets: `docs/tickets/NNNN-TT-slug.md` from [`_template.md`](../tickets/_template.md) (spec number + two-digit ticket number).
- **The wall:** a ticket file on `main` means the ticket is open. The PR implementing it **deletes its own ticket file**. Ids are never reused.
- Detail only the next tickets (`status: ready`); later ones stay `status: draft` until their blockers are merged.
- `node scripts/tickets.mjs list` shows the wall.

## Roles

- **Operator** approves specs and merges PRs. Nothing is committed, pushed or merged without an explicit instruction.
- **Architect agent** grills and writes specs and tickets.
- **Implementer agent** takes one ticket per session, one PR per ticket, deletes the ticket file in that PR.

## Checks

- `npm run check` — Prettier + `astro check`.
- `npm run tests` — Vitest (API client only).
- `npm run build`.
- CI runs check and build on every pull request.

## Design

Before UI work, read the screens named in the spec in `~/dev/alr/business/brevly/design/brevly.pen`, frame `01b · Public Pages · rbel.by`, with the `pencil` MCP tools. Never edit the `.pen` file; flag mismatches to the operator.
