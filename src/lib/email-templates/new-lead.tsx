import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  whatsapp?: string
  company?: string
  createdAt?: string
}

const NewLeadEmail = ({ name, whatsapp, company, createdAt }: Props) => {
  const when = createdAt
    ? new Date(createdAt).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
    : new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
  return (
    <Html lang="pt-BR" dir="ltr">
      <Head />
      <Preview>Novo lead Conemag: {name ?? 'sem nome'} — {company ?? ''}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Novo contato no site Conemag</Heading>
          <Text style={lead}>
            Um novo lead acaba de preencher o formulário de contato.
          </Text>
          <Section style={card}>
            <Text style={row}><strong>Nome:</strong> {name ?? '—'}</Text>
            <Text style={row}><strong>WhatsApp:</strong> {whatsapp ?? '—'}</Text>
            <Text style={row}><strong>Empresa:</strong> {company ?? '—'}</Text>
            <Hr style={hr} />
            <Text style={meta}>Recebido em {when}</Text>
          </Section>
          <Text style={footer}>
            Esta é uma notificação automática enviada pelo site da Conemag.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: NewLeadEmail,
  subject: (data: Record<string, any>) =>
    `Novo lead Conemag — ${data?.name ?? 'sem nome'}${data?.company ? ` (${data.company})` : ''}`,
  displayName: 'Novo lead — site Conemag',
  previewData: {
    name: 'João da Silva',
    whatsapp: '(11) 99999-0000',
    company: 'Reciclados ABC',
    createdAt: new Date().toISOString(),
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '32px 24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { color: '#0b1d2a', fontSize: '22px', margin: '0 0 12px' }
const lead = { color: '#384552', fontSize: '14px', margin: '0 0 20px' }
const card = {
  background: '#f5f7fa',
  border: '1px solid #e2e8ee',
  borderRadius: '12px',
  padding: '20px 22px',
}
const row = { color: '#0b1d2a', fontSize: '15px', margin: '6px 0' }
const hr = { borderColor: '#e2e8ee', margin: '16px 0' }
const meta = { color: '#6b7682', fontSize: '12px', margin: 0 }
const footer = { color: '#9aa3ad', fontSize: '11px', marginTop: '24px', textAlign: 'center' as const }