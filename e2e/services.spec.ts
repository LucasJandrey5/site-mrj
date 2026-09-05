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
