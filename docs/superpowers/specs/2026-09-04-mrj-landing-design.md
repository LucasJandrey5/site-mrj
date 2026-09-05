# Landing page MRJ Tecnologia — Design

Data: 2026-09-04. Status: aprovado em conversa, aguardando revisão do arquivo.

## 1. Contexto e objetivo

A MRJ Tecnologia (Chapecó, SC) presta assistência técnica especializada em eletrônica industrial: controladores de grupo gerador, IHMs, inversores de frequência, soft starters, inversores solares, módulos de empilhadeiras e paleteiras elétricas, atuadores Woodward, centrais ECU, carregadores de bateria e módulos de geradores de biogás. Hoje a presença digital é o Instagram (@MRJTecnologia).

O site tem três objetivos, nesta ordem:

1. Converter visitantes em contato por WhatsApp (setor técnico e comercial).
2. Mostrar os serviços e as marcas atendidas de forma que um gestor de manutenção entenda em 30 segundos o que a MRJ resolve.
3. Divulgar a empresa com um visual moderno, acima do padrão do nicho (que é quase todo WordPress/Elementor).

Referências levantadas em `docs/referencias-sites.md`. Direção visual escolhida: híbrido (hero escuro com 3D, restante claro). Modelos principais: Gecko Robotics e Standard Bots (estrutura e ritmo), Aevion e iyO One (3D por scroll), Maxtronick e Ozora (estrutura de conversão do nicho).

## 2. Público e conversão

- Público: gestores e técnicos de manutenção de indústrias, frigoríficos, agroindústria, hospitais, data centers e locadoras de geradores e empilhadeiras. Sul do Brasil como foco, atendimento nacional por transportadora.
- Conversão única: clique em WhatsApp (ou telefone). Não há formulário nem backend.
- Contatos (do Instagram): WhatsApp setor técnico (49) 99905-2518, WhatsApp comercial (49) 99957-7176, e-mail contato.mrjtecnologia@gmail.com, Chapecó SC.
- Todo botão de WhatsApp abre `https://wa.me/55DDDNUMERO?text=...` com mensagem pré-preenchida que cita a página de origem (ex.: "Olá, vim pelo site e preciso de reparo em inversor de frequência").

## 3. Escopo

Dentro:

- Landing única em `/` com as seções da seção 6.
- Seis páginas de serviço em `/servicos/[slug]` (seção 7).
- Hero com controlador 3D procedural ligado ao scroll (seção 8).
- Vídeos de bancada nas seções de processo e laboratório.
- SEO técnico: metadata, Open Graph, sitemap, robots, JSON-LD.
- Testes unitários e de fumaça (seção 13).
- Deploy na Vercel.

Fora (podem virar fases futuras):

- Blog, portfólio de casos, área do cliente, rastreio de ordem de serviço.
- Formulário de orçamento com envio por e-mail.
- Múltiplos idiomas.
- CMS. O conteúdo vive em arquivos TypeScript no repositório.
- Analytics. Fica preparado um único ponto de inserção no layout para GA4 ou Plausible.

## 4. Direção visual

