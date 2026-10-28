# Feature Spec: 0020 - Vault Cleanup & Redirects

## 1. Context & Specification (The "What")

- **Goal:** Remove everything Brevly now owns and keep old links working with redirects.
- **User Flow:** _Visitor:_ opens an old link (`/events/minskaya-krugosvetka-2026`) → lands on `/calendar`.
- **Affected Areas:** `rbelby/`, `src/content.config.ts`, `src/pages/`, redirect config.

## 2. Technical Plan (The "How" for this specific feature)

- **Delete:** `rbelby/events/`, `rbelby/routes/`, `rbelby/data/clubs.json`, `rbelby/Бреветы.base`, `rbelby/Маршруты.base`; collections `events`, `routes`, `clubs`, `journal` (journal returns with spec 0027); pages: old events, routes, clubs, `riders/[rider]`, `login`, `settings`, `privacy`, `terms` (all locales). Keep `rbelby/data/authors.json`. History is not migrated: Brevly holds it.
- **Redirects (301, every locale prefix too):**
  - `/events/*`, `/routes/*` → `/calendar`
  - `/clubs/{slug}` → `/clubs/{id}` via a hand-kept map, else `/clubs`
  - `/riders/*` → `/`
  - `/about`, `/rules`, `/faq` → their `/learn/{slug}` pages
  - `/privacy`, `/terms` → Brevly's legal pages

## 3. Execution Tasks (The "Checklist")

- [ ] Delete the content, collections and pages listed above.
- [ ] Redirect map in `astro.config.mjs` `redirects` (or middleware for wildcard/locale cases).
- [ ] Club slug → Brevly ID map (filled once BY clubs are in Brevly; until then `/clubs`).
- [ ] `npm run check` and `npm run build` pass.

## 4. Drafts & Notes (Living Document)

- Blocked by: 0021, 0022, 0023, 0025 (the replacement pages must exist before deletions ship).
