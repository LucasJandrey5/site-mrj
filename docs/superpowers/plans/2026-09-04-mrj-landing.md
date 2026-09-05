# Landing page MRJ Tecnologia — Plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir a landing page e as seis páginas de serviço da MRJ Tecnologia em Next.js 16, com hero 3D procedural ligado ao scroll, conversão por WhatsApp, SEO técnico e testes automatizados.

**Architecture:** App Router estático (sem backend, sem variáveis de ambiente). Todo o conteúdo vive em arquivos TypeScript tipados em `src/data`, consumidos por componentes de seção em `src/components/sections` e pelo template de serviço. Animações com GSAP ScrollTrigger + Lenis, 3D só no hero via React Three Fiber carregado no cliente, com imagem estática de fallback.

**Tech Stack:** Next.js 16.3.4, React 19.2.8, TypeScript ^5, Tailwind CSS 4.3, GSAP 3.15 + @gsap/react 2.1, Lenis 1.3, three 0.185 + @react-three/fiber 9.7 + @react-three/drei 10.7, lucide-react 1.41, Vitest 4, Playwright 1.63, sharp 0.35. npm, deploy na Vercel.

**Spec:** `docs/superpowers/specs/2026-09-04-mrj-landing-design.md` (ler antes de começar qualquer task).

## Global Constraints

- Next.js **16.3.4**, React **19.2.8**, TypeScript **^5** (não instalar TypeScript 7), Node **20.9+**. Turbopack é o padrão; `params` de página é `Promise`.
- Antes de escrever código Next, ler os guias em `node_modules/next/dist/docs/` e o bloco `nextjs-agent-rules` que o `next dev` grava em `AGENTS.md`/`CLAUDE.md`.
- Gerenciador de pacotes: **npm**. Dev e start na porta **3002** (`http://localhost:3002`).
- Tailwind CSS **4.3** com tokens em `@theme` no `src/app/globals.css`. Sem `tailwind.config`.
- Copy em **pt-BR**, tom direto e técnico, sem superlativos vazios.
- **Sem logotipos de terceiros**: marcas aparecem só em texto.
- **Nenhum número de prova social inventado**: `company.stats[*].placeholder = true` até confirmação, com marcador visível na tela.
- **Nenhum prazo ou garantia em números** no copy (ex.: "em 24h", "90 dias"): prazos e garantia são "informados no orçamento".
- Tudo respeita `prefers-reduced-motion`: Reveal renderiza visível, Counter mostra o valor final, Lenis não é criado, 3D vira imagem.
- Hero 3D: sem HDRI externo, sem texturas externas, `dpr` entre 1 e 1.5, sem sombras, canvas só no hero.
- Sem backend, sem formulário, sem variáveis de ambiente, sem CMS, sem analytics (só um comentário de ponto de inserção no layout).
- Contatos: WhatsApp técnico `5549999052518`, WhatsApp comercial `5549999577176`, e-mail `contato.mrjtecnologia@gmail.com`, Instagram `@MRJTecnologia`, Chapecó, SC. Domínio provisório `https://mrjtecnologia.com.br` (a confirmar com o cliente, marcado no código).
- Todo link de WhatsApp é gerado por `buildWhatsAppUrl` (`src/lib/whatsapp.ts`), nunca escrito à mão.
- Antes de cada commit: `npm run lint && npm run typecheck && npm test` passam. Antes de encerrar cada task de UI: `npm run build` passa.
- Commits pequenos, mensagem em pt-BR com prefixo (`feat:`, `test:`, `chore:`, `docs:`), sem `--no-verify`.
- Não commitar `image.png` nem material bruto do cliente (`media-src/` fica no `.gitignore`).

---

## Estrutura de arquivos

| Arquivo | Responsabilidade |
|---|---|
| `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs` | Scaffold Next 16 (create-next-app) com scripts ajustados |
| `vitest.config.mts` | Vitest em ambiente node, alias `@` → `src`, JSX automático |
| `playwright.config.ts`, `e2e/*.spec.ts` | Testes de fumaça contra `next build && next start` |
| `CLAUDE.md`, `README.md`, `AGENTS.md` | Regras do projeto, comandos, como entregar material |
| `src/data/types.ts` | Tipos de todo o conteúdo (`Service`, `Stat`, `MediaAsset`...) e `SERVICE_SLUGS` |
| `src/data/company.ts` | Nome, contatos, endereço, redes, stats (com `placeholder`) |
| `src/data/services.ts` | Os 6 serviços e `getService(slug)` |
| `src/data/brands.ts` | Fabricantes por segmento, `allBrands` |
| `src/data/faq.ts` | FAQ da landing |
| `src/data/process.ts` | Etapas do processo de reparo e do envio por transportadora |
| `src/data/media.ts` | Fotos e vídeos com flag `available` |
| `src/lib/whatsapp.ts` | `normalizePhone`, `buildWhatsAppUrl`, `WA_MESSAGES` |
| `src/lib/seo.ts` | JSON-LD `LocalBusiness` e `Service`, `serializeJsonLd` |
| `src/lib/motion-prefs.ts` | `shouldRender3D`, `readMotionEnv`, `resolveHeroMode` (puros, testáveis) |
| `src/app/globals.css` | Tokens `@theme`, base, utilities (`container-x`, `eyebrow`, `section-y`), keyframes do marquee |
| `src/app/layout.tsx` | Fontes, metadata base, `LenisProvider`, `Nav`, `Footer`, `WhatsAppFloat` |
| `src/app/page.tsx` | Landing: monta as seções em ordem + JSON-LD LocalBusiness |
| `src/app/not-found.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/icon.svg` | 404, sitemap, robots, favicon |
| `src/app/servicos/[slug]/page.tsx` | Página de serviço estática por slug, metadata e JSON-LD |
| `src/components/ui/*` | Primitivos sem estado: `Button`, `SectionHeading`, `Placeholder`, `Photo`, `VideoBlock`, `ServiceIcon`, `Logo`, `InstagramIcon`, `Accordion` |
| `src/components/motion/*` | `gsap.ts` (registro), `useReducedMotion`, `LenisProvider`, `Reveal`, `Counter`, `Marquee` |
| `src/components/layout/*` | `Nav`, `Footer`, `WhatsAppFloat` |
| `src/components/seo/JsonLd.tsx` | `<script type="application/ld+json">` |
| `src/components/sections/*` | `Hero`, `Stats`, `Services`, `Brands`, `Process`, `Lab`, `Coverage`, `Faq`, `CtaFinal` |
| `src/components/service/*` | `ServiceHero`, `ServiceDetails` (template das páginas de serviço) |
| `src/components/three/*` | `HeroVisual` (decide 3D ou imagem), `useHeroScrollProgress`, `HeroScene`, `ControllerModel` |
| `public/logo.svg`, `public/logo-white.svg`, `public/hero-fallback.svg`, `public/hero-fallback.webp`, `public/og.jpg` | Logo provisório, fallback do hero, imagem Open Graph |
| `public/photos/`, `public/videos/` | Material do cliente otimizado (vazio até chegar) |
| `scripts/capture-hero-fallback.mjs`, `scripts/make-og.mjs`, `scripts/optimize-media.mjs` | Gera fallback do 3D, imagem OG e otimiza fotos/vídeos |

---

### Task 1: Scaffold do projeto e ferramentas

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `AGENTS.md` (via create-next-app)
- Create: `vitest.config.mts`, `CLAUDE.md`, `README.md`
- Modify: `src/app/page.tsx`, `src/app/globals.css`, `src/app/layout.tsx` (substituir o boilerplate)
- Move: `image.png` → `docs/referencias/instagram-mrj.png`

**Interfaces:**
- Produces: scripts npm `dev`, `build`, `start`, `lint`, `typecheck`, `test`, `test:watch`, `e2e`, `hero:capture`, `media:optimize`; alias `@/*` → `src/*`.

- [ ] **Step 1: Guardar o screenshot do Instagram fora da raiz** (create-next-app recusa diretórios com arquivos desconhecidos; `docs/`, `.git` e `.gitignore` são permitidos)

```bash
mkdir -p docs/referencias && mv image.png docs/referencias/instagram-mrj.png
```

- [ ] **Step 2: Rodar o create-next-app na raiz do projeto**

```bash
npx create-next-app@16.3.4 . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --disable-git --yes
```

Esperado: cria `src/app/{layout.tsx,page.tsx,globals.css,favicon.ico}`, `package.json` com `next@16.3.4`, `react@19.2.8`, `tailwindcss@^4`, `typescript@^5`, `eslint-config-next@16.3.4`, além de `AGENTS.md`. Se reclamar de arquivos existentes, mover o arquivo citado para `docs/` e repetir.

- [ ] **Step 3: Instalar as dependências do projeto**

```bash
npm i gsap@^3.15.0 @gsap/react@^2.1.2 lenis@^1.3.26 three@^0.185.1 @react-three/fiber@^9.7.0 @react-three/drei@^10.7.8 lucide-react@^1.41.0
npm i -D @types/three@^0.185.4 vitest@^4.1.11 @playwright/test@^1.63.0 sharp@^0.35.4
```

Esperado: sem erros de peer dependency (fiber 9 exige react >=19 <19.3; drei 10 exige fiber ^9).

- [ ] **Step 4: Ajustar os scripts do package.json**

```bash
npm pkg set scripts.dev="next dev -p 3002" scripts.build="next build" scripts.start="next start -p 3002" scripts.lint="eslint" scripts.typecheck="next typegen && tsc --noEmit" scripts.test="vitest run" scripts.test:watch="vitest" scripts.e2e="playwright test" scripts.hero:capture="node scripts/capture-hero-fallback.mjs" scripts.media:optimize="node scripts/optimize-media.mjs"
```

- [ ] **Step 5: Escrever `next.config.ts`**

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
  images: { formats: ['image/avif', 'image/webp'] },
}

export default nextConfig
```

- [ ] **Step 6: Escrever `vitest.config.mts`**

```ts
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  // O Vitest não lê `paths` do tsconfig; o alias precisa ser declarado aqui.
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  esbuild: { jsx: 'automatic' },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    exclude: ['**/node_modules/**', 'e2e/**'],
    passWithNoTests: true,
  },
})
```

- [ ] **Step 7: Substituir o boilerplate por uma base mínima que compila**

`src/app/globals.css`:

```css
@import 'tailwindcss';
```

`src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MRJ Tecnologia',
  description: 'Assistência técnica especializada em eletrônica industrial em Chapecó, SC.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
```

`src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">MRJ Tecnologia</h1>
    </main>
  )
}
```

Remover os SVGs de exemplo e o favicon padrão:

```bash
rm -f public/next.svg public/vercel.svg public/file.svg public/globe.svg public/window.svg src/app/favicon.ico
```

- [ ] **Step 8: Completar o `.gitignore`** (o create-next-app pode ter reescrito o arquivo; garantir estas linhas)

```gitignore
node_modules/
.next/
out/
next-env.d.ts
coverage/
test-results/
playwright-report/
blob-report/
playwright/.cache/
.vercel
.env*
!.env.example
*.tsbuildinfo
*.log
.DS_Store
media-src/
lighthouse*.json
```

- [ ] **Step 9: Escrever `CLAUDE.md` do projeto**

```markdown
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
5. Tudo respeita `prefers-reduced-motion`. 3D só no hero, carregado no cliente, com fallback em imagem.
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
```

- [ ] **Step 10: Escrever `README.md`**

```markdown
# Site MRJ Tecnologia

Landing page da MRJ Tecnologia, assistência técnica especializada em eletrônica industrial (Chapecó, SC).

## Rodar

```bash
npm install
npm run dev        # http://localhost:3002
```

## Qualidade

```bash
npm run lint && npm run typecheck && npm test && npm run build
npm run e2e        # Playwright: build + start + testes de fumaça
```

## Material do cliente

Coloque os arquivos originais em `media-src/photos` (JPG/PNG) e `media-src/videos` (MP4) e rode `npm run media:optimize`. Depois marque `available: true` no item correspondente em `src/data/media.ts`. O logo em SVG vai em `public/logo.svg` (versão escura) e `public/logo-white.svg` (versão branca).
```

- [ ] **Step 11: Verificar que tudo passa**

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

Esperado: lint sem erros, `tsc` sem erros, Vitest "No test files found" com saída de sucesso (`passWithNoTests`), build com a rota `/` estática.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next 16 com Tailwind 4, Vitest, Playwright e dependências de animação e 3D"
```

---

### Task 2: Tipos e dados de conteúdo

**Files:**
- Create: `src/data/types.ts`, `src/data/company.ts`, `src/data/services.ts`, `src/data/brands.ts`, `src/data/faq.ts`, `src/data/process.ts`, `src/data/media.ts`
- Test: `src/data/services.test.ts`, `src/data/company.test.ts`, `src/data/brands.test.ts`

**Interfaces:**
- Produces: `SERVICE_SLUGS`, `ServiceSlug`, `ServiceIconName`, `FaqItem`, `Service`, `BrandGroup`, `ProcessStep`, `Stat`, `MediaAsset`, `VideoAsset`, `Company`; `company: Company`; `services: Service[]`, `getService(slug: string): Service | undefined`; `brandGroups: BrandGroup[]`, `allBrands: string[]`; `landingFaq: FaqItem[]`; `processSteps: ProcessStep[]`, `shippingSteps: ProcessStep[]`; `labPhotos: MediaAsset[]`, `serviceCovers: Record<ServiceSlug, MediaAsset>`, `processVideo: VideoAsset`, `labVideo: VideoAsset`.

- [ ] **Step 1: Escrever os testes (falham porque os módulos não existem)**

`src/data/services.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { getService, services } from './services'
import { SERVICE_SLUGS } from './types'

describe('services', () => {
  it('tem exatamente 6 serviços, um por slug conhecido', () => {
    expect(services).toHaveLength(6)
    expect([...services.map((s) => s.slug)].sort()).toEqual([...SERVICE_SLUGS].sort())
  })

  it('slugs são únicos e em kebab-case', () => {
    const slugs = services.map((s) => s.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it('cada serviço tem conteúdo mínimo', () => {
    for (const s of services) {
      expect(s.title.length).toBeGreaterThan(5)
      expect(s.shortTitle.length).toBeGreaterThan(3)
      expect(s.summary.length).toBeGreaterThan(20)
      expect(s.description.length).toBeGreaterThan(40)
      expect(s.brands.length).toBeGreaterThanOrEqual(3)
      expect(s.symptoms.length).toBeGreaterThanOrEqual(3)
      expect(s.actions.length).toBeGreaterThanOrEqual(3)
      expect(s.faq.length).toBeGreaterThanOrEqual(3)
      expect(s.whatsappMessage).toMatch(/^Olá/)
    }
  })

  it('não promete prazo nem garantia em números', () => {
    const texto = JSON.stringify(services)
    expect(texto).not.toMatch(/\d+\s*(h|horas|dias|meses|anos)\b/i)
  })

  it('getService devolve o serviço pelo slug e undefined para desconhecido', () => {
    expect(getService('ihms-industriais')?.title).toBe('IHMs industriais')
    expect(getService('nao-existe')).toBeUndefined()
  })
})
```

`src/data/company.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { company } from './company'

describe('company', () => {
  it('números de WhatsApp só têm dígitos, com DDI 55', () => {
    expect(company.whatsapp.tecnico).toMatch(/^55\d{10,11}$/)
    expect(company.whatsapp.comercial).toMatch(/^55\d{10,11}$/)
    expect(company.whatsapp.tecnico).not.toBe(company.whatsapp.comercial)
  })

  it('tem 3 stats e cada um declara se é placeholder', () => {
    expect(company.stats).toHaveLength(3)
    for (const s of company.stats) {
      expect(typeof s.placeholder).toBe('boolean')
      expect(s.value).toBeGreaterThan(0)
      expect(s.label.length).toBeGreaterThan(3)
    }
  })

  it('siteUrl é https sem barra final', () => {
    expect(company.siteUrl).toMatch(/^https:\/\/[^/]+$/)
  })
})
```

`src/data/brands.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { allBrands, brandGroups } from './brands'
import { services } from './services'

describe('brands', () => {
  it('tem ao menos 5 segmentos, cada um com 3+ marcas sem repetição interna', () => {
    expect(brandGroups.length).toBeGreaterThanOrEqual(5)
    for (const g of brandGroups) {
      expect(g.brands.length).toBeGreaterThanOrEqual(3)
      expect(new Set(g.brands).size).toBe(g.brands.length)
    }
  })

  it('allBrands é única e tem 10+ marcas para o marquee', () => {
    expect(new Set(allBrands).size).toBe(allBrands.length)
    expect(allBrands.length).toBeGreaterThanOrEqual(10)
  })

  it('toda marca citada em um serviço existe em algum segmento', () => {
    const known = new Set(allBrands.map((b) => b.toLowerCase()))
    for (const s of services) {
      for (const b of s.brands) {
        const base = b.replace(/\s*\(.*\)$/, '').toLowerCase()
        expect(known.has(base), `${b} (${s.slug}) não está em brands.ts`).toBe(true)
      }
    }
  })
})
```

- [ ] **Step 2: Rodar os testes e confirmar a falha**

```bash
npm test
```

Esperado: 3 arquivos falham com "Failed to resolve import './services'" (ou equivalente).

- [ ] **Step 3: Escrever `src/data/types.ts`**

