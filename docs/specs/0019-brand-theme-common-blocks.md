# Feature Spec: 0019 - Brand Theme, Common Blocks & Site Config

## 1. Context & Specification (The "What")

- **Goal:** Re-skin the site with the new rbel.by brand and build the blocks every page shares, with site-owned content in one config file.
- **User Flow:** _Visitor:_ sees the new nav (Brevets · Clubs · Learn, BY/RU/EN, theme switch) and footer on every page. _Editor:_ changes the notice bar or hero in `rbelby/site.json`.
- **Design:** `~/dev/alr/business/brevly/design/brevly.pen`, frame `01b · Public Pages · rbel.by` (`iexz1`) — `Brand tokens`, `Theme mapping`, `Blocks · Common`, `Inner page shell` (`mCFiA`), `Edge: 404` (`p0Qir`).
- **Affected Areas:** `src/styles/global.css`, `src/components/`, `src/layouts/`, `DESIGN.md`, `rbelby/site.json`, `src/content.config.ts`.

## 2. Technical Plan (The "How" for this specific feature)

- **Tokens:** raw palette `rb-*` — pine #1B3F33, cornflower #014C9E, lime #CEEF79, sand #F1E8D9, mist #E5F0FF, ink #071A36, ink-muted #262626, rust #B05A2E; logo plate green #1A7A4C (logo only). Components read semantic `brand-*` tokens (`brand-accent` = cornflower, `brand-ink` = pine, `brand-band` = sand, plus derived values from `Theme mapping`). Status colours are fixed system tokens.
- **Type & shape:** Overpass 700–900 headings (often uppercase), Montserrat body/UI, self-hosted; radii 8/16/24, pill buttons.
- **Dark mode stays:** the design is light-only; the existing dark theme and switcher are kept and mapped onto the new tokens as best we can. It may look off until a dark design exists.
- **Preline removed:** plain Tailwind + small vanilla scripts; the Constitution's styling rule is updated.
- **Nav:** Brevets (`/calendar`) · Clubs · Learn; BY/RU/EN switch; theme switch; guest only. Journal and search are not in the nav until their specs ship.
- **Footer:** Ride / Learn / About columns, socials, Telegram chat, Support Brevly, Powered by Brevly; Terms and Privacy link to Brevly's legal pages.
- **Preview notice:** when `BREVLY_API_URL` isn't the production API, every page shows a fixed Notice Bar "Preview · test data from dev.brevly.app", above any notice from `site.json`.
- **Site config:** `rbelby/site.json` (zod-validated collection) — notice bar, hero copy and image, How It Works, Why People Ride, flagship slider items, footer links, socials, chat link. Longer copy may live as markdown next to it.

## 3. Execution Tasks (The "Checklist")

### Phase 1: Theme

- [ ] Rewrite `global.css` tokens and `DESIGN.md`; keep dark variants working on the new tokens.
- [ ] Self-host Overpass + Montserrat; radii and buttons.
- [ ] Remove Preline (package, imports, scripts); update `docs/CONSTITUTION.md`.

### Phase 2: Common blocks

- [ ] Nav and Footer per design.
- [ ] Notice Bar, Page Header, Section Header, Breadcrumbs, Pagination, CTA Band, Data Notice, Empty State, Distance Badge, Status Chip.
- [ ] `rbelby/site.json` collection and schema.
- [ ] Preview notice bar when not on the production API.
- [ ] 404 page: hero + next starts island (`ListEvents`), hero only when Brevly is unavailable.
- [ ] `npm run check` and `npm run build` pass.

## 4. Drafts & Notes (Living Document)

- Blocked by: 0018 (the 404's live island).
- Dark mode design is a later spec.
