# Randonneurs Belarus (rbelby) Website Roadmap

Welcome to the project roadmap! This document provides a high-level, human-readable overview of how we plan to build out the website. The project is broken down into atomic features, organized into phases.

**Estimates & Milestones:** Based on an estimated availability of 5-10 hours per week (1-2 hours a day in free time), each atomic task is expected to take ~1 week. The phases outlined below should be mapped directly to **GitHub Milestones**, allowing for easy progress tracking. Target dates are rough estimates to keep the project moving forward steadily.

---

## 🏗️ Phase 1: Foundation & Core UI

**GitHub Milestone:** `v0.1 - Foundation`
**Estimated Completion:** End of April 2026 (~5 weeks)
**Goal:** Establish the basic architecture, global layout, and i18n support so all future components have a solid base.

- **[001] Architecture & Data Pipeline:** Set up Astro, Preline UI, `content.config.ts`, and parse the `rbelby/` vault. _(Spec: `docs/specs/001-architecture.md`)_
- **[002] Global Layout & Theming:** Build Header, Footer, and the Client-side Dark/Light theme switcher. _(Spec: `docs/specs/002-global-layout.md`)_
- **[003] i18n Routing Structure:** Configure Astro i18n (`ru`, `be`, `en`) and add the Language Switcher UI. _(Spec: `docs/specs/003-i18n-routing.md`)_
- **[004] Core Static Pages:** Build the "About" and "Rules" static pages and basic FAQ structure. _(Spec: `docs/specs/004-core-static-pages.md`)_
- **[005] Basic Homepage:** Build the Hero banner, quick project explanation, and CTA button. _(Spec: `docs/specs/005-basic-homepage.md`)_

---

## 📅 Phase 2: Events & Routes (MVP)

**GitHub Milestone:** `v0.2 - Events MVP`
**Estimated Completion:** End of May 2026 (~4 weeks)
**Goal:** Deliver the most critical content to users: the schedule and the maps.

- **[006] Basic Events Directory:** List all upcoming brevets from the markdown files. _(Spec: `docs/specs/006-events-directory.md`)_
- **[007] Event Detail Page:** Build the individual brevet page (date, distance, start point, description). _(Spec: `docs/specs/007-event-detail.md`)_
- **[008] Basic Routes Directory:** List all available routes. _(Spec: `docs/specs/008-routes-directory.md`)_
- **[009] Route Detail Page:** Display route data, map placeholder, and link from Event to Route. _(Spec: `docs/specs/009-route-detail.md`)_

---

## 🎨 Phase 3: Community & Content (MVP)

**GitHub Milestone:** `v0.3 - Community MVP`
**Estimated Completion:** Early June 2026 (~2 weeks)
**Goal:** Launch the supporting community pages.

- **[010] Clubs & Journal (MVP):** List cycling clubs, their stats, and build the article listing/detail pages. _(Spec: `docs/specs/010-clubs-journal.md`)_

---

## 🛠️ Phase 4: UX Enhancements & Rich Data

**GitHub Milestone:** `v0.4 - Rich UX`
**Estimated Completion:** Late June 2026 (~2 weeks)
**Goal:** Make the lists actually useful and detailed for riders through multiple views and rich metadata.

- **[011] UX Enhancements & Rich Data:** Implement 'Card' vs 'Table' views, Badges, Route Version History, and Event Reports. _(Spec: `docs/specs/011-ux-rich-data.md`)_

---

## 🔍 Phase 5: Discovery & Smart Filtering

**GitHub Milestone:** `v0.5 - Search & Discovery`
**Estimated Completion:** Mid-July 2026 (~3 weeks)
**Goal:** Help users find exactly what they are looking for quickly.

- **[012] Season & Client-Side Filtering:** Automatically filter by current season, and add distance/city sidebar filters. _(Spec: `docs/specs/012-filtering.md`)_
- **[013] Global Full-Text Search:** Integrate `Pagefind` for instant search across all content in the Header. _(Spec: `docs/specs/013-global-search.md`)_

---

## 👤 Phase 6: Personalization (Bookmarks)

**GitHub Milestone:** `v0.6 - Personalization`
**Estimated Completion:** Early August 2026 (~2 weeks)
**Goal:** Allow users to save their favorite events and routes locally.

- **[014] Personalization (Bookmarks):** Implement `localStorage` bookmarks, a unified dashboard, and JSON Backup/Restore. _(Spec: `docs/specs/014-bookmarks.md`)_

---

## 📈 Phase 7: Growth, Stats, & Social

**GitHub Milestone:** `v0.7 - Growth Engine`
**Estimated Completion:** Late August 2026 (~2 weeks)
**Goal:** Optimize for sharing, SEO, and community gamification.

- **[015] SEO, Growth & Stats:** Add JSON-LD, generate OpenGraph images automatically, build Shareable Cards, and create the Statistics page. _(Spec: `docs/specs/015-seo-stats.md`)_

---

## 📝 Phase 8: CMS & Contributor Workflows

**GitHub Milestone:** `v1.0 - Notion CMS Integration`
**Estimated Completion:** September 2026 (~3 weeks)
**Goal:** Lower the barrier for new writers.

- **[016] CMS Automation (Notion -> GitHub):** Integrate Notion API, automate PR creation, handle Cloudflare Previews, and link to Crowdin. _(Spec: `docs/specs/016-notion-cms.md`)_
