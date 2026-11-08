# Contributing to Randonneurs Belarus (rbelby)

Welcome to the Randonneurs Belarus open-source project! We are building the most performant, accessible, and easily maintainable cycling events platform using Astro, Tailwind CSS, and a Flat-File CMS architecture.

This document serves as your guide to contributing to the codebase.

## 🚀 The Vision & Architecture

Our goal is to build a "ready, alive website" that minimizes technical debt and maximizes content velocity. To achieve this, we treat **Content as Data** and the **Site as a Static Viewer**.

- Club organizers manage events in [Brevly](https://brevly.app); the site renders them live from Brevly's public API.
- Editors manage Learn pages and site config as markdown/JSON in Obsidian.
- Artificial Intelligence (via Gemini) accelerates our development workflow.

For the strict technical rules, read our **[Constitution](docs/CONSTITUTION.md)**.

## 🧑‍💻 Local Setup

1. Fork and clone the repository.
2. Ensure you have **Node.js v20+** installed.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:4321`.

## 📜 Coding Conventions

- **Naming**:
  - `PascalCase` for Astro components (`EventCard.astro`).
  - `kebab-case` for pages and routes (`index.astro`).
  - `camelCase` for variables and functions.
- **Styling**: Utility-first via Tailwind 4.
- **Formatting**: Run `npm run format` before committing. We use Prettier with Astro and Tailwind plugins.

## 🔄 Development Workflow (Specs & Tickets)

We follow a simplified spec-driven workflow; the full process is in **[docs/agents/workflow.md](docs/agents/workflow.md)** and the plan in **[docs/specs/README.md](docs/specs/README.md)**.

1. **English Only**: All specs, comments, commits and PRs MUST be in English.
2. **Architecture Decisions (ADRs)**: Major architectural changes are recorded as an ADR in `docs/adr/`. See the **[ADR README](docs/adr/README.md)**.
3. **Specs First**: Never jump straight into code. Copy `docs/specs/_template.md` to `docs/specs/NNNN-feature.md` and add a row to `docs/specs/README.md`.
4. **Tickets**: A spec that needs several PRs is split into `docs/tickets/NNNN-TT-slug.md`. The PR implementing a ticket deletes its ticket file.
5. **Design Alignment**: Align with the design in `~/dev/alr/business/brevly/design/brevly.pen`, frame `01b · Public Pages · rbel.by`. If spec, code and design disagree, **DO NOT update the design**; flag it to the operator.
6. **One PR per ticket** (or per small spec), on its own branch.
7. **Checks**: `npm run check` and `npm run build` must pass; CI runs them on every PR.
8. **Done Specs**: Finished specs move to `docs/specs/done/` and are historical; create new specs for follow-ups.

## 🤖 AI-Assisted Development

We heavily utilize the Gemini AI agent for planning and code execution. If you are using an AI coding assistant, please instruct it to read:

- [`GEMINI.md`](GEMINI.md) - The core AI behavior instructions.
- [`docs/CONSTITUTION.md`](docs/CONSTITUTION.md) - The strict architectural mandates.
