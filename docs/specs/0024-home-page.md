# Feature Spec: 0024 - Home Page

## 1. Context & Specification (The "What")

- **Goal:** Rebuild the home page around the region's story and live next starts.
- **User Flow:** _New visitor:_ reads the hero and How It Works → sees next starts → opens the calendar or a club.
- **Design:** `~/dev/alr/business/brevly/design/brevly.pen`, frame `01b · Public Pages · rbel.by` (`iexz1`) — `Home` (`xZTq6`): Notice Bar · Nav · `Home / Hero` · Next starts · Season highlights · `Home / Why People Ride` · `Home / How It Works` · Clubs of the region · CTA · Footer; `Home / Season Stats`.
- **Affected Areas:** `src/pages/index.astro` (+ locales), `src/components/home/`.

## 2. Technical Plan (The "How" for this specific feature)

- **Static:** Hero, Why People Ride, How It Works, CTA from `rbelby/site.json`.
- **Islands:** Next starts (`ListEvents`, `active_only`), Season Stats (`GetRegion` counts), Clubs of the region (`ListClubs`).
- **Later:** switch featured items to `GetRegionShowcase` once Brevly 0074 publishes curated items (automatic lists stay as fallback). Season highlights beyond the counts stay hidden until Brevly has region stats.

## 3. Execution Tasks (The "Checklist")

- [ ] Static sections from `site.json`, localized.
- [ ] Next starts, Season Stats and Clubs islands with Data Notice fallback.
- [ ] `npm run check` and `npm run build` pass.

## 4. Drafts & Notes (Living Document)

- Blocked by: 0018, 0019.
