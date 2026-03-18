# Coding Conventions

**Analysis Date:** 2026-03-18

## Naming Patterns

**Files:**
- Astro Components and Layouts: `PascalCase` (e.g., `src/components/Navbar.astro`, `src/layouts/Layout.astro`)
- Pages, Configuration, and Utilities: `kebab-case` or lowercase (e.g., `src/pages/index.astro`, `src/content.config.ts`, `src/i18n/utils.ts`)

**Functions:**
- `camelCase` (e.g., `getTimeLimit()`, `formatDate()` in `src/components/home/EventList.astro`)

**Variables:**
- `camelCase` for instances and values (e.g., `allEvents`, `upcomingEvents`, `defaultLang` in `src/components/home/EventList.astro` and `src/i18n/utils.ts`)
- Collections defined in lowercase (`events`, `routes`)

**Types/Interfaces:**
- `PascalCase` (Implied standard TypeScript conventions, though currently minimal explicit `interface` usage)

## Code Style

**Formatting:**
- Tool: Prettier (`v3.8.1`) with plugins `prettier-plugin-astro` and `prettier-plugin-tailwindcss`
- Key Settings (`.prettierrc`):
  - `semi: true`
  - `singleQuote: true`
  - `tabWidth: 2`
  - `trailingComma: "es5"`

**Linting:**
- Tool: Prettier CLI is used for formatting linting. ESLint (`eslint` and `eslint-plugin-astro`) is installed but not actively configured (no `.eslintrc` or `eslint.config.js` exists).
- Current script `npm run lint` strictly executes `prettier --check .`
- Strict TypeScript enabled (`astro/tsconfigs/strict` in `tsconfig.json`)

## Import Organization

**Order:**
1. Astro Internal/External dependencies (e.g., `import { getCollection } from 'astro:content';`)
2. Layouts and Components (e.g., `import Layout from '../layouts/Layout.astro';` in `src/pages/index.astro`)
3. Global Styles (e.g., `import '../styles/global.css';` in `src/layouts/Layout.astro`)

**Path Aliases:**
- Not currently used. Standard relative paths (e.g., `../components/Navbar.astro`) are heavily used.

## Error Handling

**Patterns:**
- No explicit error boundaries or global custom error handlers defined yet.
- Relies on Astro's built-in development overlay and build-time strict type-checking via Zod schemas (e.g., `schema: z.object({...})` in `src/content.config.ts`).

## Logging

**Framework:** `console`

**Patterns:**
- Standard `console.log()` usage. No external logging framework configured.

## Comments

**When to Comment:**
- Briefly explaining data filtering logic (e.g., `// Filter and sort events` in `src/components/home/EventList.astro`)
- Using block comments in JSX to separate layout sections (e.g., `{/* Image */}`, `{/* Content */}` in `src/components/home/EventList.astro`)

**JSDoc/TSDoc:**
- Rarely used. Relies on simple inline TypeScript typing instead of documentation blocks.

## Function Design

**Size:**
- Small and localized. Helper functions are defined directly within the Astro component's script section when only used locally (e.g., `getTimeLimit` in `src/components/home/EventList.astro`).

**Parameters:**
- Strongly typed parameters using primitive TypeScript types (e.g., `function getTimeLimit(distance: number)`)

**Return Values:**
- Implicit return types preferred for simple mappers and logic handlers (e.g., `function formatDate(date: Date)`)

## Module Design

**Exports:**
- Default exports for standard Astro components (implied by Astro file structure).
- Named exports for collections and utilities (e.g., `export const collections` in `src/content.config.ts`, `export const languages` in `src/i18n/utils.ts`).

**Barrel Files:**
- Not observed. Direct imports to specific files are used.

---

*Convention analysis: 2026-03-18*