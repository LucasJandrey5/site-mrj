import { describe, expect, it } from 'vitest'
import { brands } from './brands'
import { services } from './services'
import { stats } from './stats'

describe('stats', () => {
  it('tem quatro números na faixa', () => {
    expect(stats).toHaveLength(4)
  })

  it('os dois últimos são contados do próprio site, não digitados à mão', () => {
    const fabricantes = stats.find((s) => s.label === 'fabricantes atendidos')
    const linhas = stats.find((s) => s.label === 'linhas de serviço')
    expect(fabricantes?.value).toBe(brands.length)
    expect(linhas?.value).toBe(services.length)
    expect(fabricantes?.placeholder).toBe(false)
    expect(linhas?.placeholder).toBe(false)
  })

  it('rótulos são curtos o bastante para a faixa e valores são positivos', () => {
    for (const s of stats) {
      expect(s.label.length).toBeLessThanOrEqual(24)
      expect(s.value).toBeGreaterThan(0)
    }
  })
})
