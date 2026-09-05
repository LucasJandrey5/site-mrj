import type { BrandGroup } from './types'

export const brandGroups: BrandGroup[] = [
  { segment: 'Controladores de geradores', brands: ['ComAp', 'Woodward', 'Deep Sea Electronics', 'SICES', 'Mecc Alte', 'DEIF'] },
  { segment: 'Inversores e soft starters', brands: ['WEG', 'ABB', 'Siemens', 'Danfoss', 'Schneider Electric', 'Yaskawa', 'Delta'] },
  { segment: 'IHMs e CLPs', brands: ['Siemens', 'Weintek', 'Delta', 'WEG', 'Schneider Electric', 'Allen-Bradley', 'Pro-face'] },
  { segment: 'Empilhadeiras e paleteiras', brands: ['Curtis', 'Zapi', 'Sevcon', 'Inmotion', 'Delta-Q'] },
  { segment: 'Inversores solares', brands: ['Fronius', 'Solis', 'PHB', 'Growatt', 'Deye', 'SMA', 'Huawei'] },
  { segment: 'Atuadores, ECUs e carregadores', brands: ['Woodward', 'Heinzmann', 'GAC', 'Delta-Q', 'Zivan'] },
]

/** Lista única para o marquee do hero e para o JSON-LD. */
export const allBrands: string[] = Array.from(new Set(brandGroups.flatMap((g) => g.brands)))
