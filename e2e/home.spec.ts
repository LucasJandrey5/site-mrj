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

test('hero tem H1, CTA do técnico e o visual do controlador', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#hero h1')).toContainText('Eletrônica industrial')
  await expect(page.getByTestId('hero-cta')).toHaveAttribute('href', /^https:\/\/wa\.me\/5549999052518\?text=/)
  await expect(page.getByTestId('hero-visual')).toBeVisible()
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

test('seções de stats, serviços e marcas', async ({ page }) => {
  // A esteira de marcas nunca fica "estável" para o Playwright enquanto anima;
  // com movimento reduzido ela para e os elementos ficam acionáveis.
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('#servicos a[href^="/servicos/"]')).toHaveCount(6)
  // Blocos com Reveal ficam invisíveis até entrar na tela: rolar até eles antes de conferir.
  const brand = page.locator('#marcas li', { hasText: 'Woodward' }).first()
  await brand.scrollIntoViewIfNeeded()
  await expect(brand).toBeVisible()
  await expect(page.locator('#marcas ul')).toHaveCount(3)
  // Faixa escura com quatro números, dois deles contados do próprio conteúdo.
  await expect(page.locator('#stats [data-testid="stat"]')).toHaveCount(4)
  await expect(page.locator('#stats')).toContainText('fabricantes atendidos')
  await expect(page.locator('#stats')).toContainText('31')
})

test('processo, laboratório e área de atuação', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#processo ol li')).toHaveCount(5)
  await expect(page.locator('#laboratorio [data-testid="lab-tile"]')).toHaveCount(8)
  await expect(page.locator('#atuacao svg[role="img"]')).toHaveCount(1)
  await expect(page.locator('#atuacao ol li')).toHaveCount(3)
})

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

test('esteira de fabricantes leva ao serviço e o painel segue o hover', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  // A classe da animação continua no HTML; é o CSS que a desliga em reduced motion.
  await expect(page.locator('#marcas ul').first()).toHaveClass(/animate-marquee/)
  const woodward = page.locator('#marcas a', { hasText: 'Woodward' }).first()
  await woodward.scrollIntoViewIfNeeded()
  await expect(woodward).toHaveAttribute('href', '/servicos/controladores-de-grupo-gerador')

  // O painel nasce com a primeira marca e passa a seguir a marca sob o cursor.
  const readout = page.locator('#marcas [aria-live="polite"]')
  await expect(readout).toContainText('ComAp')
  await page.locator('#marcas a', { hasText: 'Zapi' }).first().hover()
  await expect(readout).toContainText('Zapi')
  await expect(readout).toContainText('Empilhadeiras e paleteiras')
})

test('índice de serviços troca a prévia conforme a linha', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const preview = page.locator('#servicos aside')
  // Nasce com o primeiro serviço, para a seção nunca aparecer vazia.
  await expect(preview).toContainText('Controladores de grupo gerador')
  await expect(preview).toContainText('Display apagado')

  await page.locator('#servicos a', { hasText: 'IHMs industriais' }).first().hover()
  await expect(preview).toContainText('Touch não responde')
})

test('mosaico do laboratório abre a foto em tela cheia', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const first = page.locator('#laboratorio button[data-testid="lab-tile"]').first()
  await first.scrollIntoViewIfNeeded()
  await first.click()

  const dialog = page.locator('#laboratorio dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog).toContainText('A bancada em operação')

  await page.getByRole('button', { name: 'Próxima foto' }).click()
  await expect(dialog).toContainText('Macro da placa')

  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
})
