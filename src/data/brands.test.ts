import { describe, expect, it } from 'vitest'
import { allBrands, brands, brandSegments, brandsOfSegment, primarySegment } from './brands'
import { services } from './services'
import { SERVICE_SLUGS } from './types'

describe('brandSegments', () => {
  it('tem 6 segmentos com ids únicos apontando para serviços existentes', () => {
    expect(brandSegments).toHaveLength(6)
    const ids = brandSegments.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const s of brandSegments) {
      expect(SERVICE_SLUGS).toContain(s.service)
      expect(s.label.length).toBeGreaterThan(5)
      expect(s.repairs.length).toBeGreaterThan(15)
      expect(s.repairs[0]).toBe(s.repairs[0].toLowerCase())
    }
  })

  it('cada segmento tem ao menos 3 marcas', () => {
    for (const s of brandSegments) {
      expect(brandsOfSegment(s.id).length, s.id).toBeGreaterThanOrEqual(3)
    }
  })
})

describe('brands', () => {
  it('nomes são únicos e a lista cobre o marquee', () => {
    expect(new Set(allBrands).size).toBe(allBrands.length)
    expect(brands.length).toBeGreaterThanOrEqual(10)
  })

  it('toda marca tem estilo válido e segmentos conhecidos', () => {
    const ids = new Set(brandSegments.map((s) => s.id))
    for (const b of brands) {
      expect([1, 2, 3, 4, 5, 6]).toContain(b.style)
      expect(b.segments.length).toBeGreaterThanOrEqual(1)
      for (const id of b.segments) expect(ids.has(id), `${b.name} → ${id}`).toBe(true)
    }
  })

  it('primarySegment resolve para todas as marcas', () => {
    for (const b of brands) expect(() => primarySegment(b)).not.toThrow()
    expect(primarySegment(brands[0]).service).toBe('controladores-de-grupo-gerador')
  })

  it('toda marca citada em um serviço existe na lista', () => {
    const known = new Set(allBrands.map((b) => b.toLowerCase()))
    for (const s of services) {
      for (const b of s.brands) {
        const base = b.replace(/\s*\(.*\)$/, '').toLowerCase()
        expect(known.has(base), `${b} (${s.slug}) não está em brands.ts`).toBe(true)
      }
    }
  })
})
