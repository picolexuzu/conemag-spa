## Objetivo

Corrigir o plano de expansão `conemag_plano_expansao_latam.md` que tratou erroneamente a Conemag como fornecedora de prensas para indústria automotiva/estampagem. A Conemag fabrica equipamentos para **reciclagem de sucata metálica** (tesouras GTX/THX/TPX, briquetadeiras BMX, trituradores TRX, prensas-enfardadeiras), e os clientes são pátios de sucata, recicladoras, siderúrgicas a arco elétrico, desmanches automotivos e demolidoras.

## Escopo da revisão

Manter intacto o restante do documento (logística, tributação, pós-venda, marketing, equipe, riscos, KPIs, 30/60/90 dias) e substituir apenas:

1. **Capítulo 2 — Análise de Mercado por País** (reescrito do zero com foco em sucata)
2. **Novo Capítulo 2.A — Mercado de Sucata Metálica por País** (inserido logo após o 2)
3. **Repriorização** dos países de entrada com base em volume de geração e exportação de sucata ferrosa/não-ferrosa, presença de siderúrgicas EAF (arco elétrico, grandes consumidoras de sucata preparada) e maturidade do setor de reciclagem
4. **Ajustes pontuais** em outras seções onde "automotivo/linha branca/estampagem" apareça como alvo comercial — trocar pelos alvos corretos do setor de sucata

## Novo Capítulo 2 — Análise de Mercado por País (estrutura)

Tabela repriorizada por **volume de sucata ferrosa gerada/processada** e demanda de equipamentos de preparação. Ordem provável (a confirmar pelo Gemini com dados):

```text
1. México      — grande gerador, forte exportador para EUA, muitas EAF
2. Argentina   — alta geração, siderurgia EAF (Acindar/Ternium), mercado reprimido
3. Chile       — cobre + sucata não-ferrosa, alto preço médio, regulação madura
4. Peru        — siderurgia EAF crescente (Aceros Arequipa, Sider Perú), mineração
5. Colômbia    — Gerdau Diaco, Ternium, formalização do setor de reciclagem
6. Equador     — Adelca, Andec, mercado menor mas concentrado e acessível
```

Cada país terá: tamanho do mercado de sucata, principais consumidores (siderúrgicas EAF e fundições), barreiras, risco cambial, justificativa de prioridade.

**Concorrentes corretos a citar:** Sierra International Machinery (EUA), Danieli Henschel/Lindemann (Metso), Copex, Akros Henschel, Idromec, Tabarelli, Bonfiglioli Sistemi, fabricantes chineses do segmento recycling (Metso/Harris equivalents). Remover Trumpf, Bystronic, Schuler, Cincinnati (esses são estampagem de chapa).

## Novo Capítulo 2.A — Mercado de Sucata Metálica por País

Para cada um dos 6 países, uma subseção com:

- **Volume de sucata ferrosa gerada** (ton/ano, fonte BIR/worldsteel quando possível)
- **Volume exportado vs consumido internamente** (Brasil, México e Argentina exportam menos; Chile/Peru exportam mais não-ferrosos)
- **Sucata não-ferrosa** (cobre, alumínio, inox) — relevante para Chile/Peru
- **Principais players / pátios e siderúrgicas** (Gerdau, Ternium, ArcelorMittal, Aceros Arequipa, Adelca, Acindar, Simec, DeAcero, etc.)
- **Preço médio da sucata** (USD/ton para HMS 1&2, shredded, busheling — referência atual)
- **Nível de formalização** do setor (cooperativas vs grandes pátios)
- **Drivers regulatórios locais** (restrição/imposto à exportação de sucata, exigências ambientais)

## Como será gerado

Reusar o script `/tmp/lovable_ai.py` (skill ai-gateway) com Gemini 2.5 Pro, prompt novo bem específico instruindo:

- Foco exclusivo em sucata metálica e reciclagem
- Lista correta de equipamentos Conemag (tesouras, briquetadeiras, trituradores, prensas-enfardadeiras)
- Lista correta de clientes-alvo (pátios, siderúrgicas EAF, desmanches, demolidoras)
- Lista correta de concorrentes (Sierra, Danieli Henschel, Copex, etc.)
- Repriorizar países por volume de sucata ferrosa
- Incluir o novo Capítulo 2.A com dados quantitativos
- Devolver **somente** os capítulos 2 e 2.A em Markdown, prontos para colar

Saída final: `/mnt/documents/conemag_plano_expansao_latam_v2.md` — cópia do v1 com os capítulos 2 e 2.A substituídos e pequenas correções terminológicas no resto do texto. O v1 é preservado para comparação.

## Detalhes técnicos

- Script: `/tmp/regen_market_analysis.py` (Python, usa `lovable_ai.py`)
- Modelo: `google/gemini-2.5-pro` (mesma escolha do v1)
- Pós-processamento: ler `conemag_plano_expansao_latam.md`, localizar âncoras `## 2.` e `## 3.`, substituir o bloco entre elas pelo novo conteúdo, salvar como `_v2.md`
- Sem mudanças no código do site (`src/`) — é tarefa de geração de artefato apenas
