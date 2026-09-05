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
