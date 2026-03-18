# Architecture

**Analysis Date:** 2024-05-24

## Pattern Overview

**Overall:** Static Site Generator (SSG) / Flat-file CMS Architecture using Astro.

**Key Characteristics:**
- **Content-Driven:** Uses an embedded Obsidian Vault (`rbelby/`) as a flat-file database containing Markdown and JSON.
- **Zero JS by Default:** Utilizes Astro's core server-first rendering, delivering static HTML + CSS with minimal client-side JavaScript.
- **Strongly Typed Data:** Uses Astro's Content Collections (`astro:content`) with Zod schemas to guarantee data structure at build time.
- **Utility-First Styling:** Combines Tailwind CSS v4 via Vite plugin and Preline UI components for styling.
- **Native i18n:** Implements internationalization via directory-based routing (`/be/`, `/en/`) and locale utilities.

## Layers

**Data Layer (CMS/Obsidian):**
- Purpose: Acts as the primary database where domain entities are authored and stored.
- Location: `rbelby/` (e.g., `rbelby/events/`, `rbelby/routes/`, `rbelby/data/`).
- Contains: Markdown files with frontmatter, JSON data files.
- Depends on: Obsidian Markdown conventions.
- Used by: Content Data Pipeline.

**Data Pipeline (ORM):**
- Purpose: Defines schema validations and loads file system data into accessible collections.
- Location: `src/content.config.ts`.
- Contains: Collection definitions using `glob` and `file` loaders, along with `zod` schemas.
- Depends on: `astro:content`, `zod`.
- Used by: View Layer.

**View Layer (Pages & Components):**
- Purpose: Queries the validated data and renders HTML pages.
- Location: `src/pages/`, `src/layouts/`, `src/components/`.
- Contains: `.astro` files (server-side JSX-like templates).
- Depends on: `astro:content`, Tailwind CSS classes.
- Used by: End users (browser).

## Data Flow

**Page Rendering Flow:**

1. **Authoring:** Content is written in the local Obsidian vault (`rbelby/events/**/*.md` or `rbelby/data/clubs.json`).
2. **Schema Validation:** At build time or during dev, `src/content.config.ts` reads the files using Astro loaders and validates them against predefined Zod schemas.
3. **Data Fetching:** Pages (e.g., `src/pages/index.astro`) or components (e.g., `src/components/home/EventList.astro`) fetch this data asynchronously using `await getCollection('events')`.
4. **Rendering:** The Astro components map over the validated data arrays to output static HTML.
5. **Styling & Interaction:** HTML is styled using Tailwind classes. Preline UI scripts (`is:inline` in `src/layouts/Layout.astro`) attach vanilla JS behaviors (e.g., dropdowns) to the rendered DOM.

**State Management:**
- The architecture relies entirely on URL state and server-rendered data. There are no client-side state management libraries (e.g., Redux, React Context) in use.
- Localized state is derived from the URL path via `getLangFromUrl` utility in `src/i18n/utils.ts`.

## Key Abstractions

**Content Collections:**
- Purpose: Strongly-typed wrappers around file-system data acting as queryable tables.
- Examples: `src/content.config.ts` (`events`, `routes`, `clubs`, `authors`).
- Pattern: Repository/Data Mapper.

## Entry Points

**Page Routing:**
- Location: `src/pages/`
- Triggers: URL requests (e.g., `/`, `/events`, `/routes`, `/clubs`).
- Responsibilities: Define page structures, fetch top-level data, configure localized routes (e.g., `src/pages/be/index.astro`), and render layouts.

## Error Handling

**Strategy:** Build-time Validation.

**Patterns:**
- **Zod Schemas:** Data missing required fields or having incorrect types (e.g., string instead of number for distance) will fail the Astro build process with clear Zod validation errors, preventing invalid data from reaching production.

## Cross-Cutting Concerns

**Validation:** Handled by `zod` in `src/content.config.ts`.
**Internationalization (i18n):** Configuration in `astro.config.mjs`, translation utilities in `src/i18n/utils.ts`, and localized paths under `src/pages/[lang]/`.
**Styling/UI:** Tailwind CSS configured via Vite plugin in `astro.config.mjs`, combined with Preline UI script injected in `src/layouts/Layout.astro`.

---

*Architecture analysis: 2024-05-24*