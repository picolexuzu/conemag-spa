# Architecture rules
- Keep event pages under `/landingpage` separate from the institutional website so the production construction mode does not hide the event journey.
- Collect event leads through a validated public edge function; allow reads only to authenticated administrators through protected user_roles and RLS, keeping visitor contact information private.
- Use an event-specific catalog sourced from the supplied event brochure; do not expose institutional technical specifications in event detail pages.
- Scope the event's visual tokens and editorial machine showcase styles to `.event-page` so institutional pages remain unchanged.
- Open the equipment diagnostic at `/landingpage/:slug` and its `/diagnostico` alias, then send successful submissions to `/landingpage/equipamentos/:slug` to preserve machine attribution and legacy presentation URLs.
- Keep `/admin` outside construction mode and use Cloud email/password authentication with public registration disabled; never embed credentials or derive privileges from client storage.