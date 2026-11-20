# Feature Spec: 0019 - Brand Theme, Common Blocks & Site Config

## 1. Context & Specification (The "What")

- **Goal:** Re-skin the site with the new rbel.by brand and build the blocks every page shares, with site-owned content in one config file.
- **User Flow:** _Visitor:_ sees the new nav (Brevets · Clubs · Learn, BY/RU/EN, theme switch, Sign in) and footer on every page. _Editor:_ changes the notice bar, hero or footer links in `rbelby/site.json`.
- **Design:** `design/rbelby.pen`, frame `rbel.by · Public Site` (`iexz1`):
  - `Brand tokens` (`LfG4S`): logo, colours (`rgINi`), typography (`jJb0A`). The `Logo · Rework (experiments)` row is not in scope.
  - `Blocks · Common` (`M4N0w`): every block below, `Interaction states` (`U781gt`), assembled `Inner page shell` (`mCFiA`).
  - `Edge: 404` (`p0Qir`).
  - `Decisions` (`jQluo`): the rules every block follows.
  - Shared components: `Button / Primary` (`v5XJq`), `Button / Secondary` (`xS46b`), `Brand / Wordmark` (`lkLrw`, the "Powered by Brevly" mark).
- **Affected Areas:** `astro.config.mjs`, `src/styles/global.css`, `src/components/`, `src/layouts/`, `src/i18n/locales/`, `DESIGN.md`, `docs/CONSTITUTION.md`, `rbelby/site.json`, `src/content.config.ts`, `package.json`.

## 2. Technical Plan (The "How" for this specific feature)

- **Tokens:** the design file's variables are the source.
  - Raw palette `rb-*`: pine #1B3F33, cornflower #014C9E, lime #CEEF79, sand #F1E8D9, mist #E5F0FF, ink #071A36, ink-muted #262626, rust #B05A2E. Logo plate green #1A7A4C is for the logo only.
  - Components use semantic tokens only: `surface-page`, `surface`, `surface-muted`, `surface-hover`, `border`, `border-strong`, `text`, `text-secondary`, `text-muted`, `text-subtle`, `brand-accent` (+ `-hover`, `-tint`, `-tint-border`), `brand-ink` (+ `-deep`), `brand-band`, `brand-highlight`, `brand-on-*`. Values come from the design variables.
  - Status tokens (`status-cancel`, `status-warn`, success, info) and distance colours (`dist-200` … `dist-1000`) are fixed system tokens.
  - Brevly-only variables (`ops-*`, `bg-zinc-*`, `text-zinc-*`, `cal-*`, `tier-*`, `env-*`, `zz-test`) are not ported.
- **Type & shape:** Overpass headings (often uppercase, with `heading-nudge`) and Montserrat body/UI text. Both are self-hosted through Astro's Fonts API (`fonts` in `astro.config.mjs`) with `latin` and `cyrillic` subsets and only the weights the design uses. Radii are 8/12/20 (`radius-s/m/l`) and 8/16/24 (`rb-radius-*`). Buttons are pill-shaped (`radius-button` = 100).
- **Interaction states:** one rule set, from `U781gt`. Hover is one step darker surface or accent. Focus (keyboard only) is a 3px outer ring in `brand-ink`, or `brand-highlight` on dark bands. Pressed is the hover colour plus a soft inner shadow. Disabled is 40% opacity with no hover. Motion is 150 ms ease-out, with no movement.
- **Icons:** Lucide, as in the design, via `@lucide/astro`. New blocks use only Lucide. The old `Icon.astro` and `griddy-icons` stay until the old pages are deleted in 0020.
- **Dark mode stays (operator decision, 2026-11-21):** the design is light-only (Decision 12), but the existing dark theme and switcher are kept. Dark values come from the design's `mode: dark` variables where they exist (surfaces, text, borders, `brand-ink`, `brand-on-ink`). Brand values without a dark variant are derived so contrast holds. It may look off until a dark design exists, which is a later spec.
- **Preline removed:** plain Tailwind and small vanilla scripts. The Constitution names Preline nowhere, but its styling rule gains "no UI kits".
- **Nav (operator decision, 2026-11-21):** the design block is `Nav · Guest` (`SldPJ`).
  - Items: Brevets (`/calendar`; `/events` until 0020) · Clubs · Learn. Journal stays out of the nav until spec 0027 ships, even though the design shows it.
  - BY · RU · EN switch, plus the theme switch.
  - The search icon stays out until spec 0028.
  - **Sign in** links to brevly.app's sign-in page. In v1 it is a plain link: there is no session read and no `Nav · Signed in` (Decision 07).
  - Mobile isn't designed: below `lg` the items collapse into a vanilla-JS menu that uses the same tokens.
