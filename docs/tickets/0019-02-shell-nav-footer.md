---
id: 0019-02
spec: 0019
title: Layout shell with the new Nav and Footer, Preline removed
status: ready
depends_on: [0019-01]
scope:
  - src/layouts/Layout.astro
  - src/components/Navbar.astro
  - src/components/Footer.astro
  - src/components/home/FAQ.astro
  - src/i18n/locales/*.json
  - docs/CONSTITUTION.md
  - package.json
  - src/styles/global.css
---

# 0019-02: Layout shell with the new Nav and Footer, Preline removed

## Goal

Every page has the designed nav and footer, and the site no longer depends on Preline.

## Read first

- `docs/specs/0019-brand-theme-common-blocks.md` (Nav, Footer, Dark mode, Preline removed).
- `design/rbelby.pen` nodes:
  - `Block / Common / Nav · Guest` (`SldPJ`).
  - `Block / Common / Footer` (`USshk`).
  - The assembled `Inner page shell` (`mCFiA`).
  - `Interaction states` (`U781gt`, nav tab states).
- `src/layouts/Layout.astro`, `src/components/Navbar.astro`, `src/components/Footer.astro`, `src/components/home/FAQ.astro`, `src/i18n/utils.ts`.

## Do

1. **Nav:** rewrite `Navbar.astro` per `SldPJ`.
   - Logo (small) and "Randonneurs Belarus".
   - Items: Brevets → `/events` (switches to `/calendar` in 0021) · Clubs · Learn (`/learn`; until 0025 ships, link to `/about`). Mark the active item.
   - BY · RU · EN switch, keeping the current path.
   - Theme switch: keep the current `localStorage` logic and use Lucide icons.
   - **Sign in**: a pill button linking to brevly.app's sign-in page, with a `return_to` of the current rbel.by URL if Brevly supports it. Otherwise it is a plain link. Take the URL from one constant in `src/config.ts` (or similar).
   - No Journal item, no search icon.
2. **Mobile nav:** below `lg`, a menu button opens a panel with the same items.
   - Vanilla JS, with `aria-expanded`; Escape and outside clicks close it.
   - Not designed: use the nav tokens and keep it simple.
3. **Footer:** rewrite `Footer.astro` per `USshk` on the `brand-ink` band.
   - Blurb, socials, and the Ride / Learn / About columns from the spec.
   - Bottom row: ©, Terms and Privacy pointing to Brevly's legal URLs, Support Brevly, and Powered by Brevly with the wordmark (`lkLrw`, exported as SVG).
   - Hide Journal and Fests & permanents.
   - Links and socials are props or constants for now; 0019-03 moves them into `site.json`.
4. **Strings:** all nav and footer strings go in `src/i18n/locales/{ru,be,en}.json`.
5. **Preline:**
   - Remove the `preline` package, the `@import`/`@source` lines in `global.css` and any init script.
   - Replace the `hs-*` usage in `Navbar.astro` and `home/FAQ.astro` (FAQ becomes `<details>`/`<summary>`).
6. **Constitution:** §4 gains "No UI kits (Preline, Flowbite, …): Tailwind utilities and small vanilla scripts only."

## Don't

- No Notice Bar or `site.json` (0019-03).
- No signed-in state or avatar menu: there is no session in v1.
- Don't restyle page bodies.

## Acceptance

- [ ] The nav and footer match `mCFiA` at 1440px in light mode. Dark mode stays readable.
- [ ] The mobile menu works with keyboard and touch; there are no layout jumps.
- [ ] Switching languages keeps the page. Active item highlighting works on `/events`, `/clubs` and `/about`.
- [ ] `grep -ri preline src package.json` finds nothing.
- [ ] `npm run format`, `npm run check` and `npm run build` pass.

## Notes

- Ask the operator for the exact Brevly sign-in, Terms and Privacy URLs if they aren't in the Brevly docs; use `https://brevly.app/…` placeholders in the meantime.
