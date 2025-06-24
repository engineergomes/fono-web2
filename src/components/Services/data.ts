export const services = {
  avaliacao: {
    order: 1,
    name: 'Avaliação',
    title: 'Avaliação Diagnóstica de Qualidade',
    text: 'Na jornada do desenvolvimento infantil, cada criança é única e por isso, uma avaliação diagnóstica especializada é o ponto de partida crucial! Com ela, podemos desvendar desafios que podem estar impedindo seu filho de alcançar seu potencial. E é nesse momento que entra um plano de intervenção feito sob medida, projetado para fornecer o suporte exato que seu pequeno precisa para florescer e prosperar na vida.',
    firstListItem: 'Processo diagnóstico',
    secondListItem: 'Avaliação Clínica',
    thirdListItem: 'Utilização de protocolos validados',
    image: '/avaliacao-diagnostica.webp',
    alt: 'Fonoaudióloga Ana Nascimento no consultório em Jaraguá do Sul.',
  },
  terapias: {
    order: 2,
    name: 'Terapias',
    title: `Intervenção Fonoaudióloga \n em Jaraguá do Sul`,
    text: 'Na busca de uma comunicação mais clara e eficaz, oferecerei intervenção fonoaudiológica personalizada, centrada no desenvolvimento das habilidades de fala e linguagem de cada criança, com o objetivo de auxiliar o seu filho a alcançar novos patamares em sua jornada para uma comunicação mais fluida e confiante.',
    firstListItem: 'Planejamento de Intervenção Individual',
    secondListItem: 'Apoio e orientação para os pais',
    thirdListItem: 'Atendimentos interativos e lúdicos',
    image: '/intervencao-fonoaudiologa.webp',
    alt: 'Fonoaudióloga realizando intervenção com criança em ambiente acolhedor.',
  },

  populacoesEspecificas: {
    order: 4,
    name: 'Atendimento a Condições Específicas',
    title: 'Atendimento Especializado para Crianças com Condições Específicas',
    text: 'Transtorno do Espectro Autista (TEA), Síndrome de Down, Atraso no Desenvolvimento da Fala, Transtornos Motores da Fala, Transtorno do Desenvolvimento Intelectual, entre outras condições que impactam a comunicação.',
    firstListItem: 'Transtorno do Espectro Autista (TEA)',
    secondListItem: 'Síndrome de Down',
    thirdListItem: 'Outros atrasos no desenvolvimento da comunicação',
    image: '/intervencao-fonoaudiologa.webp',
    alt: 'Fonoaudióloga atendendo criança com necessidades específicas.',
  },
};

export type ServicesType = keyof typeof services;
