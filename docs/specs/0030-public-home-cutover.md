# Feature Spec: 0030 - Public Home Cut-over

## 1. Context & Specification (The "What")

- **Goal:** Make rbel.by the `by` Region's Public Home: Brevly 301-redirects `brevly.app/by/…` regional pages to rbel.by (Brevly specs 0058, 0047).
- **User Flow:** _Visitor:_ opens an old `brevly.app/by/events/{id}` link → lands on `rbel.by/events/{id}` → Register → Back to event returns to rbel.by.

## 2. Technical Plan (The "How" for this specific feature)

- URL templates for Brevly: home `/`, events `/calendar`, event `/events/{event_id}`, event results `/events/{event_id}/results`, result `/results/{result_id}`, clubs `/clubs`, club `/clubs/{club_id}`, rider `/riders/{rider_id}`.
- Sitemap from live data plus editorial pages.

## 3. Execution Tasks (The "Checklist")

- [ ] Confirm templates with Brevly (and locale handling, Brevly 0095).
- [ ] `sitemap.xml` from live data + editorial pages.
- [ ] Verify sample redirects and Register → Back to event after the Steward configures the Public Home.
- [ ] Tell Brevly `/api/feed/events` can be retired.

## 4. Drafts & Notes (Living Document)

- Blocked by: Brevly 0058 / 0047 (Brevly M4), 0026 for results/rider templates.
