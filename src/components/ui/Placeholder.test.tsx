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
