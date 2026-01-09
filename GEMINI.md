# Gemini Context & Project Guide

## 1. Project Overview
**Name:** rbelby (Randonneurs Belarus)
**Purpose:** Website for the Belarusian Randonneurs community, managing events (brevets), routes, and club information.
**Architecture:** Static Site Generator (Astro) with an Obsidian-backed content layer.

## 2. Technology Stack
- **Framework:** Astro 5.x
- **UI Library:** React 19 (via `@astrojs/react`)
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/vite` & `@tailwindcss/typography`)
- **UI Components:** Preline UI
- **Content Management:** Markdown/Obsidian Vault (`rbelby/` directory)
- **Internationalization:** Astro i18n (Default: `ru`, Supported: `be`, `en`)
- **Translation Platform:** Crowdin
- **Package Manager:** npm

## 3. Directory Structure
- **`/rbelby/`**: The "Content Database". Acts as an Obsidian vault.
    - `events/`: Brevet event files (Markdown).
    - `routes/`: Route descriptions.
    - `data/`: JSON data for `clubs` and `authors`.
    - `.templates/`: Obsidian templates for new content.
- **`/src/`**: Application source code.
    - `components/`: Reusable `.astro` and `.tsx` components.
    - `layouts/`: Astro layouts (`Event.astro`, `Route.astro`, etc.).
    - `pages/`: File-based routing.
    - `i18n/`: Localization utilities and dictionaries.
    - `plugins/`: Custom plugins (e.g., `remark-modified-time.mjs`).

## 4. Key Configuration
- **`astro.config.mjs`**: Main configuration. Includes `react`, `tailwindcss`, `remark-modified-time` plugin, and i18n setup.
- **`src/content.config.ts`**: (Todo) Needs configuration to properly load collections from `rbelby/`.
- **`tailwind.config.js`**: (Implicit/Vite) Tailwind 4 configuration.

## 5. Development Workflow
- **Start Dev Server:** `npm run dev`
- **Build Production:** `npm run build`
- **Lint/Check:** (Standard Astro commands)

## 6. Conventions & Guidelines
- **I18n:** Ensure all user-facing text is localized using the keys in `src/i18n/locales`.
- **Content:** Primary content lives in `rbelby/` and should be treated as data.
- **Styling:** Use utility classes (Tailwind). Avoid global CSS where possible.
- **Components:** Prefer `.astro` components for static layout.
- **Translation:** Obsidian-based content (`rbelby/`) is translated via Crowdin integration.

## 7. Current Status / Notes
- `src/content.config.ts` contains placeholder code (`blog`, `dogs`) and needs to be updated to map the actual content in `rbelby/`.
- The project is in active development with a mix of static generation and interactive React components.