```ts
export const SERVICE_SLUGS = [
  'controladores-de-grupo-gerador',
  'inversores-de-frequencia-e-soft-starters',
  'ihms-industriais',
  'empilhadeiras-e-paleteiras',
  'inversores-solares',
  'atuadores-ecus-e-carregadores',
] as const

export type ServiceSlug = (typeof SERVICE_SLUGS)[number]

export type ServiceIconName = 'generator' | 'inverter' | 'hmi' | 'forklift' | 'solar' | 'actuator'

export interface FaqItem {
  question: string
  answer: string
}

export interface Service {
  slug: ServiceSlug
  title: string
  /** Título curto para cards, menu e rodapé. */
  shortTitle: string
  /** Uma linha, usada em cards e na meta description. */
  summary: string
  /** Dois ou três períodos, usados no hero da página do serviço. */
  description: string
  icon: ServiceIconName
  brands: string[]
  symptoms: string[]
  actions: string[]
  faq: FaqItem[]
  /** Mensagem pré-preenchida do WhatsApp para esta página. */
  whatsappMessage: string
}

export interface BrandGroup {
  segment: string
  brands: string[]
}

export interface ProcessStep {
  title: string
  description: string
}

export interface Stat {
  label: string
  value: number
  suffix: string
  /** true enquanto o valor não for confirmado pela MRJ; mostra marcador na tela. */
  placeholder: boolean
}

export interface MediaAsset {
  src: string
  alt: string
  /** false enquanto o arquivo não existir em public/; renderiza Placeholder. */
  available: boolean
}

export interface VideoAsset {
  mp4: string
  webm: string
  poster: string
  alt: string
  available: boolean
}

export interface Company {
  name: string
  tagline: string
  description: string
  /** Sem barra final. */
  siteUrl: string
  email: string
  instagramHandle: string
  instagramUrl: string
  address: { city: string; state: string; country: string }
  whatsapp: { tecnico: string; comercial: string }
  phoneDisplay: { tecnico: string; comercial: string }
  stats: Stat[]
}
```

- [ ] **Step 4: Escrever `src/data/company.ts`**

```ts
import type { Company } from './types'

export const company: Company = {
  name: 'MRJ Tecnologia',
  tagline: 'Assistência técnica especializada em eletrônica industrial',
  description:
    'Reparo de controladores de grupo gerador, inversores de frequência, IHMs, módulos de empilhadeiras e inversores solares em Chapecó, SC, com atendimento para todo o Brasil.',
  // TODO(cliente): confirmar o domínio definitivo antes de publicar.
  siteUrl: 'https://mrjtecnologia.com.br',
  email: 'contato.mrjtecnologia@gmail.com',
  instagramHandle: 'MRJTecnologia',
  instagramUrl: 'https://www.instagram.com/mrjtecnologia',
  address: { city: 'Chapecó', state: 'SC', country: 'BR' },
  whatsapp: { tecnico: '5549999052518', comercial: '5549999577176' },
  phoneDisplay: { tecnico: '(49) 99905-2518', comercial: '(49) 99957-7176' },
  stats: [
    { label: 'anos de experiência em eletrônica industrial', value: 10, suffix: '+', placeholder: true },
    { label: 'equipamentos reparados', value: 1500, suffix: '+', placeholder: true },
    { label: 'fabricantes atendidos', value: 30, suffix: '+', placeholder: true },
  ],
}
```

- [ ] **Step 5: Escrever `src/data/services.ts`**

```ts
import type { Service } from './types'

export const services: Service[] = [
  {
    slug: 'controladores-de-grupo-gerador',
    title: 'Controladores de grupo gerador',
    shortTitle: 'Controladores de geradores',
    icon: 'generator',
    summary:
      'Reparo e manutenção de controladores ComAp, Woodward, Deep Sea, SICES e Mecc Alte, com teste em bancada simulando o gerador.',
    description:
      'Diagnóstico e reparo a nível de componente em controladores de grupo gerador: display e teclado de membrana, entradas e saídas queimadas, falhas de comunicação, fonte de alimentação e danos por surto, umidade ou incêndio. O controlador volta parametrizado e testado.',
    brands: ['ComAp', 'Woodward', 'Deep Sea Electronics', 'SICES', 'Mecc Alte', 'DEIF'],
    symptoms: [
      'Display apagado, com falhas ou teclado de membrana sem resposta',
      'Leitura errada de tensão, frequência, pressão de óleo ou temperatura',
      'Falha de comunicação RS485, CAN ou Ethernet com o supervisório',
      'Gerador não parte, não sincroniza ou não transfere a carga',
      'Danos por surto elétrico, umidade ou incêndio no painel',
    ],
    actions: [
      'Diagnóstico com simulação dos sinais de motor e gerador em bancada',
      'Troca de teclado de membrana, display e componentes de potência',
      'Reparo de fonte, entradas analógicas e saídas a relé',
      'Reconfiguração de parâmetros e atualização de firmware quando disponível',
      'Teste funcional completo antes da entrega, com laudo',
    ],
    faq: [
      {
        question: 'Vale a pena reparar em vez de trocar o controlador?',
        answer:
          'Na maioria dos casos, sim: o reparo costuma custar uma fração do controlador novo e evita reprogramar o painel do zero. O diagnóstico mostra se compensa.',
      },
      {
        question: 'Os parâmetros do meu gerador são preservados?',
        answer:
          'Sempre que a memória do controlador está íntegra, fazemos backup antes do reparo e restauramos na entrega. Se não for possível, reconfiguramos junto com você.',
      },
      {
        question: 'Vocês atendem controladores danificados por incêndio?',
        answer:
          'Sim. Avaliamos placa por placa; quando a eletrônica principal sobrevive, trocamos teclado, display e conectores danificados.',
      },
    ],
    whatsappMessage: 'Olá! Vim pelo site e preciso de reparo em controlador de grupo gerador.',
  },
  {
    slug: 'inversores-de-frequencia-e-soft-starters',
    title: 'Inversores de frequência e soft starters',
    shortTitle: 'Inversores e soft starters',
    icon: 'inverter',
    summary:
      'Reparo de inversores de frequência e soft starters WEG, ABB, Siemens, Danfoss, Schneider e Yaskawa, do módulo IGBT à placa de controle.',
    description:
      'Manutenção corretiva e preventiva de inversores de frequência e soft starters de qualquer potência: módulos IGBT, capacitores do barramento CC, fontes chaveadas, placas de controle e disparo, IHM e ventilação. Teste com motor em carga antes da entrega.',
    brands: ['WEG', 'ABB', 'Siemens', 'Danfoss', 'Schneider Electric', 'Yaskawa', 'Delta'],
    symptoms: [
      'Falhas de sobrecorrente, sobretensão ou curto na saída (códigos OC, OV, SC)',
      'Inversor não liga, display apagado ou reinicia sozinho',
      'Motor vibra, não atinge a velocidade ou perde torque',
      'Erro de comunicação com CLP ou supervisório',
      'Cheiro de queimado, capacitores estufados ou ventilação travada',
    ],
    actions: [
      'Diagnóstico com análise do barramento CC, módulos de potência e disparo dos IGBTs',
      'Substituição de IGBTs, capacitores, fontes e componentes SMD',
      'Reparo de placas de controle, IHM e cartões de comunicação',
      'Limpeza técnica, troca de ventiladores e revisão preventiva',
      'Teste final com motor em carga e registro dos parâmetros',
    ],
    faq: [
      {
        question: 'Vocês reparam inversores de alta potência?',
        answer:
          'Sim. Atendemos inversores e soft starters de pequena a grande potência; para equipamentos muito grandes, combinamos a logística de coleta.',
      },
      {
        question: 'Meus parâmetros são mantidos?',
        answer:
          'Fazemos backup dos parâmetros sempre que a placa de controle permite e restauramos na entrega. Se a placa de controle for substituída, reparametrizamos junto com você.',
      },
      {
        question: 'Fazem manutenção preventiva?',
        answer:
          'Sim. A preventiva inclui limpeza, troca de ventiladores, verificação dos capacitores e teste em carga, e evita a maioria das paradas não programadas.',
      },
    ],
    whatsappMessage: 'Olá! Vim pelo site e preciso de reparo em inversor de frequência ou soft starter.',
  },
  {
    slug: 'ihms-industriais',
    title: 'IHMs industriais',
    shortTitle: 'IHMs industriais',
    icon: 'hmi',
    summary:
      'Reparo de IHMs Siemens, Weintek, Delta, WEG, Schneider e Allen-Bradley: touch, display, backlight, fonte e comunicação.',
    description:
      'Recuperação de interfaces homem-máquina industriais: troca de touch screen e display, backlight apagado, fontes danificadas, portas de comunicação queimadas e falhas de inicialização. Sempre que possível, preservamos o programa e a licença da IHM.',
    brands: ['Siemens', 'Weintek', 'Delta', 'WEG', 'Schneider Electric', 'Allen-Bradley', 'Pro-face'],
    symptoms: [
      'Touch não responde ou responde deslocado',
      'Display apagado, escuro ou com listras',
      'IHM reinicia, trava na inicialização ou perde o programa',
      'Porta serial ou Ethernet queimada, sem comunicação com o CLP',
      'Danos físicos na tela ou no painel frontal',
    ],
    actions: [
      'Diagnóstico de display, touch, fonte e placa principal',
      'Substituição de touch screen, display e backlight',
      'Reparo de fontes e portas de comunicação',
      'Backup e restauração do projeto quando a memória está íntegra',
      'Teste funcional em bancada com o CLP simulado',
    ],
    faq: [
      {
        question: 'O programa da IHM é perdido no reparo?',
        answer:
          'Não, quando a memória está íntegra: fazemos backup antes de qualquer intervenção. Se a memória estiver danificada, avisamos antes de prosseguir e você pode enviar o projeto para regravação.',
      },
      {
        question: 'Vocês trocam só o touch ou a tela inteira?',
        answer:
          'Depende do modelo e do dano. Trocamos o touch, o display ou o conjunto, sempre pela opção de melhor custo-benefício.',
      },
      {
        question: 'Atendem IHMs descontinuadas?',
        answer:
          'Sim. Reparo a nível de componente é justamente a saída para modelos sem peça de reposição no mercado.',
      },
    ],
    whatsappMessage: 'Olá! Vim pelo site e preciso de reparo em IHM industrial.',
  },
  {
    slug: 'empilhadeiras-e-paleteiras',
    title: 'Módulos eletrônicos de empilhadeiras e paleteiras',
    shortTitle: 'Empilhadeiras e paleteiras',
    icon: 'forklift',
    summary:
      'Reparo de módulos de controle Curtis, Zapi, Sevcon e Inmotion, displays e carregadores de empilhadeiras e paleteiras elétricas.',
    description:
      'Empilhadeira parada é custo por hora. Reparamos módulos de tração e elevação, controladores Curtis, Zapi, Sevcon e Inmotion, displays, joysticks e carregadores de bateria de empilhadeiras, paleteiras e transpaleteiras elétricas, com teste em bancada simulando o motor.',
    brands: ['Curtis', 'Zapi', 'Sevcon', 'Inmotion', 'Delta-Q'],
    symptoms: [
      'Empilhadeira não anda, não eleva ou perde força',
      'Códigos de erro no display ou LED de falha piscando',
      'Módulo esquentando, com cheiro de queimado ou contator travado',
      'Carregador não carrega ou desliga antes do fim',
      'Falhas intermitentes após lavagem ou umidade',
    ],
    actions: [
      'Diagnóstico do módulo com simulação de motor, acelerador e sensores',
      'Troca de MOSFETs, capacitores, drivers e componentes SMD',
      'Reparo de displays, joysticks e carregadores de bateria',
      'Limpeza e proteção contra umidade e vibração',
      'Teste em carga e relatório de entrega',
    ],
    faq: [
      {
        question: 'Quais marcas de empilhadeira vocês atendem?',
        answer:
          'O reparo é feito no módulo eletrônico, então atendemos qualquer marca de empilhadeira ou paleteira que use controladores Curtis, Zapi, Sevcon, Inmotion ou similares.',
      },
      {
        question: 'Preciso mandar a empilhadeira inteira?',
        answer:
          'Não. Basta retirar o módulo (ou o carregador) e enviar; orientamos a retirada pelo WhatsApp se precisar.',
      },
      {
        question: 'Fazem orçamento sem compromisso?',
        answer: 'Sim. O orçamento é gratuito e você decide se aprova o reparo.',
      },
    ],
    whatsappMessage: 'Olá! Vim pelo site e preciso de reparo em módulo de empilhadeira ou paleteira elétrica.',
  },
  {
    slug: 'inversores-solares',
    title: 'Inversores solares',
    shortTitle: 'Inversores solares',
    icon: 'solar',
    summary:
      'Reparo de inversores fotovoltaicos Fronius, Solis, PHB, Growatt, Deye e SMA, on-grid, off-grid e híbridos.',
    description:
      'Recuperação de inversores solares fora de garantia ou sem assistência do fabricante: fontes, módulos de potência, placas de controle, comunicação Wi-Fi e RS485, relés de rede e danos por surto. Teste com simulação de string e rede antes da entrega.',
    brands: ['Fronius', 'Solis', 'PHB', 'Growatt', 'Deye', 'SMA', 'Huawei'],
    symptoms: [
      'Inversor não liga ou não conecta na rede',
      'Erros de isolação, sobretensão ou temperatura',
      'Geração abaixo do esperado ou desligamentos ao longo do dia',
      'Perda de comunicação com o aplicativo ou datalogger',
      'Danos por descarga atmosférica ou surto na rede',
    ],
    actions: [
      'Diagnóstico com simulação de string fotovoltaica e rede',
      'Reparo de fontes, módulos IGBT, placas de controle e relés',
      'Troca de componentes SMD e conectores danificados',
      'Reparo de módulos de comunicação e atualização de firmware quando disponível',
      'Teste de injeção na rede e relatório de entrega',
    ],
    faq: [
      {
        question: 'Meu inversor ainda está na garantia, vale a pena reparar?',
        answer:
          'Se ainda estiver na garantia, o caminho é o fabricante. Atendemos inversores fora de garantia ou sem assistência disponível no Brasil.',
      },
      {
        question: 'Atendem integradores e instaladoras?',
        answer:
          'Sim. Trabalhamos com integradores que precisam de um laboratório parceiro para os inversores dos seus clientes, com condições para volume.',
      },
      {
        question: 'Como envio o inversor?',
        answer:
          'Embale com proteção, envie por transportadora para Chapecó, SC, e nos avise pelo WhatsApp com o modelo e o defeito.',
      },
    ],
    whatsappMessage: 'Olá! Vim pelo site e preciso de reparo em inversor solar.',
  },
  {
    slug: 'atuadores-ecus-e-carregadores',
    title: 'Atuadores, centrais ECU e carregadores',
    shortTitle: 'Atuadores, ECUs e carregadores',
    icon: 'actuator',
    summary:
      'Manutenção de atuadores Woodward L-Series, centrais ECU de motores, carregadores de bateria e módulos de geradores de biogás.',
    description:
      'Reparo de eletrônica embarcada em motores e geradores: atuadores eletrônicos Woodward L-Series, centrais ECU, módulos de ignição e mistura de geradores de biogás, e carregadores de bateria de painel. Diagnóstico com simulação dos sinais do motor e teste funcional antes da entrega.',
    // TODO(cliente): confirmar Heinzmann, GAC e Zivan.
    brands: ['Woodward', 'Heinzmann', 'GAC', 'Delta-Q', 'Zivan'],
    symptoms: [
      'Atuador sem resposta, travado ou com atuação irregular',
      'Motor sem controle de rotação ou com oscilação de frequência',
      'ECU não comunica ou apresenta códigos de falha',
      'Carregador de bateria sem saída ou com tensão errada',
      'Danos por umidade, vibração ou surto',
    ],
    actions: [
      'Diagnóstico do atuador e da ECU com simulação dos sinais do motor',
      'Reparo de drivers, fontes, sensores e conectores',
      'Substituição de componentes SMD e módulos de potência',
      'Reparo de carregadores de bateria e reguladores de painel',
      'Teste funcional em bancada e relatório de entrega',
    ],
    faq: [
      {
        question: 'Reparam atuadores L-Series da Woodward?',
        answer:
          'Sim. Fazemos manutenção corretiva em atuadores L-Series com falha de driver, sensor de posição e conector, com teste de curso e resposta em bancada.',
      },
      {
        question: 'Atendem geradores de biogás?',
        answer:
          'Sim. Atendemos módulos de controle e ignição de geradores a biogás, comuns em agroindústrias e biodigestores da região.',
      },
      {
        question: 'Fazem reparo de carregadores de bateria de painel?',
        answer: 'Sim, carregadores flutuantes e automáticos usados em painéis de geradores e quadros de comando.',
      },
    ],
    whatsappMessage: 'Olá! Vim pelo site e preciso de reparo em atuador, central ECU ou carregador de bateria.',
  },
]

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}
```

- [ ] **Step 6: Escrever `src/data/brands.ts`**

```ts
import type { BrandGroup } from './types'

export const brandGroups: BrandGroup[] = [
  { segment: 'Controladores de geradores', brands: ['ComAp', 'Woodward', 'Deep Sea Electronics', 'SICES', 'Mecc Alte', 'DEIF'] },
  { segment: 'Inversores e soft starters', brands: ['WEG', 'ABB', 'Siemens', 'Danfoss', 'Schneider Electric', 'Yaskawa', 'Delta'] },
  { segment: 'IHMs e CLPs', brands: ['Siemens', 'Weintek', 'Delta', 'WEG', 'Schneider Electric', 'Allen-Bradley', 'Pro-face'] },
  { segment: 'Empilhadeiras e paleteiras', brands: ['Curtis', 'Zapi', 'Sevcon', 'Inmotion', 'Delta-Q'] },
  { segment: 'Inversores solares', brands: ['Fronius', 'Solis', 'PHB', 'Growatt', 'Deye', 'SMA', 'Huawei'] },
  { segment: 'Atuadores, ECUs e carregadores', brands: ['Woodward', 'Heinzmann', 'GAC', 'Delta-Q', 'Zivan'] },
]

/** Lista única para o marquee do hero e para o JSON-LD. */
export const allBrands: string[] = Array.from(new Set(brandGroups.flatMap((g) => g.brands)))
```

