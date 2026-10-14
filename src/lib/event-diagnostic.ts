import { z } from "zod";

export const diagnosticQuestions = [
  { key: "challenge", title: "Qual é o maior desafio da sua empresa?", options: ["Minha produção não acompanha a demanda", "Meu pátio está cheio, com muita sucata volumosa", "Quero valorizar melhor o material que vendo", "Gasto muito com movimentação e transporte", "Quero investir em um novo equipamento"] },
  { key: "material", title: "Qual é seu principal material?", options: ["Sucatas ferrosas / mistas", "Alumínio / perfis", "Cavacos / limalhas", "Chapas e estruturas metálicas", "Outros materiais"] },
  { key: "monthly_volume", title: "Quantas toneladas você move por mês?", options: ["Até 100 toneladas", "100 a 500 toneladas", "500 a 1.000 toneladas", "Acima de 1.000 toneladas", "Ainda não sei informar"] },
  { key: "current_process", title: "Como é seu processo atualmente?", options: ["Principalmente manual", "Já utilizo prensas ou tesouras", "Terceirizo o beneficiamento", "Estou começando uma operação"] },
  { key: "sale_condition", title: "Como você comercializa esse material?", options: ["Sucatas soltas, sem beneficiamento", "Sucatas cortadas", "Sucatas compactadas / enfardadas", "Material separado e beneficiado"] },
  { key: "investment_timing", title: "Quando pretende investir?", options: ["Imediatamente", "Nos próximos 3 meses", "Nos próximos 6 meses", "Estou pesquisando"] },
] as const;

export const eventLeadSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(100),
  company: z.string().trim().min(2, "Informe sua empresa.").max(150),
  whatsapp: z.string().trim().max(30).refine(v => /^\d{10,13}$/.test(v.replace(/\D/g, "")), "Informe um WhatsApp válido com DDD."),
  city_state: z.string().trim().min(3, "Informe cidade e estado.").max(120),
  challenge: z.enum(diagnosticQuestions[0].options),
  material: z.enum(diagnosticQuestions[1].options),
  monthly_volume: z.enum(diagnosticQuestions[2].options),
  current_process: z.enum(diagnosticQuestions[3].options),
  sale_condition: z.enum(diagnosticQuestions[4].options),
  investment_timing: z.enum(diagnosticQuestions[5].options),
  consent: z.literal(true, { errorMap: () => ({ message: "Autorize o contato para enviar." }) }),
  equipment_interest: z.string().max(60).optional(),
  submission_id: z.string().uuid(),
});