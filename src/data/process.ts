import type { ProcessStep } from './types'

export const processSteps: ProcessStep[] = [
  {
    title: 'Recebimento e registro',
    description:
      'Você envia o equipamento ou entregamos em mãos em Chapecó e região. Cada item recebe um número de ordem de serviço.',
  },
  {
    title: 'Diagnóstico e laudo',
    description:
      'Análise em bancada com simulação de sinais, medição e inspeção da placa. Você recebe o laudo com a causa da falha.',
  },
  {
    title: 'Orçamento sem compromisso',
    description: 'Orçamento gratuito com prazo e garantia. Só seguimos com a sua aprovação.',
  },
  {
    title: 'Reparo e teste',
    description: 'Reparo a nível de componente, limpeza técnica e teste funcional em carga.',
  },
  {
    title: 'Entrega com garantia',
    description: 'Equipamento devolvido testado, com relatório e garantia do serviço.',
  },
]

export const shippingSteps: ProcessStep[] = [
  {
    title: 'Chame no WhatsApp',
    description: 'Mande foto, modelo e o defeito. Respondemos com as instruções de envio.',
  },
  {
    title: 'Embale e envie',
    description:
      'Proteja contra impacto e umidade e envie por transportadora para Chapecó, SC, com o número da sua ordem de serviço.',
  },
  {
    title: 'Receba testado',
    description: 'O equipamento volta reparado, testado em bancada e com garantia.',
  },
]
