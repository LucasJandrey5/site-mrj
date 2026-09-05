import type { MediaAsset, ServiceSlug, VideoAsset } from './types'

/** Fotos do laboratório. Colocar os arquivos em public/photos e marcar available: true. */
export const labPhotos: MediaAsset[] = [
  { src: '/photos/lab-bancada.webp', alt: 'Bancada de reparo com osciloscópio e placa em teste', available: false },
  { src: '/photos/lab-placa-macro.webp', alt: 'Detalhe de placa eletrônica industrial durante o reparo', available: false },
  { src: '/photos/lab-controlador.webp', alt: 'Controlador de grupo gerador em teste na bancada', available: false },
]

export const serviceCovers: Record<ServiceSlug, MediaAsset> = {
  'controladores-de-grupo-gerador': {
    src: '/photos/servico-geradores.webp',
    alt: 'Controlador de grupo gerador em bancada',
    available: false,
  },
  'inversores-de-frequencia-e-soft-starters': {
    src: '/photos/servico-inversores.webp',
    alt: 'Inversor de frequência aberto para reparo',
    available: false,
  },
  'ihms-industriais': { src: '/photos/servico-ihm.webp', alt: 'IHM industrial em teste', available: false },
  'empilhadeiras-e-paleteiras': {
    src: '/photos/servico-empilhadeiras.webp',
    alt: 'Módulo de controle de empilhadeira elétrica',
    available: false,
  },
  'inversores-solares': { src: '/photos/servico-solar.webp', alt: 'Inversor solar em reparo', available: false },
  'atuadores-ecus-e-carregadores': {
    src: '/photos/servico-atuadores.webp',
    alt: 'Atuador Woodward em manutenção',
    available: false,
  },
}

export const processVideo: VideoAsset = {
  mp4: '/videos/bancada-processo.mp4',
  webm: '/videos/bancada-processo.webm',
  poster: '/videos/bancada-processo.webp',
  alt: 'Técnico da MRJ testando uma placa na bancada',
  available: false,
}

export const labVideo: VideoAsset = {
  mp4: '/videos/bancada-laboratorio.mp4',
  webm: '/videos/bancada-laboratorio.webm',
  poster: '/videos/bancada-laboratorio.webp',
  alt: 'Laboratório da MRJ com equipamentos de medição',
  available: false,
}
