# Randonneurs Belarus (rbelby) Constitution

This document outlines the core principles and architectural constraints for the Randonneurs Belarus website project. The Gemini AI agent must adhere to these rules when making changes or proposing features.

## Core Principles

### I. Content as Data (Obsidian Vault)

Primary content (events, routes, clubs, authors) MUST live in the `rbelby/` markdown/json directory. This directory is treated as an Obsidian-backed database. The Astro website serves solely as a presentation layer for this data. No content should be hardcoded in the UI components.

### II. Internationalization (i18n)

Support for English, Russian (default), and Belarusian is mandatory. All user-facing UI text MUST be localized using keys in `src/i18n/locales`. Obsidian content translation MUST be managed strictly via the existing Crowdin integration.

### III. SEO and Semantic Data

Every page MUST be SEO-optimized. All data exposed on the website (events, routes, authors) MUST be marked up via JSON-LD based on exact Schema.org definitions.

### IV. UI and Styling Conventions

Use Preline UI components and Tailwind CSS 4 utility classes exclusively. Avoid global CSS where possible. **React (`.tsx`) is explicitly forbidden.** Use `.astro` components exclusively for UI layout. Client-side interactivity MUST be handled via vanilla JavaScript (or Preline's native JS plugins).

### V. Static-First Architecture

Utilize Astro's Static Site Generation (SSG). Keep client-side JavaScript to an absolute minimum to ensure fast load times and better search engine indexing.

## Architecture & Tech Stack

- **Framework**: Astro 5.x
- **UI Components**: Preline UI (via vanilla JS plugins)
- **Styling**: Tailwind CSS 4
- **Content Management**: Markdown / JSON in shared Obsidian Vault (`rbelby/`)
- **Translation Platform**: Crowdin
- **Package Manager**: npm

## Development Workflow

- **Content Mapping**: `src/content.config.ts` acts as the definitive bridge between the `rbelby/` vault and the Astro application. Any new content types must be defined here.
- **Local Development**: Run `npm run dev` to start the Astro dev server.
- **Production Build**: Run `npm run build` to generate the static site.

## Governance

- **Amendment Procedure**: Changes to these principles require agreement from core maintainers and updating this constitution document.
- **Compliance Review**: Every pull request must be reviewed to ensure UI adheres strictly to Astro, vanilla JS, Tailwind, and Preline constraints. No React code should be approved.
