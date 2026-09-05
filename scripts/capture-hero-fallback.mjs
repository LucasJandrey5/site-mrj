import { existsSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { chromium } from 'playwright'
import sharp from 'sharp'

const url = process.env.CAPTURE_URL ?? 'http://localhost:3002/?hero=3d'
const out = 'public/hero-fallback.webp'

// Mesma pasta de libs locais usada pelo playwright.config.ts (WSL sem sudo).
const localLibs = join(homedir(), '.local', 'lib', 'playwright-deps')
const env = existsSync(localLibs)
  ? { ...process.env, LD_LIBRARY_PATH: [localLibs, process.env.LD_LIBRARY_PATH].filter(Boolean).join(':') }
  : process.env

const browser = await chromium.launch({
  env,
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
