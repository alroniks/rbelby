# Specs & Roadmap

`docs/specs/` is the single source of truth for what's being built on rbel.by. Workflow: [`docs/agents/workflow.md`](../agents/workflow.md). Architecture decisions live in [`docs/adr/`](../adr/README.md).

**Direction (October 2026):** rbel.by is the `by` Region's external Public Home on [Brevly](https://brevly.app) ([ADR-0003](../adr/0003-live-data-from-brevly.md)). Events, clubs, results and riders come live from Brevly's public read API; Learn pages are markdown in `rbelby/`; registration and accounts live on brevly.app. Design: `~/dev/alr/business/brevly/design/brevly.pen`, frame `01b · Public Pages · rbel.by`.

**Readiness:** **Ready** — can be built once blockers are Done · **Blocked (Brevly)** — waits on a Brevly spec/milestone · **Placeholder** — direction only, grill before building.

---

## M0 · Static site — Mar → Jun 2026 · ✅ Done

**Progress:** 9/9 specs done

| #                                             | Spec                         | Readiness | Depends on |
| --------------------------------------------- | ---------------------------- | --------- | ---------- |
| [0001](./done/0001-architecture.done.md)      | Architecture & data pipeline | Done      | —          |
| [0002](./done/0002-global-layout.done.md)     | Global layout & theming      | Done      | 0001       |
| [0003](./done/0003-i18n-routing.done.md)      | i18n routing                 | Done      | 0001       |
| [0004](./done/0004-core-static-pages.done.md) | Core static pages            | Done      | 0002       |
| [0005](./done/0005-basic-homepage.done.md)    | Basic homepage               | Done      | 0002       |
| [0006](./done/0006-events-directory.done.md)  | Events directory (markdown)  | Done      | 0001       |
| [0007](./done/0007-event-detail.done.md)      | Event detail (markdown)      | Done      | 0006       |
| [0008](./done/0008-routes-directory.done.md)  | Routes directory             | Done      | 0001       |
| [0009](./done/0009-route-detail.done.md)      | Route detail                 | Done      | 0008       |

Specs 0006–0009 are superseded by the live pages below; 0010–0016 of the old plan were dropped in the re-plan (bookmarks, Notion CMS, route versions, DOM filtering) or folded into the specs below.

## M1 · MVP on Brevly — Nov 2026 → Jan 2027 (ready for the 2027 season)

**Progress:** 0/9 specs done

**Goal:** rbel.by shows what Brevly publishes (ECC's 2027 calendar first) in the new design. Launch once ECC's 2027 events are published on Brevly production (Brevly spec 0049).

| #                                           | Spec                                     | Readiness | Depends on |
| ------------------------------------------- | ---------------------------------------- | --------- | ---------- |
| [0017](./0017-workflow-quality.md)          | Workflow & quality baseline              | Ready     | —          |
| [0018](./0018-runtime-brevly-client.md)     | Workers runtime & Brevly API client      | Ready     | 0017       |
| [0019](./0019-brand-theme-common-blocks.md) | Brand theme, common blocks & site config | Ready     | 0018       |
| [0021](./0021-calendar.md)                  | Calendar (list)                          | Ready     | 0018, 0019 |
| [0022](./0022-event-page.md)                | Event page                               | Ready     | 0018, 0019 |
| [0023](./0023-clubs.md)                     | Clubs                                    | Ready     | 0018, 0019 |
| [0024](./0024-home-page.md)                 | Home page                                | Ready     | 0018, 0019 |
| [0025](./0025-learn-pages.md)               | Learn pages (markdown + Crowdin)         | Ready     | 0019       |
| [0020](./0020-vault-cleanup-redirects.md)   | Vault cleanup & redirects                | Ready     | 0021–0025  |

## M2 · After the MVP — 2027

**Progress:** 0/5 specs done

| #                                     | Spec                           | Readiness                  | Depends on |
| ------------------------------------- | ------------------------------ | -------------------------- | ---------- |
| [0026](./0026-results-riders.md)      | Results & regional rider pages | Blocked (Brevly M2/M4)     | 0022       |
| [0027](./0027-journal.md)             | Journal                        | Placeholder                | 0019       |
| [0028](./0028-search.md)              | Site search                    | Ready                      | 0025       |
| [0029](./0029-calendar-map.md)        | Calendar map                   | Blocked (Brevly 0095)      | 0021       |
| [0030](./0030-public-home-cutover.md) | Public Home cut-over           | Blocked (Brevly 0058/0047) | 0026       |

---

## Requests to Brevly

Fields the design needs that `brevly.public.v1` doesn't return yet are collected in Brevly spec `0095-public-api-additions-rbelby.md`. Affected blocks stay hidden until then: start coordinates (map), club logo/description, track time limit/map embed, region and club stats, iCal feed, text query, locale in Public Home templates.
