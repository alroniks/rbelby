---
id: 0019-01
spec: 0019
title: Brand tokens, self-hosted fonts and buttons
status: ready
depends_on: []
scope:
  - astro.config.mjs
  - src/styles/global.css
  - src/layouts/Layout.astro
  - src/components/Button.astro
  - DESIGN.md
  - package.json
---

# 0019-01: Brand tokens, self-hosted fonts and buttons

## Goal

The site runs on the rbel.by design tokens, fonts and button styles, so every later block can be built only from semantic Tailwind utilities.

## Read first

- `docs/specs/0019-brand-theme-common-blocks.md` (Tokens, Type & shape, Interaction states, Icons, Dark mode).
- `design/rbelby.pen` via the `pencil` MCP. Read the variables with `GetVariables()`, plus these nodes:
  - `Brand tokens` → `Colors` (`rgINi`) and `Typography` (`jJb0A`).
  - `Interaction states` (`U781gt`).
  - `Button / Primary` (`v5XJq`) and `Button / Secondary` (`xS46b`).
- `src/styles/global.css`, `src/layouts/Layout.astro`, `src/components/Button.astro`, `DESIGN.md`.
- Astro Fonts API docs (`fonts` in `astro.config.mjs`, `<Font />` component).

## Do

1. **Tokens in `global.css` `@theme`:**
   - Port the raw `rb-*` palette and the semantic tokens listed in the spec, with names matching the design variables.
   - Port the status and `dist-*` colours and the radii (`radius-s/m/l/pill/button/hero`, `rb-radius-*`).
   - Drop `bg-zinc-*`, `ops-*`, `cal-*`, `tier-*` and `env-*`.
2. **Old token names:** keep the current ones (`accent`, `bg`, `brand`, `surface`, `text`, …) only as aliases onto the new tokens, so the old pages still build. Mark them `/* legacy, removed in 0020 */`.
3. **Dark mode:**
   - Write `:root.dark` (the selector the current theme switch uses) with the design's `mode: dark` values.
   - Derive the brand tokens that have no dark value, keeping contrast at WCAG AA or better for text.
4. **Fonts:**
   - Add `fonts` in `astro.config.mjs`: Overpass 700/800/900 → `--font-heading`, and Montserrat 400/500/600/700/800 → `--font-body`. Use `latin` and `cyrillic` subsets with `woff2`.
   - Load them with `<Font />` in `Layout.astro` and remove the Google Fonts `<link>`s.
   - Keep the Overpass vertical-metrics nudge (`heading-nudge`).
5. **Base styles:**
   - Focus ring: 3px outer ring in `brand-ink` on `:focus-visible`, and a `.on-dark` variant using `brand-highlight`.
   - Motion: 150 ms ease-out; respect `prefers-reduced-motion`.
6. **Button:** rewrite `Button.astro` with the variants `primary`, `secondary` and `cta-on-dark`, and the sizes from the design.
   - It renders `<a>` when given `href`, `<button>` otherwise, with an optional Lucide icon.
   - States: hover, focus, pressed and disabled per `U781gt`.
7. **Icons:** `npm i @lucide/astro`; the Button uses it.
8. **`DESIGN.md`:** rewrite it for the new palette, semantic tokens, type, radii and interaction rules. Name the design source as `design/rbelby.pen`, frame `rbel.by · Public Site`.

## Don't

- Don't touch the Nav, Footer or Preline (0019-02).
- Don't build the common blocks (0019-03).
- Don't delete the old icons or `griddy-icons` (0020).
- Don't restyle the old pages beyond what the aliases give for free.

## Acceptance

- [ ] No `fonts.googleapis.com` request; Cyrillic text renders in Overpass and Montserrat.
- [ ] A test page or the existing home shows the new colours in light mode, and the dark switch still flips to readable dark colours.
- [ ] Button states match `U781gt` (hover, keyboard focus, pressed, disabled).
- [ ] `npm run format`, `npm run check` and `npm run build` pass.

## Notes

- The design also uses JetBrains Mono and Inter, but only in annotation captions. Don't load them.
- `--font-sans` in the design is Montserrat; map Tailwind's `font-sans` to `--font-body`.
