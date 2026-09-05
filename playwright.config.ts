import { existsSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { defineConfig, devices } from '@playwright/test'

// Sem sudo no WSL, as libs de sistema do Chromium (libnss3, libnspr4, libasound2) podem ser
// extraídas em ~/.local/lib/playwright-deps (ver README, seção "Testes e2e sem sudo").
const localLibs = join(homedir(), '.local', 'lib', 'playwright-deps')
const browserEnv = existsSync(localLibs)
  ? { LD_LIBRARY_PATH: [localLibs, process.env.LD_LIBRARY_PATH].filter(Boolean).join(':') }
  : {}

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3002',
    trace: 'retain-on-failure',
    launchOptions: { env: { ...process.env, ...browserEnv } },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run build && npm run start',
    url: 'http://localhost:3002',
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
})
