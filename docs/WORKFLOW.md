# Development Workflow with Gemini CLI & GitHub

This document outlines the simplified workflow for developing the Randonneurs Belarus website using the Gemini CLI agent and GitHub for project management.

## Philosophy

- **Simplicity:** Keep the process lightweight and conversational. Instead of rigid templates or strict git coupling, use plain markdown and iterative chatting with Gemini.
- **English Only:** All specifications, architecture documents, issues, and commit messages MUST be written in English.
- **Single Source of Truth:** `docs/CONSTITUTION.md` defines the architectural boundaries. `docs/specs/` defines what we are building.

## Repository Rules

- **Isolated Subtasks (1 PR = 1 Feature)**: Implement each feature/subtask in isolation on its own branch. Small related tasks may be grouped, but generally, submit one Pull Request per feature.
- **Step-by-Step Commits (1 Task = 1 Commit)**: Execute specification tasks one at a time. The agent MUST pause after each task, provide a recommended commit message (`<description>, fixes #N`), and wait for the user to execute the `git commit`. The agent MUST NOT commit directly.

## The Workflow

### Golden Rule: Closed Specs

Once a GitHub Issue corresponding to a specification is **closed**, the specification file in `docs/specs/` becomes a historical record. **Do not modify closed specs**. If a completed feature requires changes, bugs need fixing, or new requirements emerge, create a **new specification** and a new issue instead of altering the closed one.

### 1. Planning a New Feature

When starting a new feature, do not jump straight into code. First, define the specification:

1. Create a markdown file in `docs/specs/` (e.g., `docs/specs/001-website-core-structure.md`).
2. Ask Gemini to draft the spec. Example:
   > "Help me draft a specification for the new feature X. Here are my requirements: ..."
3. The spec should briefly outline:
   - User stories and scenarios
   - Key requirements
   - Affected components/pages

### 2. GitHub Integration: Roadmap & Issues

We use a GitHub Project as our Roadmap. Specifications must be linked to actionable GitHub issues.

1. **Create the GitHub Issue:** Once a specification is drafted in `docs/specs/`, create a new GitHub Issue (or ask Gemini to help draft the issue body).
2. **Link the Spec:** The GitHub Issue description MUST link back to the spec file in the repository (e.g., `See [Spec](docs/specs/001-website-core-structure.md)`).
3. **Break into Tasks:** If the feature is large, break it down into smaller sub-tasks directly as a checklist within the GitHub Issue or as separate smaller linked issues (Epic -> Tasks).
4. **Roadmap Tracking:** Add the GitHub Issue to the repository's GitHub Project to track it on the Roadmap. Use standard columns (e.g., Todo, In Progress, Done).

### 3. Implementation

1. Tell Gemini to start implementing a specific feature based on the spec or GitHub Issue.
   > "Let's implement User Story 1 from docs/specs/001-website-core-structure.md."
2. Allow Gemini to use `enter_plan_mode` if necessary to reason about changes safely before applying them.
3. Review changes and iterate.

### 4. Completion & Committing

1. Validate the changes locally (`npm run dev` and `npm run build`).
2. Commit the changes using conventional commits, referencing the GitHub issue number (e.g., `feat: add core website routing (#12)`).
3. Close the issue and update the Roadmap.

## Interaction Tips for Gemini

- Always remind Gemini to consult `docs/CONSTITUTION.md` if proposing major architectural changes.
- Use the `/plan` command or `enter_plan_mode` tool for complex refactoring.
- Keep requests focused on single, verifiable milestones to ensure quality.
