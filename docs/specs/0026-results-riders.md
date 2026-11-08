# Feature Spec: 0026 - Results & Regional Rider Pages

## 1. Context & Specification (The "What")

- **Goal:** Event results, single ride results and regional rider pages.
- **User Flow:** _Family member:_ opens `/events/{id}/results` on ride day → finds a rider → sees check-ins per control. _Rider:_ opens `/riders/{id}` → Belarusian rides and BY awards, link to the global Brevly profile.
- **Design:** `~/dev/alr/business/brevly/design/brevly.pen`, frame `01b · Public Pages · rbel.by` (`iexz1`) — `Results` (`DIxzb`), `Results · Flèche teams` (`K7FQLx`), `Rider` (`WvRvl`), `Ride Result` (`ahEfY`), `Edge: Rider · private profile` (`WNHbA`).
- **Affected Areas:** `src/pages/events/[id]/results.astro`, `src/pages/results/`, `src/pages/riders/`.

## 2. Technical Plan (The "How" for this specific feature)

- **Data:** `ListEventResults`, `GetRideResult`, `GetRegionalRider`. All on demand.
- **Rules:** no speed or time ranking — an A–Z finishers list with official times; one results page per event; LIVE progress from check-ins; rider pages show only BY rides and awards; the season story never compares riders.

## 3. Execution Tasks (The "Checklist")

- [ ] `/events/[id]/results`: toolbar, A–Z table, pagination, Flèche team rows.
- [ ] `/results/[id]`: hero, splits, homologation number, share image.
- [ ] `/riders/[id]`: header, season story, ride history, awards, seasons, global profile link; private-profile state.
- [ ] `npm run check` and `npm run build` pass.

## 4. Drafts & Notes (Living Document)

- Blocked by: Brevly M2 (0024 results, 0025 verification) and M4 (0067 regional riders, 0016 awards). The RPCs exist but return empty/`NOT_FOUND`.
