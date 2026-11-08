# Randonneurs Belarus (rbelby) Website Roadmap

This document gives a high-level, human-readable overview of how we build the website. Each feature is a spec in `docs/specs/`; phases map to **GitHub Milestones** (synced by `scripts/sync-roadmap.ts`).

**Estimates:** 5–10 hours per week, ~1 week per atomic task.

---

## 🔀 Direction change (October 2026)

rbel.by is now the `by` Region's **external Public Home** on [Brevly](https://brevly.app) ([ADR-0003](adr/0003-live-data-from-brevly.md), Brevly ADR-0013):

- **Events, clubs, results and riders come live from Brevly's public read API** (`brevly.public.v1`). Organizers edit in Brevly; the site updates without a rebuild.
- **Journal and Learn pages stay markdown** in `rbelby/`.
- **Registration and every account action live on brevly.app.** rbel.by has no login, settings or bookmarks.
- **New design:** `design/brevly.pen` in `brevlylabs/brevly`, frame `01b · Public Pages · rbel.by` (light mode designed; the existing dark mode stays and gets designed later; Overpass + Montserrat, rb-\* landscape palette, built from Brevly blocks via the `brand: rbelby` theme).

Brevly's own plan for this lives in its specs 0059 (public API, done), 0058 (Public Home redirects, Brevly M4) and 0047 (rbel.by cut-over, Brevly M4).

### What happened to the old plan

| Old spec            | Status         | Replaced by                                                                        |
| ------------------- | -------------- | ---------------------------------------------------------------------------------- |
| 001 Architecture    | Done, amended  | 017 (runtime switches to on-demand rendering)                                      |
| 002 Global layout   | Done, rework   | 018 (new nav/footer; dark mode kept)                                               |
| 003 i18n routing    | Done, kept     | — (locale also passed to the API in 017)                                           |
| 004 Static pages    | Done, rework   | 025 (About/Rules/FAQ become Learn pages)                                           |
| 005 Homepage        | Done, rework   | 023                                                                                |
| 006–007 Events      | Done, replaced | 020, 021 (live from Brevly)                                                        |
| 008–009 Routes      | Done, removed  | 021 (routes are Tracks inside events) · 019 (redirects)                            |
| 010 Clubs & Journal | Deleted        | 022 (clubs), 025 (journal)                                                         |
| 011 Rich UX         | Deleted        | Card/Table toggle dropped; badges → 018; reports → 024/025; route versions dropped |
| 012 Filtering       | Deleted        | 020 (server-side finder via URL params; supersedes ADR-0002)                       |
| 013 Pagefind search | Deleted        | 026                                                                                |
| 014 Bookmarks       | Deleted        | Dropped — personal state lives on Brevly                                           |
| 015 SEO & Stats     | Deleted        | JSON-LD/OG split across 020–024; stats → 023 / 024                                 |
| 016 Notion CMS      | Deleted        | Dropped for event data (Brevly is the CMS); revisit for Journal later if needed    |

---

## 🧱 Phase A: Foundation on Brevly

**GitHub Milestone:** `v0.3 - Brevly Foundation`
**Estimated Completion:** November 2026
**Goal:** Running on Cloudflare with a typed Brevly client, the new brand, and a clear content inventory.

- **[017] Runtime & Brevly API Client:** Cloudflare adapter, on-demand rendering, typed ConnectRPC client, caching, graceful failure. _(Spec: `docs/specs/017-brevly-runtime-client.md`)_
- **[018] Brand Theme & Common Blocks:** rb-\* tokens, Overpass/Montserrat, new Nav/Footer, shared blocks, 404. _(Spec: `docs/specs/018-rbelby-brand-theme.md`)_
- **[019] Content Inventory & Vault Migration:** Inventory, hand data to Brevly, redirect map, retire vault collections. _(Spec: `docs/specs/019-content-migration.md`)_

---

## 📅 Phase B: Live Public Pages

**GitHub Milestone:** `v0.4 - Live Pages`
**Estimated Completion:** January 2027 (in step with Brevly M1, when ECC's 2027 calendar is published)
**Goal:** Calendar, events, clubs and home render live Brevly data.

- **[020] Live Calendar:** `/calendar` with finder, year overview, edge states. _(Spec: `docs/specs/020-live-calendar.md`)_
- **[021] Live Event Page:** `/events/{id}` for brevets, fests and Flèche in every state. _(Spec: `docs/specs/021-live-event-page.md`)_
- **[022] Live Clubs:** `/clubs` and `/clubs/{id}`. _(Spec: `docs/specs/022-live-clubs.md`)_
- **[023] New Home Page:** Hero, next starts, season stats, clubs. _(Spec: `docs/specs/023-home-page.md`)_

---

## ✍️ Phase C: Editorial

**GitHub Milestone:** `v0.5 - Journal & Learn`
**Estimated Completion:** February 2027
**Goal:** The region's own content in the new design.

- **[025] Journal & Learn:** Markdown Learn pages and the journal. _(Spec: `docs/specs/025-journal-learn.md`)_
- **[026] Site Search:** `/search` across editorial and live events. _(Spec: `docs/specs/026-search.md`)_

---

## 🏁 Phase D: Results & Riders

**GitHub Milestone:** `v0.6 - Results & Riders`
**Estimated Completion:** March–May 2027 — **gated on Brevly M2 (results) and M4 (regional riders, awards)**
**Goal:** Live results during and after rides, regional rider pages.

- **[024] Results & Regional Rider Pages:** Event results, ride results, rider pages. _(Spec: `docs/specs/024-results-riders.md`)_

---

## 🔁 Phase E: Cut-over

**GitHub Milestone:** `v1.0 - Public Home`
**Estimated Completion:** May 2027 — **with Brevly 0058 / 0047**
**Goal:** Brevly redirects its BY regional pages to rbel.by; the old pipeline is retired.

- **[027] Public Home Cut-over:** URL templates, sitemap, redirect verification, retirement. _(Spec: `docs/specs/027-cutover.md`)_

---

## 🔌 Requests to Brevly (API gaps found in the design)

The design needs a few things `brevly.public.v1` doesn't return yet. Raise them on the Brevly side; the affected blocks stay hidden until then.

- **Start location** (city/coordinates) on events or tracks — Calendar · Map, Quick Facts. (`ControlPoint` has no coordinates either.)
- **Club logo and description** — 0059's spec text lists `logo_url`/`description`, the proto's `PublicClubSummary` doesn't carry them.
- **Track time limit and map embed** — listed in 0059's text, missing from `Track` in the proto.
- **Region season stats** (finishers, total km) for Home / Season Stats and Clubs / In Numbers.
- **Club stats** (season kilometres, recent finishes) for the club page.
- **iCal feed** for "Subscribe to calendar".
- **Text query** on `ListEvents` for search.
- **Locale in Public Home URL templates**, so redirected visitors land on `/be/…` or `/en/…`.