- [ ] **Step 7: Escrever `src/data/faq.ts`, `src/data/process.ts` e `src/data/media.ts`**

`src/data/faq.ts`:

```ts
import type { FaqItem } from './types'

export const landingFaq: FaqItem[] = [
  {
    question: 'Como funciona o orçamento?',
    answer:
      'Você envia o equipamento, fazemos o diagnóstico em bancada e mandamos o orçamento pelo WhatsApp, sem custo. O reparo só começa depois da sua aprovação.',
  },
  {
    question: 'Quanto tempo leva o reparo?',
    answer:
      'Depende do dano e da disponibilidade de componentes. O prazo é informado junto com o orçamento, e urgências são combinadas caso a caso.',
  },
  {
    question: 'O reparo tem garantia?',
    answer:
      'Sim. Todo serviço sai testado em bancada e com garantia, cujo período vai descrito no orçamento e no relatório de entrega.',
  },
  {
    question: 'Vocês atendem fora de Chapecó?',
    answer:
      'Sim. Atendemos presencialmente Chapecó e região e recebemos equipamentos de todo o Brasil por transportadora.',
  },
  {
    question: 'Como envio meu equipamento?',
    answer:
      'Embale com proteção contra impacto e umidade, envie por transportadora para Chapecó, SC, e nos avise pelo WhatsApp com foto, modelo e defeito. Orientamos a retirada do módulo se precisar.',
  },
  {
    question: 'E se o equipamento não tiver conserto?',
    answer:
      'Você recebe o laudo com a causa e decide sobre a substituição. O diagnóstico não é cobrado.',
  },
  {
    question: 'Minha marca não está na lista. Vocês atendem?',
    answer:
      'Provavelmente sim: o reparo é a nível de componente, então a marca importa menos que o tipo de equipamento. Mande foto e modelo pelo WhatsApp.',
  },
]
```

`src/data/process.ts`:

```ts
import type { ProcessStep } from './types'

export const processSteps: ProcessStep[] = [
  {
    title: 'Recebimento e registro',
    description: 'Você envia o equipamento ou entregamos em mãos em Chapecó e região. Cada item recebe um número de ordem de serviço.',
  },
  {
    title: 'Diagnóstico e laudo',
    description: 'Análise em bancada com simulação de sinais, medição e inspeção da placa. Você recebe o laudo com a causa da falha.',
  },
  {
    title: 'Orçamento sem compromisso',
    description: 'Orçamento gratuito com prazo e garantia. Só seguimos com a sua aprovação.',
  },
  {
    title: 'Reparo e teste',
    description: 'Reparo a nível de componente, limpeza técnica e teste funcional em carga.',
  },
  {
    title: 'Entrega com garantia',
    description: 'Equipamento devolvido testado, com relatório e garantia do serviço.',
  },
]

export const shippingSteps: ProcessStep[] = [
  {
    title: 'Chame no WhatsApp',
    description: 'Mande foto, modelo e o defeito. Respondemos com as instruções de envio.',
  },
  {
    title: 'Embale e envie',
    description: 'Proteja contra impacto e umidade e envie por transportadora para Chapecó, SC, com o número da sua ordem de serviço.',
  },
  {
    title: 'Receba testado',
    description: 'O equipamento volta reparado, testado em bancada e com garantia.',
  },
]
```

`src/data/media.ts`:

```ts
import type { MediaAsset, ServiceSlug, VideoAsset } from './types'

/** Fotos do laboratório. Colocar os arquivos em public/photos e marcar available: true. */
export const labPhotos: MediaAsset[] = [
  { src: '/photos/lab-bancada.webp', alt: 'Bancada de reparo com osciloscópio e placa em teste', available: false },
  { src: '/photos/lab-placa-macro.webp', alt: 'Detalhe de placa eletrônica industrial durante o reparo', available: false },
  { src: '/photos/lab-controlador.webp', alt: 'Controlador de grupo gerador em teste na bancada', available: false },
]

export const serviceCovers: Record<ServiceSlug, MediaAsset> = {
  'controladores-de-grupo-gerador': { src: '/photos/servico-geradores.webp', alt: 'Controlador de grupo gerador em bancada', available: false },
  'inversores-de-frequencia-e-soft-starters': { src: '/photos/servico-inversores.webp', alt: 'Inversor de frequência aberto para reparo', available: false },
  'ihms-industriais': { src: '/photos/servico-ihm.webp', alt: 'IHM industrial em teste', available: false },
  'empilhadeiras-e-paleteiras': { src: '/photos/servico-empilhadeiras.webp', alt: 'Módulo de controle de empilhadeira elétrica', available: false },
  'inversores-solares': { src: '/photos/servico-solar.webp', alt: 'Inversor solar em reparo', available: false },
  'atuadores-ecus-e-carregadores': { src: '/photos/servico-atuadores.webp', alt: 'Atuador Woodward em manutenção', available: false },
}

export const processVideo: VideoAsset = {
  mp4: '/videos/bancada-processo.mp4',
  webm: '/videos/bancada-processo.webm',
  poster: '/videos/bancada-processo.webp',
  alt: 'Técnico da MRJ testando uma placa na bancada',
  available: false,
}

export const labVideo: VideoAsset = {
  mp4: '/videos/bancada-laboratorio.mp4',
  webm: '/videos/bancada-laboratorio.webm',
  poster: '/videos/bancada-laboratorio.webp',
  alt: 'Laboratório da MRJ com equipamentos de medição',
  available: false,
}
```

- [ ] **Step 8: Rodar os testes e confirmar que passam**

```bash
npm test
```

Esperado: 3 arquivos, 11 testes, todos passando.

- [ ] **Step 9: Lint, typecheck e commit**

```bash
npm run lint && npm run typecheck
git add src/data
git commit -m "feat: dados tipados da empresa, serviços, marcas, FAQ, processo e mídia"
```

---

### Task 3: Bibliotecas puras (WhatsApp, SEO, preferências de movimento)

**Files:**
- Create: `src/lib/whatsapp.ts`, `src/lib/seo.ts`, `src/lib/motion-prefs.ts`, `src/components/seo/JsonLd.tsx`
- Test: `src/lib/whatsapp.test.ts`, `src/lib/seo.test.ts`, `src/lib/motion-prefs.test.ts`

**Interfaces:**
- Consumes: `company`, `services`, `allBrands`, tipo `Service`.
- Produces: `normalizePhone(input: string): string`; `buildWhatsAppUrl(phone: string, message: string): string`; `WA_MESSAGES.tecnico`, `WA_MESSAGES.comercial`; `localBusinessJsonLd(): Record<string, unknown>`; `serviceJsonLd(service: Service): Record<string, unknown>`; `serializeJsonLd(data: unknown): string`; `MotionEnv`, `HeroMode = '3d' | 'static'`, `shouldRender3D(env: MotionEnv): boolean`, `readMotionEnv(win: Window): MotionEnv`, `resolveHeroMode(search: string, env: MotionEnv): HeroMode`; componente `JsonLd({ data })`.

- [ ] **Step 1: Escrever os testes**

`src/lib/whatsapp.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { buildWhatsAppUrl, normalizePhone, WA_MESSAGES } from './whatsapp'

describe('normalizePhone', () => {
  it('mantém número já com DDI 55', () => {
    expect(normalizePhone('5549999052518')).toBe('5549999052518')
  })
  it('remove símbolos e adiciona DDI 55', () => {
    expect(normalizePhone('(49) 99905-2518')).toBe('5549999052518')
  })
  it('não confunde DDD 55 com DDI', () => {
    expect(normalizePhone('(55) 99999-9999')).toBe('5555999999999')
  })
  it('rejeita número curto demais', () => {
    expect(() => normalizePhone('49 9990')).toThrow(/inválido/)
  })
})

describe('buildWhatsAppUrl', () => {
  it('gera link wa.me com mensagem codificada', () => {
    const url = buildWhatsAppUrl('5549999052518', 'Olá! Vim pelo site.')
    expect(url).toBe('https://wa.me/5549999052518?text=Ol%C3%A1!%20Vim%20pelo%20site.')
  })
  it('sem mensagem, gera link limpo', () => {
    expect(buildWhatsAppUrl('5549999052518', '   ')).toBe('https://wa.me/5549999052518')
  })
})

describe('WA_MESSAGES', () => {
  it('mensagens padrão começam com saudação e citam o site', () => {
    expect(WA_MESSAGES.tecnico).toMatch(/^Olá.*site/)
    expect(WA_MESSAGES.comercial).toMatch(/^Olá.*site/)
  })
})
```

`src/lib/seo.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { services } from '@/data/services'
import { localBusinessJsonLd, serializeJsonLd, serviceJsonLd } from './seo'

describe('localBusinessJsonLd', () => {
  it('tem os campos obrigatórios do LocalBusiness', () => {
    const ld = localBusinessJsonLd()
    expect(ld['@context']).toBe('https://schema.org')
    expect(ld['@type']).toBe('LocalBusiness')
    expect(ld.name).toBe('MRJ Tecnologia')
    expect(ld.telephone).toBe('+5549999052518')
    expect(ld.address).toMatchObject({ '@type': 'PostalAddress', addressLocality: 'Chapecó', addressRegion: 'SC', addressCountry: 'BR' })
    expect(ld.sameAs).toContain('https://www.instagram.com/mrjtecnologia')
  })
})

describe('serviceJsonLd', () => {
  it('descreve o serviço com provider e url canônica', () => {
    const ld = serviceJsonLd(services[0])
    expect(ld['@type']).toBe('Service')
    expect(ld.name).toBe(services[0].title)
    expect(ld.url).toBe('https://mrjtecnologia.com.br/servicos/controladores-de-grupo-gerador')
    expect(ld.provider).toMatchObject({ '@type': 'LocalBusiness', name: 'MRJ Tecnologia' })
  })
})

describe('serializeJsonLd', () => {
  it('escapa < para evitar fechamento de script', () => {
    expect(serializeJsonLd({ a: '</script><b>' })).toBe('{"a":"\\u003c/script>\\u003cb>"}')
  })
})
```

`src/lib/motion-prefs.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { resolveHeroMode, shouldRender3D, type MotionEnv } from './motion-prefs'

const desktop: MotionEnv = { reducedMotion: false, webgl: true, hardwareConcurrency: 8, isMobile: false }

describe('shouldRender3D', () => {
  it('desktop com WebGL e sem reduced motion renderiza 3D', () => {
    expect(shouldRender3D(desktop)).toBe(true)
  })
  it('reduced motion desliga o 3D', () => {
    expect(shouldRender3D({ ...desktop, reducedMotion: true })).toBe(false)
  })
  it('sem WebGL desliga o 3D', () => {
    expect(shouldRender3D({ ...desktop, webgl: false })).toBe(false)
  })
  it('celular fraco (até 4 núcleos) desliga o 3D', () => {
    expect(shouldRender3D({ ...desktop, isMobile: true, hardwareConcurrency: 4 })).toBe(false)
  })
  it('celular forte mantém o 3D', () => {
    expect(shouldRender3D({ ...desktop, isMobile: true, hardwareConcurrency: 8 })).toBe(true)
  })
})

describe('resolveHeroMode', () => {
  it('?hero=3d força o 3D mesmo com reduced motion', () => {
    expect(resolveHeroMode('?hero=3d', { ...desktop, reducedMotion: true })).toBe('3d')
  })
  it('?hero=static força a imagem', () => {
    expect(resolveHeroMode('?hero=static', desktop)).toBe('static')
  })
  it('sem parâmetro segue o ambiente', () => {
    expect(resolveHeroMode('', desktop)).toBe('3d')
    expect(resolveHeroMode('', { ...desktop, webgl: false })).toBe('static')
  })
})
```

- [ ] **Step 2: Rodar e confirmar a falha**

```bash
npm test
```

Esperado: os 3 novos arquivos falham ao resolver `./whatsapp`, `./seo`, `./motion-prefs`.

- [ ] **Step 3: Escrever `src/lib/whatsapp.ts`**

```ts
const NON_DIGITS = /\D/g

/**
 * Devolve só dígitos, com DDI 55 na frente.
 * Aceita "(49) 99905-2518", "49999052518" ou "5549999052518".
 */
export function normalizePhone(input: string): string {
  const digits = input.replace(NON_DIGITS, '')
  const withCountry = digits.startsWith('55') && digits.length >= 12 ? digits : `55${digits}`
  if (withCountry.length < 12 || withCountry.length > 13) {
    throw new Error(`Número de telefone inválido: ${input}`)
  }
  return withCountry
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const number = normalizePhone(phone)
  const text = message.trim()
  return text ? `https://wa.me/${number}?text=${encodeURIComponent(text)}` : `https://wa.me/${number}`
}

export const WA_MESSAGES = {
  tecnico: 'Olá! Vim pelo site da MRJ e preciso de assistência técnica em eletrônica industrial.',
  comercial: 'Olá! Vim pelo site da MRJ e gostaria de falar com o comercial.',
} as const
```

- [ ] **Step 4: Escrever `src/lib/seo.ts` e `src/components/seo/JsonLd.tsx`**

`src/lib/seo.ts`:

```ts
import { allBrands } from '@/data/brands'
import { company } from '@/data/company'
import type { Service } from '@/data/types'

export function localBusinessJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: company.name,
    description: company.description,
    url: company.siteUrl,
    email: company.email,
    telephone: `+${company.whatsapp.tecnico}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      addressCountry: company.address.country,
    },
    areaServed: { '@type': 'Country', name: 'Brasil' },
    sameAs: [company.instagramUrl],
    knowsAbout: allBrands,
  }
}

export function serviceJsonLd(service: Service): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    serviceType: 'Assistência técnica em eletrônica industrial',
    url: `${company.siteUrl}/servicos/${service.slug}`,
    areaServed: { '@type': 'Country', name: 'Brasil' },
    provider: {
      '@type': 'LocalBusiness',
      name: company.name,
      url: company.siteUrl,
      telephone: `+${company.whatsapp.tecnico}`,
    },
  }
}

/** JSON.stringify com `<` escapado, como recomenda a doc do Next para JSON-LD. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
```

`src/components/seo/JsonLd.tsx`:

```tsx
import { serializeJsonLd } from '@/lib/seo'

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
}
```

- [ ] **Step 5: Escrever `src/lib/motion-prefs.ts`**

```ts
export interface MotionEnv {
  reducedMotion: boolean
  webgl: boolean
  hardwareConcurrency: number
  isMobile: boolean
}

export type HeroMode = '3d' | 'static'

/** Regra da spec (seção 8): sem reduced motion, com WebGL, e celular só se tiver mais de 4 núcleos. */
export function shouldRender3D(env: MotionEnv): boolean {
  if (env.reducedMotion) return false
  if (!env.webgl) return false
  if (env.isMobile && env.hardwareConcurrency <= 4) return false
  return true
}

/** `?hero=3d` e `?hero=static` forçam o modo (usado pelo script de captura e pelos testes). */
export function resolveHeroMode(search: string, env: MotionEnv): HeroMode {
  const forced = new URLSearchParams(search).get('hero')
  if (forced === '3d') return '3d'
  if (forced === 'static') return 'static'
  return shouldRender3D(env) ? '3d' : 'static'
}

function hasWebGL(win: Window): boolean {
  try {
    const canvas = win.document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
  } catch {
    return false
  }
}

/** Só chamar no cliente (dentro de useEffect). */
export function readMotionEnv(win: Window): MotionEnv {
  const nav = win.navigator
  return {
    reducedMotion: win.matchMedia('(prefers-reduced-motion: reduce)').matches,
    webgl: hasWebGL(win),
    hardwareConcurrency: nav.hardwareConcurrency ?? 4,
    isMobile: win.matchMedia('(pointer: coarse)').matches || /Android|iPhone|iPad|Mobi/i.test(nav.userAgent),
  }
}
```

- [ ] **Step 6: Rodar os testes e confirmar que passam**

```bash
npm test
```

Esperado: 6 arquivos, 29 testes passando (11 anteriores + 18 novos).

- [ ] **Step 7: Lint, typecheck e commit**

```bash
npm run lint && npm run typecheck
git add src/lib src/components/seo
git commit -m "feat: utilitários de WhatsApp, JSON-LD e preferências de movimento com testes"
```

---

### Task 4: Sistema de design e primitivos de UI

**Files:**
- Modify: `src/app/globals.css`, `src/app/layout.tsx`
- Create: `src/app/icon.svg`, `public/logo.svg`, `public/logo-white.svg`
- Create: `src/components/ui/Button.tsx`, `src/components/ui/SectionHeading.tsx`, `src/components/ui/Placeholder.tsx`, `src/components/ui/Photo.tsx`, `src/components/ui/VideoBlock.tsx`, `src/components/ui/ServiceIcon.tsx`, `src/components/ui/Logo.tsx`, `src/components/ui/InstagramIcon.tsx`, `src/components/ui/Accordion.tsx`
- Test: `src/components/ui/Button.test.tsx`, `src/components/ui/SectionHeading.test.tsx`, `src/components/ui/Placeholder.test.tsx`, `src/components/ui/Accordion.test.tsx`

**Interfaces:**
- Consumes: `company`, tipos `MediaAsset`, `VideoAsset`, `FaqItem`, `ServiceIconName`.
- Produces: tokens Tailwind `navy-950/900/800`, `brand-700..50`, `paper`, `surface`, `ink`, `ink-muted`, `ink-faint`, `line`, `line-strong`, `whatsapp`, `whatsapp-dark`, `signal`; fontes `font-display`, `font-sans`, `font-mono`; utilities `container-x`, `eyebrow`, `section-y`, classes `hero-grid`, `placeholder-hatch`, `animate-marquee`.
- Produces: `Button({ children, href?, external?, variant?, size?, className?, testId?, ariaLabel?, onClick? })` com `variant: 'whatsapp' | 'primary' | 'outline' | 'outline-light' | 'ghost'`, `size: 'md' | 'lg'`; `SectionHeading({ id, eyebrow, title, description?, align?, tone? })`; `Placeholder({ label, kind?, className? })`; `Photo({ asset, className?, sizes?, priority? })`; `VideoBlock({ video, className? })`; `ServiceIcon({ name, className? })`; `Logo({ variant?, className? })`; `InstagramIcon({ className? })`; `Accordion({ items })`.

