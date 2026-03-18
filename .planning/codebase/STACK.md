# Technology Stack

**Analysis Date:** 2024-05-24

## Languages

**Primary:**
- TypeScript 5.9.3 - Core application logic, Astro components, scripts
- HTML/CSS - Astro templates and Tailwind styles

**Secondary:**
- JavaScript - Configuration files (astro.config.mjs)

## Runtime

**Environment:**
- Node.js v20 (based on GitHub Actions workflow)

**Package Manager:**
- npm
- Lockfile: present (`package-lock.json`)

## Frameworks

**Core:**
- Astro 6.0.4 - Primary web framework and static site generator
- TailwindCSS 4.1.17 - Styling and UI framework (via Vite plugin)

**Testing:**
- Not detected

**Build/Dev:**
- Vite - Bundler (internal to Astro)
- ESLint 10.0.3 - Linting
- Prettier 3.8.1 - Code formatting

## Key Dependencies

**Critical:**
- `astro:content` - Content collections (Markdown/JSON integration)
- `preline` 4.1.2 - Tailwind UI component library
- `dayjs` 1.11.19 - Date manipulation

**Infrastructure:**
- `tsx` - TypeScript execution for scripts

## Configuration

**Environment:**
- Configured via standard `.env` patterns in Astro, though none present in repo

**Build:**
- `astro.config.mjs` - Astro configuration (i18n, markdown, vite plugins)
- `tsconfig.json` - TypeScript configuration
- `package.json` - Scripts and dependencies

## Platform Requirements

**Development:**
- Node.js v20+

**Production:**
- Static Hosting (SSG output)