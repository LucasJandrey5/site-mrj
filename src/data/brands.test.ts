import { describe, expect, it } from 'vitest'
import { allBrands, brandGroups } from './brands'
import { services } from './services'

describe('brands', () => {
  it('tem ao menos 5 segmentos, cada um com 3+ marcas sem repetição interna', () => {
    expect(brandGroups.length).toBeGreaterThanOrEqual(5)
    for (const g of brandGroups) {
      expect(g.brands.length).toBeGreaterThanOrEqual(3)
      expect(new Set(g.brands).size).toBe(g.brands.length)
    }
  })

  it('allBrands é única e tem 10+ marcas para o marquee', () => {
    expect(new Set(allBrands).size).toBe(allBrands.length)
    expect(allBrands.length).toBeGreaterThanOrEqual(10)
  })

  it('toda marca citada em um serviço existe em algum segmento', () => {
    const known = new Set(allBrands.map((b) => b.toLowerCase()))
    for (const s of services) {
      for (const b of s.brands) {
        const base = b.replace(/\s*\(.*\)$/, '').toLowerCase()
        expect(known.has(base), `${b} (${s.slug}) não está em brands.ts`).toBe(true)
      }
    }
  })
})