- [ ] **Step 1: Escrever os testes de renderização estática**

`src/components/ui/Button.test.tsx`:

```tsx
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('link externo abre em nova aba com rel seguro e data-testid', () => {
    const html = renderToStaticMarkup(
      <Button href="https://wa.me/5549999052518" external variant="whatsapp" testId="cta">
        Falar
      </Button>,
    )
    expect(html).toContain('href="https://wa.me/5549999052518"')
    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noopener noreferrer"')
    expect(html).toContain('data-testid="cta"')
    expect(html).toContain('bg-whatsapp')
  })

  it('sem href vira <button type="button">', () => {
    const html = renderToStaticMarkup(<Button variant="outline">Ok</Button>)
    expect(html.startsWith('<button type="button"')).toBe(true)
    expect(html).toContain('border-line-strong')
  })
})
```

`src/components/ui/SectionHeading.test.tsx`:

```tsx
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { SectionHeading } from './SectionHeading'

describe('SectionHeading', () => {
  it('renderiza eyebrow, h2 com id e descrição', () => {
    const html = renderToStaticMarkup(
      <SectionHeading id="servicos-title" eyebrow="Serviços" title="O que reparamos" description="Texto" />,
    )
    expect(html).toContain('<h2 id="servicos-title"')
    expect(html).toContain('Serviços')
    expect(html).toContain('O que reparamos')
    expect(html).toContain('Texto')
  })

  it('tom escuro usa texto branco', () => {
    const html = renderToStaticMarkup(<SectionHeading id="x" eyebrow="A" title="B" tone="dark" />)
    expect(html).toContain('text-white')
  })
})
```

`src/components/ui/Placeholder.test.tsx`:

```tsx
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Placeholder } from './Placeholder'

describe('Placeholder', () => {
  it('é acessível e marca o tipo de mídia', () => {
    const html = renderToStaticMarkup(<Placeholder label="Bancada de reparo" kind="video" />)
    expect(html).toContain('role="img"')
    expect(html).toContain('aria-label="Bancada de reparo (imagem em breve)"')
    expect(html).toContain('data-placeholder="video"')
    expect(html).toContain('vídeo em breve')
  })
})
```

`src/components/ui/Accordion.test.tsx`:

```tsx
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Accordion } from './Accordion'

describe('Accordion', () => {
  it('usa details/summary nativos, um por item', () => {
    const html = renderToStaticMarkup(
      <Accordion
        items={[
          { question: 'Pergunta 1?', answer: 'Resposta 1.' },
          { question: 'Pergunta 2?', answer: 'Resposta 2.' },
        ]}
      />,
    )
    expect(html.match(/<details/g)).toHaveLength(2)
    expect(html.match(/<summary/g)).toHaveLength(2)
    expect(html).toContain('Pergunta 2?')
    expect(html).toContain('Resposta 2.')
  })
})
```

- [ ] **Step 2: Rodar e confirmar a falha**

```bash
npm test
```

Esperado: os 4 arquivos novos falham por módulo inexistente.

- [ ] **Step 3: Escrever `src/app/globals.css`** (substitui o conteúdo da Task 1)

```css
@import 'tailwindcss';

@theme {
  /* Cores: spec seção 4. Ajustar brand-600 ao SVG do logo quando ele chegar. */
  --color-navy-950: #06162e;
  --color-navy-900: #0b2247;
  --color-navy-800: #12305f;
  --color-brand-700: #17478a;
  --color-brand-600: #1e5aa8;
  --color-brand-500: #2a6fd6;
  --color-brand-400: #5b93e6;
  --color-brand-100: #e3ecfa;
  --color-brand-50: #f1f6fd;
  --color-paper: #f6f8fb;
  --color-surface: #ffffff;
  --color-ink: #0f172a;
  --color-ink-muted: #475569;
  --color-ink-faint: #94a3b8;
  --color-line: #e2e8f0;
  --color-line-strong: #cbd5e1;
  --color-whatsapp: #25d366;
  --color-whatsapp-dark: #1da851;
  --color-signal: #d97706;

  --font-display: var(--font-sora), ui-sans-serif, system-ui, sans-serif;
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains), ui-monospace, 'SFMono-Regular', Menlo, monospace;

  --animate-marquee: marquee 45s linear infinite;

  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
}

@layer base {
  body {
    @apply bg-paper font-sans text-ink antialiased;
  }
  ::selection {
    @apply bg-brand-500 text-white;
  }
  h1,
  h2,
  h3,
  h4 {
    @apply font-display;
    text-wrap: balance;
  }
  p,
  li {
    text-wrap: pretty;
  }
  :focus-visible {
    @apply outline-2 outline-offset-2 outline-brand-500;
  }
}

@utility container-x {
  @apply mx-auto w-full max-w-7xl px-5 sm:px-8;
}

@utility eyebrow {
  @apply font-mono text-xs font-medium tracking-[0.18em] uppercase;
}

@utility section-y {
  @apply py-20 sm:py-28;
}

@layer components {
  .hero-grid {
    background-image:
      radial-gradient(60% 55% at 72% 38%, rgb(42 111 214 / 0.28), transparent 70%),
      linear-gradient(rgb(255 255 255 / 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgb(255 255 255 / 0.045) 1px, transparent 1px);
    background-size:
      100% 100%,
      48px 48px,
      48px 48px;
  }
  .placeholder-hatch {
    background-image: repeating-linear-gradient(135deg, rgb(148 163 184 / 0.18) 0 2px, transparent 2px 14px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-marquee {
    animation: none;
  }
}
```

- [ ] **Step 4: Escrever `src/app/layout.tsx` com fontes e metadata** (Nav, Footer e Lenis entram na Task 6)

```tsx
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Sora } from 'next/font/google'
import { company } from '@/data/company'
import './globals.css'

const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' })

const defaultTitle = `${company.name} | ${company.tagline} em Chapecó`

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: { default: defaultTitle, template: `%s | ${company.name}` },
  description: company.description,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: company.name,
    title: defaultTitle,
    description: company.description,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: `${company.name}: ${company.tagline}` }],
  },
  twitter: { card: 'summary_large_image', title: defaultTitle, description: company.description, images: ['/og.jpg'] },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="flex min-h-svh flex-col">
        {/* Ponto único de inserção de analytics (GA4 ou Plausible) quando o cliente decidir. */}
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 5: Criar favicon e logos provisórios** (o cliente vai entregar o SVG oficial; até lá, wordmark em texto)

`src/app/icon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#06162e"/><path d="M14 46V18l10 14 10-14v28" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 18h6v22a6 6 0 0 1-12 0" fill="none" stroke="#5b93e6" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>
```

`public/logo.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="220" height="48" viewBox="0 0 220 48" role="img" aria-label="MRJ Tecnologia"><text x="0" y="30" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" letter-spacing="-1" fill="#1e5aa8">MRJ</text><text x="74" y="30" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="500" letter-spacing="3" fill="#0f172a">TECNOLOGIA</text><path d="M0 40h220" stroke="#1e5aa8" stroke-width="2" stroke-dasharray="40 6 12 6 60 6"/></svg>
```

`public/logo-white.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="220" height="48" viewBox="0 0 220 48" role="img" aria-label="MRJ Tecnologia"><text x="0" y="30" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" letter-spacing="-1" fill="#ffffff">MRJ</text><text x="74" y="30" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="500" letter-spacing="3" fill="#c7d2fe">TECNOLOGIA</text><path d="M0 40h220" stroke="#5b93e6" stroke-width="2" stroke-dasharray="40 6 12 6 60 6"/></svg>
```

- [ ] **Step 6: Escrever os primitivos de UI**

`src/components/ui/Button.tsx`:

```tsx
import Link from 'next/link'
import type { ReactNode } from 'react'

export type ButtonVariant = 'whatsapp' | 'primary' | 'outline' | 'outline-light' | 'ghost'
export type ButtonSize = 'md' | 'lg'

export interface ButtonProps {
  children: ReactNode
  href?: string
  /** Abre em nova aba com rel seguro. Obrigatório para links de WhatsApp. */
  external?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  testId?: string
  ariaLabel?: string
  onClick?: () => void
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500'

const sizes: Record<ButtonSize, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-14 px-7 text-base',
}

const variants: Record<ButtonVariant, string> = {
  whatsapp: 'bg-whatsapp text-navy-950 hover:bg-whatsapp-dark',
  primary: 'bg-brand-600 text-white hover:bg-brand-500',
  outline: 'border border-line-strong text-ink hover:border-brand-600 hover:text-brand-600',
  'outline-light': 'border border-white/30 text-white hover:border-white hover:bg-white/10',
  ghost: 'text-brand-600 hover:bg-brand-100',
}

export function Button({
  children,
  href,
  external = false,
  variant = 'primary',
  size = 'md',
  className = '',
  testId,
  ariaLabel,
  onClick,
}: ButtonProps) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`.trim()

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        data-testid={testId}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }
  if (href) {
    return (
      <Link href={href} className={classes} data-testid={testId} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" className={classes} data-testid={testId} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </button>
  )
}
```

`src/components/ui/SectionHeading.tsx`:

```tsx
import type { ReactNode } from 'react'

export interface SectionHeadingProps {
  /** id do h2, usado em aria-labelledby da section. */
  id: string
  eyebrow: string
  title: string
  description?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
}

export function SectionHeading({ id, eyebrow, title, description, align = 'left', tone = 'light' }: SectionHeadingProps) {
  const dark = tone === 'dark'
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className={`eyebrow ${dark ? 'text-brand-400' : 'text-brand-600'}`}>{eyebrow}</p>
      <h2 id={id} className={`mt-3 text-3xl font-semibold tracking-tight sm:text-4xl ${dark ? 'text-white' : 'text-ink'}`}>
        {title}
      </h2>
      {description ? <p className={`mt-4 text-lg ${dark ? 'text-white/70' : 'text-ink-muted'}`}>{description}</p> : null}
    </div>
  )
}
```

`src/components/ui/Placeholder.tsx`:

```tsx
import { ImageIcon, Video } from 'lucide-react'

export interface PlaceholderProps {
  label: string
  kind?: 'photo' | 'video'
  className?: string
}

/** Bloco neutro exibido enquanto o material do cliente não chega (spec seção 10). */
export function Placeholder({ label, kind = 'photo', className = '' }: PlaceholderProps) {
  const Icon = kind === 'video' ? Video : ImageIcon
  return (
    <div
      role="img"
      aria-label={`${label} (imagem em breve)`}
      data-placeholder={kind}
      className={`placeholder-hatch flex items-center justify-center rounded-2xl border border-dashed border-line-strong bg-brand-50 text-ink-faint ${className}`}
    >
      <div className="flex flex-col items-center gap-2 p-6 text-center">
        <Icon className="size-6" aria-hidden="true" />
        <span className="eyebrow">{kind === 'video' ? 'vídeo em breve' : 'foto em breve'}</span>
        <span className="max-w-xs text-xs">{label}</span>
      </div>
    </div>
  )
}
```

`src/components/ui/Photo.tsx`:

```tsx
import Image from 'next/image'
import type { MediaAsset } from '@/data/types'
import { Placeholder } from './Placeholder'

export interface PhotoProps {
  asset: MediaAsset
  className?: string
  sizes?: string
  priority?: boolean
}

export function Photo({ asset, className = '', sizes = '100vw', priority = false }: PhotoProps) {
  if (!asset.available) return <Placeholder label={asset.alt} className={className} />
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={asset.src} alt={asset.alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  )
}
```

`src/components/ui/VideoBlock.tsx`:

```tsx
import type { VideoAsset } from '@/data/types'
import { Placeholder } from './Placeholder'

export interface VideoBlockProps {
  video: VideoAsset
  className?: string
}

/** Vídeo curto em loop, sem som, carregado só quando entra na tela (preload none + poster). */
export function VideoBlock({ video, className = '' }: VideoBlockProps) {
  if (!video.available) return <Placeholder label={video.alt} kind="video" className={className} />
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster={video.poster}
        aria-label={video.alt}
      >
        <source src={video.webm} type="video/webm" />
        <source src={video.mp4} type="video/mp4" />
      </video>
    </div>
  )
}
```

`src/components/ui/ServiceIcon.tsx`:

```tsx
import { CircuitBoard, Forklift, Monitor, Settings2, SunMedium, Zap, type LucideIcon } from 'lucide-react'
import type { ServiceIconName } from '@/data/types'

const icons: Record<ServiceIconName, LucideIcon> = {
  generator: Zap,
  inverter: CircuitBoard,
  hmi: Monitor,
  forklift: Forklift,
  solar: SunMedium,
  actuator: Settings2,
}

export function ServiceIcon({ name, className = 'size-5' }: { name: ServiceIconName; className?: string }) {
  const Icon = icons[name]
  return <Icon className={className} aria-hidden="true" />
}
```

`src/components/ui/Logo.tsx`:

```tsx
import Image from 'next/image'

export function Logo({ variant = 'dark', className = '' }: { variant?: 'dark' | 'light'; className?: string }) {
  return (
    <Image
      src={variant === 'light' ? '/logo-white.svg' : '/logo.svg'}
      alt="MRJ Tecnologia"
      width={220}
      height={48}
      priority
      unoptimized
      className={className}
    />
  )
}
```

`src/components/ui/InstagramIcon.tsx` (o lucide 1.x não traz ícones de marca):

```tsx
export function InstagramIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}
```

`src/components/ui/Accordion.tsx`:

```tsx
import { ChevronDown } from 'lucide-react'
import type { FaqItem } from '@/data/types'

/** Acordeão com <details>/<summary>: acessível por teclado sem JavaScript. */
export function Accordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-surface">
      {items.map((item) => (
        <details key={item.question} className="group px-6 py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown className="size-5 shrink-0 text-brand-600 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="mt-3 leading-relaxed text-ink-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
```

- [ ] **Step 7: Rodar os testes e confirmar que passam**

```bash
npm test
```

Esperado: 10 arquivos de teste, todos passando.

- [ ] **Step 8: Lint, typecheck e build**

```bash
npm run lint && npm run typecheck && npm run build
```

Esperado: sem erros. O build baixa as três fontes do Google uma vez (precisa de rede).

- [ ] **Step 9: Commit**

```bash
git add src/app src/components/ui public/logo.svg public/logo-white.svg
git commit -m "feat: tokens de design, fontes, favicon e primitivos de UI com testes"
```

---

### Task 5: Infraestrutura de movimento (GSAP, Lenis, Reveal, Counter, Marquee)

**Files:**
- Create: `src/lib/format.ts`, `src/components/motion/gsap.ts`, `src/components/motion/useReducedMotion.ts`, `src/components/motion/useScrolled.ts`, `src/components/motion/LenisProvider.tsx`, `src/components/motion/Reveal.tsx`, `src/components/motion/Counter.tsx`, `src/components/motion/Marquee.tsx`
- Test: `src/lib/format.test.ts`, `src/components/motion/Marquee.test.tsx`

**Interfaces:**
- Produces: `formatNumber(n: number): string` (pt-BR, "1.500"); `gsap`, `ScrollTrigger`, `useGSAP` já registrados; `useReducedMotion(): boolean`; `useScrolled(threshold: number): boolean`; `LenisProvider({ children })`; `Reveal({ children, className?, delay?, y? })`; `Counter({ value, suffix?, className? })`; `Marquee({ items, className? })`.
- Regra de lint: o eslint-config-next 16 ativa `react-hooks/set-state-in-effect`, `react-hooks/refs` e `react-hooks/purity`. Por isso estado derivado do navegador usa `useSyncExternalStore`, nunca `setState` direto dentro de `useEffect`.

- [ ] **Step 1: Escrever os testes**

`src/lib/format.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { formatNumber } from './format'

describe('formatNumber', () => {
  it('usa separador de milhar pt-BR', () => {
    expect(formatNumber(1500)).toBe('1.500')
    expect(formatNumber(30)).toBe('30')
    expect(formatNumber(1250000)).toBe('1.250.000')
  })
})
```

`src/components/motion/Marquee.test.tsx`:

```tsx
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Marquee } from './Marquee'

describe('Marquee', () => {
  it('duplica a lista para o loop e esconde a cópia de leitores de tela', () => {
    const html = renderToStaticMarkup(<Marquee items={['ComAp', 'WEG', 'Zapi']} />)
    expect(html.match(/<li/g)).toHaveLength(6)
    expect(html.match(/aria-hidden="true"/g)).toHaveLength(3)
    expect(html).toContain('animate-marquee')
  })
})
```

- [ ] **Step 2: Rodar e confirmar a falha**

```bash
npm test
```

Esperado: os 2 arquivos novos falham por módulo inexistente.

- [ ] **Step 3: Escrever `src/lib/format.ts`**

```ts
const ptBR = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 })

export function formatNumber(n: number): string {
  return ptBR.format(n)
}
```

- [ ] **Step 4: Escrever o registro do GSAP e os hooks de ambiente**

`src/components/motion/gsap.ts` (importado só por componentes cliente):

```ts
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export { gsap, ScrollTrigger, useGSAP }
```

`src/components/motion/useReducedMotion.ts`:

```ts
'use client'

import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches
}

function getServerSnapshot() {
  return false
}

/** true quando o usuário pediu menos movimento. No servidor e na hidratação, false. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
```

