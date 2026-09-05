import { describe, expect, it } from 'vitest'
import { formatNumber } from './format'

describe('formatNumber', () => {
  it('usa separador de milhar pt-BR', () => {
    expect(formatNumber(1500)).toBe('1.500')
    expect(formatNumber(30)).toBe('30')
    expect(formatNumber(1250000)).toBe('1.250.000')
  })
})
