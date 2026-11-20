# Feature Spec: 0027 - Journal (Community Publication on EmDash + Brevly API)

## 1. Context & Specification (The "What")

- **Goal:** Empower the Belarusian cycling community (randonneurs, organizers, route creators) to publish ride reports, route guides, interviews, and gear tests directly on `rbel.by`, fostering a local community hub without friction from external tools (Notion, Google Docs, Telegram notes) or developer-facing Git workflows.
- **User Flows:**
  - **Reader:** Opens `/journal` → browses featured stories and community voices → reads an article with rich photo galleries → sees an interactive Brevly Event/Route badge → taps through to event registration or homologated results on `brevly.app`.
  - **Contributor (Cyclist/Author):** Logs into `rbel.by/admin` (EmDash CMS) → drafts a ride report with photos uploaded directly to Cloudflare R2 → selects related Brevly Event (`event_id`) → hits "Submit for Review".
  - **Editor (Ivan / Curators):** Reviews draft in EmDash admin → polishes formatting and Belarusian typography (optionally assisted by AI agent via EmDash MCP) → sets publication status to `published`.
- **Design:** `~/dev/alr/business/brevly/design/brevly.pen`, frame `01b · Public Pages · rbel.by` (`iexz1`) — `Journal` (`dQ6xn`), `Article` (`qKIKx`); blocks:
  - `Journal / Featured`
  - `Journal / Voices`
  - `Journal / Article Card`
  - `Article / Cover & Header`
  - `Article / Body`
  - `Article / On This Page`
  - `Article / Linked Brevly Event Widget`
  - `Article / Author Card`
- **Affected Areas:**
  - `docs/specs/0027-journal.md`
  - `src/pages/journal/index.astro` (+ localized `/be/journal`, `/en/journal`)
  - `src/pages/journal/[slug].astro`
  - `src/components/journal/`
  - EmDash integration files: `emdash.config.ts`, Cloudflare D1 migrations, Cloudflare R2 bindings.

---

## 2. Technical Plan (The "How")

### 2.1 Architecture: Hybrid Data Layer

Two systems feed the Astro frontend on Cloudflare Workers:

1. **Brevly Public API (`brevly.public.v1`):** Serves live event calendars, routes, startlists, and official ACP homologated results via ConnectRPC (`src/lib/brevly/`).
2. **EmDash CMS on Cloudflare (D1 + R2):** Serves editorial journal content.
   - **Database (Cloudflare D1):** Stores articles, drafts, authors, tags, and relational metadata in SQLite tables.
   - **Media (Cloudflare R2):** Stores high-resolution photography with zero egress fees.
   - **Admin UI (`/admin`):** Web-based editorial interface built natively on Astro for authors.

### 2.2 Schema & Brevly Integration

Articles stored in D1 support custom fields linking to the Brevly ecosystem:

```typescript
interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Portable JSON / HTML
  coverImage: string; // R2 URL
  authorId: string;
  locale: 'be' | 'ru' | 'en';
  status: 'draft' | 'in_review' | 'published';
  publishedAt: Date | null;
  // Brevly Event / Route Links
  brevlyEventId?: number; // Links story to official Brevly Brevet
  brevlyRouteId?: number; // Links to official track
  tags: string[];
}
```

### 2.3 Rendering & Caching Strategy

- **Listings (`/journal`) & Articles (`/journal/[slug]`):** Server-rendered on Cloudflare Workers with edge caching (`Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`).
- **Linked Brevly Widget:** When `brevlyEventId` is present, Astro fetches live event facts (`GetEvent`) server-side. If the Brevly API is temporarily degraded, the article body still renders seamlessly with a graceful fallback badge (per Constitution Section I.5).
- **Cache Invalidation:** EmDash publish webhook triggers edge cache purge for `/journal` and the specific article slug.

### 2.4 Localization (i18n) Strategy

- Per Constitution Section I.2, UI layout chrome (nav, footer, dates, reading time) is strictly localized in English, Russian, and Belarusian via `src/i18n/locales`.
- **User-Generated Stories:** Community ride reports are kept in their native authored language (e.g. Belarusian or Russian) without forced machine translation. UI strings and Learn pages are translated in-repo files; community posts are not translated.

---

## 3. Execution Tasks (The "Checklist")

### Phase 1: Spike & CMS Foundation

- [ ] Verify EmDash CMS compatibility with Cloudflare Workers + D1 + R2 in `rbelby`.
- [ ] Evaluate EmDash auth & role capabilities (Contributor vs Editor RBAC).
- [ ] Set up D1 schema for `articles`, `authors`, and `brevly_links`.
- [ ] Configure R2 bucket for photo uploads with image compression / size limits.

### Phase 2: Frontend Pages & Blocks (`src/pages/journal`)

- [ ] Build `/journal` index page using the design in `brevly.pen` (`dQ6xn`).
  - [ ] `Journal / Featured` hero block.
  - [ ] `Journal / Voices` community columnists carousel/grid.
  - [ ] `Journal / Article Card` with tags and reading time.
- [ ] Build `/journal/[slug]` detail page (`qKIKx`).
  - [ ] Article typography layout (Tailwind Typography).
  - [ ] `Linked Brevly Event` widget (showing live brevet facts: distance, date, route preview).
  - [ ] `Author Card` with rider profile and bio.
- [ ] Add JSON-LD (`Article`, `BlogPosting`) and OpenGraph tags for social sharing.

### Phase 3: Editorial & AI Workflows

- [ ] Implement editorial review workflow: Contributor submits draft → Editor publishes.
- [ ] Configure EmDash MCP server for AI-assisted Belarusian proofreading and tagging.
- [ ] Verify `npm run check` and `npm run build` pass cleanly.

---

## 4. Topics for the Grilling Session (`/grill-me`)

Before writing production code, these architectural decisions must be grilled:

1. **EmDash Role-Based Access Control (RBAC):**
   - _Question:_ Does EmDash currently restrict guest contributors so they can only create/edit their own drafts and cannot delete others' work or alter site configuration?
   - _Alternative:_ If EmDash auth is currently single-admin, do we implement custom Cloudflare Access / auth middleware, or wait until RBAC is upstreamed?

2. **Image Optimization Pipeline:**
   - _Question:_ How do we handle 8 MB phone camera uploads from riders?
   - _Options:_ Client-side canvas resize before R2 upload vs Cloudflare Images transform on read vs Sharp background worker.

3. **Data Portability / Fallback:**
   - _Question:_ If we ever need to migrate away from EmDash, how easy is it to export D1 articles back to standard Markdown files?
   - _Requirement:_ Ensure an automated export script (`d1-to-markdown.ts`) is trivial to maintain.

4. **Integration Boundary with Brevly:**
   - _Question:_ Should rider profiles in Journal match Brevly user IDs directly (linking the article author to their official Brevet results)?