`src/components/motion/useScrolled.ts`:

```ts
'use client'

import { useSyncExternalStore } from 'react'

function subscribe(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true })
  return () => window.removeEventListener('scroll', onChange)
}

function getServerSnapshot() {
  return false
}

/** true quando a página rolou mais que `threshold` px. */
export function useScrolled(threshold: number): boolean {
  return useSyncExternalStore(subscribe, () => window.scrollY > threshold, getServerSnapshot)
}
```

- [ ] **Step 5: Escrever `src/components/motion/LenisProvider.tsx`**

```tsx
'use client'

import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { useEffect, type ReactNode } from 'react'
import { gsap, ScrollTrigger } from './gsap'
import { useReducedMotion } from './useReducedMotion'

/**
 * Scroll suave sincronizado ao ticker do GSAP (padrão recomendado pelo Lenis).
 * Com prefers-reduced-motion, não cria o Lenis e o scroll fica nativo.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ autoRaf: false, lerp: 0.1, anchors: true })
    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.off('scroll', onScroll)
      lenis.destroy()
    }
  }, [reduced])

  return <>{children}</>
}
```

- [ ] **Step 6: Escrever `Reveal`, `Counter` e `Marquee`**

`src/components/motion/Reveal.tsx`:

```tsx
'use client'

import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP } from './gsap'
import { useReducedMotion } from './useReducedMotion'

export interface RevealProps {
  children: ReactNode
  className?: string
  /** Atraso em segundos, para escalonar cards. */
  delay?: number
  /** Deslocamento inicial em px. */
  y?: number
}

/** Entra com fade + subida ao aparecer na tela, uma única vez. Com reduced motion, renderiza visível. */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const el = ref.current
      if (reduced || !el) return
      gsap.from(el, {
        autoAlpha: 0,
        y,
        duration: 0.8,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    },
    { scope: ref, dependencies: [reduced, delay, y] },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
```

`src/components/motion/Counter.tsx`:

```tsx
'use client'

import { useRef } from 'react'
import { formatNumber } from '@/lib/format'
import { gsap, useGSAP } from './gsap'
import { useReducedMotion } from './useReducedMotion'

export interface CounterProps {
  value: number
  suffix?: string
  className?: string
}

/** Conta de 0 até `value` quando entra na tela. No servidor e com reduced motion mostra o valor final. */
export function Counter({ value, suffix = '', className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const el = ref.current
      if (!el || reduced) return
      const state = { n: 0 }
      el.textContent = `0${suffix}`
      gsap.to(state, {
        n: value,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => {
          el.textContent = `${formatNumber(Math.round(state.n))}${suffix}`
        },
      })
    },
    { dependencies: [value, suffix, reduced] },
  )

  return (
    <span ref={ref} className={className}>
      {formatNumber(value)}
      {suffix}
    </span>
  )
}
```

`src/components/motion/Marquee.tsx` (CSS puro, sem JS):

```tsx
export interface MarqueeProps {
  items: string[]
  className?: string
}

export function Marquee({ items, className = '' }: MarqueeProps) {
  const track = [...items, ...items]
  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      style={{ maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}
    >
      <ul className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {track.map((item, i) => (
          <li key={`${item}-${i}`} aria-hidden={i >= items.length ? true : undefined} className="eyebrow text-white/60">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 7: Rodar os testes e confirmar que passam**

```bash
npm test
```

Esperado: 12 arquivos, todos passando.

- [ ] **Step 8: Lint, typecheck e commit**

```bash
npm run lint && npm run typecheck
git add src/lib/format.ts src/lib/format.test.ts src/components/motion
git commit -m "feat: GSAP + Lenis, Reveal, Counter e Marquee respeitando reduced motion"
```

---

### Task 6: Nav, Footer, botão flutuante, layout e primeiro teste Playwright

**Files:**
- Create: `src/components/layout/Nav.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/WhatsAppFloat.tsx`
- Modify: `src/app/layout.tsx`
- Create: `playwright.config.ts`, `e2e/home.spec.ts`

**Interfaces:**
- Consumes: `Button`, `Logo`, `InstagramIcon`, `useScrolled`, `LenisProvider`, `company`, `services`, `buildWhatsAppUrl`, `WA_MESSAGES`.
- Produces: `Nav()`, `Footer()`, `WhatsAppFloat()`; layout com `<main>`; `data-testid="nav-whatsapp"` e `data-testid="whatsapp-float"`; suíte e2e rodando com `npm run e2e`.

- [ ] **Step 1: Instalar o Chromium do Playwright**

```bash
npx playwright install chromium
```

Se um teste falhar depois com "error while loading shared libraries", rodar `sudo npx playwright install-deps chromium`. Sem sudo (caso desta máquina): `apt-get download libnspr4 libnss3 libasound2t64`, extrair com `dpkg-deb -x` e copiar os `.so` para `~/.local/lib/playwright-deps`; o `playwright.config.ts` injeta essa pasta em `LD_LIBRARY_PATH` do navegador quando ela existe.

- [ ] **Step 2: Escrever `playwright.config.ts`**

```ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3002',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run build && npm run start',
    url: 'http://localhost:3002',
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
})
```

- [ ] **Step 3: Escrever o teste e2e (falha porque Nav e Footer não existem)**

`e2e/home.spec.ts`:

```ts
import { expect, test } from '@playwright/test'

test('home responde 200 com um único H1', async ({ page }) => {
  const response = await page.goto('/')
  expect(response?.status()).toBe(200)
  await expect(page.locator('h1')).toHaveCount(1)
})

test('nav aponta para o WhatsApp do técnico e o rodapé para o comercial', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('nav-whatsapp')).toHaveAttribute('href', /^https:\/\/wa\.me\/5549999052518\?text=/)
  await expect(page.locator('footer a[href^="https://wa.me/5549999577176"]')).toHaveCount(1)
})

test('botão flutuante aparece depois de rolar', async ({ page }) => {
  await page.goto('/')
  const float = page.getByTestId('whatsapp-float')
  await expect(float).toHaveCSS('opacity', '0')
  // Garante altura para rolar mesmo enquanto a página ainda é curta.
  await page.evaluate(() => {
    document.body.style.minHeight = '3000px'
    window.scrollTo(0, 800)
  })
  await expect(float).toHaveCSS('opacity', '1')
})
```

- [ ] **Step 4: Rodar e confirmar a falha**

```bash
npm run e2e
```

Esperado: o build passa, o servidor sobe e 2 dos 3 testes falham (`nav-whatsapp` e `whatsapp-float` não encontrados).

- [ ] **Step 5: Escrever `src/components/layout/Nav.tsx`**

```tsx
'use client'

import { Menu, MessageCircle, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useScrolled } from '@/components/motion/useScrolled'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { company } from '@/data/company'
import { buildWhatsAppUrl, WA_MESSAGES } from '@/lib/whatsapp'

const links = [
  { href: '/#servicos', label: 'Serviços' },
  { href: '/#marcas', label: 'Marcas' },
  { href: '/#processo', label: 'Processo' },
  { href: '/#laboratorio', label: 'Laboratório' },
  { href: '/#contato', label: 'Contato' },
]

const whatsapp = buildWhatsAppUrl(company.whatsapp.tecnico, WA_MESSAGES.tecnico)

