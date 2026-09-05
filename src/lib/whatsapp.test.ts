import { describe, expect, it } from 'vitest'
import { buildWhatsAppUrl, normalizePhone, WA_MESSAGES } from './whatsapp'

describe('normalizePhone', () => {
  it('mantém número já com DDI 55', () => {
    expect(normalizePhone('5549999052518')).toBe('5549999052518')
  })
  it('remove símbolos e adiciona DDI 55', () => {
    expect(normalizePhone('(49) 99905-2518')).toBe('5549999052518')
  })
  it('não confunde DDD 55 com DDI', () => {
    expect(normalizePhone('(55) 99999-9999')).toBe('5555999999999')
  })
  it('rejeita número curto demais', () => {
    expect(() => normalizePhone('49 9990')).toThrow(/inválido/)
  })
})

describe('buildWhatsAppUrl', () => {
  it('gera link wa.me com mensagem codificada', () => {
    const url = buildWhatsAppUrl('5549999052518', 'Olá! Vim pelo site.')
    expect(url).toBe('https://wa.me/5549999052518?text=Ol%C3%A1!%20Vim%20pelo%20site.')
  })
  it('sem mensagem, gera link limpo', () => {
    expect(buildWhatsAppUrl('5549999052518', '   ')).toBe('https://wa.me/5549999052518')
  })
})

describe('WA_MESSAGES', () => {
  it('mensagens padrão começam com saudação e citam o site', () => {
    expect(WA_MESSAGES.tecnico).toMatch(/^Olá.*site/)
    expect(WA_MESSAGES.comercial).toMatch(/^Olá.*site/)
  })
})
