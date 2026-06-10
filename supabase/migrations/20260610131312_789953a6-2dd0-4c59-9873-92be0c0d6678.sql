CREATE OR REPLACE FUNCTION public.notify_lead_email()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_message_id text := gen_random_uuid()::text;
  v_subject text;
  v_html text;
  v_text text;
  v_when text;
  v_unsub_token text;
  v_recipient text := 'vrm.marc@gmail.com';
  v_sender_domain text := 'notify.conemagtestes.permutada.com.br';
BEGIN
  v_when := to_char(timezone('America/Sao_Paulo', NEW.created_at), 'DD/MM/YYYY HH24:MI');
  v_subject := 'Novo lead Conemag — ' || NEW.name || ' (' || NEW.company || ')';

  SELECT token INTO v_unsub_token
    FROM public.email_unsubscribe_tokens
    WHERE email = v_recipient AND used_at IS NULL
    LIMIT 1;
  IF v_unsub_token IS NULL THEN
    v_unsub_token := replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', '');
    INSERT INTO public.email_unsubscribe_tokens (token, email)
    VALUES (v_unsub_token, v_recipient)
    ON CONFLICT DO NOTHING;
  END IF;

  v_html := '<!DOCTYPE html><html lang="pt-BR"><body style="background:#fff;font-family:Arial,Helvetica,sans-serif;margin:0;padding:0;">' ||
    '<div style="max-width:560px;margin:0 auto;padding:32px 24px;">' ||
    '<h1 style="color:#0b1d2a;font-size:22px;margin:0 0 12px;">Novo contato no site Conemag</h1>' ||
    '<p style="color:#384552;font-size:14px;margin:0 0 20px;">Um novo lead acaba de preencher o formulário de contato.</p>' ||
    '<div style="background:#f5f7fa;border:1px solid #e2e8ee;border-radius:12px;padding:20px 22px;">' ||
    '<p style="color:#0b1d2a;font-size:15px;margin:6px 0;"><strong>Nome:</strong> ' || coalesce(NEW.name,'—') || '</p>' ||
    '<p style="color:#0b1d2a;font-size:15px;margin:6px 0;"><strong>WhatsApp:</strong> ' || coalesce(NEW.whatsapp,'—') || '</p>' ||
    '<p style="color:#0b1d2a;font-size:15px;margin:6px 0;"><strong>Empresa:</strong> ' || coalesce(NEW.company,'—') || '</p>' ||
    '<hr style="border:none;border-top:1px solid #e2e8ee;margin:16px 0;"/>' ||
    '<p style="color:#6b7682;font-size:12px;margin:0;">Recebido em ' || v_when || '</p>' ||
    '</div></div></body></html>';

  v_text := E'Novo lead Conemag\nNome: ' || NEW.name ||
            E'\nWhatsApp: ' || NEW.whatsapp ||
            E'\nEmpresa: ' || NEW.company ||
            E'\nRecebido em: ' || v_when;

  INSERT INTO public.email_send_log(message_id, template_name, recipient_email, status)
  VALUES (v_message_id, 'new-lead', v_recipient, 'pending');

  PERFORM public.enqueue_email('transactional_emails', jsonb_build_object(
    'message_id', v_message_id,
    'to', v_recipient,
    'from', 'Conemag <noreply@' || v_sender_domain || '>',
    'sender_domain', v_sender_domain,
    'subject', v_subject,
    'html', v_html,
    'text', v_text,
    'purpose', 'transactional',
    'label', 'new-lead',
    'idempotency_key', 'lead-' || NEW.id::text,
    'unsubscribe_token', v_unsub_token,
    'queued_at', to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')
  ));

  RETURN NEW;
END;
$function$;