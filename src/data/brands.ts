import type { Brand, BrandSegment } from './types'

export const brandSegments: BrandSegment[] = [
  {
    id: 'geradores',
    label: 'Controladores de grupo gerador',
    short: 'Geradores',
    repairs: 'placa, display, teclado de membrana e comunicação',
    service: 'controladores-de-grupo-gerador',
  },
  {
    id: 'inversores',
    label: 'Inversores e soft starters',
    short: 'Inversores',
    repairs: 'módulo IGBT, barramento CC, fonte e placa de controle',
    service: 'inversores-de-frequencia-e-soft-starters',
  },
  {
    id: 'ihms',
    label: 'IHMs industriais',
    short: 'IHMs',
    repairs: 'touch, display, backlight e portas de comunicação',
    service: 'ihms-industriais',
  },
  {
    id: 'empilhadeiras',
    label: 'Empilhadeiras e paleteiras',
    short: 'Empilhadeiras',
    repairs: 'módulo de tração, MOSFETs, display e carregador',
    service: 'empilhadeiras-e-paleteiras',
  },
  {
    id: 'solar',
    label: 'Inversores solares',
    short: 'Solar',
    repairs: 'fonte, módulo de potência, relé de rede e comunicação',
    service: 'inversores-solares',
  },
  {
    id: 'atuadores',
    label: 'Atuadores, ECUs e carregadores',
    short: 'Atuadores',
    repairs: 'driver, sensor de posição, central ECU e carregador',
    service: 'atuadores-ecus-e-carregadores',
  },
]

/**
 * Marcas atendidas. `style` e `mark` desenham um wordmark provisório;
 * quando chegarem os SVGs oficiais, troque `Wordmark` por eles sem mexer nesta lista.
 */
export const brands: Brand[] = [
  { name: 'ComAp', segments: ['geradores'], style: 1 },
  { name: 'Woodward', segments: ['geradores', 'atuadores'], style: 4 },
  { name: 'Deep Sea Electronics', segments: ['geradores'], style: 2 },
  { name: 'SICES', segments: ['geradores'], style: 5 },
  { name: 'Mecc Alte', segments: ['geradores'], style: 3 },
  { name: 'DEIF', segments: ['geradores'], style: 1, mark: 'circle' },
  { name: 'WEG', segments: ['inversores', 'ihms'], style: 5 },
  { name: 'ABB', segments: ['inversores'], style: 1 },
  { name: 'Siemens', segments: ['inversores', 'ihms'], style: 2 },
  { name: 'Danfoss', segments: ['inversores'], style: 4 },
  { name: 'Schneider Electric', segments: ['inversores', 'ihms'], style: 4, mark: 'square' },
  { name: 'Yaskawa', segments: ['inversores'], style: 3 },
  { name: 'Delta', segments: ['inversores', 'ihms'], style: 1 },
  { name: 'Weintek', segments: ['ihms'], style: 4 },
  { name: 'Allen-Bradley', segments: ['ihms'], style: 4 },
  { name: 'Pro-face', segments: ['ihms'], style: 3, mark: 'slash' },
  { name: 'Curtis', segments: ['empilhadeiras'], style: 3 },
  { name: 'Zapi', segments: ['empilhadeiras'], style: 5 },
  { name: 'Sevcon', segments: ['empilhadeiras'], style: 1 },
  { name: 'Inmotion', segments: ['empilhadeiras'], style: 4 },
  { name: 'Delta-Q', segments: ['empilhadeiras', 'atuadores'], style: 6 },
  { name: 'Fronius', segments: ['solar'], style: 4 },
  { name: 'Solis', segments: ['solar'], style: 1, mark: 'circle' },
  { name: 'PHB', segments: ['solar'], style: 5 },
  { name: 'Growatt', segments: ['solar'], style: 4 },
  { name: 'Deye', segments: ['solar'], style: 1 },
  { name: 'SMA', segments: ['solar'], style: 2 },
  { name: 'Huawei', segments: ['solar'], style: 4 },
  { name: 'Heinzmann', segments: ['atuadores'], style: 2 },
  { name: 'GAC', segments: ['atuadores'], style: 6 },
  { name: 'Zivan', segments: ['atuadores'], style: 3 },
]

/** Nomes das marcas, para o JSON-LD e para checagens de conteúdo. */
export const allBrands: string[] = brands.map((b) => b.name)

/** Segmento principal da marca: define o link e a frase de reparo mostrada. */
export function primarySegment(brand: Brand): BrandSegment {
  const segment = brandSegments.find((s) => s.id === brand.segments[0])
  if (!segment) throw new Error(`Segmento desconhecido na marca ${brand.name}: ${brand.segments[0]}`)
  return segment
}

export function brandsOfSegment(id: string): Brand[] {
  return brands.filter((b) => b.segments.includes(id))
}