- Hero: fundo azul-marinho profundo com gradiente sutil e grade técnica leve; texto branco; CTA primário verde WhatsApp (#25D366) e CTA secundário contornado.
- Restante da página: fundo off-white, cartões brancos com borda fina, azul da marca em títulos, ícones e destaques. O azul exato é extraído do SVG do logo na implementação; até lá usa-se #1E5AA8 como aproximação. Azul-marinho do hero: #06162E.
- Tipografia via `next/font` (self-hosted): uma sans geométrica para títulos (Manrope ou Sora), Inter para corpo, JetBrains Mono para rótulos técnicos em caixa alta (ex.: "01 / DIAGNÓSTICO", "MARCAS ATENDIDAS").
- Fotografia real de bancada e placas, com tratamento leve (contraste, sem filtros coloridos). Fotos macro de placas são o diferencial visual do nicho.
- Movimento: reveals suaves ao rolar, contadores, marquee de marcas, 3D no hero. Nada pisca, nada roda em loop sem propósito. Tudo respeita `prefers-reduced-motion`.

## 5. Arquitetura e stack

- Next.js 16 (App Router, TypeScript, React 19), alinhado ao projeto irmão `fulmen`.
- Tailwind CSS v4 com tokens de cor e tipografia em `@theme`.
- GSAP 3 com ScrollTrigger para animações ligadas ao scroll; Lenis para scroll suave, sincronizado ao ticker do GSAP.
- React Three Fiber + drei + three para o hero 3D. Sem HDRI externo: iluminação por luzes e `Lightformer` do drei para não depender de rede.
- `next/image` para fotos, `<video>` nativo para vídeos (muted, loop, playsInline, poster, `preload="none"` fora do hero).
- Vitest para unitários, Playwright para fumaça. ESLint com a config do Next.
- Gerenciador de pacotes: npm (mesmo do `fulmen`).
- Sem variáveis de ambiente obrigatórias. Sem banco, sem API routes.
- Dev server em `http://localhost:3002` (3000 e 3001 já são usadas por outros projetos nesta máquina).
- O Next 16 tem mudanças de API em relação ao que o modelo conhece: antes de escrever código, ler os guias em `node_modules/next/dist/docs/` e o bloco `nextjs-agent-rules` que o `next dev` grava no `CLAUDE.md`.

Estrutura de pastas:

```
src/
  app/
    layout.tsx            # fontes, metadata base, Lenis provider, botão flutuante
    page.tsx              # landing
    sitemap.ts, robots.ts
    servicos/[slug]/page.tsx
  components/
    layout/   Nav, Footer, WhatsAppFloat
    sections/ Hero, Stats, Services, Brands, Process, Lab, Coverage, Faq, CtaFinal
    three/    HeroScene (Canvas), ControllerModel, useScrollProgress
    ui/       Button, Card, SectionHeading, Marquee, Accordion, Counter
    motion/   Reveal, useLenis, gsap.ts (registro de plugins)
  data/
    company.ts            # nome, contatos, endereço, redes, números dos contadores
    services.ts           # 6 serviços tipados
    brands.ts             # fabricantes atendidos
    faq.ts                # FAQ da landing
  lib/
    whatsapp.ts           # buildWhatsAppUrl(number, message)
    seo.ts                # JSON-LD helpers
public/
  logo.svg, favicon, og.jpg
  photos/, videos/        # material do cliente, otimizado
  hero-fallback.webp      # imagem estática do 3D
```

## 6. Landing: seções e comportamento

Ordem fixa. Cada seção é um componente em `components/sections` que recebe dados de `src/data`.

1. **Nav** fixa, transparente sobre o hero e sólida ao rolar. Logo, âncoras (Serviços, Marcas, Processo, Laboratório, Contato), botão "WhatsApp". Em mobile vira menu em tela cheia.
2. **Hero** (escuro, ocupa 100vh e fica fixo por mais 100vh de scroll para animar o 3D). Rótulo mono "Assistência técnica especializada"; H1 "Eletrônica industrial reparada por quem entende de geradores, inversores e empilhadeiras"; parágrafo com os segmentos; CTAs "Falar com o técnico" (WhatsApp técnico) e "Ver serviços" (âncora). À direita, o controlador 3D (seção 8). Abaixo, marquee com os fabricantes atendidos em texto.
3. **Stats**: três contadores animados ao entrar na tela: anos de experiência, equipamentos reparados, fabricantes atendidos. Os valores vêm de `company.ts` e ficam marcados como placeholder até o cliente confirmar.
4. **Serviços**: grid de 6 cartões (ícone, título, resumo de uma linha, três marcas, link "Ver detalhes" para a página do serviço). Reveal escalonado.
5. **Marcas**: fabricantes agrupados por segmento (geradores, inversores, IHMs, empilhadeiras, solar), em texto estilizado. Não usamos logotipos de terceiros para evitar problema de marca; se o cliente tiver autorização, trocam-se por SVGs.
6. **Processo de reparo**: cinco etapas em linha do tempo (recebimento e registro, diagnóstico e laudo, orçamento sem compromisso, reparo a nível de componente e teste, entrega com garantia). Ao lado, vídeo de bancada em loop. A linha do tempo se preenche com o scroll.
7. **Laboratório e diferenciais**: fotos do laboratório e placas; quatro diferenciais (reparo a nível de componente, teste funcional com carga, orçamento gratuito, garantia do serviço). Segundo vídeo curto.
8. **Área de atuação**: Chapecó e região com atendimento presencial; todo o Brasil por transportadora, com instrução curta de como enviar o equipamento. Ilustração de mapa em SVG estilizado, sem mapa interativo.
9. **FAQ**: acordeão com 6 a 8 perguntas (prazo, garantia, orçamento, envio, marcas, equipamentos sem conserto).
10. **CTA final**: bloco escuro com os dois WhatsApps (técnico e comercial), telefone e e-mail.
11. **Footer**: logo, endereço, Instagram, links das páginas de serviço, CNPJ quando fornecido.
12. **Botão flutuante** de WhatsApp em todas as páginas, aparece após rolar 300px.

## 7. Páginas de serviço

Rota `/servicos/[slug]`, gerada estaticamente a partir de `services.ts` com `generateStaticParams`. Slug desconhecido retorna 404.

Serviços e slugs:

| Slug | Título | Marcas iniciais |
|---|---|---|
| `controladores-de-grupo-gerador` | Controladores de grupo gerador | ComAp, Woodward easYgen, Deep Sea (DSE), SICES, Mecc Alte |
| `inversores-de-frequencia-e-soft-starters` | Inversores de frequência e soft starters | WEG, ABB, Siemens, Danfoss, Schneider, Yaskawa |
| `ihms-industriais` | IHMs industriais | Siemens, Weintek, Delta, WEG, Schneider, Allen-Bradley |
| `empilhadeiras-e-paleteiras` | Módulos eletrônicos de empilhadeiras e paleteiras | Curtis, Zapi, Sevcon, Inmotion |
| `inversores-solares` | Inversores solares | Fronius, Solis, PHB, Growatt, Deye, SMA |
| `atuadores-ecus-e-carregadores` | Atuadores, centrais ECU e carregadores | Woodward L-Series, carregadores de bateria, módulos de biogás |

Template da página: hero compacto claro (rótulo, H1, resumo, CTA WhatsApp com mensagem específica do serviço, foto), "Sintomas comuns" (lista), "O que fazemos" (lista), "Marcas atendidas", "Como funciona" (reaproveita o Processo), FAQ específica (3 a 5 itens), CTA final. Metadata e JSON-LD `Service` por página.

## 8. Hero 3D

- Cena em `HeroScene` (Canvas do R3F) carregada com `next/dynamic` e `ssr: false`, dentro de um `Suspense` com a imagem de fallback como placeholder.
- Modelo procedural em `ControllerModel`, três grupos: painel frontal (moldura, display emissivo com "texto" de leitura, teclado de botões), placa (PCB verde-escuro com capacitores, CIs, conectores) e carcaça traseira (caixa grafite com bornes). Proporções inspiradas em um controlador de gerador genérico; nenhum logotipo de fabricante.
- Scroll: o hero fica pinado por 100vh extra via ScrollTrigger (`scrub`). Progresso 0→1 controla rotação em Y (de -20° a 25°), leve inclinação em X, e afastamento dos três grupos em Z (explosão até 0,6 unidade por camada). Em repouso há flutuação suave por seno.
- Performance: `dpr` limitado a [1, 1.5], sem sombras, materiais `meshStandardMaterial`, sem texturas externas. Renderização pausada quando o hero sai da tela.
- Fallback para `public/hero-fallback.webp` quando: `prefers-reduced-motion`, WebGL indisponível ou por software (SwiftShader, llvmpipe e afins, lidos via `WEBGL_debug_renderer_info`), ou dispositivo móvel com `hardwareConcurrency <= 4`. A imagem é gerada uma vez a partir da própria cena durante o desenvolvimento.

## 9. Animações

- `gsap.ts` registra ScrollTrigger uma vez. `useLenis` cria o Lenis no layout e o conecta ao ticker do GSAP.
- `Reveal` envolve blocos e anima opacidade e translação de 24px ao entrar (uma vez).
- `Counter` anima números com `gsap.to` em `onEnter`.
- `Marquee` é CSS puro (`@keyframes`), pausa no hover.
- Com `prefers-reduced-motion`, todas as animações são desligadas: Reveal renderiza visível, Counter mostra o valor final, Lenis não é criado, 3D vira imagem.

## 10. Conteúdo e assets

- O cliente entrega: logo em SVG, fotos em alta, vídeos de reparo. Ficam em `public/photos` e `public/videos` após otimização: fotos em WebP até 1600px de largura, vídeos em MP4 (H.264) e WebM, até 3 MB e 12 segundos cada, com poster WebP.
- Enquanto o material não chega, usam-se placeholders neutros gerados em SVG e marcados com `TODO(material)` no código.
- Copy em pt-BR, escrita a partir do Instagram e deste documento, tom direto e técnico, sem superlativos vazios.
- Números dos contadores em `company.ts` com `placeholder: true` até confirmação.

## 11. SEO e metadata

- `metadata` no layout com título padrão "MRJ Tecnologia | Assistência técnica em eletrônica industrial em Chapecó", descrição, Open Graph com `og.jpg`, `metadataBase`.
- Cada página de serviço define título e descrição próprios.
- JSON-LD `LocalBusiness` na home (nome, telefone, endereço, área atendida) e `Service` nas páginas de serviço.
- `sitemap.ts` e `robots.ts` nativos do App Router.
- Cabeçalhos semânticos: um H1 por página, seções com H2.

## 12. Performance e acessibilidade

- Metas: Lighthouse mobile ≥ 90 em Performance, Acessibilidade, Boas práticas e SEO. LCP ≤ 2,5 s em 4G simulado.
- JS do three/R3F só entra no chunk do hero. Nenhum vídeo com autoplay fora da viewport inicial carrega antes do scroll.
- Contraste AA em todo texto, foco visível, navegação por teclado no menu e no acordeão, `aria-label` nos botões de ícone, `alt` descritivo nas fotos.

## 13. Testes

- Vitest (`src/**/*.test.ts`):
  - `services.ts`: exatamente 6 serviços, slugs únicos em kebab-case, cada um com título, resumo, ≥ 3 marcas, ≥ 3 sintomas, ≥ 3 FAQs.
  - `whatsapp.ts`: formata número com DDI 55 e sem símbolos, codifica a mensagem, rejeita número inválido.
  - `seo.ts`: JSON-LD gerado tem `@type` e campos obrigatórios.
- Playwright (`e2e/`), rodando contra `next build && next start`:
  - Home responde 200, tem um H1, o link do CTA principal aponta para `wa.me` com o número técnico.
  - Cada uma das 6 páginas de serviço responde 200 com H1 e CTA de WhatsApp.
  - `/servicos/nao-existe` responde 404.
  - Com `reducedMotion: 'reduce'`, o hero exibe a imagem de fallback.
- `npm run lint`, `npm run test`, `npm run e2e` e `npm run build` passam antes de cada entrega.

## 14. Deploy

- Repositório git local iniciado neste commit; remoto e Vercel são configurados pelo Lucas quando quiser publicar.
- Vercel com preset Next.js, sem variáveis de ambiente.

## 15. Riscos e decisões

- **3D pesado em celular fraco**: mitigado pelo fallback por capacidade e pelo limite de dpr.
- **Marcas de terceiros**: usamos nomes em texto, sem logotipos, até o cliente autorizar.
- **Números de prova social inventados**: proibidos; ficam como placeholder visível até confirmação.
- **Material do cliente atrasar**: o site fica completo com placeholders, e a troca é só de arquivos em `public/`.
