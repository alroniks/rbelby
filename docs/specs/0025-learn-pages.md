# Feature Spec: 0025 - Learn Pages

## 1. Context & Specification (The "What")

- **Goal:** The region's evergreen pages as plain markdown under `/learn`, replacing the hardcoded About, Rules and FAQ pages.
- **User Flow:** _Visitor:_ opens Learn → What is a brevet → follows the ToC → "More in Learn".
- **Design:** `~/dev/alr/business/brevly/design/brevly.pen`, frame `01b · Public Pages · rbel.by` (`iexz1`) — `Learn` (`scNPL`), `Learn · What is a brevet` (`GSqXy`), `Learn · Rules` (`jG68h`), `Learn · Awards & Super Randonneur` (`VnS6W`), `Learn · FAQ` (`E0o1N0`), `Learn · About us` (`Ji21u`); Markdown styles in `Blocks · Journal & Learn`.
- **Affected Areas:** `rbelby/learn/`, `src/content.config.ts`, `src/pages/learn/`, `crowdin.yml`.

## 2. Technical Plan (The "How" for this specific feature)

- **Content:** `rbelby/learn/<slug>.md` in Russian; frontmatter is only `title` and `description`; ToC from H2s. Translations `rbelby/learn/{be,en}/<slug>.md` via Crowdin (extend `crowdin.yml`; UI strings stay as they are).
- **Rendering:** fully prerendered.
- **Pages:** What is a brevet, Rules, FAQ, About us, Awards & Super Randonneur — content carried over from today's `about`, `rules`, `faq` pages.

## 3. Execution Tasks (The "Checklist")

- [ ] `learn` collection and `/learn`, `/learn/[slug]` with sidebar ToC and More in Learn, in all locales (fallback to RU).
- [ ] Move About, Rules, FAQ text into markdown; write What is a brevet and Awards.
- [ ] Markdown typography per the design.
- [ ] `crowdin.yml` covers `rbelby/learn/*.md`.
- [ ] `npm run check` and `npm run build` pass.

## 4. Drafts & Notes (Living Document)

- Blocked by: 0019.
