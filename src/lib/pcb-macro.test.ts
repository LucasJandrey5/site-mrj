import { describe, expect, it } from 'vitest'
import { pcbMacroDataUri, pcbMacroSvg } from './pcb-macro'

describe('pcbMacroSvg', () => {
  it('é um SVG com namespace, exigido para servir de imagem em CSS', () => {
    const svg = pcbMacroSvg('hero')
    expect(svg.startsWith('<svg')).toBe(true)
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"')
    expect(svg.trimEnd().endsWith('</svg>')).toBe(true)
  })

  it('é determinístico, para o HTML gerado não mudar a cada build', () => {
    expect(pcbMacroSvg('hero')).toBe(pcbMacroSvg('hero'))
  })

  it('prefixa os ids com o identificador recebido, para duas placas não colidirem', () => {
    expect(pcbMacroSvg('a')).toContain('id="pcb-a"')
    expect(pcbMacroSvg('b')).toContain('id="pcb-b"')
    expect(pcbMacroSvg('a')).not.toContain('id="pcb-b"')
  })

  it('tem trilhas, pads e componentes suficientes para toda letra mostrar algo', () => {
    const svg = pcbMacroSvg('hero')
    expect((svg.match(/<path/g) ?? []).length).toBeGreaterThan(20)
    expect((svg.match(/<circle/g) ?? []).length).toBeGreaterThan(40)
    expect(svg).toContain('<rect')
  })
})

describe('pcbMacroDataUri', () => {
  it('devolve um url() de CSS pronto para uso', () => {
    const uri = pcbMacroDataUri('hero')
    expect(uri.startsWith('url("data:image/svg+xml,')).toBe(true)
    expect(uri.endsWith('")')).toBe(true)
  })

  it('não deixa aspas cruas escaparem para dentro do url()', () => {
    const conteudo = pcbMacroDataUri('hero').slice('url("'.length, -'")'.length)
    expect(conteudo).not.toContain('"')
    expect(conteudo).not.toContain("'")
    expect(conteudo).not.toContain('#')
  })
})
