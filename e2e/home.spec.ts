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

test('hero tem H1, CTA do técnico e marquee de marcas', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#hero h1')).toContainText('Eletrônica industrial')
  await expect(page.getByTestId('hero-cta')).toHaveAttribute('href', /^https:\/\/wa\.me\/5549999052518\?text=/)
  await expect(page.getByTestId('hero-visual')).toBeVisible()
  await expect(page.locator('#hero li', { hasText: 'ComAp' }).first()).toBeVisible()
})

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
