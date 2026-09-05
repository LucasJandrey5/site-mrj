import { describe, expect, it } from 'vitest'
import { company } from './company'

describe('company', () => {
  it('números de WhatsApp só têm dígitos, com DDI 55', () => {
    expect(company.whatsapp.tecnico).toMatch(/^55\d{10,11}$/)
    expect(company.whatsapp.comercial).toMatch(/^55\d{10,11}$/)
    expect(company.whatsapp.tecnico).not.toBe(company.whatsapp.comercial)
  })

  it('tem 3 stats e cada um declara se é placeholder', () => {
    expect(company.stats).toHaveLength(3)
    for (const s of company.stats) {
      expect(typeof s.placeholder).toBe('boolean')
      expect(s.value).toBeGreaterThan(0)
      expect(s.label.length).toBeGreaterThan(3)
    }
  })

  it('siteUrl é https sem barra final', () => {
    expect(company.siteUrl).toMatch(/^https:\/\/[^/]+$/)
  })
})
