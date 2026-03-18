# External Integrations

**Analysis Date:** 2024-05-24

## APIs & External Services

**Localization:**
- Crowdin - Used for translation management (configured via `crowdin.yml` and syncs with `src/i18n/locales/`)

## Data Storage

**Databases:**
- Local filesystem only (Astro Content Collections reading local Markdown and JSON files from `./rbelby/`)

**File Storage:**
- Local filesystem only

**Caching:**
- None explicitly configured

## Authentication & Identity

**Auth Provider:**
- None detected for end-users (static site architecture)

## Monitoring & Observability

**Error Tracking:**
- None detected

**Logs:**
- Standard console logging

## CI/CD & Deployment

**Hosting:**
- Static host / GitHub Pages (implied by Astro SSG architecture)

**CI Pipeline:**
- GitHub Actions (`.github/workflows/`)
  - `sync-roadmap.yml`: Syncs roadmap and documentation issues via script.
  - `sync-labels.yml`: Syncs repository labels via `crazy-max/ghaction-github-labeler`.

## Environment Configuration

**Required env vars:**
- `GITHUB_TOKEN` - Used by CI pipelines for synchronization tasks.

**Secrets location:**
- GitHub Repository Secrets

## Webhooks & Callbacks

**Incoming:**
- None implemented currently. (Note: Spec `016-notion-cms.md` outlines future Notion webhooks).

**Outgoing:**
- None implemented currently.