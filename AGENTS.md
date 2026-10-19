# Architecture rules
- Keep event pages under `/landingpage` separate from the institutional website so the production construction mode does not hide the event journey.
- Collect event leads through a validated public edge function; allow reads only to authenticated administrators through protected user_roles and RLS, keeping visitor contact information private.
- Use an event-specific catalog sourced from the supplied event brochure; do not expose institutional technical specifications in event detail pages.
- Use dedicated transparent WebP machine images with mobile variants for the event showcase, keeping institutional assets unchanged and avoiding brochure crops as machine cutouts.
- Scope the event's visual tokens and editorial machine showcase styles to `.event-page` so institutional pages remain unchanged.
- Open machine presentations at `/landingpage/:slug`, retain legacy `/landingpage/equipamentos/:slug` URLs, and open attributed diagnostics at `/landingpage/:slug/diagnostico`; successful submissions open `/landingpage/obrigado` with a cleanup-safe delayed return to the catalog, keeping the event journey and machine attribution consistent.
- Keep `/admin` outside construction mode and use Cloud email/password authentication with public registration disabled; never embed credentials or derive privileges from client storage.