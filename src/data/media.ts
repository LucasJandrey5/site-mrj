import type { LabPhoto, LabVideo, MediaAsset, ServiceSlug, VideoAsset } from './types'

/**
 * Mosaico do laboratório. A ordem importa: o primeiro item ocupa o bloco grande
 * e o vídeo entra no bloco largo, no meio da grade. Coloque os arquivos em
 * public/photos e public/videos e marque `available: true`.
 */
export const labPhotos: LabPhoto[] = [
  {
    src: '/photos/lab-bancada.webp',
    alt: 'Bancada da MRJ com osciloscópio ligado e placa sob teste',
    title: 'A bancada em operação',
    caption: 'Osciloscópio ligado, placa sob teste e ponta de prova na mão',
    tone: 'bench',
    available: false,
  },
  {
    src: '/photos/lab-placa-macro.webp',
    alt: 'Detalhe de placa eletrônica industrial com componentes SMD',
    title: 'Macro da placa',
    caption: 'Componentes SMD e trilhas em detalhe, sob luz rasante',
    tone: 'macro',
    available: false,
  },
  {
    src: '/photos/lab-controlador.webp',
    alt: 'Controlador de grupo gerador aberto sobre a bancada',
    title: 'Controlador aberto',
    caption: 'Grupo gerador com a tampa fora, conectores à vista',
    tone: 'metal',
    available: false,
  },
  {
    src: '/photos/lab-solda.webp',
    alt: 'Estação de solda durante a troca de um componente SMD',
    title: 'Retrabalho de SMD',
    caption: 'Troca do componente sem levantar a trilha',
    tone: 'solder',
    available: false,
  },
  {
    src: '/photos/lab-osciloscopio.webp',
    alt: 'Tela do osciloscópio com a forma de onda do disparo',
    title: 'Tela do osciloscópio',
    caption: 'A forma de onda do disparo, com a leitura no canto',
    tone: 'screen',
    available: false,
  },
  {
    src: '/photos/lab-inversor.webp',
    alt: 'Inversor de frequência aberto mostrando o barramento e os capacitores',
    title: 'Inversor aberto',
    caption: 'Barramento CC, capacitores e módulo de potência',
    tone: 'board',
    available: false,
  },
  {
    src: '/photos/lab-empilhadeira.webp',
    alt: 'Módulo eletrônico de empilhadeira desmontado sobre a bancada',
    title: 'Módulo de empilhadeira',
    caption: 'Controlador de tração desmontado para diagnóstico',
    tone: 'metal',
    available: false,
  },
]

/** Vídeo curto do mosaico, no bloco largo. */
export const labVideo: LabVideo = {
  mp4: '/videos/bancada-laboratorio.mp4',
  webm: '/videos/bancada-laboratorio.webm',
  poster: '/videos/bancada-laboratorio.webp',
  alt: 'Técnico da MRJ trabalhando em uma placa na bancada',
  title: 'A bancada em movimento',
  caption: 'Alguns segundos do diagnóstico, do jeito que acontece',
  tone: 'bench',
  available: false,
}

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
