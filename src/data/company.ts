import type { Company } from './types'

export const company: Company = {
  name: 'MRJ Tecnologia',
  tagline: 'Assistência técnica especializada em eletrônica industrial',
  description:
    'Reparo de controladores de grupo gerador, inversores de frequência, IHMs, módulos de empilhadeiras e inversores solares em Chapecó, SC, com atendimento para todo o Brasil.',
  // TODO(cliente): confirmar o domínio definitivo antes de publicar.
  siteUrl: 'https://mrjtecnologia.com.br',
  email: 'contato.mrjtecnologia@gmail.com',
  instagramHandle: 'MRJTecnologia',
  instagramUrl: 'https://www.instagram.com/mrjtecnologia',
  address: { city: 'Chapecó', state: 'SC', country: 'BR' },
  whatsapp: { tecnico: '5549999052518', comercial: '5549999577176' },
  phoneDisplay: { tecnico: '(49) 99905-2518', comercial: '(49) 99957-7176' },
  stats: [
    { label: 'anos de experiência em eletrônica industrial', value: 10, suffix: '+', placeholder: true },
    { label: 'equipamentos reparados', value: 1500, suffix: '+', placeholder: true },
    { label: 'fabricantes atendidos', value: 30, suffix: '+', placeholder: true },
  ],
}
