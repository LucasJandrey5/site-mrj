export const SERVICE_SLUGS = [
  'controladores-de-grupo-gerador',
  'inversores-de-frequencia-e-soft-starters',
  'ihms-industriais',
  'empilhadeiras-e-paleteiras',
  'inversores-solares',
  'atuadores-ecus-e-carregadores',
] as const

export type ServiceSlug = (typeof SERVICE_SLUGS)[number]

export type ServiceIconName = 'generator' | 'inverter' | 'hmi' | 'forklift' | 'solar' | 'actuator'

export interface FaqItem {
  question: string
  answer: string
}

export interface Service {
  slug: ServiceSlug
  title: string
  /** Título curto para cards, menu e rodapé. */
  shortTitle: string
  /** Uma linha, usada em cards e na meta description. */
  summary: string
  /** Dois ou três períodos, usados no hero da página do serviço. */
  description: string
  icon: ServiceIconName
  brands: string[]
  symptoms: string[]
  actions: string[]
  faq: FaqItem[]
  /** Mensagem pré-preenchida do WhatsApp para esta página. */
  whatsappMessage: string
}

export type WordmarkStyle = 1 | 2 | 3 | 4 | 5 | 6

export type BrandMark = 'square' | 'circle' | 'slash'

export interface Brand {
  name: string
  /** Ids de BrandSegment; o primeiro é o principal, usado no link e no destaque. */
  segments: string[]
  /** Estilo do wordmark provisório, até chegarem os SVGs oficiais dos fabricantes. */
  style: WordmarkStyle
  mark?: BrandMark
}

export interface BrandSegment {
  id: string
  label: string
  short: string
  /** O que reparamos nesse equipamento, em minúsculas, para compor a frase. */
  repairs: string
  service: ServiceSlug
}

export interface ProcessStep {
  title: string
  description: string
}

export interface Stat {
  label: string
  value: number
  suffix: string
  /** true enquanto o valor não for confirmado pela MRJ; mostra marcador na tela. */
  placeholder: boolean
}

export interface MediaAsset {
  src: string
  alt: string
  /** false enquanto o arquivo não existir em public/; renderiza Placeholder. */
  available: boolean
}

export interface VideoAsset {
  mp4: string
  webm: string
  poster: string
  alt: string
  available: boolean
}

export interface Company {
  name: string
  tagline: string
  description: string
  /** Sem barra final. */
  siteUrl: string
  email: string
  instagramHandle: string
  instagramUrl: string
  address: { city: string; state: string; country: string }
  whatsapp: { tecnico: string; comercial: string }
  phoneDisplay: { tecnico: string; comercial: string }
  stats: Stat[]
}
