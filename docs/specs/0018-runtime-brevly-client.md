# Feature Spec: 0018 - Workers Runtime & Brevly API Client

## 1. Context & Specification (The "What")

- **Goal:** Run the site on Cloudflare Workers with on-demand pages and server islands, and add one typed client for `brevly.public.v1.PublicService`, per [ADR-0003](../adr/0003-live-data-from-brevly.md).
- **User Flow:** _Visitor:_ gets a fast static shell; live parts arrive from Brevly. _Operator:_ merges to `main` → the dev preview updates on test data; publishes a GitHub release → production deploys.
- **Affected Areas:** `astro.config.mjs`, `wrangler.jsonc`, `src/lib/brevly/`, `scripts/`, `.github/workflows/`, `package.json`.

## 2. Technical Plan (The "How" for this specific feature)

- **Adapter:** `@astrojs/cloudflare`; pages are prerendered by default, live routes opt out (`export const prerender = false`) and live list blocks use `server:defer` with a fallback slot. No custom caching: Brevly already sends `Cache-Control: public, max-age=60, s-maxage=300, stale-while-revalidate=600`. Remove the unused `@astrojs/node`.
- **Client:** `@buf/brevlylabs_public.bufbuild_es` + `@connectrpc/connect` + `@connectrpc/connect-web` (Connect protocol, `useHttpGet: true`), wrapped in `src/lib/brevly/`. Pages never call `fetch` against Brevly. Brevly's REST `/api/v1/*` + OpenAPI (Brevly spec 0097) is for other sites that don't want Connect; rbelby doesn't use it.
- **Config:** `BREVLY_API_URL` — production `https://brevly.app/api`, dev preview `https://dev.brevly.app/api`, local default production (override in `.env`). Region code `by` is a constant.
- **Locale:** pass `ru`/`be`/`en` on every RPC that accepts `locale`.
- **Errors:** `NOT_FOUND` → the 404 page; network/5xx → a typed `unavailable` result so blocks render `Common / Data Notice`.
- **IDs:** 13-digit public IDs stay strings (`jstype = JS_STRING`).
- **Deploy — one Worker, two stages** (no second Worker):
  - **Push to `main`:** `wrangler versions upload --preview-alias dev --var BREVLY_API_URL:https://dev.brevly.app/api` → `dev-rbelby.<subdomain>.workers.dev` (`preview_urls: true`). A `workflow_dispatch` input can upload the preview against the production API instead.
  - **Published release:** `wrangler deploy` with the production `BREVLY_API_URL` → `rbel.by`. Replaces the Pages deploy hook; the Pages project is retired once rbel.by points at the Worker.
  - **Access:** preview URLs are closed with Cloudflare Access (operator sets it up in the dashboard); production stays public.
- **Smoke test:** `scripts/brevly-smoke.mjs <api-url>` calls each RPC for region `by` and prints status + item counts. Brevly's public API hasn't been exercised by a client yet; run it against dev and prod before building on it.

## 3. Execution Tasks (The "Checklist")

### Phase 1: API check

- [ ] `scripts/brevly-smoke.mjs`; run against `dev.brevly.app` and `brevly.app`; update the "Live RPCs" note below with what each returns.

### Phase 2: Runtime & deploy

- [ ] Add `@astrojs/cloudflare` and `wrangler.jsonc` (`preview_urls: true`); keep existing pages prerendered; remove `@astrojs/node`.
- [ ] Workflow: `main` → preview alias `dev` on the dev API; release → `wrangler deploy` on the production API; `workflow_dispatch` to preview on production.
- [ ] Document secrets, Access on preview URLs and the DNS switch in `README.md`.

### Phase 3: Client

- [ ] `src/lib/brevly/`: client factory from `BREVLY_API_URL`, typed wrappers for the 10 RPCs, locale, error mapping.
- [ ] Vitest tests for the wrapper (ID handling, error mapping, locale) with mocked transport.
- [ ] `npm run check`, `npm run tests`, `npm run build` pass.

## 4. Drafts & Notes (Living Document)

- Blocked by: 0017.
- Live RPCs (per Brevly docs, not yet verified): `GetRegion`, `ListEvents`, `GetEvent`, `ListEventStartlist`, `ListClubs`, `GetClub`. `ListEventResults`, `GetRideResult`, `GetRegionalRider`, `GetRegionShowcase` return empty/`NOT_FOUND` until Brevly M2–M4.
- Brevly data may be empty or contain test entries for now; the site shows whatever Brevly returns, no filtering.
- **2026-10-28:** Brevly can't use preview URLs (separate dev/prd databases → separate Workers); rbelby has no storage, so one Worker with a preview alias is enough.
