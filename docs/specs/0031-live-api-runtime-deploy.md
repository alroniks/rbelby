# Feature Spec: 0031 - Live Brevly API, Workers Runtime & Deploy

## 1. Context & Specification (The "What")

- **Goal:** Switch the client from spec [0018](./0018-brevly-client-sample-data.md) to Brevly's live public API and run the site on Cloudflare Workers with on-demand pages and server islands ([ADR-0003](../adr/0003-live-data-from-brevly.md)).
- **User Flow:** _Visitor:_ gets a fast static shell; live parts arrive from Brevly. _Operator:_ merges to `main` → the dev preview updates on test data; publishes a GitHub release → production deploys.
- **Affected Areas:** `astro.config.mjs`, `wrangler.jsonc`, `src/lib/brevly/`, `scripts/`, `.github/workflows/`, `package.json`, `README.md`.

## 2. Technical Plan (The "How" for this specific feature)

- **Smoke test first:** `scripts/brevly-smoke.mjs <api-url>` calls each RPC for region `by` and prints status + item counts. Run against `dev.brevly.app` and `brevly.app` before switching.
- **Transport:** `@connectrpc/connect` + `@connectrpc/connect-web` (Connect protocol, `useHttpGet: true`) behind the 0018 interface; pages don't change. Brevly's REST `/api/v1/*` + OpenAPI (Brevly spec 0097) is for other sites; rbelby doesn't use it.
- **Config:** `BREVLY_API_URL` — production `https://brevly.app/api`, dev preview `https://dev.brevly.app/api`, local default production (override in `.env`; `BREVLY_FIXTURES=1` still wins in `npm run dev`).
- **Adapter:** `@astrojs/cloudflare`; pages are prerendered by default, live routes opt out (`export const prerender = false`) and live list blocks use `server:defer` with a fallback slot. No custom caching: Brevly sends `Cache-Control: public, max-age=60, s-maxage=300, stale-while-revalidate=600`. Remove `@astrojs/node`.
- **Deploy — one Worker, two stages** (no second Worker):
  - **Push to `main`:** `wrangler versions upload --preview-alias dev --var BREVLY_API_URL:https://dev.brevly.app/api` → `dev-rbelby.<subdomain>.workers.dev` (`preview_urls: true`). A `workflow_dispatch` input can upload the preview against the production API instead.
  - **Published release:** `wrangler deploy` with the production `BREVLY_API_URL` → `rbel.by`. Replaces the Pages deploy hook; the Pages project is retired once rbel.by points at the Worker.
  - **Access:** preview URLs are closed with Cloudflare Access (operator, in the dashboard); production stays public.
- **404 live island:** the 404 page gets its next-starts island (`ListEvents`) here; hero only when Brevly is unavailable.

## 3. Execution Tasks (The "Checklist")

### Phase 1: API check

- [ ] `scripts/brevly-smoke.mjs`; run against dev and prod; note what each RPC returns below.

### Phase 2: Runtime & deploy

- [ ] Add `@astrojs/cloudflare` and `wrangler.jsonc` (`preview_urls: true`); keep pages prerendered; remove `@astrojs/node`.
- [ ] Workflow: `main` → preview alias `dev` on the dev API; release → `wrangler deploy` on the production API; `workflow_dispatch` to preview on production.
- [ ] Document secrets, Access on preview URLs and the DNS switch in `README.md`.

### Phase 3: Live data

- [ ] Connect transport in `src/lib/brevly/` from `BREVLY_API_URL`; tests with a mocked transport.
- [ ] 404 next-starts island.
- [ ] `npm run check`, `npm run tests`, `npm run build` pass.

## 4. Drafts & Notes (Living Document)

- Blocked by: 0018; Brevly's live public API being ready.
- **2026-11-21:** split from 0018 so the redesign isn't blocked on the API.
- **2026-10-28:** Brevly can't use preview URLs (separate dev/prd databases → separate Workers); rbelby has no storage, so one Worker with a preview alias is enough.
