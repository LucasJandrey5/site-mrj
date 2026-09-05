# MRJ Tecnologia — landing page

Landing page e páginas de serviço da MRJ Tecnologia (assistência técnica em eletrônica industrial, Chapecó, SC).

- Spec: `docs/superpowers/specs/2026-09-04-mrj-landing-design.md`
- Plano: `docs/superpowers/plans/2026-09-04-mrj-landing.md`
- Referências de design: `docs/referencias-sites.md`

## Regras

1. Ler `node_modules/next/dist/docs/` antes de escrever código Next (ver `AGENTS.md`). Next 16: `params` é `Promise`, Turbopack é padrão, `npm run typecheck` roda `next typegen`.
2. Todo conteúdo vive em `src/data/*.ts`, tipado por `src/data/types.ts`. Copy em pt-BR, direta e técnica.
3. Sem logotipos de terceiros (marcas só em texto). Sem números de prova social inventados: `stats` com `placeholder: true` até o cliente confirmar. Sem prazos ou garantia em números no copy.
4. Todo link de WhatsApp passa por `buildWhatsAppUrl` em `src/lib/whatsapp.ts`.
5. Tudo respeita `prefers-reduced-motion`. O hero é o título recortado na macro de placa de `src/lib/pcb-macro.ts`; os componentes 3D em `src/components/three/` estão sem uso desde então (junto com `npm run hero:capture` e as dependências `three`, `@react-three/*`) — decidir se saem.
6. Antes de declarar algo pronto: `npm run lint && npm run typecheck && npm test && npm run build` (e `npm run e2e` para mudanças de UI).

## Comandos

- `npm run dev` — dev em http://localhost:3002 (3000 e 3001 são de outros projetos desta máquina)
- `npm run build` / `npm run start` — produção local na porta 3002
- `npm run lint` / `npm run typecheck` / `npm test` / `npm run test:watch`
- `npm run e2e` — Playwright (faz build + start sozinho)
- `npm run hero:capture` — gera `public/hero-fallback.webp` a partir da cena 3D (precisa do dev server no ar)
- `npm run media:optimize` — converte `media-src/photos` e `media-src/videos` para `public/`

## Skills

- `superpowers:brainstorming` antes de qualquer funcionalidade nova; `superpowers:writing-plans` depois da spec.
- `superpowers:test-driven-development` em toda implementação; `superpowers:systematic-debugging` em qualquer bug.
- `superpowers:verification-before-completion` antes de dizer que algo está pronto.
- `frontend-design` nas tasks de UI.

@AGENTS.md
