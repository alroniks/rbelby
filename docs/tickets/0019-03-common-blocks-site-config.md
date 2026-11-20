---
id: 0019-03
spec: 0019
title: Common blocks, site config and notice bars
status: draft
depends_on: [0019-02]
scope:
  - rbelby/site.json
  - src/content.config.ts
  - src/components/common/**
  - src/components/Navbar.astro
  - src/components/Footer.astro
  - src/layouts/Layout.astro
  - src/i18n/locales/*.json
---

# 0019-03: Common blocks, site config and notice bars

## Goal

The shared blocks every later page spec composes from exist, and region copy lives in `rbelby/site.json`.

## Read first

- `docs/specs/0019-brand-theme-common-blocks.md` (Notice Bar, Preview notice, Common blocks, Site config).
- `design/rbelby.pen`, `Blocks · Common` (`M4N0w`). Read each block plus its caption.

## Do

1. **`site.json`:**
   - Write `rbelby/site.json` and a `site` collection (`file()` loader) in `src/content.config.ts`, with a zod schema. Per-locale copy falls back to `ru`.
   - Slots: `notice`, `hero`, `howItWorks`, `whyPeopleRide`, `flagships`, `footer` (columns, socials, email, chat), `tribute`.
   - Move the footer links and socials from 0019-02 into it.
2. **Notice Bar** (`RCk3a`):
   - Markdown with one link, from `site.notice`.
   - Dismissable; the dismissal is stored in `localStorage` keyed by a hash of the text.
   - Rendered above the nav in `Layout.astro`.
3. **Preview notice:**
   - A fixed, non-dismissable Notice Bar when `BREVLY_API_URL` isn't the production API. A missing variable counts as "not production" until 0031.
   - It stacks above the site notice.
4. **Blocks** in `src/components/common/`, one component each, with props:
   - `PageHeader` (`TNL1O`): slot for actions.
   - `SectionHeader` (`ZDAR5`).
   - `Breadcrumbs` (`Wkxfn`): with BreadcrumbList JSON-LD (Constitution §3).
   - `Pagination` (`o2l4i`): from `page` and `total` plus a URL builder; state lives in the URL.
   - `CtaBand` (`QT5d9`).
   - `DataNotice` (`HUlkO`).
   - `EmptyState` (`yHKxe`).
   - `DistanceBadge` (`bRD6V`): 200 → `dist-200`, 300 → `dist-300`, 400 → `dist-400`, 600 → `dist-600`, 1000+ → `dist-1000`, other distances → the nearest lower band.
   - `StatusChip` (`tbgYa`): every state in the design.
   - `SupportCard` (`j5k4VZ`) and `SupportBand` (`NKpva`): the amount picker is a small vanilla script, and the button builds the Tribute link from `site.tribute`.
5. **Replace the old `PageHeader.astro`** usages with the new one, or delete the old file if nothing uses it.

## Don't

- Don't build page-specific blocks (Hero, Event Row, etc.); those belong to 0021–0025.
- No 404 (0019-04).

## Acceptance

- [ ] Each block renders on a temporary `/dev/blocks` page in light and dark mode; delete the page before merge, or keep it `noindex` and excluded from the sitemap.
- [ ] A bad `site.json` fails the build with a clear zod error.
- [ ] `npm run format`, `npm run check` and `npm run build` pass.

## Notes

- Detail this ticket (status → `ready`) once 0019-02 is merged.
