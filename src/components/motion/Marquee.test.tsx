import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Marquee } from './Marquee'

describe('Marquee', () => {
  it('duplica a lista para o loop e esconde a cópia de leitores de tela', () => {
    const html = renderToStaticMarkup(<Marquee items={['ComAp', 'WEG', 'Zapi']} />)
    expect(html.match(/<li/g)).toHaveLength(6)
    expect(html.match(/aria-hidden="true"/g)).toHaveLength(3)
    expect(html).toContain('animate-marquee')
  })
})
