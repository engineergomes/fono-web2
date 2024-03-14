export const services = {
  linguagem: {
    order: 1,
    name: 'Avaliação Fonoaudiológica',
    title: 'Avaliação Diagnóstica',
    text: 'É a partir de um diagnóstico de qualidade que se define a intervenção e a estimulação adequadas para cada criança. Isso permite o desenvolvimento máximo de suas potencialidades.',
    firstListItem: 'Processo diagnóstico ',
    secondListItem: 'Avaliação Clínica',
    thirdListItem: 'Utilização de protocolos validados',
    image: '/3.webp',
  },
  social: {
    order: 2,
    name: 'Terapia Fonoaudiológica',
    title: 'Intervenção Fonoaudiológica',
    text: 'Atendimento individual focado no desenvolvimento e apoio das habilidades de comunicação de cada criança.',
    firstListItem: 'Planejamento de Intervenção Individual',
    secondListItem: 'Apoio e orientação para os pais',
    thirdListItem: 'Atendimentos interativos e lúdicos',
    image: '/1.webp',
  },
};

export type ServicesType = keyof typeof services;
