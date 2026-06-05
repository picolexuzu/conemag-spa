import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, tool, stepCountIs, type UIMessage } from "ai";
import { z } from "zod";
import {
  createLovableAiGatewayProvider,
  generateImageViaGateway,
} from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `Você é uma assistente de IA poderosa e completa, em português brasileiro por padrão (mas responda no idioma do usuário).
Você pode:
- Conversar e raciocinar sobre qualquer assunto
- Analisar imagens que o usuário envia (descreva, extraia texto, interprete gráficos, identifique objetos, etc.)
- Escrever código e textos longos
- Gerar imagens chamando a tool generate_image (use sempre que o usuário pedir uma imagem, ilustração, foto, logo, etc.)
- Gerar documentos chamando a tool generate_document (use quando o usuário pedir relatório, contrato, artigo, plano, proposta, etc.). O documento fica disponível para download em PDF e Markdown.
Sempre formate respostas em Markdown rico. Seja proativa e detalhada.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: UIMessage[] };
        if (!Array.isArray(body.messages)) {
          return new Response("messages required", { status: 400 });
        }
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const model = gateway("google/gemini-2.5-pro");

        const result = streamText({
          model,
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(body.messages),
          stopWhen: stepCountIs(50),
          tools: {
            generate_image: tool({
              description:
                "Gera uma imagem a partir de um prompt descritivo. Use quando o usuário pedir imagem, foto, ilustração, logo, arte, etc.",
              inputSchema: z.object({
                prompt: z
                  .string()
                  .describe("Descrição detalhada da imagem em inglês, com estilo, composição, cores."),
              }),
              execute: async ({ prompt }) => {
                try {
                  const url = await generateImageViaGateway(prompt);
                  return { success: true, imageUrl: url, prompt };
                } catch (e) {
                  return { success: false, error: (e as Error).message };
                }
              },
            }),
            generate_document: tool({
              description:
                "Gera um documento em Markdown para download (relatório, contrato, artigo, etc). O conteúdo deve ser completo e bem estruturado.",
              inputSchema: z.object({
                filename: z
                  .string()
                  .describe("Nome do arquivo sem extensão, ex: 'relatorio-vendas'"),
                title: z.string().describe("Título do documento"),
                markdown: z
                  .string()
                  .describe("Conteúdo completo do documento em Markdown"),
              }),
              execute: async ({ filename, title, markdown }) => {
                return { success: true, filename, title, markdown };
              },
            }),
          },
        });

        return result.toUIMessageStreamResponse({ originalMessages: body.messages });
      },
    },
  },
});