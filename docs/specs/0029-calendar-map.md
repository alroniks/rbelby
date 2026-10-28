# Feature Spec: 0029 - Calendar Map

## 1. Context & Specification (The "What")

- **Goal:** `/calendar/map`: the season's events placed by start location.
- **Design:** `~/dev/alr/business/brevly/design/brevly.pen`, frame `01b · Public Pages · rbel.by` (`iexz1`) — `Calendar · Map` (`h3M4zj`).

## 2. Technical Plan (The "How" for this specific feature)

- Needs start coordinates on events or tracks from `brevly.public.v1` (requested in Brevly spec 0095). Map library to choose when picked up.

## 3. Execution Tasks (The "Checklist")

- [ ] `/calendar/map` with the Finder and distance-badge markers.
- [ ] `npm run check` and `npm run build` pass.

## 4. Drafts & Notes (Living Document)

- Blocked by: 0021; Brevly 0095 (start coordinates).
