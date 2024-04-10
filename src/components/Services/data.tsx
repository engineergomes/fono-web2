export const services = {
  linguagem: {
    order: 1,
    name: 'Avaliação Fonoaudiológica',
    title: 'Avaliação Diagnóstica de Qualidade',
    text: 'Na jornada do desenvolvimento infantil, cada criança é única e por isso, uma avaliação diagnóstica especializada é o ponto de partida crucial! Com ela, podemos desvendar desafios que podem estar impedindo seu filho de alcançar seu potencial. E é nesse momento que entra um plano de intervenção feito sob medida, projetado para fornecer o suporte exato que seu pequeno precisa para florescer e prosperar na vida.',
    firstListItem: 'Processo diagnóstico ',
    secondListItem: 'Avaliação Clínica',
    thirdListItem: 'Utilização de protocolos validados',
    image: '/avaliacao-diagnostica.webp',
    alt: 'Fonoaudióloga Ana Nascimento no consultório em Jaraguá do Sul.',
  },
  social: {
    order: 2,
    name: 'Terapia Fonoaudiológica',
    title: 'Intervenção Fonoaudióloga em Jaraguá do Sul',
    text: 'Na busca de uma comunicação mais clara e eficaz, oferecerei intervenção fonoaudiológica personalizada, centrada no desenvolvimento das habilidades de fala e linguagem de cada criança, com o objetivo de auxiliar o seu filho a alcançar novos patamares em sua jornada para uma comunicação mais fluida e confiante.',
    firstListItem: 'Planejamento de Intervenção Individual',
    secondListItem: 'Apoio e orientação para os pais',
    thirdListItem: 'Atendimentos interativos e lúdicos',
    image: '/intervencao-fonoaudiologa.webp',
    alt: 'Mulher em sala representando Intervenção Fonoaudiológica com atendimento personalizado e suporte para os pais em Jaraguá do Sul.',
  },
};

export type ServicesType = keyof typeof services;
