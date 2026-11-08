# Feature Spec: 0022 - Event Page

## 1. Context & Specification (The "What")

- **Goal:** The event page for brevets, fests and Flèche in every lifecycle state; registration hands off to Brevly.
- **User Flow:** _Visitor:_ opens `/events/{id}` → reads date, distance, controls, route → taps Register → `register_url` on brevly.app.
- **Design:** `~/dev/alr/business/brevly/design/brevly.pen`, frame `01b · Public Pages · rbel.by` (`iexz1`) — `Event · Brevet (cancelled)` (`H0Fdl`), `(postponed)` (`K3xmN`), `Event · Fest (guest, window open)` (`pj7BD`), `Event · Flèche (guest)` (`a6hFPV`), `Event · Brevet (ride day, guest)` (`SW5lq`); `Event · Brevet (registered)` (`yQgVV`) as the layout reference for a scheduled brevet, guest variant. Blocks: `Event / Cover`, `Quick Facts`, `Status Banner`, `Announcements`, `About`, `Control Timeline`, `Route & Navigation`, `Fest Steps`, `Start Window`, `Teams`, `Action Card`, `Share Card`, `Results / Summary`.
- **Affected Areas:** `src/pages/events/[id].astro` (+ locales), `src/components/event/`.

## 2. Technical Plan (The "How" for this specific feature)

- **Data:** `GetEvent` (`locale`), `ListEventStartlist`. Use `register_url` as given; never build brevly.app URLs.
- **Rendering:** on demand (`prerender = false`): IDs aren't known at build time and the content must be in the HTML for SEO.
- **Guest only:** signed-in / "registered" variants are not built.
- **Rules:** registration closes 23:59 the day before the start; no capacity states; CANCELLED/POSTPONED show a status banner.
- **Hidden until Brevly provides data:** Announcements (Brevly 0027/0065), Results Summary (Brevly 0024), time limit and map embed (API gap).
- Event names/descriptions are shown as organizers entered them (no translation until Brevly 0092).

## 3. Execution Tasks (The "Checklist")

- [ ] `/events/[id]` route in all locales; `NOT_FOUND` → 404.
- [ ] Cover, Quick Facts, About, Action Card with Register → `register_url`.
- [ ] Control Timeline and Route & Navigation from `tracks[].controls` and `gpx_url`.
- [ ] Fest Steps / Start Window for fests; Teams for Flèche.
- [ ] Status Banner from `status`/`status_reason`; Announcements when present.
- [ ] Startlist grouped by planned date.
- [ ] Results Summary linking to results when `results_summary` is present.
- [ ] `SportsEvent` JSON-LD, OG tags, canonical URL.
- [ ] `npm run check` and `npm run build` pass.

## 4. Drafts & Notes (Living Document)

- Blocked by: 0018, 0019.
