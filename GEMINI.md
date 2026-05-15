# Randonneurs Belarus (rbelby) - AI Agent Instructions

Hello Gemini! When you are working in this repository, you must adhere strictly to the following architectural guidelines, workflow rules, and formatting standards.

## 🏗️ Core Architecture (Strict Compliance Required)

You must treat `docs/CONSTITUTION.md` as the ultimate source of truth for all architectural decisions. Here are the most critical points:

1. **NO REACT (`.tsx` or `.jsx`)**: Do not use React components. The project uses **Astro** (`.astro`) components exclusively for UI layout.
2. **Vanilla JS & Preline UI**: Client-side interactivity MUST be handled via vanilla JavaScript (or Preline's native JS plugins). Do not install other heavy frontend frameworks.
3. **Tailwind CSS 4**: Use utility classes. Avoid global CSS where possible.
4. **Content as Data (Obsidian Vault)**: Do not hardcode content into components. All content (events, routes, authors, clubs) lives in the `rbelby/` markdown/json directory. Read data via `src/content.config.ts`.
5. **Static Site Generation (SSG)**: Keep client-side JavaScript to a minimum for SEO and performance.

## 🔄 Development Workflow

The workflow is simplified and relies heavily on GitHub Issues and iterative planning.

1. **English Only**: All specifications, code comments, issues, commit messages, and Markdown documentation must be written in **English**.
2. **Specs First**: New features begin with a spec drafted in `docs/specs/` (e.g., `docs/specs/001-website-core-structure.md`).
3. **GitHub Integration**: Specs are linked to GitHub Issues, which live on the Roadmap. Check `docs/WORKFLOW.md` for details.
4. **Iterative Execution**: Do not try to implement massive changes at once. If asked to implement a feature, use the `enter_plan_mode` tool to safely review the codebase, plan your strategy, and confirm the architecture before writing files.

## 🛠️ Commands and formatting

After completing changes to the source code, always run the following command to format the codebase:

```bash
npm run format
```

When building or testing locally:

- Use `npm run build` to verify the production build succeeds without errors.
- Use `npm run dev` to test changes locally.

## 🗺️ Navigation Guide

- `rbelby/`: The Obsidian Vault containing Markdown content (Brevets, Routes, etc.). This is your database.
- `src/content.config.ts`: Defines how Astro loads content from `rbelby/`.
- `docs/CONSTITUTION.md`: The mandatory ruleset.
- `docs/WORKFLOW.md`: How to plan and execute tasks using GitHub.
- `docs/specs/`: Active, in-progress, or completed feature specifications.
- `src/components/`: Reusable `.astro` UI elements.
- `src/layouts/`: Base HTML shells and page layouts.
- `src/pages/`: Astro file-based routing.

Remember: Always keep it simple, strictly avoid React, and ensure maximum compliance with the Constitution.