- **Footer (operator decision, 2026-11-21):** the design block is `Footer` (`USshk`).
  - Brand blurb, socials (Telegram, Instagram, Strava).
  - Ride column: Calendar, Clubs. Learn column: What is a brevet, Rules, FAQ. About column: About us, email, Telegram chat.
  - Links to pages that don't exist yet (Journal, Fests & permanents) stay hidden until their specs ship.
  - Terms and Privacy go to Brevly's legal pages (Decision 11).
  - Support Brevly, and Powered by Brevly with the wordmark.
- **Notice Bar** (`RCk3a`): sits above the nav on every page. It shows one line of markdown with at most one link, from `site.json`, and is off by default. It is dismissable, and the dismissal is remembered in `localStorage` per notice text.
- **Preview notice:** when `BREVLY_API_URL` isn't the production API, every page shows a fixed, non-dismissable Notice Bar "Preview · test data from dev.brevly.app", above any notice from `site.json`. Until 0031 adds the env var, the check treats a missing variable as "not production".
- **Common blocks** (each a `.astro` component in `src/components/common/`, with props for the copy and no hardcoded text):
  - Page Header (`TNL1O`): sand band with breadcrumbs, uppercase title, lead and an optional right-hand action slot.
  - Section Header (`ZDAR5`): eyebrow, title, and a "View all" link plus optional slider arrows on the right.
  - Breadcrumbs (`Wkxfn`): the last crumb is the current page.
  - Pagination (`o2l4i`).
  - CTA Band (`QT5d9`).
  - Data Notice (`HUlkO`).
  - Empty State (`yHKxe`).
  - Distance Badge (`bRD6V`): its colour comes from `dist-*` by distance band.
  - Status Chip (`tbgYa`), with every state shown in the design.
  - Support Card (`j5k4VZ`) and Support Band (`NKpva`): a voluntary donation to Brevly through Tribute, with $3 / $5 (default) / $10 / Other. The button opens the Tribute link with the chosen amount.
  - Buttons: Primary, Secondary and CTA-on-dark, with the states from `U781gt`.
- **Site config:** `rbelby/site.json`, loaded as a `file()` collection with a zod schema. It holds the notice bar, hero copy and image, How It Works, Why People Ride, flagship slider items, footer links, socials, the chat link and the Tribute link. Copy is per locale (`ru`, `be`, `en`), falling back to `ru`. Blocks owned by later specs only get their schema slots here.
- **404:** hero only (`p0Qir`): 404, title, text, an event search box that submits to the calendar, and "Open the calendar". The next-starts island comes in 0031.
- **UI strings** that aren't content (nav, footer headings, buttons) live in `src/i18n/locales/{ru,be,en}.json`.

## 3. Execution Tasks (The "Checklist")

Tickets: `docs/tickets/0019-*.md`.

### Phase 1: Theme (0019-01)

- [ ] Rewrite the `global.css` tokens and `DESIGN.md`; keep the dark variants working on the new tokens.
- [ ] Self-host Overpass and Montserrat through the Fonts API; drop the Google Fonts links.
- [ ] Radii, focus ring, motion; Button component with the design states.
- [ ] Add `@lucide/astro`.

### Phase 2: Shell (0019-02)

- [ ] Layout shell, Nav and Footer per design, with the mobile menu and theme switch.
- [ ] Remove Preline (package, imports, scripts, `hs-*` markup); update `docs/CONSTITUTION.md`.

### Phase 3: Common blocks & site config (0019-03)

- [ ] `rbelby/site.json` collection and schema.
- [ ] Notice Bar (from `site.json`) and the preview notice bar.
- [ ] Page Header, Section Header, Breadcrumbs, Pagination, CTA Band, Data Notice, Empty State, Distance Badge, Status Chip, Support Card, Support Band.

### Phase 4: 404 (0019-04)

- [ ] 404 page: hero only.
- [ ] `npm run check` and `npm run build` pass.

## 4. Drafts & Notes (Living Document)

- Blocked by: 0017 (done). Doesn't need the API: the 404's next-starts island moved to 0031.
- Until 0020 ships, the nav's Brevets item links to the current `/events` pages, and the old pages keep working on the new tokens: they may look rough, since they are deleted in 0020.
- Design mismatches settled with the operator on 2026-11-21: no Journal or search in the nav, a Sign in link only (no signed-in nav), dark mode kept, and footer links to unbuilt pages hidden.
- Dark mode design is a later spec.
