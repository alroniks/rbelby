---
type: ADR
id: '0003'
title: 'Event, club, result and rider data come live from Brevly; editorial content stays markdown'
status: active
date: 2026-10-24
---

## Context

Until now every event, route and club on rbel.by lived as markdown/JSON in the `rbelby/` Obsidian vault and the site was a pure static build. The real problem was **sync lag**: an organizer changes an event and nothing changes until someone edits markdown, rebuilds and redeploys.

Brevly (`brevly.app`) is now where Belarusian clubs run their events. Its ADR-0013 makes rbel.by the `by` Region's **external Public Home**: rbel.by reads Brevly's public read API (`brevly.public.v1.PublicService`, Brevly spec 0059: ConnectRPC, anonymous, cacheable `GET`) and renders it in its own design; registration and every account action stay on `brevly.app`; later Brevly 301-redirects its regional pages to rbel.by (Brevly specs 0058, 0047). Editorial content deliberately stays out of Brevly.

The new design lives in `~/dev/alr/business/brevly/design/brevly.pen`, frame `01b · Public Pages · rbel.by`.

## Decision

**rbel.by is an independent Astro site that renders Brevly's public data live (on-demand pages and server islands on Cloudflare Workers) and keeps its own editorial pages as prerendered markdown.**

1. **Data split.** Brevly owns regions, clubs, events, tracks, controls, startlists, results, riders and their history. `rbelby/` owns Learn pages, the future journal, authors and site config (`site.json`: notice bar, hero, flagship slider, footer).
2. **Rendering.** `@astrojs/cloudflare` on Workers. Pages are prerendered by default; detail pages (`/events/{id}`, `/clubs/{id}`, …) render on demand because their IDs aren't known at build time and their content must be in the HTML; live parts of list pages (calendar list, next starts, club cards) are `server:defer` islands in a static shell. No custom cache layer: Brevly's `Cache-Control` headers apply.
3. **Client.** One wrapper in `src/lib/brevly/` around the BSR-generated `@buf/brevlylabs_public.bufbuild_es` package and `@connectrpc/connect-web`. Endpoint from `BREVLY_API_URL` (production `brevly.app`; the dev preview reads `dev.brevly.app`).
4. **Show what Brevly provides.** No filtering or fallback data on rbel.by: if Brevly publishes one event, the site shows one event. Blocks without API data are hidden.
5. **IDs and links.** Brevly's numeric public IDs are the URLs. Rider actions use the `register_url` / `public_url` Brevly returns.
6. **Guests only.** No sign-in on rbel.by until Brevly offers authentication for external sites.
7. **Failure.** `NOT_FOUND` → 404; Brevly unreachable → `Data Notice` in the live block, never a broken page.
8. **Filtering.** Calendar filters are URL parameters mapped to `ListEvents` filters on the server. Supersedes [ADR-0002](./0002-client-side-filtering.md).
9. **Own code.** No code is shared with Brevly (React/shadcn there); blocks are rebuilt as `.astro` components. "A theme, not a fork" is a design rule only.

## Options considered

- **Live API, on-demand pages + server islands** (chosen): no rebuild lag, one source of truth, fits Brevly's contract.
- **Static build + webhook rebuilds**: keeps pure SSG but lags and needs a build per edit; rejected upstream for event data.
- **Keep markdown events synced by script**: two sources of truth — the problem being removed.
- **Brevly hosts rbel.by**: rejected upstream (would pull editorial content into Brevly).

## Consequences

- `rbelby/events/`, `rbelby/routes/`, `rbelby/data/clubs.json` and their pages are deleted; past seasons are not migrated (spec 0020). `/routes` disappears: a route is a Track inside an Event.
- Login, settings, bookmarks, privacy and terms pages go; legal links point to Brevly.
- Hosting moves from Cloudflare Pages to Workers.
- Event text is shown as organizers entered it until Brevly ships multilingual content (Brevly 0092); `locale` is passed already.
- Results, rider and showcase pages wait for Brevly M2–M4; missing API fields are requested in Brevly spec 0095.
