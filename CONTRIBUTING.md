# Contributing to Randonneurs Belarus (rbelby)

Welcome to the Randonneurs Belarus open-source project! We are building the most performant, accessible, and easily maintainable cycling events platform using Astro, Tailwind CSS, and a Flat-File CMS architecture.

This document serves as your guide to contributing to the codebase.

## 🚀 The Vision & Architecture

Our goal is to build a "ready, alive website" that minimizes technical debt and maximizes content velocity. To achieve this, we treat **Content as Data** and the **Site as a Static Viewer**.

- Content editors manage markdown files in Obsidian.
- Astro securely validates and compiles those files into a blazing-fast static site.
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

## 🔄 Development Workflow (Specs & GitHub)

We follow a Spec-Driven, issue-linked workflow to ensure quality and track progress against our **[Roadmap](docs/ROADMAP.md)**.

1. **English Only**: All specs, comments, issues, and commits MUST be in English.
2. **Architecture Decisions (ADRs)**: Any major architectural changes or technical direction shifts MUST be recorded as an ADR in `docs/adr/`. See the **[ADR README](docs/adr/README.md)** for the template and rules.
3. **Specs First**: Never jump straight into code. Draft a markdown file in `docs/specs/` (e.g., `docs/specs/001-feature.md`) outlining user stories and requirements.
4. **GitHub Integration**: Create a GitHub Issue, link it to the spec in the description, and add it to the project Roadmap.
5. **Design Alignment**: Before and during implementation, align the spec requirements with the design file located at `design/ui.pen`. If you find any inconsistencies between the spec, the code, and the design, **DO NOT automatically update the design**. Instead, flag the inconsistency to the operator to decide whether to adjust the design or adjust the code to follow the design.
6. **Isolated Subtasks**: 1 PR = 1 Feature. Implement each spec on its own branch.
7. **Step-by-Step Commits**: Keep commits atomic and descriptive (`feat: add core website routing (#12)`).
8. **Closed Specs**: Once the issue is closed, the spec is historical. Do not modify closed specs. Create new ones for bugs or new requirements.

## 🤖 AI-Assisted Development

We heavily utilize the Gemini AI agent for planning and code execution. If you are using an AI coding assistant, please instruct it to read:

- [`GEMINI.md`](GEMINI.md) - The core AI behavior instructions.
- [`docs/CONSTITUTION.md`](docs/CONSTITUTION.md) - The strict architectural mandates.
