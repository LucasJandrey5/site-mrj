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

1. Coloque os originais em `media-src/photos` (JPG/PNG) e `media-src/videos` (MP4/MOV). A pasta `media-src/` não vai para o git.
2. Rode `npm run media:optimize`. Fotos viram WebP de até 1600px em `public/photos`; vídeos viram MP4 + WebM de até 12 s com poster em `public/videos` (precisa de `ffmpeg`).
3. Renomeie os arquivos gerados para os nomes esperados em `src/data/media.ts` (ex.: `lab-bancada.webp`, `bancada-processo.mp4`) e marque `available: true` no item correspondente.
4. Logo oficial: substitua `public/logo.svg` (versão escura) e `public/logo-white.svg` (versão branca), mantendo proporção próxima de 220×48, e ajuste `--color-brand-600` em `src/app/globals.css` para o azul do logo.
5. Números dos contadores: edite `stats` em `src/data/company.ts` e troque `placeholder` para `false` quando a MRJ confirmar.
6. Domínio: troque `siteUrl` em `src/data/company.ts` antes de publicar (afeta metadata, sitemap, robots e JSON-LD).
7. Depois de trocar o modelo 3D ou as cores do hero, rode `npm run dev` e `npm run hero:capture` para regerar `public/hero-fallback.webp`.

## Testes e2e sem sudo (WSL)

O Chromium do Playwright precisa de `libnss3`, `libnspr4` e `libasound2`. Com sudo: `sudo npx playwright install-deps chromium`. Sem sudo, extraia as libs localmente uma vez:

```bash
mkdir -p /tmp/pw-debs ~/.local/lib/playwright-deps && cd /tmp/pw-debs
apt-get download libnspr4 libnss3 libasound2t64
for f in *.deb; do dpkg-deb -x "$f" extract; done
find extract -name "*.so*" -exec cp {} ~/.local/lib/playwright-deps/ \;
```

O `playwright.config.ts` e o `scripts/capture-hero-fallback.mjs` detectam essa pasta e a injetam em `LD_LIBRARY_PATH` do navegador.
