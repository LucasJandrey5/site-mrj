import { describe, expect, it } from 'vitest'
import { getService, services } from './services'
import { SERVICE_SLUGS } from './types'

describe('services', () => {
  it('tem exatamente 6 serviços, um por slug conhecido', () => {
    expect(services).toHaveLength(6)
    expect([...services.map((s) => s.slug)].sort()).toEqual([...SERVICE_SLUGS].sort())
  })

  it('slugs são únicos e em kebab-case', () => {
    const slugs = services.map((s) => s.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it('cada serviço tem conteúdo mínimo', () => {
    for (const s of services) {
      expect(s.title.length).toBeGreaterThan(5)
      expect(s.shortTitle.length).toBeGreaterThan(3)
      expect(s.summary.length).toBeGreaterThan(20)
      expect(s.description.length).toBeGreaterThan(40)
      expect(s.brands.length).toBeGreaterThanOrEqual(3)
      expect(s.symptoms.length).toBeGreaterThanOrEqual(3)
      expect(s.actions.length).toBeGreaterThanOrEqual(3)
      expect(s.faq.length).toBeGreaterThanOrEqual(3)
      expect(s.whatsappMessage).toMatch(/^Olá/)
    }
  })

  it('não promete prazo nem garantia em números', () => {
    const texto = JSON.stringify(services)
    expect(texto).not.toMatch(/\d+\s*(h|horas|dias|meses|anos)\b/i)
  })

  it('getService devolve o serviço pelo slug e undefined para desconhecido', () => {
    expect(getService('ihms-industriais')?.title).toBe('IHMs industriais')
    expect(getService('nao-existe')).toBeUndefined()
  })
})
