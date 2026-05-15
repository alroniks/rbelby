---
type: ADR
id: '0001'
title: 'Use Changesets for Changelog Generation'
status: active
date: 2026-05-15
---

## Context

We need a tool to maintain a human-readable changelog that avoids the rigidity of conventional commits. The changelog should be stored in markdown format so it can be translated via Crowdin and published as a standard page on the website.

## Decision

**We will use [@changesets/cli](https://github.com/changesets/changesets) to manage versioning and changelogs.**

## Options considered

- **@changesets/cli** (chosen): Developers run `npx changeset` to create a markdown file describing their change. These files are human-readable, semantic descriptions of changes. Upon release, `npx changeset version` compiles them into a central `CHANGELOG.md`. This naturally produces a markdown file that can be ingested by Astro and translated by Crowdin.
- **Conventional Commits (e.g. release-please)**: Forces developers into a rigid commit message format, which was explicitly rejected.
- **Custom Astro Collection**: Relies on developers manually creating new markdown files in the vault per release. Requires manual version bumping and compilation, lacking the automation of a dedicated tool.

## Consequences

- Pull request authors will need to run `npx changeset` to document their changes if they are user-facing or notable.
- A `CHANGELOG.md` will be generated at the repository root.
- We will configure Crowdin to sync `CHANGELOG.md` for translation.
- We will create an Astro page or component to read and display the changelog, bringing it directly into the website's UI.
