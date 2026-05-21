Here is the consolidated, actionable to-do list based on the team's evaluation:

**Content & Data Schemas**

- [x] Define and document the exact file/folder structure for i18n Markdown files in the Obsidian vault (using `filename.be.md` / `filename.en.md` suffix files).
- [ ] Update `rbelby/.templates/` to include mandatory SEO (meta title, description, OG image) and i18n frontmatter fields.
- [ ] Add strict Zod validation in `content.config.ts` for all SEO metadata.
- [ ] Add Zod validation/error handling to prevent missing YAML fields or broken Obsidian links from crashing the Astro build.

**Design & UI**

- [x] Audit currently built pages against `design/ui.pen` for strict layout alignment.
- [x] Enforce colors, typography scale, and spacing systematically using `design/ui.pen` as the absolute source of truth.
- [ ] Verify the `griddyicons` setup is properly configured and applied.

**Architecture & Logic**

- [x] Define explicit routing/UI fallback behaviors for missing translations (implemented elegant fallback in `src/i18n/utils.ts` and streamlined routing templates).
- [x] Fix Preline UI collapsible elements breaking during Astro View Transitions.
- [ ] Establish a standardized Vanilla JS pattern for state management and DOM updates before touching Specs 012 (Filtering) and 013 (Search).
- [ ] Draft a plan for handling browser history and zero-result states for future client-side interactive features.
- [ ] Proceed with executing Spec 004 (Core Static Pages) and Spec 005 (Basic Homepage) sequentially.
