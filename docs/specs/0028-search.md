# Feature Spec: 0028 - Site Search

## 1. Context & Specification (The "What")

- **Goal:** `/search?q=` across Learn (and later Journal) pages and live events.
- **Design:** `~/dev/alr/business/brevly/design/brevly.pen`, frame `01b · Public Pages · rbel.by` (`iexz1`) — `Search` (`e3N9HK`).
- **Affected Areas:** `src/pages/search.astro`, Nav.

## 2. Technical Plan (The "How" for this specific feature)

- Pagefind over prerendered editorial pages; events matched server-side against `ListEvents` until Brevly adds a text query (API gap).

## 3. Execution Tasks (The "Checklist")

- [ ] Pagefind index for editorial pages.
- [ ] Event matching on the server.
- [ ] `/search` page and Nav entry.
- [ ] `npm run check` and `npm run build` pass.

## 4. Drafts & Notes (Living Document)

- After the MVP.
