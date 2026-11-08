# Randonneurs Belarus (rbelby) Constitution

This document is the **ultimate source of truth** for the core principles, architecture, and technical constraints of the Randonneurs Belarus website.

## I. Core Principles

### 1. Content as Data (Brevly + Obsidian Vault)

Per [ADR-0003](adr/0003-live-data-from-brevly.md), event data (regions, clubs, events, tracks, startlists, results, riders) MUST come live from Brevly's public read API (`brevly.public.v1`) through the single client in `src/lib/brevly/`. Editorial content (journal, Learn pages, authors, site config) MUST live in the `rbelby/` markdown/json directory. The Astro website is a presentation layer for both. No content should be hardcoded in the UI components. Registration and every account action link to brevly.app.

### 2. Internationalization (i18n)

Support for English, Russian (default), and Belarusian is mandatory. All user-facing UI text MUST be localized using keys in `src/i18n/locales`. Obsidian content translation MUST be managed strictly via the existing Crowdin integration. Native directory-based routing (e.g., `/be/`) is used.

### 3. SEO and Semantic Data

Every page MUST be SEO-optimized. All data exposed on the website (events, routes, authors) MUST be marked up via JSON-LD based on exact Schema.org definitions.

### 4. UI and Styling Conventions

Use Tailwind CSS 4 utility classes. Avoid global CSS where possible. **React (`.tsx`) and similar heavy frameworks (Vue/Svelte) are explicitly forbidden.** Use `.astro` components exclusively for UI layout. Client-side interactivity MUST be handled via vanilla JavaScript.

### 5. Server-Rendered, Cached, Minimal JS

Pages are prerendered by default; detail pages with live data render on demand on Cloudflare Workers, and live parts of list pages are `server:defer` islands. Filters and state live in the URL and are resolved server-side. Keep client-side JavaScript to an absolute minimum to ensure fast load times and better search engine indexing. If Brevly is unavailable, live sections degrade to a notice, never a broken page.

## II. The Data Pipeline & Architecture

Two sources feed one Astro site:

1. **Live data (Brevly)**: Club organizers manage events in Brevly. `src/lib/brevly/` wraps the generated ConnectRPC client for `buf.build/brevlylabs/public`; pages call it, never `fetch` directly. Brevly's numeric public IDs are the URLs (`/events/{id}`, `/clubs/{id}`).
2. **Editorial data (Obsidian Vault)**: Writers add markdown (Journal, Learn) or JSON (authors, site config) to `rbelby/`. `src/content.config.ts` maps it to collections validated with `zod` at build time.
3. **Rendering**: Astro on Cloudflare Workers (`@astrojs/cloudflare`); editorial routes are prerendered, live detail routes render on request, live list blocks are server islands. State is URL-driven and server-rendered.

## III. Tech Stack

- **Routing & Rendering**: Astro 6.x on Cloudflare Workers (`@astrojs/cloudflare`), file-based routing via `src/pages/`.
- **Live Data**: Brevly public read API (ConnectRPC, `brevly.public.v1`).
- **Styling**: Tailwind CSS 4 (via Vite plugin).
- **Interactivity**: Vanilla JavaScript.
- **Content Management**: Brevly for event data; Markdown/JSON in Obsidian Vault (`rbelby/`) for editorial content.
- **Translation**: Crowdin (syncs to `src/i18n/locales/`).
- **Package Manager**: npm (Node.js v20+).
- **Checks**: `npm run check` (Prettier + `astro check`), Vitest for the API client.
- **Changelog & Versioning**: Changesets (`@changesets/cli`) using semantic PR descriptions over conventional commits (ADR-0001).

## IV. Debt & Future Considerations

- **Brevly API gaps**: Some designed blocks need fields Brevly doesn't expose yet (see Brevly spec 0095 and `docs/specs/README.md`); they stay hidden until then.
- **Testing**: Only the Brevly API client is unit-tested; pages are verified by `astro check` and the build.

## V. Governance

- **Architecture Decision Records (ADRs)**: All major architectural decisions must be documented in `docs/adr/`. Once an ADR becomes active, this constitution is updated to reflect the new state.
- **Amendment Procedure**: Changes to these principles require agreement from core maintainers and updating this constitution document based on an approved ADR.
- **Compliance Review**: Every pull request must be reviewed to ensure UI adheres strictly to Astro, vanilla JS and Tailwind constraints. No React code should be approved.
