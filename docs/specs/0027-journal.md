# Feature Spec: 0027 - Journal

## 1. Context & Specification (The "What")

- **Goal:** Community articles and voices on rbel.by.
- **User Flow:** _Reader:_ opens `/journal` → reads an article → follows a linked event.
- **Design:** `~/dev/alr/business/brevly/design/brevly.pen`, frame `01b · Public Pages · rbel.by` (`iexz1`) — `Journal` (`dQ6xn`), `Article` (`qKIKx`); blocks `Journal / Featured|Voices|Article Card`, `Article / Body|On This Page|Author`.
- **Affected Areas:** `rbelby/journal/`, `rbelby/data/authors.json`, `src/pages/journal/`.

## 2. Technical Plan (The "How" for this specific feature)

- To be grilled when picked up: how writers author and translate articles (markdown in the vault vs. a CMS such as Notion), Crowdin for article bodies, linking articles to Brevly events by public ID.

## 3. Execution Tasks (The "Checklist")

- [ ] Decide the authoring and translation flow.
- [ ] `journal` collection, `/journal`, `/journal/[slug]`; add Journal to the nav.
- [ ] `npm run check` and `npm run build` pass.

## 4. Drafts & Notes (Living Document)

- Postponed after the MVP (re-plan 2026-10-24). Placeholder — don't build before it's grilled.
