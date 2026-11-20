# Feature Spec: 0018 - Brevly Client Interface & Sample Data

## 1. Context & Specification (The "What")

- **Goal:** One typed client for `brevly.public.v1.PublicService` that pages use for all live data, with a sample-data mode so the calendar, event, clubs and home pages can be built and reviewed before the live API is ready ([ADR-0003](../adr/0003-live-data-from-brevly.md)). The real transport, runtime and deploy are spec [0031](./0031-live-api-runtime-deploy.md).
- **User Flow:** _Developer:_ runs `npm run dev` → live blocks render sample events and clubs. _Visitor (production):_ never sees sample data; until 0031 ships, live blocks show `Common / Data Notice`.
- **Affected Areas:** `src/lib/brevly/`, `src/lib/brevly/fixtures/`, `package.json`.

## 2. Technical Plan (The "How" for this specific feature)

- **Types:** from `@buf/brevlylabs_public.bufbuild_es` (the contract is final in Brevly spec 0059, even where the API isn't live yet).
- **Interface:** `src/lib/brevly/` exports typed functions for the 10 RPCs (`getRegion`, `listEvents`, `getEvent`, …). Pages never call `fetch` against Brevly and never import fixtures directly.
- **Results:** `NOT_FOUND` → the 404 page; anything else failing → a typed `unavailable` result so blocks render `Common / Data Notice`.
- **Locale:** `ru`/`be`/`en` passed on every RPC that accepts `locale`. Region code `by` is a constant.
- **IDs:** 13-digit public IDs stay strings.
- **Sample data:** `src/lib/brevly/fixtures/*.json`, shaped as the proto messages: a season of events with tracks and controls, a handful of clubs, one region. Used when `BREVLY_FIXTURES=1` (set in `npm run dev`); **never in a production build** — there the client returns `unavailable` until 0031 adds the real transport.

## 3. Execution Tasks (The "Checklist")

- [ ] `src/lib/brevly/`: interface for the 10 RPCs, locale, result/error mapping, fixture mode behind `BREVLY_FIXTURES`.
- [ ] Fixtures: events (several distances, past and upcoming, with tracks and controls), clubs, region.
- [ ] Vitest tests for the wrapper (ID handling, error mapping, locale, fixture mode off in production); `npm run tests`.
- [ ] `npm run check`, `npm run tests`, `npm run build` pass.

## 4. Drafts & Notes (Living Document)

- Blocked by: 0017 (done).
- **2026-11-21:** split from the original 0018 so the redesign can start before the API is ready; runtime, deploy and the API smoke test moved to 0031.
- RPCs expected live first: `GetRegion`, `ListEvents`, `GetEvent`, `ListEventStartlist`, `ListClubs`, `GetClub`. `ListEventResults`, `GetRideResult`, `GetRegionalRider`, `GetRegionShowcase` wait for Brevly M2–M4.
