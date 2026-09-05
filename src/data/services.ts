import type { Service } from './types'

export const services: Service[] = [
  {
    slug: 'controladores-de-grupo-gerador',
    title: 'Controladores de grupo gerador',
    shortTitle: 'Controladores de geradores',
    icon: 'generator',
    summary:
      'Reparo e manutenção de controladores ComAp, Woodward, Deep Sea, SICES e Mecc Alte, com teste em bancada simulando o gerador.',
    description:
      'Diagnóstico e reparo a nível de componente em controladores de grupo gerador: display e teclado de membrana, entradas e saídas queimadas, falhas de comunicação, fonte de alimentação e danos por surto, umidade ou incêndio. O controlador volta parametrizado e testado.',
    brands: ['ComAp', 'Woodward', 'Deep Sea Electronics', 'SICES', 'Mecc Alte', 'DEIF'],
    symptoms: [
      'Display apagado, com falhas ou teclado de membrana sem resposta',
      'Leitura errada de tensão, frequência, pressão de óleo ou temperatura',
      'Falha de comunicação RS485, CAN ou Ethernet com o supervisório',
      'Gerador não parte, não sincroniza ou não transfere a carga',
      'Danos por surto elétrico, umidade ou incêndio no painel',
    ],
    actions: [
      'Diagnóstico com simulação dos sinais de motor e gerador em bancada',
      'Troca de teclado de membrana, display e componentes de potência',
      'Reparo de fonte, entradas analógicas e saídas a relé',
      'Reconfiguração de parâmetros e atualização de firmware quando disponível',
      'Teste funcional completo antes da entrega, com laudo',
    ],
    faq: [
      {
        question: 'Vale a pena reparar em vez de trocar o controlador?',
        answer:
          'Na maioria dos casos, sim: o reparo costuma custar uma fração do controlador novo e evita reprogramar o painel do zero. O diagnóstico mostra se compensa.',
      },
      {
        question: 'Os parâmetros do meu gerador são preservados?',
        answer:
          'Sempre que a memória do controlador está íntegra, fazemos backup antes do reparo e restauramos na entrega. Se não for possível, reconfiguramos junto com você.',
      },
      {
        question: 'Vocês atendem controladores danificados por incêndio?',
        answer:
          'Sim. Avaliamos placa por placa; quando a eletrônica principal sobrevive, trocamos teclado, display e conectores danificados.',
      },
    ],
    whatsappMessage: 'Olá! Vim pelo site e preciso de reparo em controlador de grupo gerador.',
  },
  {
    slug: 'inversores-de-frequencia-e-soft-starters',
    title: 'Inversores de frequência e soft starters',
    shortTitle: 'Inversores e soft starters',
    icon: 'inverter',
    summary:
      'Reparo de inversores de frequência e soft starters WEG, ABB, Siemens, Danfoss, Schneider e Yaskawa, do módulo IGBT à placa de controle.',
    description:
      'Manutenção corretiva e preventiva de inversores de frequência e soft starters de qualquer potência: módulos IGBT, capacitores do barramento CC, fontes chaveadas, placas de controle e disparo, IHM e ventilação. Teste com motor em carga antes da entrega.',
    brands: ['WEG', 'ABB', 'Siemens', 'Danfoss', 'Schneider Electric', 'Yaskawa', 'Delta'],
    symptoms: [
      'Falhas de sobrecorrente, sobretensão ou curto na saída (códigos OC, OV, SC)',
      'Inversor não liga, display apagado ou reinicia sozinho',
      'Motor vibra, não atinge a velocidade ou perde torque',
      'Erro de comunicação com CLP ou supervisório',
      'Cheiro de queimado, capacitores estufados ou ventilação travada',
    ],
    actions: [
      'Diagnóstico com análise do barramento CC, módulos de potência e disparo dos IGBTs',
      'Substituição de IGBTs, capacitores, fontes e componentes SMD',
      'Reparo de placas de controle, IHM e cartões de comunicação',
      'Limpeza técnica, troca de ventiladores e revisão preventiva',
      'Teste final com motor em carga e registro dos parâmetros',
    ],
    faq: [
      {
        question: 'Vocês reparam inversores de alta potência?',
        answer:
          'Sim. Atendemos inversores e soft starters de pequena a grande potência; para equipamentos muito grandes, combinamos a logística de coleta.',
      },
      {
        question: 'Meus parâmetros são mantidos?',
        answer:
          'Fazemos backup dos parâmetros sempre que a placa de controle permite e restauramos na entrega. Se a placa de controle for substituída, reparametrizamos junto com você.',
      },
      {
        question: 'Fazem manutenção preventiva?',
        answer:
          'Sim. A preventiva inclui limpeza, troca de ventiladores, verificação dos capacitores e teste em carga, e evita a maioria das paradas não programadas.',
      },
    ],
    whatsappMessage: 'Olá! Vim pelo site e preciso de reparo em inversor de frequência ou soft starter.',
  },
  {
    slug: 'ihms-industriais',
    title: 'IHMs industriais',
    shortTitle: 'IHMs industriais',
    icon: 'hmi',
    summary:
      'Reparo de IHMs Siemens, Weintek, Delta, WEG, Schneider e Allen-Bradley: touch, display, backlight, fonte e comunicação.',
    description:
      'Recuperação de interfaces homem-máquina industriais: troca de touch screen e display, backlight apagado, fontes danificadas, portas de comunicação queimadas e falhas de inicialização. Sempre que possível, preservamos o programa e a licença da IHM.',
    brands: ['Siemens', 'Weintek', 'Delta', 'WEG', 'Schneider Electric', 'Allen-Bradley', 'Pro-face'],
    symptoms: [
      'Touch não responde ou responde deslocado',
      'Display apagado, escuro ou com listras',
      'IHM reinicia, trava na inicialização ou perde o programa',
      'Porta serial ou Ethernet queimada, sem comunicação com o CLP',
      'Danos físicos na tela ou no painel frontal',
    ],
    actions: [
      'Diagnóstico de display, touch, fonte e placa principal',
      'Substituição de touch screen, display e backlight',
      'Reparo de fontes e portas de comunicação',
      'Backup e restauração do projeto quando a memória está íntegra',
      'Teste funcional em bancada com o CLP simulado',
    ],
    faq: [
      {
        question: 'O programa da IHM é perdido no reparo?',
        answer:
          'Não, quando a memória está íntegra: fazemos backup antes de qualquer intervenção. Se a memória estiver danificada, avisamos antes de prosseguir e você pode enviar o projeto para regravação.',
      },
      {
        question: 'Vocês trocam só o touch ou a tela inteira?',
        answer:
          'Depende do modelo e do dano. Trocamos o touch, o display ou o conjunto, sempre pela opção de melhor custo-benefício.',
      },
      {
        question: 'Atendem IHMs descontinuadas?',
        answer:
          'Sim. Reparo a nível de componente é justamente a saída para modelos sem peça de reposição no mercado.',
      },
    ],
    whatsappMessage: 'Olá! Vim pelo site e preciso de reparo em IHM industrial.',
  },
  {
    slug: 'empilhadeiras-e-paleteiras',
    title: 'Módulos eletrônicos de empilhadeiras e paleteiras',
    shortTitle: 'Empilhadeiras e paleteiras',
    icon: 'forklift',
    summary:
      'Reparo de módulos de controle Curtis, Zapi, Sevcon e Inmotion, displays e carregadores de empilhadeiras e paleteiras elétricas.',
    description:
      'Empilhadeira parada é custo por hora. Reparamos módulos de tração e elevação, controladores Curtis, Zapi, Sevcon e Inmotion, displays, joysticks e carregadores de bateria de empilhadeiras, paleteiras e transpaleteiras elétricas, com teste em bancada simulando o motor.',
    brands: ['Curtis', 'Zapi', 'Sevcon', 'Inmotion', 'Delta-Q'],
    symptoms: [
      'Empilhadeira não anda, não eleva ou perde força',
      'Códigos de erro no display ou LED de falha piscando',
      'Módulo esquentando, com cheiro de queimado ou contator travado',
      'Carregador não carrega ou desliga antes do fim',
      'Falhas intermitentes após lavagem ou umidade',
    ],
    actions: [
      'Diagnóstico do módulo com simulação de motor, acelerador e sensores',
      'Troca de MOSFETs, capacitores, drivers e componentes SMD',
      'Reparo de displays, joysticks e carregadores de bateria',
      'Limpeza e proteção contra umidade e vibração',
      'Teste em carga e relatório de entrega',
    ],
    faq: [
      {
        question: 'Quais marcas de empilhadeira vocês atendem?',
        answer:
          'O reparo é feito no módulo eletrônico, então atendemos qualquer marca de empilhadeira ou paleteira que use controladores Curtis, Zapi, Sevcon, Inmotion ou similares.',
      },
      {
        question: 'Preciso mandar a empilhadeira inteira?',
        answer:
          'Não. Basta retirar o módulo (ou o carregador) e enviar; orientamos a retirada pelo WhatsApp se precisar.',
      },
      {
        question: 'Fazem orçamento sem compromisso?',
        answer: 'Sim. O orçamento é gratuito e você decide se aprova o reparo.',
      },
    ],
    whatsappMessage: 'Olá! Vim pelo site e preciso de reparo em módulo de empilhadeira ou paleteira elétrica.',
  },
  {
    slug: 'inversores-solares',
    title: 'Inversores solares',
    shortTitle: 'Inversores solares',
    icon: 'solar',
    summary:
      'Reparo de inversores fotovoltaicos Fronius, Solis, PHB, Growatt, Deye e SMA, on-grid, off-grid e híbridos.',
    description:
      'Recuperação de inversores solares fora de garantia ou sem assistência do fabricante: fontes, módulos de potência, placas de controle, comunicação Wi-Fi e RS485, relés de rede e danos por surto. Teste com simulação de string e rede antes da entrega.',
    brands: ['Fronius', 'Solis', 'PHB', 'Growatt', 'Deye', 'SMA', 'Huawei'],
    symptoms: [
      'Inversor não liga ou não conecta na rede',
      'Erros de isolação, sobretensão ou temperatura',
      'Geração abaixo do esperado ou desligamentos ao longo do dia',
      'Perda de comunicação com o aplicativo ou datalogger',
      'Danos por descarga atmosférica ou surto na rede',
    ],
    actions: [
      'Diagnóstico com simulação de string fotovoltaica e rede',
      'Reparo de fontes, módulos IGBT, placas de controle e relés',
      'Troca de componentes SMD e conectores danificados',
      'Reparo de módulos de comunicação e atualização de firmware quando disponível',
      'Teste de injeção na rede e relatório de entrega',
    ],
    faq: [
      {
        question: 'Meu inversor ainda está na garantia, vale a pena reparar?',
        answer:
          'Se ainda estiver na garantia, o caminho é o fabricante. Atendemos inversores fora de garantia ou sem assistência disponível no Brasil.',
      },
      {
        question: 'Atendem integradores e instaladoras?',
        answer:
          'Sim. Trabalhamos com integradores que precisam de um laboratório parceiro para os inversores dos seus clientes, com condições para volume.',
      },
      {
        question: 'Como envio o inversor?',
        answer:
          'Embale com proteção, envie por transportadora para Chapecó, SC, e nos avise pelo WhatsApp com o modelo e o defeito.',
      },
    ],
    whatsappMessage: 'Olá! Vim pelo site e preciso de reparo em inversor solar.',
  },
  {
    slug: 'atuadores-ecus-e-carregadores',
    title: 'Atuadores, centrais ECU e carregadores',
    shortTitle: 'Atuadores, ECUs e carregadores',
    icon: 'actuator',
    summary:
      'Manutenção de atuadores Woodward L-Series, centrais ECU de motores, carregadores de bateria e módulos de geradores de biogás.',
    description:
      'Reparo de eletrônica embarcada em motores e geradores: atuadores eletrônicos Woodward L-Series, centrais ECU, módulos de ignição e mistura de geradores de biogás, e carregadores de bateria de painel. Diagnóstico com simulação dos sinais do motor e teste funcional antes da entrega.',
    // TODO(cliente): confirmar Heinzmann, GAC e Zivan.
    brands: ['Woodward', 'Heinzmann', 'GAC', 'Delta-Q', 'Zivan'],
    symptoms: [
      'Atuador sem resposta, travado ou com atuação irregular',
      'Motor sem controle de rotação ou com oscilação de frequência',
      'ECU não comunica ou apresenta códigos de falha',
      'Carregador de bateria sem saída ou com tensão errada',
      'Danos por umidade, vibração ou surto',
    ],
    actions: [
      'Diagnóstico do atuador e da ECU com simulação dos sinais do motor',
      'Reparo de drivers, fontes, sensores e conectores',
      'Substituição de componentes SMD e módulos de potência',
      'Reparo de carregadores de bateria e reguladores de painel',
      'Teste funcional em bancada e relatório de entrega',
    ],
    faq: [
      {
        question: 'Reparam atuadores L-Series da Woodward?',
        answer:
          'Sim. Fazemos manutenção corretiva em atuadores L-Series com falha de driver, sensor de posição e conector, com teste de curso e resposta em bancada.',
      },
      {
        question: 'Atendem geradores de biogás?',
        answer:
          'Sim. Atendemos módulos de controle e ignição de geradores a biogás, comuns em agroindústrias e biodigestores da região.',
      },
      {
        question: 'Fazem reparo de carregadores de bateria de painel?',
        answer: 'Sim, carregadores flutuantes e automáticos usados em painéis de geradores e quadros de comando.',
      },
    ],
    whatsappMessage: 'Olá! Vim pelo site e preciso de reparo em atuador, central ECU ou carregador de bateria.',
  },
]

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}
