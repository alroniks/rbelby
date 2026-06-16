# Spec [018]: Org Events Admin (Payload CMS)

**Feature ID**: `018-org-events-cms`

## Overview

Deploy a self-service admin backend for club organizers to manage their own events without touching code or GitHub. Non-technical club representatives get a form-based UI to create, edit, and publish events. Access is isolated per club — an organizer from club BY520001 cannot see or modify events belonging to BY520002.

The backend runs on Cloudflare Workers with D1 as the database. Astro consumes it via a content loader that fetches from the Payload REST API at build time, replacing the current markdown-based event files for org-managed content. On publish, a Payload hook triggers a Cloudflare Pages rebuild so the live site reflects changes within ~30 seconds.

## Architecture

```
Org Admin → cms.rbelby.by (Payload admin UI)
               ↓ saves event
           Payload (Cloudflare Workers + D1)
               ↓ afterChange hook
           Cloudflare Pages deploy webhook
               ↓ triggers astro build
           Astro fetches /api/events from Payload
               ↓ getCollection('events') unchanged
           Static site rebuilt and deployed
```

## Personas

- **Club organizer** — non-technical, belongs to one club, manages only their events (create, edit, publish, unpublish). No access to other clubs' data.
- **Site admin** — full access to all collections, manages user accounts for organizers, can publish/reject any event.

## Collections

### Events
Fields matching the existing markdown schema:
- `name` (text, required)
- `date` (datetime, required)
- `distance` (number, required — 200 / 300 / 400 / 600 / 1000)
- `type` (select — BRM / POPULAIRE / FEST)
- `startLocation` (text)
- `club` (relationship → Clubs collection, auto-set to user's club on create)
- `routeId` (text — reference to existing route slug)
- `status` (draft / published — Payload draft/publish workflow)

### Clubs (read-only reference)
Mirror of the existing `clubs.json` data. Seeded on deploy, not editable via org accounts. Used to scope organizer access and populate the `club` field.

### Organizers (Payload users)
- `email`, `password` (Payload built-in auth)
- `clubId` (relationship → Clubs — determines which club's events this user can manage)
- `role` (organizer / admin)

## Access Control

- **read events**: public (no auth required — used by Astro build)
- **create event**: authenticated organizer; `club` field auto-set to `req.user.clubId` and locked
- **update event**: organizer only if `event.club.id === req.user.clubId`; admin always
- **delete event**: admin only
- **read other organizers**: admin only

## Implementation Tasks

- [ ] **Initialize Payload project**: Set up Payload CMS with the `@payloadcms/db-sqlite` adapter targeting Cloudflare D1 and configure `wrangler.toml` for Workers deployment.
- [ ] **Define collections**: Implement the Events, Clubs, and Organizers collections with the schema described above.
- [ ] **Implement access control**: Add per-club row-level access rules to the Events collection so organizers are scoped to their own club's records.
- [ ] **Seed Clubs data**: Write a seed script that imports `rbelby/data/clubs.json` into the Clubs collection on first deploy.
- [ ] **Deploy to Cloudflare Workers**: Deploy the Payload admin UI and REST API at `cms.rbelby.by`, configure D1 binding, and set up the production environment variables.
- [ ] **Write Astro content loader**: Replace the events `glob` loader in `content.config.ts` with an API fetcher that calls `https://cms.rbelby.by/api/events?status=published&limit=500` and maps the response to the existing schema shape.
- [ ] **Configure rebuild webhook**: Add a Payload `afterChange` hook on Events that POSTs to the Cloudflare Pages deploy hook URL when an event transitions to `published` or `unpublished`.
- [ ] **Create organizer accounts**: Create initial user accounts (email + temporary password) for each active club representative and share credentials securely.
- [ ] **Migrate existing events**: Write a one-time script to import current event markdown files from `rbelby/events/` into Payload as published records, then remove the markdown files to avoid duplicate sourcing.

## Out of Scope

- Routes and journal articles — those remain git-backed markdown files managed by site admins.
- Public event registration / sign-up forms — separate feature (potential future spec).
- Email notifications on publish — can be added later via Payload's email plugin.
