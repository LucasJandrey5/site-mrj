import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Hero } from './Hero'

const html = renderToStaticMarkup(<Hero />)

describe('Hero', () => {
  it('tem um H1 legível como texto, e não como imagem', () => {
    expect(html).toMatch(/<h1[^>]*>[\s\S]*Eletrônica[\s\S]*industrial[\s\S]*<\/h1>/)
    expect(html.match(/<h1/g)).toHaveLength(1)
  })

  it('recorta o título na placa em vez de desenhar as letras chapadas', () => {
    expect(html).toContain('pcb-text')
    expect(html).toContain('data:image/svg+xml,')
  })

  it('leva ao WhatsApp do técnico com mensagem pronta', () => {
    expect(html).toMatch(/href="https:\/\/wa\.me\/5549999052518\?text=[^"]+"/)
  })

  it('não carrega mais a cena 3D no topo', () => {
    expect(html).not.toContain('hero-visual')
  })
})
