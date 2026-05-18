Here is the consolidated, actionable to-do list based on the team's evaluation:

**Content & Data Schemas**
- [ ] Define and document the exact file/folder structure for i18n Markdown files in the Obsidian vault (e.g., `filename.be.md` vs. subfolders).
- [ ] Update `rbelby/.templates/` to include mandatory SEO (meta title, description, OG image) and i18n frontmatter fields.
- [ ] Add strict Zod validation in `content.config.ts` for all SEO metadata.
- [ ] Add Zod validation/error handling to prevent missing YAML fields or broken Obsidian links from crashing the Astro build.

**Design & UI**
- [ ] Audit currently built pages against `design/ui.pen` for strict layout alignment.
- [ ] Enforce the Graphite/Yellow color scheme, typography scale, and spacing systematically in your Tailwind configuration.
- [ ] Verify the `griddyicons` setup is properly configured and applied.

**Architecture & Logic**
- [ ] Define explicit routing/UI fallback behaviors for missing translations (e.g., what happens when a BE article lacks an EN version).
- [ ] Establish a standardized Vanilla JS pattern for state management and DOM updates before touching Specs 012 (Filtering) and 013 (Search).
- [ ] Draft a plan for handling browser history and zero-result states for future client-side interactive features.
- [ ] Proceed with executing Spec 004 (Core Static Pages) and Spec 005 (Basic Homepage) sequentially.
