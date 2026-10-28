# Feature Spec: 0018 - Workers Runtime & Brevly API Client

## 1. Context & Specification (The "What")

- **Goal:** Run the site on Cloudflare Workers with on-demand pages and server islands, and add one typed client for `brevly.public.v1.PublicService`, per [ADR-0003](../adr/0003-live-data-from-brevly.md).
- **User Flow:** _Visitor:_ gets a fast static shell; live parts arrive from Brevly. _Operator:_ publishes a GitHub release → the Worker deploys.
- **Affected Areas:** `astro.config.mjs`, `wrangler.jsonc`, `src/lib/brevly/`, `.github/workflows/deploy-production.yml`, `package.json`.

## 2. Technical Plan (The "How" for this specific feature)

- **Adapter:** `@astrojs/cloudflare`; pages are prerendered by default, live routes opt out (`export const prerender = false`) and live list blocks use `server:defer` with a fallback slot. No custom caching: Brevly already sends `Cache-Control: public, max-age=60, s-maxage=300, stale-while-revalidate=600`. Remove the unused `@astrojs/node`.
- **Client:** `@buf/brevlylabs_public.bufbuild_es` + `@connectrpc/connect` + `@connectrpc/connect-web` (Connect protocol, `useHttpGet: true`), wrapped in `src/lib/brevly/`. Pages never call `fetch` against Brevly.
- **Config:** `BREVLY_API_URL` — production `https://brevly.app/api`, optional staging `https://dev.brevly.app/api`, local default production (override in `.env`). Region code `by` is a constant.
- **Locale:** pass `ru`/`be`/`en` on every RPC that accepts `locale`.
- **Errors:** `NOT_FOUND` → the 404 page; network/5xx → a typed `unavailable` result so blocks render `Common / Data Notice`.
- **IDs:** 13-digit public IDs stay strings (`jstype = JS_STRING`).
- **Deploy:** `wrangler deploy` from GitHub Actions on a published release (replaces the Pages deploy hook); the Pages project is retired once rbel.by points at the Worker.

## 3. Execution Tasks (The "Checklist")

### Phase 1: Runtime

- [ ] Add `@astrojs/cloudflare` and `wrangler.jsonc`; keep existing pages prerendered; remove `@astrojs/node`.
- [ ] Deploy workflow with `wrangler deploy` on release; document secrets and the DNS switch in `README.md`.

### Phase 2: Client

- [ ] `src/lib/brevly/`: client factory from `BREVLY_API_URL`, typed wrappers for the 10 RPCs, locale, error mapping.
- [ ] Vitest tests for the wrapper (ID handling, error mapping, locale) with mocked transport.
- [ ] `npm run check`, `npm run tests`, `npm run build` pass.

## 4. Drafts & Notes (Living Document)

- Blocked by: 0017.
- Live RPCs today: `GetRegion`, `ListEvents`, `GetEvent`, `ListEventStartlist`, `ListClubs`, `GetClub`. `ListEventResults`, `GetRideResult`, `GetRegionalRider`, `GetRegionShowcase` return empty/`NOT_FOUND` until Brevly M2–M4.
- Brevly data may be empty or contain test entries for now; the site shows whatever Brevly returns, no filtering.
