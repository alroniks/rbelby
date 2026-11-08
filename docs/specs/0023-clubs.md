# Feature Spec: 0023 - Clubs

## 1. Context & Specification (The "What")

- **Goal:** Club directory and club pages from Brevly.
- **User Flow:** _Visitor:_ opens `/clubs` → picks a club → sees its upcoming and past events and contacts.
- **Design:** `~/dev/alr/business/brevly/design/brevly.pen`, frame `01b · Public Pages · rbel.by` (`iexz1`) — `Clubs` (`Pm4EK`), `Club` (`i9VnI`), `Edge: Club · no events yet` (`z2zebO`). Blocks: `Club / Card`, `Clubs / Why Join`, `Clubs / In Numbers`, `Club / Header`, `Club / Story`, `Club / Contact`, `Event / Row`.
- **Affected Areas:** `src/pages/clubs/` (+ locales), `src/components/club/`.

## 2. Technical Plan (The "How" for this specific feature)

- **Data:** `ListClubs` (`region_code=by`), `GetClub` (upcoming/past events).
- **Rendering:** `/clubs` static shell (header, Why Join) + island for cards and numbers; `/clubs/{id}` on demand.
- **Hidden until Brevly provides data:** club logo and description (API gap), Season Kilometres, Riding Together, Recent Finishes (club stats gap). Why Join copy comes from `site.json`.

## 3. Execution Tasks (The "Checklist")

- [ ] `/clubs` with Club Cards, Why Join, In Numbers (counts available from the API).
- [ ] `/clubs/[id]` with header, upcoming/past Event Rows, contact; `NOT_FOUND` → 404.
- [ ] No-events state: Empty State + Action Card + Contact.
- [ ] `SportsOrganization` JSON-LD and OG tags.
- [ ] `npm run check` and `npm run build` pass.

## 4. Drafts & Notes (Living Document)

- Blocked by: 0018, 0019.
