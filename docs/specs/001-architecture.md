# Spec [001]: Architecture & Data Pipeline

**Feature ID**: `001-architecture`

## Overview

Establish the foundational Astro setup, configure Tailwind and Preline UI, and build the `content.config.ts` data pipeline to parse the `rbelby/` Obsidian vault. This is a purely structural task with no visible UI, but it enables all future pages.

## Implementation Tasks

- [ ] Ensure Astro 5.x, Tailwind CSS 4, and Preline UI are correctly configured.
- [ ] Configure `content.config.ts` to read `events`, `routes`, `clubs`, and `journal` from the `rbelby/` directory.
- [ ] Implement Zod schemas for the frontmatter of each content type (based on our current knowledge of the Obsidian data).
- [ ] Verify that Astro can build successfully without errors.
