import { brands } from './brands'
import { company } from './company'
import { services } from './services'
import type { Stat } from './types'

/**
 * Faixa de números da landing. Os dois primeiros vêm de `company.ts` e ainda
 * precisam ser confirmados pela MRJ; os dois últimos são contados do próprio
 * conteúdo do site, então nunca ficam desatualizados.
 */
export const stats: Stat[] = [
  ...company.stats,
  { label: 'fabricantes atendidos', value: brands.length, suffix: '', placeholder: false },
  { label: 'linhas de serviço', value: services.length, suffix: '', placeholder: false },
]
