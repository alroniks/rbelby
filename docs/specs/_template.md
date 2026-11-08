# Feature Spec: [NNNN] - [Name of the Feature]

## 1. Context & Specification (The "What")

- **Goal:** What visitor or community problem does this solve?
- **User Flow:** E.g., A visitor opens `/calendar`, filters by 300 km, opens an event and taps Register (→ brevly.app).
- **Design:** Screens and blocks in `~/dev/alr/business/brevly/design/brevly.pen`, frame `01b · Public Pages · rbel.by` (`iexz1`), by node id.
- **Affected Areas:** `src/pages/`, `src/components/`, `src/lib/brevly/`, `rbelby/` content, config.

## 2. Technical Plan (The "How" for this specific feature)

- **Data:** Which `brevly.public.v1` RPCs and fields are used, or which `rbelby/` content.
- **Rendering:** Static (prerendered), on-demand page, or static shell + `server:defer` island ([ADR-0003](../adr/0003-live-data-from-brevly.md)).
- **UI/UX changes:** Blocks to build or reuse.

## 3. Execution Tasks (The "Checklist")

_Checklist for the AI agent or developer to execute. A spec taking several PRs is executed as tickets in `docs/tickets/`._

### Phase 1: …

- [ ] …
- [ ] `npm run check` and `npm run build` pass.

## 4. Drafts & Notes (Living Document)

_Place for the AI or developer to drop raw notes, decisions and blockers (`Blocked by: …`)._
