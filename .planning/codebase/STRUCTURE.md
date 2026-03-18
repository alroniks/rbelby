# Codebase Structure

**Analysis Date:** 2024-05-24

## Directory Layout

```
[project-root]/
├── docs/           # Documentation and architecture specifications
├── rbelby/         # Obsidian Vault acting as the CMS/Database
├── scripts/        # Utility scripts (e.g., roadmap sync)
├── src/            # Application source code (Astro)
│   ├── assets/     # Static assets (SVGs, images)
│   ├── components/ # Reusable Astro components (UI pieces)
│   ├── i18n/       # Internationalization logic and locales
│   ├── layouts/    # Page layout wrappers
│   ├── pages/      # File-based routing endpoints
│   ├── plugins/    # Astro/Vite/Remark plugins
│   └── styles/     # Global stylesheets (Tailwind)
```

## Directory Purposes

**`rbelby/`:**
- Purpose: Embedded Flat-File CMS and Obsidian Vault containing all domain content.
- Contains: Markdown files for events (`rbelby/events/`), routes (`rbelby/routes/`), and JSON structured data (`rbelby/data/clubs.json`).
- Key files: `rbelby/events/**/*.md`, `rbelby/routes/**/*.md`.

**`src/components/`:**
- Purpose: Reusable UI components used across multiple pages or specifically grouped by domain (e.g., `home/`).
- Contains: `.astro` files containing UI logic, HTML, and scoped styles.
- Key files: `src/components/home/EventList.astro`, `src/components/Navbar.astro`.

**`src/pages/`:**
- Purpose: Astro file-based routing. Files map directly to website URLs.
- Contains: Top-level `.astro` pages, localized pages (`be/`), and dynamic route parameters (`clubs/[club].astro`).
- Key files: `src/pages/index.astro`, `src/pages/routes.astro`, `src/pages/events/index.astro`.

**`src/layouts/`:**
- Purpose: High-level DOM structure wrappers applied to pages.
- Contains: `.astro` files with the `<html/>` root and `<slot/>` tags.
- Key files: `src/layouts/Layout.astro` (base wrapper with Preline UI script), `src/layouts/Event.astro`.

**`src/i18n/`:**
- Purpose: Translation dictionaries and localization utility functions.
- Contains: TypeScript utilities and translation strings (e.g., `locales/`).
- Key files: `src/i18n/utils.ts`.

## Key File Locations

**Entry Points:**
- `src/pages/index.astro`: The main landing page.
- `src/pages/be/index.astro`: The Belarusian localized landing page.
- `src/pages/clubs/[club].astro`: Dynamic entry point for specific clubs.

**Configuration:**
- `astro.config.mjs`: Core Astro configuration, Vite integrations, i18n, and Tailwind plugin setup.
- `src/content.config.ts`: Defines data schemas (Zod) and collections from the `rbelby/` folder.
- `package.json`: Dependencies (Astro, Tailwind CSS v4, Preline, etc.).

**Core Logic:**
- `src/content.config.ts`: Central location for how markdown/JSON files are mapped into queryable data.

**Testing:**
- *Not detected (No dedicated test framework configurations or directories like `tests/` found in standard locations).*

## Naming Conventions

**Files:**
- Components & Layouts: PascalCase (e.g., `EventList.astro`, `Layout.astro`).
- Pages: kebab-case/lowercase (e.g., `index.astro`, `routes.astro`).
- Utilities: camelCase (e.g., `utils.ts`).
- Content Data: kebab-case (e.g., `minskaya-krugosvetka-200.md`, `clubs.json`).

**Directories:**
- Source folders: lowercase (e.g., `components/`, `layouts/`, `home/`).
- Domain content (rbelby): lowercase/kebab-case.

## Where to Add New Code

**New Feature (UI):**
- Primary code: `src/components/[feature-name]/[ComponentName].astro`
- Data integration: Call `getCollection('collectionName')` within the component frontmatter.

**New Page/Route:**
- Implementation: `src/pages/[route].astro`
- Localized Implementation: `src/pages/be/[route].astro`

**New Content Type:**
- Implementation: Add a new folder in `rbelby/[type]/` and define the collection schema in `src/content.config.ts`.

**Utilities:**
- Shared helpers: `src/i18n/utils.ts` (for i18n) or a new `src/utils/` directory if broader utilities are needed.

## Special Directories

**`.planning/`:**
- Purpose: Internal GSD mapping and AI agent planning documents (e.g., `.planning/codebase/`).
- Generated: Yes (by agents).
- Committed: Yes.

**`docs/specs/`:**
- Purpose: Product and technical specifications driving the development phases.
- Generated: No.
- Committed: Yes.

---

*Structure analysis: 2024-05-24*