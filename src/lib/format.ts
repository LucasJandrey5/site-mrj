const ptBR = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 })

export function formatNumber(n: number): string {
  return ptBR.format(n)
}
