# Randonneurs Belarus (rbelby) Constitution

This document is the **ultimate source of truth** for the core principles, architecture, and technical constraints of the Randonneurs Belarus website.

## I. Core Principles

### 1. Content as Data (Obsidian Vault)
Primary content (events, routes, clubs, authors) MUST live in the `rbelby/` markdown/json directory. This directory is treated as an Obsidian-backed database. The Astro website serves solely as a presentation layer for this data. No content should be hardcoded in the UI components.

### 2. Internationalization (i18n)
Support for English, Russian (default), and Belarusian is mandatory. All user-facing UI text MUST be localized using keys in `src/i18n/locales`. Obsidian content translation MUST be managed strictly via the existing Crowdin integration. Native directory-based routing (e.g., `/be/`) is used.

### 3. SEO and Semantic Data
Every page MUST be SEO-optimized. All data exposed on the website (events, routes, authors) MUST be marked up via JSON-LD based on exact Schema.org definitions.

### 4. UI and Styling Conventions
Use Preline UI components and Tailwind CSS 4 utility classes exclusively. Avoid global CSS where possible. **React (`.tsx`) and similar heavy frameworks (Vue/Svelte) are explicitly forbidden.** Use `.astro` components exclusively for UI layout. Client-side interactivity MUST be handled via vanilla JavaScript (or Preline's native JS plugins).

### 5. Static-First Architecture
Utilize Astro's Static Site Generation (SSG). Keep client-side JavaScript to an absolute minimum to ensure fast load times and better search engine indexing.

## II. The Data Pipeline & Architecture

We utilize a Static Site Generator (SSG) architecture powered by Astro. Instead of a traditional database, the entire content layer is an embedded Obsidian Vault.

1. **Authoring**: Writers add markdown (Events, Routes) or JSON (Clubs) to `rbelby/`.
2. **Type Safety (ORM)**: `src/content.config.ts` acts as our ORM. It maps the file system to queryable collections using `astro:content`.
3. **Validation**: We use `zod` to strictly validate all frontmatter at build time. If a date is missing or a distance is typed as a string instead of a number, the build fails. Production data is guaranteed safe.
4. **Rendering**: Astro components fetch collections asynchronously and output static HTML. State is entirely URL-driven and server-rendered.

## III. Tech Stack

- **Routing & Rendering**: Astro 6.x (file-based routing via `src/pages/`).
- **Styling**: Tailwind CSS 4 (via Vite plugin).
- **Interactivity**: Vanilla JavaScript and Preline UI.
- **Content Management**: Markdown/JSON in Obsidian Vault (`rbelby/`).
- **Translation**: Crowdin (syncs to `src/i18n/locales/`).
- **Package Manager**: npm (Node.js v20+).

## IV. Debt & Future Considerations

- **Client-Side Filtering**: Currently, list filtering (e.g., event distances) relies on raw DOM manipulation (`grid.appendChild(card)`). As the dataset grows, this approach must be carefully managed to avoid performance bottlenecks.
- **Testing**: The project currently lacks automated testing. Future architectural phases will introduce unit testing for utilities and E2E testing for critical user paths.

## V. Governance

- **Architecture Decision Records (ADRs)**: All major architectural decisions must be documented in `docs/adr/`. Once an ADR becomes active, this constitution is updated to reflect the new state.
- **Amendment Procedure**: Changes to these principles require agreement from core maintainers and updating this constitution document based on an approved ADR.
- **Compliance Review**: Every pull request must be reviewed to ensure UI adheres strictly to Astro, vanilla JS, Tailwind, and Preline constraints. No React code should be approved.
