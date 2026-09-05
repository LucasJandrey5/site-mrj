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