export function Nav() {
  const pathname = usePathname()
  const scrolled = useScrolled(24)
  const [open, setOpen] = useState(false)

  // Trava o scroll do body enquanto o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Na home a barra nasce transparente sobre o hero escuro; nas outras páginas já nasce sólida.
  const solid = scrolled || open || pathname !== '/'
  const close = () => setOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'border-b border-white/10 bg-navy-950/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 sm:h-20">
        <Link href="/" aria-label="MRJ Tecnologia, página inicial" className="shrink-0" onClick={close}>
          <Logo variant="light" className="h-8 w-auto sm:h-9" />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-white/75 transition-colors hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href={whatsapp} external variant="whatsapp" testId="nav-whatsapp">
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp
          </Button>
        </div>

        <button
          type="button"
          className="text-white md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <div
          id="menu-mobile"
          className="flex h-[calc(100svh-4rem)] flex-col gap-2 border-t border-white/10 bg-navy-950 px-5 pt-4 pb-8 md:hidden"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={close}
              className="rounded-xl px-3 py-3 text-lg font-medium text-white/85 hover:bg-white/5"
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-auto">
            <Button href={whatsapp} external variant="whatsapp" size="lg" className="w-full" onClick={close}>
              <MessageCircle className="size-5" aria-hidden="true" />
              Falar no WhatsApp
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  )
}
```

- [ ] **Step 6: Escrever `src/components/layout/Footer.tsx`** (o ano é calculado no escopo do módulo para não chamar `new Date()` durante o render, exigência da regra `react-hooks/purity`)

```tsx
import { Mail, MapPin, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { InstagramIcon } from '@/components/ui/InstagramIcon'
import { Logo } from '@/components/ui/Logo'
import { company } from '@/data/company'
import { services } from '@/data/services'
import { buildWhatsAppUrl, WA_MESSAGES } from '@/lib/whatsapp'

const year = new Date().getFullYear()
const waTecnico = buildWhatsAppUrl(company.whatsapp.tecnico, WA_MESSAGES.tecnico)
const waComercial = buildWhatsAppUrl(company.whatsapp.comercial, WA_MESSAGES.comercial)

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 text-white/75">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo variant="light" className="h-9 w-auto" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{company.description}</p>
          <a
            href={company.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm transition-colors hover:text-white"
          >
            <InstagramIcon className="size-5" />@{company.instagramHandle}
          </a>
        </div>

        <div>
          <p className="eyebrow text-brand-400">Serviços</p>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/servicos/${s.slug}`} className="transition-colors hover:text-white">
                  {s.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-brand-400">Contato</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={waTecnico} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
                <MessageCircle className="size-4" aria-hidden="true" />
                Técnico: {company.phoneDisplay.tecnico}
              </a>
            </li>
            <li>
              <a href={waComercial} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
                <MessageCircle className="size-4" aria-hidden="true" />
                Comercial: {company.phoneDisplay.comercial}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2 hover:text-white">
                <Mail className="size-4" aria-hidden="true" />
                {company.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin className="size-4" aria-hidden="true" />
              {company.address.city}, {company.address.state}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. Todos os direitos reservados.
          </p>
          <p>
            Feito em {company.address.city}, {company.address.state}.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 7: Escrever `src/components/layout/WhatsAppFloat.tsx`**

```tsx
'use client'

import { MessageCircle } from 'lucide-react'
import { useScrolled } from '@/components/motion/useScrolled'
import { company } from '@/data/company'
import { buildWhatsAppUrl, WA_MESSAGES } from '@/lib/whatsapp'

const href = buildWhatsAppUrl(company.whatsapp.tecnico, WA_MESSAGES.tecnico)

/** Botão fixo de WhatsApp; aparece depois de 300px de scroll (spec seção 6, item 12). */
export function WhatsAppFloat() {
  const visible = useScrolled(300)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com o setor técnico no WhatsApp"
      data-testid="whatsapp-float"
      className={`fixed right-5 bottom-5 z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-navy-950 shadow-lg shadow-navy-950/20 transition-all duration-300 hover:bg-whatsapp-dark ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <MessageCircle className="size-7" aria-hidden="true" />
    </a>
  )
}
```

- [ ] **Step 8: Montar o `src/app/layout.tsx` final** (substituir só o `RootLayout`; fontes e `metadata` da Task 4 ficam iguais)

```tsx
import { Footer } from '@/components/layout/Footer'
import { Nav } from '@/components/layout/Nav'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import { LenisProvider } from '@/components/motion/LenisProvider'
// ...imports e constantes da Task 4 permanecem acima

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="flex min-h-svh flex-col">
        {/* Ponto único de inserção de analytics (GA4 ou Plausible) quando o cliente decidir. */}
        <LenisProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </LenisProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 9: Rodar a suíte e2e e confirmar que passa**

```bash
npm run e2e
```

Esperado: 3 testes passando no projeto chromium.

- [ ] **Step 10: Lint, typecheck, testes unitários e commit**

```bash
npm run lint && npm run typecheck && npm test
git add src/components/layout src/app/layout.tsx playwright.config.ts e2e
git commit -m "feat: nav, rodapé, botão flutuante de WhatsApp e testes Playwright"
```

---

### Task 7: Hero (texto, CTAs, marquee) com imagem estática

**Files:**
- Create: `src/components/sections/Hero.tsx`, `src/components/three/HeroVisual.tsx`, `public/hero-fallback.svg`
- Modify: `src/app/page.tsx`, `e2e/home.spec.ts`

**Interfaces:**
- Consumes: `Button`, `Marquee`, `company`, `allBrands`, `buildWhatsAppUrl`, `WA_MESSAGES`.
- Produces: `Hero()` com `<section id="hero">`; `HeroVisual()` com `data-testid="hero-visual"` e imagem `data-testid="hero-fallback"`; CTA `data-testid="hero-cta"`. Nesta task o `HeroVisual` só mostra a imagem; a Task 8 adiciona o 3D.

- [ ] **Step 1: Acrescentar o teste e2e do hero em `e2e/home.spec.ts`**

```ts
test('hero tem H1, CTA do técnico e marquee de marcas', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#hero h1')).toContainText('Eletrônica industrial')
  await expect(page.getByTestId('hero-cta')).toHaveAttribute('href', /^https:\/\/wa\.me\/5549999052518\?text=/)
  await expect(page.getByTestId('hero-visual')).toBeVisible()
  await expect(page.locator('#hero li', { hasText: 'ComAp' }).first()).toBeVisible()
})
```

- [ ] **Step 2: Rodar só esse teste e confirmar a falha**

```bash
npx playwright test -g "hero tem H1"
```

Esperado: falha em `#hero h1` (não existe).

- [ ] **Step 3: Criar `public/hero-fallback.svg`** (ilustração provisória do controlador; a Task 8 gera o WebP a partir da cena 3D)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" role="img" aria-label="Ilustração de um controlador de grupo gerador">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#12305f"/><stop offset="1" stop-color="#06162e"/></linearGradient>
  </defs>
  <rect x="120" y="170" width="400" height="300" rx="18" fill="url(#g)" stroke="#2a6fd6" stroke-opacity=".5"/>
  <rect x="150" y="200" width="200" height="120" rx="8" fill="#0f2f4a" stroke="#39c0f0" stroke-opacity=".6"/>
  <g fill="#39c0f0">
    <rect x="166" y="218" width="120" height="8" rx="2"/>
    <rect x="166" y="238" width="96" height="8" rx="2" opacity=".8"/>
    <rect x="166" y="258" width="140" height="8" rx="2" opacity=".6"/>
    <rect x="166" y="278" width="80" height="8" rx="2" opacity=".5"/>
  </g>
  <g fill="#3a4252" stroke="#5b93e6" stroke-opacity=".4">
    <rect x="380" y="205" width="36" height="26" rx="6"/><rect x="424" y="205" width="36" height="26" rx="6"/><rect x="468" y="205" width="36" height="26" rx="6"/>
    <rect x="380" y="243" width="36" height="26" rx="6"/><rect x="424" y="243" width="36" height="26" rx="6"/><rect x="468" y="243" width="36" height="26" rx="6"/>
    <rect x="380" y="281" width="36" height="26" rx="6"/><rect x="424" y="281" width="36" height="26" rx="6"/><rect x="468" y="281" width="36" height="26" rx="6" fill="#2a6fd6"/>
  </g>
  <circle cx="170" cy="350" r="6" fill="#22c55e"/><circle cx="194" cy="350" r="6" fill="#f59e0b"/><circle cx="218" cy="350" r="6" fill="#ef4444"/>
  <g fill="#2f9e6a">
    <rect x="140" y="430" width="28" height="30" rx="3"/><rect x="176" y="430" width="28" height="30" rx="3"/><rect x="212" y="430" width="28" height="30" rx="3"/><rect x="248" y="430" width="28" height="30" rx="3"/><rect x="284" y="430" width="28" height="30" rx="3"/>
    <rect x="320" y="430" width="28" height="30" rx="3"/><rect x="356" y="430" width="28" height="30" rx="3"/><rect x="392" y="430" width="28" height="30" rx="3"/><rect x="428" y="430" width="28" height="30" rx="3"/><rect x="464" y="430" width="28" height="30" rx="3"/>
  </g>
</svg>
```

- [ ] **Step 4: Escrever `src/components/three/HeroVisual.tsx` (versão só imagem)**

```tsx
'use client'

import Image from 'next/image'

export const HERO_FALLBACK = {
  src: '/hero-fallback.svg',
  alt: 'Controlador de grupo gerador aberto em camadas: painel, placa e carcaça',
}

export function HeroVisual() {
  return (
    <div data-testid="hero-visual" className="relative aspect-square w-full max-w-xl justify-self-center lg:justify-self-end">
      <Image
        src={HERO_FALLBACK.src}
        alt={HERO_FALLBACK.alt}
        fill
        priority
        unoptimized
        sizes="(min-width: 1024px) 40vw, 90vw"
        className="object-contain"
        data-testid="hero-fallback"
      />
    </div>
  )
}
```

- [ ] **Step 5: Escrever `src/components/sections/Hero.tsx`**

```tsx
import { MessageCircle } from 'lucide-react'
import { Marquee } from '@/components/motion/Marquee'
import { HeroVisual } from '@/components/three/HeroVisual'
import { Button } from '@/components/ui/Button'
import { allBrands } from '@/data/brands'
import { company } from '@/data/company'
import { buildWhatsAppUrl, WA_MESSAGES } from '@/lib/whatsapp'

const whatsapp = buildWhatsAppUrl(company.whatsapp.tecnico, WA_MESSAGES.tecnico)

export function Hero() {
  return (
    <section id="hero" className="relative isolate overflow-hidden bg-navy-950 text-white">
      <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-x grid min-h-svh items-center gap-12 pt-28 pb-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="eyebrow text-brand-400">Assistência técnica especializada</p>
          <h1 className="mt-4 text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
            Eletrônica industrial reparada por quem entende de geradores, inversores e empilhadeiras.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/70">
            Controladores de grupo gerador, IHMs, inversores de frequência e solares, módulos de empilhadeiras e
            paleteiras. Diagnóstico em laboratório próprio, reparo a nível de componente e orçamento gratuito.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={whatsapp} external variant="whatsapp" size="lg" testId="hero-cta">
              <MessageCircle className="size-5" aria-hidden="true" />
              Falar com o técnico
            </Button>
            <Button href="#servicos" variant="outline-light" size="lg">
              Ver serviços
            </Button>
          </div>
          <p className="eyebrow mt-8 text-white/40">
            {company.address.city}, {company.address.state} · atendimento em todo o Brasil
          </p>
        </div>
        <HeroVisual />
      </div>
      <div className="border-t border-white/10 py-5">
        <Marquee items={allBrands} />
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Montar `src/app/page.tsx` com o Hero**

```tsx
import { Hero } from '@/components/sections/Hero'

export default function Home() {
  return <Hero />
}
```

- [ ] **Step 7: Rodar e2e completo e confirmar que passa**

```bash
npm run e2e
```

Esperado: 4 testes passando.

- [ ] **Step 8: Lint, typecheck, build e commit**

```bash
npm run lint && npm run typecheck && npm test && npm run build
git add src/components/sections/Hero.tsx src/components/three/HeroVisual.tsx public/hero-fallback.svg src/app/page.tsx e2e/home.spec.ts
git commit -m "feat: hero com CTAs de WhatsApp, marquee de marcas e imagem provisória"
```

---

### Task 8: Hero 3D procedural ligado ao scroll, com fallback

**Files:**
- Create: `src/components/three/useHeroScrollProgress.ts`, `src/components/three/HeroScene.tsx`, `src/components/three/ControllerModel.tsx`, `scripts/capture-hero-fallback.mjs`, `public/hero-fallback.webp`
- Modify: `src/components/three/HeroVisual.tsx`, `eslint.config.mjs`, `e2e/home.spec.ts`

**Interfaces:**
- Consumes: `resolveHeroMode`, `readMotionEnv`, `HeroMode`, `ScrollTrigger`, `useGSAP`.
- Produces: `useHeroScrollProgress(enabled: boolean): RefObject<number>` (pina `#hero` por +100vh e grava 0→1 no ref); `HeroScene({ progress, active })`; `ControllerModel({ progress })`; `HeroVisual` com `data-mode="3d" | "static" | "pending"` e suporte a `?hero=3d` / `?hero=static`.

- [ ] **Step 1: Acrescentar os testes e2e do fallback em `e2e/home.spec.ts`**

```ts
test.describe('hero com reduced motion', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } })

  test('mostra a imagem estática e não cria canvas', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('hero-visual')).toHaveAttribute('data-mode', 'static')
    await expect(page.getByTestId('hero-fallback')).toBeVisible()
    await expect(page.locator('[data-testid="hero-visual"] canvas')).toHaveCount(0)
  })
})

test('?hero=static força a imagem mesmo sem reduced motion', async ({ page }) => {
  await page.goto('/?hero=static')
  await expect(page.getByTestId('hero-visual')).toHaveAttribute('data-mode', 'static')
  await expect(page.getByTestId('hero-fallback')).toHaveAttribute('src', /hero-fallback/)
})
```

- [ ] **Step 2: Rodar e confirmar a falha**

```bash
npx playwright test -g "hero"
```

Esperado: os 2 testes novos falham porque `data-mode` não existe ainda.

- [ ] **Step 3: Liberar as props do React Three Fiber no ESLint** (a regra `react/no-unknown-property` não conhece `args`, `position`, `intensity` etc.)

Em `eslint.config.mjs`, adicionar ao array de configuração, depois dos presets do Next:

```js
  {
    files: ['src/components/three/**/*.tsx'],
    rules: { 'react/no-unknown-property': 'off' },
  },
```

- [ ] **Step 4: Escrever `src/components/three/useHeroScrollProgress.ts`**

```ts
'use client'

import { useRef, type RefObject } from 'react'
import { ScrollTrigger, useGSAP } from '@/components/motion/gsap'

/**
 * Pina a section #hero por mais 100vh (spec seção 8) e expõe o progresso 0→1
 * num ref, lido pelo useFrame do R3F sem causar re-render do React.
 */
export function useHeroScrollProgress(enabled: boolean): RefObject<number> {
  const progress = useRef(0)

  useGSAP(
    () => {
      const hero = document.getElementById('hero')
      if (!enabled || !hero) return
      const trigger = ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true,
        scrub: true,
        onUpdate: (self) => {
          progress.current = self.progress
        },
      })
      return () => trigger.kill()
    },
    { dependencies: [enabled] },
  )

  return progress
}
```

- [ ] **Step 5: Escrever `src/components/three/ControllerModel.tsx`** (modelo procedural: painel frontal, placa e carcaça, sem arquivos externos)

```tsx
'use client'

import { RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, type RefObject } from 'react'
import { MathUtils, type Group } from 'three'

const COLORS = {
  housing: '#1c2230',
  panel: '#e9ecf1',
  screen: '#0f2f4a',
  screenGlow: '#39c0f0',
  pcb: '#0b5b3a',
  copper: '#c98f3c',
  chip: '#141414',
  terminal: '#2f9e6a',
  button: '#3a4252',
  buttonAccent: '#2a6fd6',
  capacitor: '#1f2a44',
} as const

const LED_COLORS = ['#22c55e', '#f59e0b', '#ef4444'] as const
const DISPLAY_LINES = [0.44, 0.32, 0.2, 0.08] as const
const CHIPS: Array<[x: number, y: number, w: number, h: number]> = [
  [-0.6, 0.3, 0.38, 0.38],
  [0.2, 0.38, 0.5, 0.3],
  [0.55, -0.32, 0.3, 0.3],
]
const CAPACITORS: Array<[x: number, y: number]> = [
  [-0.95, -0.42],
  [-0.75, -0.42],
  [-0.55, -0.42],
  [0.95, 0.42],
  [0.95, 0.22],
  [-0.2, -0.45],
]
const TRACES: Array<[x: number, y: number, w: number, h: number]> = [
  [-0.2, 0.05, 0.9, 0.02],
  [0.1, -0.1, 0.02, 0.5],
  [-0.9, 0.05, 0.02, 0.5],
  [0.5, 0.1, 0.4, 0.02],
]

function smoothstep(p: number) {
  return p * p * (3 - 2 * p)
}

export function ControllerModel({ progress }: { progress: RefObject<number> }) {
  const root = useRef<Group>(null)
  const front = useRef<Group>(null)
  const back = useRef<Group>(null)

  useFrame((state, delta) => {
    const p = MathUtils.clamp(progress.current, 0, 1)
    const t = state.clock.elapsedTime
    const spread = 0.6 * smoothstep(p)

    if (root.current) {
      const yaw = MathUtils.lerp(-0.35, 0.45, p) + Math.sin(t * 0.4) * 0.04
      const pitch = MathUtils.lerp(0.12, -0.18, p)
      root.current.rotation.y = MathUtils.damp(root.current.rotation.y, yaw, 4, delta)
      root.current.rotation.x = MathUtils.damp(root.current.rotation.x, pitch, 4, delta)
    }
    if (front.current) front.current.position.z = MathUtils.damp(front.current.position.z, 0.24 + spread, 5, delta)
    if (back.current) back.current.position.z = MathUtils.damp(back.current.position.z, -0.24 - spread, 5, delta)
  })

  return (
    <group ref={root} scale={1.1} rotation={[0.12, -0.35, 0]}>
      {/* Painel frontal: moldura clara, display, teclado e LEDs */}
      <group ref={front} position={[0, 0, 0.24]}>
        <RoundedBox args={[2.6, 1.8, 0.12]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color={COLORS.panel} roughness={0.55} metalness={0.05} />
        </RoundedBox>
        <mesh position={[-0.45, 0.25, 0.07]}>
          <boxGeometry args={[1.25, 0.7, 0.02]} />
          <meshStandardMaterial color={COLORS.screen} emissive={COLORS.screenGlow} emissiveIntensity={0.35} roughness={0.3} />
        </mesh>
        {DISPLAY_LINES.map((y, i) => (
          <mesh key={y} position={[-0.62 + i * 0.03, y, 0.085]}>
            <boxGeometry args={[0.72 - i * 0.12, 0.035, 0.005]} />
            <meshStandardMaterial color={COLORS.screenGlow} emissive={COLORS.screenGlow} emissiveIntensity={1.4} />
          </mesh>
        ))}
        {Array.from({ length: 12 }, (_, i) => {
          const col = i % 4
          const row = Math.floor(i / 4)
          return (
            <RoundedBox
              key={i}
              args={[0.2, 0.14, 0.05]}
              radius={0.02}
              smoothness={2}
              position={[0.42 + col * 0.26, 0.34 - row * 0.22, 0.085]}
            >
              <meshStandardMaterial color={i === 11 ? COLORS.buttonAccent : COLORS.button} roughness={0.6} />
            </RoundedBox>
          )
        })}
        {LED_COLORS.map((color, i) => (
          <mesh key={color} position={[-1.05 + i * 0.16, -0.62, 0.075]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} />
          </mesh>
        ))}
      </group>

      {/* Placa: PCB com CIs, capacitores e trilhas de cobre */}
      <group>
        <mesh>
          <boxGeometry args={[2.4, 1.6, 0.04]} />
          <meshStandardMaterial color={COLORS.pcb} roughness={0.7} />
        </mesh>
        {CHIPS.map(([x, y, w, h], i) => (
          <mesh key={i} position={[x, y, 0.05]}>
            <boxGeometry args={[w, h, 0.06]} />
            <meshStandardMaterial color={COLORS.chip} roughness={0.4} />
          </mesh>
        ))}
        {CAPACITORS.map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.2, 20]} />
            <meshStandardMaterial color={COLORS.capacitor} roughness={0.5} metalness={0.3} />
          </mesh>
        ))}
        {TRACES.map(([x, y, w, h], i) => (
          <mesh key={i} position={[x, y, 0.025]}>
            <boxGeometry args={[w, h, 0.004]} />
            <meshStandardMaterial color={COLORS.copper} metalness={0.8} roughness={0.35} />
          </mesh>
        ))}
      </group>

      {/* Carcaça traseira com bornes */}
      <group ref={back} position={[0, 0, -0.24]}>
        <RoundedBox args={[2.6, 1.8, 0.36]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color={COLORS.housing} roughness={0.5} metalness={0.4} />
        </RoundedBox>
        {Array.from({ length: 10 }, (_, i) => (
          <mesh key={i} position={[-1.1 + i * 0.245, -1.0, 0]}>
            <boxGeometry args={[0.2, 0.22, 0.3]} />
            <meshStandardMaterial color={COLORS.terminal} roughness={0.6} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
```

- [ ] **Step 6: Escrever `src/components/three/HeroScene.tsx`** (luzes + `Environment` com `Lightformer`, sem HDRI externo; `frameloop="never"` quando o hero sai da tela)

```tsx
'use client'

import { Environment, Float, Lightformer } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import type { RefObject } from 'react'
import { ControllerModel } from './ControllerModel'

export function HeroScene({ progress, active }: { progress: RefObject<number>; active: boolean }) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={active ? 'always' : 'never'}
        camera={{ position: [0, 0.3, 6.2], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 5]} intensity={1.8} />
        <directionalLight position={[-5, -2, -4]} intensity={0.5} color="#5b93e6" />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={2.5} position={[0, 4, -4]} scale={[8, 2, 1]} />
          <Lightformer form="rect" intensity={1.2} color="#2a6fd6" position={[-5, 0, 2]} rotation={[0, Math.PI / 2, 0]} scale={[4, 4, 1]} />
          <Lightformer form="circle" intensity={1} position={[5, 2, 3]} scale={3} />
        </Environment>
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
          <ControllerModel progress={progress} />
        </Float>
      </Canvas>
    </div>
  )
}
```

- [ ] **Step 7: Reescrever `src/components/three/HeroVisual.tsx`** (decide o modo com `useSyncExternalStore`, para não disparar `setState` dentro de efeito; pausa o render fora da tela)

```tsx
'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { readMotionEnv, resolveHeroMode, type HeroMode } from '@/lib/motion-prefs'
import { useHeroScrollProgress } from './useHeroScrollProgress'

const HeroScene = dynamic(() => import('./HeroScene').then((m) => m.HeroScene), { ssr: false })

export const HERO_FALLBACK = {
  src: '/hero-fallback.webp',
  alt: 'Controlador de grupo gerador aberto em camadas: painel, placa e carcaça',
}

type Mode = HeroMode | 'pending'

// O modo é decidido uma vez por carregamento de página; o snapshot fica em cache para ser estável.
let cachedMode: HeroMode | null = null
function subscribeNoop() {
  return () => {}
}
function getModeSnapshot(): Mode {
  cachedMode ??= resolveHeroMode(window.location.search, readMotionEnv(window))
  return cachedMode
}
function getModeServerSnapshot(): Mode {
  return 'pending'
}

export function HeroVisual() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const mode = useSyncExternalStore(subscribeNoop, getModeSnapshot, getModeServerSnapshot)
  const [active, setActive] = useState(true)
  const progress = useHeroScrollProgress(mode === '3d')

  useEffect(() => {
    const el = wrapRef.current
    if (!el || mode !== '3d') return
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [mode])

  return (
    <div
      ref={wrapRef}
      data-testid="hero-visual"
      data-mode={mode}
      className="relative aspect-square w-full max-w-xl justify-self-center lg:justify-self-end"
    >
      {mode === '3d' ? (
        <HeroScene progress={progress} active={active} />
      ) : (
        <Image
          src={HERO_FALLBACK.src}
          alt={HERO_FALLBACK.alt}
          fill
          priority
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-contain"
          data-testid="hero-fallback"
        />
      )}
    </div>
  )
}
```

- [ ] **Step 8: Escrever `scripts/capture-hero-fallback.mjs`** (gera o WebP a partir da própria cena, spec seção 8)

```js
import { chromium } from 'playwright'
import sharp from 'sharp'

const url = process.env.CAPTURE_URL ?? 'http://localhost:3002/?hero=3d'
const out = 'public/hero-fallback.webp'

const browser = await chromium.launch({
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
})
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 })
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForSelector('[data-testid="hero-visual"][data-mode="3d"] canvas', { timeout: 30_000 })
  await page.waitForTimeout(2_000) // deixa o damp da rotação assentar
  const png = await page.getByTestId('hero-visual').screenshot({ omitBackground: true })
  await sharp(png).webp({ quality: 82, alphaQuality: 90 }).toFile(out)
  console.log(`${out} gerado`)
} finally {
  await browser.close()
}
```

- [ ] **Step 9: Gerar o WebP com o dev server no ar**

```bash
npm run dev &
sleep 8
npm run hero:capture
kill %1
ls -la public/hero-fallback.webp
```

Esperado: arquivo entre 30 KB e 200 KB com o controlador renderizado sobre fundo transparente. Se o Chromium headless não conseguir criar contexto WebGL (mensagem de timeout no `waitForSelector`), converter o SVG provisório: `node -e "require('sharp')('public/hero-fallback.svg',{density:300}).resize(1280,1280).webp({quality:82}).toFile('public/hero-fallback.webp')"` e registrar no relatório que o WebP veio do SVG.

- [ ] **Step 10: Remover o SVG provisório e rodar a suíte**

```bash
rm public/hero-fallback.svg
npm run lint && npm run typecheck && npm test && npm run e2e
```

Esperado: lint sem erros (inclusive nos arquivos de `three/`), 6 testes e2e passando. Abrir `http://localhost:3002` num navegador com WebGL e conferir a olho: o controlador gira e se abre em três camadas conforme o scroll, o hero fica pinado por uma tela extra e volta a rolar normalmente.

- [ ] **Step 11: Commit**

```bash
git add eslint.config.mjs src/components/three scripts/capture-hero-fallback.mjs public/hero-fallback.webp e2e/home.spec.ts
git rm -q --cached public/hero-fallback.svg 2>/dev/null || true
git commit -m "feat: controlador 3D procedural no hero, ligado ao scroll, com fallback em imagem"
```

---

### Task 9: Seções Stats, Serviços e Marcas

**Files:**
- Create: `src/components/sections/Stats.tsx`, `src/components/sections/Services.tsx`, `src/components/sections/Brands.tsx`
- Modify: `src/app/page.tsx`, `e2e/home.spec.ts`

**Interfaces:**
- Consumes: `Reveal`, `Counter`, `SectionHeading`, `ServiceIcon`, `company.stats`, `services`, `brandGroups`.
- Produces: `Stats()`, `Services()` com `<section id="servicos">` e 6 links `/servicos/<slug>`, `Brands()` com `<section id="marcas">`.

- [ ] **Step 1: Acrescentar o teste e2e em `e2e/home.spec.ts`**

```ts
test('seções de stats, serviços e marcas', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#servicos a[href^="/servicos/"]')).toHaveCount(6)
  // Blocos com Reveal ficam invisíveis até entrar na tela: rolar até eles antes de conferir.
  const brand = page.locator('#marcas li', { hasText: 'Woodward' }).first()
  await brand.scrollIntoViewIfNeeded()
  await expect(brand).toBeVisible()
  // Stats: valores ainda não confirmados exibem o marcador de placeholder.
  const stat = page.locator('#stats [data-placeholder-stat]').first()
  await stat.scrollIntoViewIfNeeded()
  await expect(stat).toBeVisible()
})
```

- [ ] **Step 2: Rodar e confirmar a falha**

```bash
npx playwright test -g "stats, serviços"
```

Esperado: falha em `#servicos` (0 elementos).

- [ ] **Step 3: Escrever `src/components/sections/Stats.tsx`**

```tsx
import { Counter } from '@/components/motion/Counter'
import { Reveal } from '@/components/motion/Reveal'
import { company } from '@/data/company'

const hasPlaceholder = company.stats.some((s) => s.placeholder)

export function Stats() {
  return (
    <section id="stats" aria-labelledby="stats-title" className="border-b border-line bg-surface">
      <h2 id="stats-title" className="sr-only">
        Números da MRJ
      </h2>
      <div className="container-x grid gap-8 py-12 sm:grid-cols-3">
        {company.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <p className="font-display text-4xl font-semibold text-brand-600 sm:text-5xl">
              <Counter value={s.value} suffix={s.suffix} />
              {s.placeholder ? (
                <span data-placeholder-stat className="ml-1 text-signal" title="Valor ilustrativo, a confirmar com a MRJ">
                  *
                </span>
              ) : null}
            </p>
            <p className="mt-2 text-sm text-ink-muted">{s.label}</p>
          </Reveal>
        ))}
      </div>
      {hasPlaceholder ? (
        <p className="container-x pb-6 text-xs text-ink-faint">* Valores ilustrativos até confirmação da MRJ.</p>
      ) : null}
    </section>
  )
}
```

- [ ] **Step 4: Escrever `src/components/sections/Services.tsx`**

```tsx
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { services } from '@/data/services'

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="section-y scroll-mt-20">
      <div className="container-x">
        <SectionHeading
          id="servicos-title"
          eyebrow="Serviços"
          title="O que reparamos"
          description="Diagnóstico em laboratório próprio e reparo a nível de componente. Se o seu equipamento não estiver aqui, pergunte no WhatsApp."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.slug} className="h-full">
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <Link
                  href={`/servicos/${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-lg hover:shadow-brand-600/5"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <ServiceIcon name={s.icon} className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{s.shortTitle}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{s.summary}</p>
                  <p className="eyebrow mt-5 text-ink-faint">{s.brands.slice(0, 3).join(' · ')}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                    Ver detalhes
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Escrever `src/components/sections/Brands.tsx`** (marcas só em texto, spec seção 6 item 5)

```tsx
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { brandGroups } from '@/data/brands'

export function Brands() {
  return (
    <section id="marcas" aria-labelledby="marcas-title" className="section-y scroll-mt-20 border-y border-line bg-surface">
      <div className="container-x">
        <SectionHeading
          id="marcas-title"
          eyebrow="Fabricantes"
          title="Marcas que passam pela nossa bancada"
          description="Trabalhamos com os principais fabricantes de cada segmento. Os nomes indicam compatibilidade de serviço, não vínculo com o fabricante."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {brandGroups.map((g, i) => (
            <Reveal key={g.segment} delay={(i % 3) * 0.08}>
              <p className="eyebrow text-brand-600">{g.segment}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {g.brands.map((b) => (
                  <li key={b} className="rounded-full border border-line px-3 py-1 font-display text-sm font-semibold text-ink">
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Adicionar as seções em `src/app/page.tsx`**

```tsx
import { Brands } from '@/components/sections/Brands'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Stats } from '@/components/sections/Stats'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Brands />
    </>
  )
}
```

- [ ] **Step 7: Rodar a suíte e confirmar que passa**

```bash
npm run lint && npm run typecheck && npm test && npm run e2e
```

Esperado: 7 testes e2e passando.

- [ ] **Step 8: Commit**

```bash
git add src/components/sections src/app/page.tsx e2e/home.spec.ts
git commit -m "feat: seções de números, serviços e marcas atendidas"
```

---

### Task 10: Seções Processo, Laboratório e Área de atuação

**Files:**
- Create: `src/components/sections/Process.tsx`, `src/components/sections/Lab.tsx`, `src/components/sections/Coverage.tsx`
- Modify: `src/app/page.tsx`, `e2e/home.spec.ts`

**Interfaces:**
- Consumes: `gsap`, `useGSAP`, `useReducedMotion`, `SectionHeading`, `VideoBlock`, `Photo`, `Reveal`, `processSteps`, `shippingSteps`, `processVideo`, `labVideo`, `labPhotos`.
- Produces: `Process({ compact?: boolean })` com `<section id="processo">` (com `compact` esconde o vídeo e reduz o espaçamento, para a página de serviço); `Lab()` com `<section id="laboratorio">`; `Coverage()` com `<section id="atuacao">`.

- [ ] **Step 1: Acrescentar o teste e2e em `e2e/home.spec.ts`**

```ts
test('processo, laboratório e área de atuação', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#processo ol li')).toHaveCount(5)
  await expect(page.locator('#laboratorio [data-placeholder]')).toHaveCount(4)
  await expect(page.locator('#atuacao svg[role="img"]')).toHaveCount(1)
  await expect(page.locator('#atuacao ol li')).toHaveCount(3)
})
```

- [ ] **Step 2: Rodar e confirmar a falha**

```bash
npx playwright test -g "processo, laboratório"
```

Esperado: falha em `#processo ol li` (0 elementos).

- [ ] **Step 3: Escrever `src/components/sections/Process.tsx`** (linha do tempo que se preenche com o scroll)

```tsx
'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/components/motion/gsap'
import { useReducedMotion } from '@/components/motion/useReducedMotion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { VideoBlock } from '@/components/ui/VideoBlock'
import { processVideo } from '@/data/media'
import { processSteps } from '@/data/process'

export function Process({ compact = false }: { compact?: boolean }) {
  const listRef = useRef<HTMLOListElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const list = listRef.current
      const line = lineRef.current
      if (reduced || !list || !line) return
      gsap.fromTo(
        line,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: list, start: 'top 70%', end: 'bottom 60%', scrub: true } },
      )
    },
    { scope: listRef, dependencies: [reduced] },
  )

  return (
    <section id="processo" aria-labelledby="processo-title" className={`scroll-mt-20 ${compact ? 'py-16' : 'section-y'}`}>
      <div className={`container-x grid gap-12 lg:items-start ${compact ? '' : 'lg:grid-cols-2'}`}>
        <div>
          <SectionHeading
            id="processo-title"
            eyebrow="Processo"
            title="Do recebimento à entrega, sem surpresa"
            description="Cinco etapas, com laudo e orçamento antes de qualquer reparo."
          />
          <ol ref={listRef} className="relative mt-10 space-y-8 pl-10">
            <span aria-hidden="true" className="absolute top-2 bottom-2 left-[13px] w-px bg-line" />
            <span ref={lineRef} aria-hidden="true" className="absolute top-2 bottom-2 left-[13px] w-px origin-top bg-brand-600" />
            {processSteps.map((step, i) => (
              <li key={step.title} className="relative">
                <span className="absolute top-0 -left-10 flex size-7 items-center justify-center rounded-full border border-brand-600 bg-surface font-mono text-xs font-semibold text-brand-600">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-1 text-ink-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
        {compact ? null : (
          <div className="lg:sticky lg:top-28">
            <VideoBlock video={processVideo} className="aspect-[4/5] w-full rounded-3xl" />
          </div>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Escrever `src/components/sections/Lab.tsx`** (quatro diferenciais + mosaico de fotos e vídeo)

```tsx
import { BadgeCheck, Gauge, ShieldCheck, Wrench, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { Photo } from '@/components/ui/Photo'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { VideoBlock } from '@/components/ui/VideoBlock'
import { labPhotos, labVideo } from '@/data/media'

const differentials: Array<{ icon: LucideIcon; title: string; text: string }> = [
  {
    icon: Wrench,
    title: 'Reparo a nível de componente',
    text: 'Trocamos o que falhou, não a placa inteira. Menos custo e menos tempo parado.',
  },
  {
    icon: Gauge,
    title: 'Teste funcional em carga',
    text: 'Todo equipamento sai testado em bancada, simulando a condição real de operação.',
  },
  {
    icon: BadgeCheck,
    title: 'Orçamento gratuito',
    text: 'Diagnóstico e laudo sem custo. Você só paga se aprovar o reparo.',
  },
  {
    icon: ShieldCheck,
    title: 'Garantia do serviço',
    text: 'Período de garantia descrito no orçamento e no relatório de entrega.',
  },
]

export function Lab() {
  return (
    <section id="laboratorio" aria-labelledby="laboratorio-title" className="section-y scroll-mt-20 bg-surface">
      <div className="container-x">
        <SectionHeading
          id="laboratorio-title"
          eyebrow="Laboratório"
          title="Bancada própria, instrumentação e método"
          description="Osciloscópio, fontes, cargas e simuladores de sinal para reproduzir a falha antes de mexer na placa."
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {differentials.map((d, i) => (
              <li key={d.title}>
                <Reveal delay={i * 0.06} className="flex gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <d.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{d.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">{d.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-4">
            <VideoBlock video={labVideo} className="col-span-2 aspect-video w-full rounded-3xl" />
            {labPhotos.map((photo, i) => (
              <Photo
                key={photo.src}
                asset={photo}
                sizes="(min-width: 1024px) 28vw, 50vw"
                className={`aspect-[4/3] w-full rounded-2xl ${i === 2 ? 'col-span-2 sm:col-span-1' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Escrever `src/components/sections/Coverage.tsx`** (mapa estilizado em SVG, sem mapa interativo)

```tsx
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { company } from '@/data/company'
import { shippingSteps } from '@/data/process'

const DOTS: Array<[number, number]> = []
for (let x = 20; x <= 380; x += 24) {
  for (let y = 20; y <= 300; y += 24) DOTS.push([x, y])
}

function CoverageGraphic() {
  return (
    <svg viewBox="0 0 400 320" role="img" aria-label="Chapecó, SC, com atendimento para todo o Brasil" className="h-auto w-full">
      {DOTS.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" className="fill-brand-400/40" />
      ))}
      <g className="fill-none stroke-brand-500/40">
        <circle cx="240" cy="200" r="40" />
        <circle cx="240" cy="200" r="80" strokeDasharray="4 6" />
        <circle cx="240" cy="200" r="120" strokeDasharray="2 8" />
      </g>
      <circle cx="240" cy="200" r="14" className="fill-brand-600/25" />
      <circle cx="240" cy="200" r="7" className="fill-brand-600" />
      <text x="240" y="240" textAnchor="middle" className="fill-ink font-mono text-[11px] font-semibold tracking-widest">
        CHAPECÓ · SC
      </text>
      <text x="240" y="60" textAnchor="middle" className="fill-ink-muted font-mono text-[10px] tracking-widest">
        ATENDIMENTO EM TODO O BRASIL
      </text>
    </svg>
  )
}

export function Coverage() {
  return (
    <section id="atuacao" aria-labelledby="atuacao-title" className="section-y scroll-mt-20 border-t border-line">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            id="atuacao-title"
            eyebrow="Área de atuação"
            title={`Presencial em ${company.address.city} e região, por transportadora em todo o Brasil`}
            description="O equipamento vem até o laboratório, é reparado e volta testado. Simples assim."
          />
          <ol className="mt-10 grid gap-6 sm:grid-cols-3">
            {shippingSteps.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 0.08}>
                  <p className="eyebrow text-brand-600">Passo {String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-2 font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{step.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
        <Reveal className="rounded-3xl border border-line bg-surface p-6">
          <CoverageGraphic />
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Adicionar as três seções em `src/app/page.tsx`**, na ordem `Hero, Stats, Services, Brands, Process, Lab, Coverage`.

- [ ] **Step 7: Rodar a suíte e confirmar que passa**

```bash
npm run lint && npm run typecheck && npm test && npm run e2e
```

Esperado: 8 testes e2e passando. Verificar a olho no navegador: a linha azul do processo se preenche ao rolar; com placeholders, o laboratório mostra 4 blocos hachurados.

- [ ] **Step 8: Commit**

```bash
git add src/components/sections src/app/page.tsx e2e/home.spec.ts
git commit -m "feat: seções de processo com linha do tempo, laboratório e área de atuação"
```

---

### Task 11: FAQ, CTA final, página completa, JSON-LD e 404

**Files:**
- Create: `src/components/sections/Faq.tsx`, `src/components/sections/CtaFinal.tsx`, `src/app/not-found.tsx`
- Modify: `src/app/page.tsx`, `e2e/home.spec.ts`

**Interfaces:**
- Consumes: `Accordion`, `SectionHeading`, `Button`, `JsonLd`, `localBusinessJsonLd`, `landingFaq`, `company`, `buildWhatsAppUrl`, `WA_MESSAGES`, tipo `FaqItem`.
- Produces: `Faq({ items, title?, id? })` (padrões `'Perguntas frequentes'`, `'faq'`); `CtaFinal({ message? })` com `<section id="contato">` e `data-testid="cta-final-tecnico"` / `"cta-final-comercial"`; `NotFound()`.

- [ ] **Step 1: Acrescentar os testes e2e em `e2e/home.spec.ts`**

```ts
test('FAQ, CTA final e JSON-LD LocalBusiness', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#faq details')).toHaveCount(7)
  await expect(page.getByTestId('cta-final-tecnico')).toHaveAttribute('href', /wa\.me\/5549999052518/)
  await expect(page.getByTestId('cta-final-comercial')).toHaveAttribute('href', /wa\.me\/5549999577176/)
  const ld = await page.locator('script[type="application/ld+json"]').first().textContent()
  expect(JSON.parse(ld ?? '{}')).toMatchObject({ '@type': 'LocalBusiness', name: 'MRJ Tecnologia' })
})

test('página inexistente responde 404 em português', async ({ page }) => {
  const response = await page.goto('/pagina-que-nao-existe')
  expect(response?.status()).toBe(404)
  await expect(page.locator('h1')).toContainText('Página não encontrada')
})
```

- [ ] **Step 2: Rodar e confirmar a falha**

```bash
npx playwright test -g "FAQ|404"
```

Esperado: os 2 testes falham (`#faq` inexistente; 404 padrão em inglês).

- [ ] **Step 3: Escrever `src/components/sections/Faq.tsx`**

```tsx
import { Accordion } from '@/components/ui/Accordion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { FaqItem } from '@/data/types'

export interface FaqProps {
  items: FaqItem[]
  title?: string
  id?: string
}

export function Faq({ items, title = 'Perguntas frequentes', id = 'faq' }: FaqProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section-y scroll-mt-20 border-y border-line bg-surface">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading id={`${id}-title`} eyebrow="Dúvidas" title={title} description="Se a sua pergunta não estiver aqui, chame no WhatsApp." />
        <Accordion items={items} />
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Escrever `src/components/sections/CtaFinal.tsx`**

```tsx
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { company } from '@/data/company'
import { buildWhatsAppUrl, WA_MESSAGES } from '@/lib/whatsapp'

const waComercial = buildWhatsAppUrl(company.whatsapp.comercial, WA_MESSAGES.comercial)

export function CtaFinal({ message = WA_MESSAGES.tecnico }: { message?: string }) {
  const waTecnico = buildWhatsAppUrl(company.whatsapp.tecnico, message)
  return (
    <section id="contato" aria-labelledby="contato-title" className="section-y scroll-mt-20 bg-navy-950 text-white">
      <div className="container-x grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="eyebrow text-brand-400">Contato</p>
          <h2 id="contato-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Equipamento parado? Mande foto e modelo agora.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-white/70">
            Respondemos pelo WhatsApp com as instruções de envio e o próximo passo. Orçamento gratuito.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={waTecnico} external variant="whatsapp" size="lg" testId="cta-final-tecnico">
              <MessageCircle className="size-5" aria-hidden="true" />
              Setor técnico
            </Button>
            <Button href={waComercial} external variant="outline-light" size="lg" testId="cta-final-comercial">
              Comercial
            </Button>
          </div>
        </div>
        <dl className="grid gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm">
          <div>
            <dt className="eyebrow text-white/50">Técnico</dt>
            <dd className="mt-1 text-lg font-semibold">
              <a href={`tel:+${company.whatsapp.tecnico}`} className="hover:text-brand-400">
                {company.phoneDisplay.tecnico}
              </a>
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-white/50">Comercial</dt>
            <dd className="mt-1 text-lg font-semibold">
              <a href={`tel:+${company.whatsapp.comercial}`} className="hover:text-brand-400">
                {company.phoneDisplay.comercial}
              </a>
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-white/50">E-mail</dt>
            <dd className="mt-1">
              <a href={`mailto:${company.email}`} className="hover:text-brand-400">
                {company.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-white/50">Onde estamos</dt>
            <dd className="mt-1 text-white/80">
              {company.address.city}, {company.address.state}. Recebemos equipamentos de todo o Brasil por transportadora.
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Escrever `src/app/not-found.tsx`**

```tsx
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70svh] flex-col items-start justify-center pt-28 pb-16">
      <p className="eyebrow text-brand-600">Erro 404</p>
      <h1 className="mt-3 text-4xl font-semibold text-ink">Página não encontrada</h1>
      <p className="mt-4 max-w-md text-lg text-ink-muted">O endereço pode ter mudado. Volte para a página inicial ou veja os serviços.</p>
      <div className="mt-8 flex gap-3">
        <Button href="/">Página inicial</Button>
        <Button href="/#servicos" variant="outline">
          Ver serviços
        </Button>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Montar a landing completa em `src/app/page.tsx`**

```tsx
import { Brands } from '@/components/sections/Brands'
import { Coverage } from '@/components/sections/Coverage'
import { CtaFinal } from '@/components/sections/CtaFinal'
import { Faq } from '@/components/sections/Faq'
import { Hero } from '@/components/sections/Hero'
import { Lab } from '@/components/sections/Lab'
import { Process } from '@/components/sections/Process'
import { Services } from '@/components/sections/Services'
import { Stats } from '@/components/sections/Stats'
import { JsonLd } from '@/components/seo/JsonLd'
import { landingFaq } from '@/data/faq'
import { localBusinessJsonLd } from '@/lib/seo'

export default function Home() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <Hero />
      <Stats />
      <Services />
      <Brands />
      <Process />
      <Lab />
      <Coverage />
      <Faq items={landingFaq} />
      <CtaFinal />
    </>
  )
}
```

- [ ] **Step 7: Rodar a suíte e confirmar que passa**

```bash
npm run lint && npm run typecheck && npm test && npm run e2e
```

Esperado: 10 testes e2e passando.

- [ ] **Step 8: Commit**

```bash
git add src/components/sections src/app/page.tsx src/app/not-found.tsx e2e/home.spec.ts
git commit -m "feat: FAQ, CTA final, JSON-LD LocalBusiness e página 404"
```

---

### Task 12: Páginas de serviço, sitemap e robots

**Files:**
- Create: `src/components/service/ServiceHero.tsx`, `src/components/service/ServiceDetails.tsx`, `src/app/servicos/[slug]/page.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`
- Test: `e2e/services.spec.ts`

**Interfaces:**
- Consumes: `services`, `getService`, `SERVICE_SLUGS`, `serviceCovers`, `serviceJsonLd`, `JsonLd`, `Button`, `Photo`, `ServiceIcon`, `SectionHeading`, `Process({ compact })`, `Faq({ items, title, id })`, `CtaFinal({ message })`.
- Produces: `ServiceHero({ service })` com `data-testid="service-cta"`; `ServiceDetails({ service })`; rota estática `/servicos/[slug]` com `dynamicParams = false`; `/sitemap.xml` e `/robots.txt`.

- [ ] **Step 1: Escrever `e2e/services.spec.ts`**

```ts
import { expect, test } from '@playwright/test'
import { SERVICE_SLUGS } from '../src/data/types'

for (const slug of SERVICE_SLUGS) {
  test(`/servicos/${slug} renderiza com H1, CTA específico e JSON-LD Service`, async ({ page }) => {
    const response = await page.goto(`/servicos/${slug}`)
    expect(response?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.getByTestId('service-cta')).toHaveAttribute('href', /^https:\/\/wa\.me\/5549999052518\?text=Ol%C3%A1/)
    await expect(page.locator('#processo ol li')).toHaveCount(5)
    await expect(page.locator('#faq-servico details')).toHaveCount(3)
    const ld = await page.locator('script[type="application/ld+json"]').first().textContent()
    expect(JSON.parse(ld ?? '{}')).toMatchObject({ '@type': 'Service', url: `https://mrjtecnologia.com.br/servicos/${slug}` })
  })
}

test('slug desconhecido responde 404', async ({ page }) => {
  const response = await page.goto('/servicos/nao-existe')
  expect(response?.status()).toBe(404)
})

test('sitemap lista a home e os 6 serviços; robots aponta para o sitemap', async ({ request }) => {
  const sitemap = await (await request.get('/sitemap.xml')).text()
  expect(sitemap.match(/<loc>/g)).toHaveLength(7)
  expect(sitemap).toContain('https://mrjtecnologia.com.br/servicos/ihms-industriais')
  const robots = await (await request.get('/robots.txt')).text()
  expect(robots).toContain('Sitemap: https://mrjtecnologia.com.br/sitemap.xml')
})
```

- [ ] **Step 2: Rodar e confirmar a falha**

```bash
npx playwright test e2e/services.spec.ts
```

Esperado: todos falham com 404 (rotas inexistentes).

- [ ] **Step 3: Escrever `src/components/service/ServiceHero.tsx`** (hero claro, com breadcrumb)

```tsx
import { MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Photo } from '@/components/ui/Photo'
import { company } from '@/data/company'
import { serviceCovers } from '@/data/media'
import type { Service } from '@/data/types'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export function ServiceHero({ service }: { service: Service }) {
  const whatsapp = buildWhatsAppUrl(company.whatsapp.tecnico, service.whatsappMessage)
  return (
    <section className="border-b border-line bg-surface pt-28 pb-16 sm:pt-36">
      <div className="container-x grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <nav aria-label="Você está em" className="eyebrow text-ink-faint">
            <Link href="/" className="hover:text-brand-600">
              Início
            </Link>
            <span className="mx-2">/</span>
            <Link href="/#servicos" className="hover:text-brand-600">
              Serviços
            </Link>
          </nav>
          <p className="eyebrow mt-6 text-brand-600">Assistência técnica</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{service.title}</h1>
          <p className="mt-5 max-w-xl text-lg text-ink-muted">{service.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={whatsapp} external variant="whatsapp" size="lg" testId="service-cta">
              <MessageCircle className="size-5" aria-hidden="true" />
              Pedir orçamento
            </Button>
            <Button href="#processo" variant="outline" size="lg">
              Como funciona
            </Button>
          </div>
        </div>
        <Photo asset={serviceCovers[service.slug]} className="aspect-[4/3] w-full rounded-3xl" sizes="(min-width: 1024px) 45vw, 100vw" priority />
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Escrever `src/components/service/ServiceDetails.tsx`** (sintomas, o que fazemos, marcas)

```tsx
import { Check } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import type { Service } from '@/data/types'

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-ink-muted">
            <Check className="mt-1 size-4 shrink-0 text-brand-600" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ServiceDetails({ service }: { service: Service }) {
  return (
    <section aria-labelledby="detalhes-title" className="section-y">
      <div className="container-x">
        <div className="flex items-start gap-4">
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <ServiceIcon name={service.icon} className="size-6" />
          </span>
          <SectionHeading id="detalhes-title" eyebrow="Detalhes" title="Sintomas, solução e marcas atendidas" />
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          <Reveal>
            <List title="Sintomas comuns" items={service.symptoms} />
          </Reveal>
          <Reveal delay={0.08}>
            <List title="O que fazemos" items={service.actions} />
          </Reveal>
          <Reveal delay={0.16}>
            <h3 className="text-lg font-semibold text-ink">Marcas atendidas</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {service.brands.map((b) => (
                <li key={b} className="rounded-full border border-line bg-surface px-3 py-1 font-display text-sm font-semibold text-ink">
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ink-faint">Outras marcas do mesmo tipo de equipamento também são atendidas. Pergunte no WhatsApp.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Escrever `src/app/servicos/[slug]/page.tsx`** (`params` é `Promise` no Next 16)

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CtaFinal } from '@/components/sections/CtaFinal'
import { Faq } from '@/components/sections/Faq'
import { Process } from '@/components/sections/Process'
import { JsonLd } from '@/components/seo/JsonLd'
import { ServiceDetails } from '@/components/service/ServiceDetails'
import { ServiceHero } from '@/components/service/ServiceHero'
import { getService, services } from '@/data/services'
import { serviceJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/servicos/${service.slug}` },
    openGraph: { title: `${service.title} | MRJ Tecnologia`, description: service.summary },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <ServiceHero service={service} />
      <ServiceDetails service={service} />
      <Process compact />
      <Faq items={service.faq} title="Dúvidas sobre este serviço" id="faq-servico" />
      <CtaFinal message={service.whatsappMessage} />
    </>
  )
}
```

- [ ] **Step 6: Escrever `src/app/sitemap.ts` e `src/app/robots.ts`**

`src/app/sitemap.ts`:

```ts
import type { MetadataRoute } from 'next'
import { company } from '@/data/company'
import { services } from '@/data/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    { url: company.siteUrl, lastModified, changeFrequency: 'monthly', priority: 1 },
    ...services.map((s) => ({
      url: `${company.siteUrl}/servicos/${s.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
```

`src/app/robots.ts`:

```ts
import type { MetadataRoute } from 'next'
import { company } from '@/data/company'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${company.siteUrl}/sitemap.xml`,
  }
}
```

- [ ] **Step 7: Rodar a suíte completa e confirmar que passa**

```bash
npm run lint && npm run typecheck && npm test && npm run e2e
```

Esperado: 18 testes e2e passando (10 da home + 8 de serviços). O `next build` lista `/servicos/[slug]` com os 6 caminhos estáticos (símbolo ● SSG).

- [ ] **Step 8: Commit**

```bash
git add src/components/service "src/app/servicos" src/app/sitemap.ts src/app/robots.ts e2e/services.spec.ts
git commit -m "feat: páginas de serviço estáticas com metadata e JSON-LD, sitemap e robots"
```

---

### Task 13: Imagem OG, pipeline de mídia, Lighthouse e verificação final

**Files:**
- Create: `scripts/make-og.mjs`, `scripts/optimize-media.mjs`, `public/og.jpg`, `public/photos/.gitkeep`, `public/videos/.gitkeep`
- Modify: `README.md`, `CLAUDE.md` (se algum comando mudou)

**Interfaces:**
- Consumes: `company` (só texto), scripts npm `hero:capture` e `media:optimize`.
- Produces: `public/og.jpg` 1200×630; fluxo documentado para fotos e vídeos do cliente; relatório de Lighthouse.

- [ ] **Step 1: Escrever `scripts/make-og.mjs`** (gera a imagem Open Graph com sharp a partir de um SVG)

```js
import sharp from 'sharp'

const verticals = Array.from({ length: 26 }, (_, i) => `<path d="M${i * 48} 0V630"/>`).join('')
const horizontals = Array.from({ length: 14 }, (_, i) => `<path d="M0 ${i * 48}H1200"/>`).join('')

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#06162e"/>
  <g stroke="#ffffff" stroke-opacity="0.05">${verticals}${horizontals}</g>
  <circle cx="920" cy="180" r="280" fill="#2a6fd6" fill-opacity="0.18"/>
  <text x="80" y="290" font-family="Arial, Helvetica, sans-serif" font-size="76" font-weight="700" fill="#ffffff">MRJ Tecnologia</text>
  <text x="80" y="360" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#c7d2fe">Assistência técnica especializada</text>
  <text x="80" y="408" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#c7d2fe">em eletrônica industrial</text>
  <text x="80" y="540" font-family="Courier New, monospace" font-size="22" letter-spacing="4" fill="#5b93e6">CHAPECÓ · SC · ATENDIMENTO EM TODO O BRASIL</text>
</svg>`

await sharp(Buffer.from(svg)).jpeg({ quality: 88, mozjpeg: true }).toFile('public/og.jpg')
console.log('public/og.jpg gerado (1200x630)')
```

- [ ] **Step 2: Gerar a imagem e conferir**

```bash
node scripts/make-og.mjs && node -e "require('sharp')('public/og.jpg').metadata().then(m => console.log(m.width, m.height, m.format))"
```

Esperado: `1200 630 jpeg`.

- [ ] **Step 3: Escrever `scripts/optimize-media.mjs`** (fotos via sharp; vídeos via ffmpeg se instalado)

```js
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { basename, extname, join } from 'node:path'
import sharp from 'sharp'

const PHOTO_SRC = 'media-src/photos'
const PHOTO_OUT = 'public/photos'
const VIDEO_SRC = 'media-src/videos'
const VIDEO_OUT = 'public/videos'

mkdirSync(PHOTO_OUT, { recursive: true })
mkdirSync(VIDEO_OUT, { recursive: true })

if (existsSync(PHOTO_SRC)) {
  for (const file of readdirSync(PHOTO_SRC)) {
    if (!/\.(jpe?g|png|webp)$/i.test(file)) continue
    const name = basename(file, extname(file))
    await sharp(join(PHOTO_SRC, file))
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(join(PHOTO_OUT, `${name}.webp`))
    console.log(`foto: ${PHOTO_OUT}/${name}.webp`)
  }
}

function hasFfmpeg() {
  try {
    execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

if (existsSync(VIDEO_SRC)) {
  const videos = readdirSync(VIDEO_SRC).filter((f) => /\.(mp4|mov|m4v)$/i.test(f))
  if (videos.length > 0 && !hasFfmpeg()) {
    console.warn('ffmpeg não encontrado. Instale com `sudo apt install ffmpeg` e rode de novo.')
  } else {
    for (const file of videos) {
      const name = basename(file, extname(file))
      const input = join(VIDEO_SRC, file)
      // Até 12 s, sem áudio, 1280px de largura (spec seção 10).
      const common = ['-y', '-i', input, '-t', '12', '-an', '-vf', 'scale=1280:-2:flags=lanczos']
      execFileSync('ffmpeg', [...common, '-c:v', 'libx264', '-crf', '28', '-preset', 'slow', '-movflags', '+faststart', '-pix_fmt', 'yuv420p', join(VIDEO_OUT, `${name}.mp4`)], { stdio: 'inherit' })
      execFileSync('ffmpeg', [...common, '-c:v', 'libvpx-vp9', '-crf', '36', '-b:v', '0', '-row-mt', '1', join(VIDEO_OUT, `${name}.webm`)], { stdio: 'inherit' })
      const framePng = join(VIDEO_OUT, `${name}.png`)
      execFileSync('ffmpeg', ['-y', '-i', input, '-frames:v', '1', '-vf', 'scale=1280:-2', framePng], { stdio: 'inherit' })
      await sharp(framePng).webp({ quality: 78 }).toFile(join(VIDEO_OUT, `${name}.webp`))
      rmSync(framePng)
      console.log(`vídeo: ${VIDEO_OUT}/${name}.mp4, .webm e poster .webp`)
    }
  }
}
```

- [ ] **Step 4: Criar as pastas de destino e testar o script sem material**

```bash
touch public/photos/.gitkeep public/videos/.gitkeep
npm run media:optimize
```

Esperado: termina sem erro e sem saída (não há `media-src/`).

- [ ] **Step 5: Atualizar a seção "Material do cliente" do `README.md`**

```markdown
## Material do cliente

1. Coloque os originais em `media-src/photos` (JPG/PNG) e `media-src/videos` (MP4/MOV). A pasta `media-src/` não vai para o git.
2. Rode `npm run media:optimize`. Fotos viram WebP de até 1600px em `public/photos`; vídeos viram MP4 + WebM de até 12 s com poster em `public/videos` (precisa de `ffmpeg`).
3. Renomeie os arquivos gerados para os nomes esperados em `src/data/media.ts` (ex.: `lab-bancada.webp`, `bancada-processo.mp4`) e marque `available: true` no item correspondente.
4. Logo oficial: substitua `public/logo.svg` (versão escura) e `public/logo-white.svg` (versão branca), mantendo proporção próxima de 220×48, e ajuste `--color-brand-600` em `src/app/globals.css` para o azul do logo.
5. Números dos contadores: edite `stats` em `src/data/company.ts` e troque `placeholder` para `false` quando a MRJ confirmar.
6. Depois de trocar o modelo 3D ou as cores do hero, rode `npm run dev` e `npm run hero:capture` para regerar `public/hero-fallback.webp`.
```

- [ ] **Step 6: Rodar o Lighthouse mobile na home e numa página de serviço**

```bash
npm run build
npm run start &
sleep 6
export CHROME_PATH="$(node -e "console.log(require('playwright').chromium.executablePath())")"
for path in "" "servicos/inversores-de-frequencia-e-soft-starters"; do
  npx --yes lighthouse@12 "http://localhost:3002/$path" --form-factor=mobile --screenEmulation.mobile \
    --only-categories=performance,accessibility,best-practices,seo \
    --chrome-flags="--headless=new --no-sandbox" --output=json --output-path="./lighthouse-${path:-home}.json" --quiet
done
kill %1
node -e "for (const f of ['home','servicos/inversores-de-frequencia-e-soft-starters']) { const r = require('./lighthouse-' + f + '.json').categories; console.log(f, Object.fromEntries(Object.entries(r).map(([k, v]) => [k, Math.round(v.score * 100)]))) }"
```

Esperado: as quatro categorias ≥ 90 nas duas páginas. Se Performance ficar abaixo de 90 na home, as causas prováveis, em ordem: (1) o chunk do three/R3F entrando antes da hidratação (conferir que `HeroScene` só é importado via `next/dynamic` com `ssr: false`); (2) a imagem de fallback grande demais (reduzir `quality` no `capture-hero-fallback.mjs`); (3) fontes sem `display: 'swap'`. Corrigir e repetir até passar; registrar os números finais no relatório da task.

- [ ] **Step 7: Verificação final completa**

```bash
npm run lint && npm run typecheck && npm test && npm run build && npm run e2e
git status --short
```

Esperado: tudo verde; `git status` mostra só os arquivos desta task (os JSON do Lighthouse ficam fora pelo `.gitignore`).

- [ ] **Step 8: Commit**

```bash
git add scripts/make-og.mjs scripts/optimize-media.mjs public/og.jpg public/photos/.gitkeep public/videos/.gitkeep README.md CLAUDE.md
git commit -m "chore: imagem OG, scripts de otimização de mídia e documentação de entrega"
```

---

## Critérios de aceite do plano inteiro

- `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` e `npm run e2e` passam do início ao fim.
- A home tem: nav fixa, hero escuro com 3D ligado ao scroll (ou imagem, conforme o ambiente), stats com marcador de placeholder, 6 serviços, marcas por segmento, processo com linha do tempo, laboratório com placeholders, área de atuação, FAQ, CTA final, rodapé e botão flutuante.
- As 6 páginas de serviço abrem em `/servicos/<slug>`, com CTA específico, JSON-LD `Service` e 404 para slugs desconhecidos.
- Com `prefers-reduced-motion: reduce`: sem Lenis, sem canvas, reveals visíveis, contadores no valor final.
- Nenhum logotipo de terceiro, nenhum número de prova social sem `placeholder`, nenhum prazo ou garantia em números no copy.
- Lighthouse mobile ≥ 90 nas quatro categorias.
- O que fica para o cliente: logo SVG, fotos, vídeos, domínio definitivo e os números dos contadores (todos com pontos de troca documentados no README).
