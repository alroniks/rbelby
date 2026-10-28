# Feature Spec: 0021 - Calendar

## 1. Context & Specification (The "What")

- **Goal:** One live calendar of every BY brevet and fest Brevly publishes, replacing the markdown events directory.
- **User Flow:** _Visitor:_ opens `/calendar` → sees the season by month → narrows by month, distance or type → opens an event.
- **Design:** `~/dev/alr/business/brevly/design/brevly.pen`, frame `01b · Public Pages · rbel.by` (`iexz1`) — `Calendar` (`yqjPc`), `Edge: Calendar · live data unavailable` (`AH4z2`), `Edge: Calendar · nothing published` (`YFw8b`). Blocks: `Calendar / Flagship Slider`, `Calendar / Finder`, `Calendar / Year Overview`, `Calendar / Month Divider`, `Event / Row`, `Event / Fest Tile`, `Calendar / Alerts Card`.
- **Affected Areas:** `src/pages/[...locale]/calendar` (or per-locale pages), `src/components/calendar/`.

## 2. Technical Plan (The "How" for this specific feature)

- **Data:** `ListEvents` with `region_code=by`, `month`, `min_distance_km`/`max_distance_km`, `type`, `locale`. No club filter: the site shows whatever Brevly returns (today ECC only).
- **Rendering:** static shell (header, slider, finder form) + `server:defer` island for year overview and the month list; filters are query parameters, so the finder works without JavaScript.
- **Rules (design Decisions):** multi-day rides show the start day; fests show their window; no FULL/closed states; only distance is compared.
- **Flagship slider:** hand-picked in `rbelby/site.json` (e.g. PBP 2027).
- **Out of scope:** `/calendar/map` (spec 0029), "Subscribe to calendar" (hidden until Brevly has an iCal feed).

## 3. Execution Tasks (The "Checklist")

- [ ] `/calendar` in RU, `/be/calendar`, `/en/calendar`.
- [ ] Finder (month, distance, type) as URL parameters mapped to `ListEventsRequest`.
- [ ] Year Overview with per-month counts and month anchors.
- [ ] Month Divider + Event Row + Fest Tile list.
- [ ] Flagship Slider from `site.json`.
- [ ] Edge states: Data Notice when Brevly is unavailable; Empty State + Alerts Card when nothing is published.
- [ ] `npm run check` and `npm run build` pass.

## 4. Drafts & Notes (Living Document)

- Blocked by: 0018, 0019.
