CREATE TABLE public.event_leads (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL,
 company text NOT NULL,
 whatsapp text NOT NULL,
 city_state text NOT NULL,
 challenge text NOT NULL,
 material text NOT NULL,
 monthly_volume text NOT NULL,
 current_process text NOT NULL,
 sale_condition text NOT NULL,
 investment_timing text NOT NULL,
 equipment_interest text,
 source text NOT NULL DEFAULT 'eco-expo-2026',
 qualification text NOT NULL,
 consent boolean NOT NULL,
 consent_version text NOT NULL DEFAULT 'eco-expo-2026-v1',
 consent_at timestamptz NOT NULL DEFAULT now(),
 submission_id uuid NOT NULL UNIQUE
);
GRANT ALL ON public.event_leads TO service_role;
REVOKE ALL ON public.event_leads FROM anon, authenticated;
ALTER TABLE public.event_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role manages event leads" ON public.event_leads FOR ALL TO service_role USING (true) WITH CHECK (true);