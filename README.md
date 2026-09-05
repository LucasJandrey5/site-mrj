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
