import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Marquee, type MarqueeItem } from './Marquee'

const items: MarqueeItem[] = ['ComAp', 'WEG', 'Zapi'].map((name) => ({
  key: name,
  render: (isCopy) => <a href={`/${name}`} tabIndex={isCopy ? -1 : undefined}>{name}</a>,
}))

describe('Marquee', () => {
  it('duplica a lista para fechar o loop e esconde a cópia dos leitores de tela', () => {
    const html = renderToStaticMarkup(<Marquee items={items} />)
    expect(html.match(/<li/g)).toHaveLength(6)
    expect(html.match(/aria-hidden="true"/g)).toHaveLength(3)
    expect(html.match(/tabindex="-1"/g)).toHaveLength(3)
    expect(html).toContain('animate-marquee')
  })

  it('aceita sentido invertido e duração própria', () => {
    const html = renderToStaticMarkup(<Marquee items={items} direction="right" durationSec={30} />)
    expect(html).toContain('[animation-direction:reverse]')
    expect(html).toContain('animation-duration:30s')
  })

  it('no sentido padrão não inverte a animação', () => {
    expect(renderToStaticMarkup(<Marquee items={items} />)).not.toContain('[animation-direction:reverse]')
  })
})
