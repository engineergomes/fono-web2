export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  author: {
    name: string;
    bio: string;
    avatar?: string;
  };
  publishedAt: string;
  readingTime: number;
  categories: string[];
  tags: string[];
  featured?: boolean;
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'desenvolvimento-fala-primeira-infancia',
    title: 'Desenvolvimento da Fala na Primeira Infância',
    excerpt:
      'Entenda os marcos importantes do desenvolvimento da fala em crianças de 0 a 3 anos e quando procurar ajuda profissional.',
    content: `
# Desenvolvimento da Fala na Primeira Infância

O desenvolvimento da fala é um processo fascinante que começa muito antes das primeiras palavras. Desde o nascimento, os bebês estão absorvendo sons, ritmos e padrões de linguagem que formarão a base para sua comunicação futura.

## Marcos do Desenvolvimento

### 0-6 meses
- Choro diferenciado para diferentes necessidades
- Sorrisos sociais
- Vocalizações (arrulhos, gorgolejos)
- Resposta a vozes familiares

### 6-12 meses
- Balbucios (ba-ba, ma-ma)
- Imitação de sons
- Compreensão de "não"
- Primeiras palavras podem aparecer

### 12-18 meses
- Vocabulário de 10-20 palavras
- Uso de gestos comunicativos
- Compreensão de comandos simples
- Tentativas de imitação de palavras

### 18-24 meses
- Explosão vocabular (50+ palavras)
- Primeiras combinações de palavras
- Uso funcional da linguagem
- Início da gramática básica

## Quando Procurar Ajuda

É importante procurar avaliação fonoaudiológica se a criança:
- Não balbucia aos 8 meses
- Não tem palavras aos 16 meses
- Não combina palavras aos 2 anos
- Perde habilidades já adquiridas

## Dicas para Estimular

1. **Converse sempre** - Narrate suas ações diárias
2. **Leia livros** - Desde cedo, mesmo que por poucos minutos
3. **Cante músicas** - Melodias ajudam na memorização
4. **Imite os sons** do bebê - Isso encoraja mais vocalizações
5. **Elimine telas** em excesso - Interação real é fundamental

Lembre-se: cada criança tem seu próprio ritmo, mas estar atento aos marcos pode fazer toda a diferença no desenvolvimento saudável da comunicação.
    `,
    author: {
      name: 'Ana Nascimento',
      bio: 'Fonoaudióloga especializada em Desenvolvimento Infantil com mais de 10 anos de experiência.',
    },
    publishedAt: '2024-01-14',
    readingTime: 5,
    categories: ['Desenvolvimento Infantil', 'Fala'],
    tags: ['primeira infância', 'marcos desenvolvimento', 'fala', 'linguagem'],
    featured: true,
  },
  {
    id: '2',
    slug: 'sinais-alerta-desenvolvimento-linguagem',
    title: 'Sinais de Alerta no Desenvolvimento da Linguagem',
    excerpt:
      'Conheça os principais sinais que podem indicar atrasos ou dificuldades no desenvolvimento da linguagem infantil.',
    content: `
# Sinais de Alerta no Desenvolvimento da Linguagem

Identificar precocemente possíveis atrasos no desenvolvimento da linguagem é fundamental para o sucesso das intervenções terapêuticas. Quanto mais cedo identificarmos e intervirmos, melhores serão os resultados.

## Sinais por Faixa Etária

### 0-12 meses
- Não responde ao próprio nome aos 9 meses
- Não balbucia ou faz sons aos 8 meses
- Não imita sons ou gestos
- Perda de habilidades já adquiridas

### 12-24 meses
- Não fala palavras aos 16 meses
- Não aponta para mostrar interesse
- Não imita palavras ou ações
- Vocabulário muito limitado aos 2 anos

### 2-3 anos
- Não forma frases de 2 palavras aos 2 anos
- Fala incompreensível para familiares
- Não segue instruções simples
- Não faz perguntas básicas

## Fatores de Risco

Algumas condições podem aumentar o risco de atrasos:
- Prematuridade
- Infecções de ouvido frequentes
- Histórico familiar de atrasos
- Pouca estimulação ambiental

## O que Fazer

Se você identificar esses sinais:
1. **Não espere** - "Vai falar quando quiser" não é verdade
2. **Procure avaliação** fonoaudiológica
3. **Investigue a audição** - fundamental para a linguagem
4. **Estimule em casa** - mas com orientação profissional

## Prevenção

- Converse muito com a criança
- Leia diariamente
- Limite o uso de telas
- Proporcione interações sociais
- Mantenha a audição saudável

Lembre-se: cada criança é única, mas estar atento aos sinais pode fazer toda a diferença no desenvolvimento saudável da comunicação.
    `,
    author: {
      name: 'Ana Nascimento',
      bio: 'Fonoaudióloga especializada em Desenvolvimento Infantil com mais de 10 anos de experiência.',
    },
    publishedAt: '2024-01-09',
    readingTime: 6,
    categories: ['Desenvolvimento Infantil', 'Linguagem'],
    tags: ['sinais alerta', 'atraso linguagem', 'desenvolvimento'],
  },
  {
    id: '3',
    slug: 'importancia-estimulacao-precoce',
    title: 'A Importância da Estimulação Precoce',
    excerpt:
      'Descubra como a estimulação precoce pode fazer toda a diferença no desenvolvimento neurológico e cognitivo das crianças.',
    content: `
# A Importância da Estimulação Precoce

A estimulação precoce é um conjunto de atividades e técnicas direcionadas a crianças de 0 a 6 anos, visando potencializar seu desenvolvimento neurológico, cognitivo, social e emocional.

## Por que é tão importante?

### Plasticidade Cerebral
O cérebro infantil possui uma capacidade extraordinária de formar novas conexões neurais, especialmente nos primeiros anos de vida. Essa plasticidade permite que a criança se adapte e aprenda com mais facilidade.

### Janelas de Oportunidade
Existem períodos críticos no desenvolvimento onde certas habilidades são mais facilmente adquiridas. Perder essas janelas pode tornar o aprendizado mais desafiador posteriormente.

## Áreas de Estimulação

### Linguagem e Comunicação
- Conversas frequentes
- Leitura diária
- Músicas e cantigas
- Jogos sonoros

### Desenvolvimento Motor
- Brincadeiras que envolvam movimento
- Atividades de coordenação
- Exploração sensorial
- Exercícios de equilíbrio

### Cognição e Aprendizado
- Jogos educativos
- Quebra-cabeças adequados à idade
- Brincadeiras de causa e efeito
- Atividades de classificação

### Social e Emocional
- Interações sociais variadas
- Reconhecimento de emoções
- Jogos cooperativos
- Estabelecimento de rotinas

## Dicas Práticas

1. **Seja consistente** - A regularidade é mais importante que a intensidade
2. **Respeite o ritmo** da criança
3. **Torne divertido** - O aprendizado através do brincar é mais efetivo
4. **Varie as atividades** para estimular diferentes áreas
5. **Celebre conquistas** - Por menores que sejam

## Quando Buscar Ajuda Profissional

- Suspeita de atrasos no desenvolvimento
- Necessidade de orientação específica
- Presença de condições especiais
- Desejo de otimizar o desenvolvimento

A estimulação precoce não é apenas para crianças com dificuldades - todas podem se beneficiar de um ambiente rico em estímulos adequados à sua idade e necessidades.
    `,
    author: {
      name: 'Ana Nascimento',
      bio: 'Fonoaudióloga especializada em Desenvolvimento Infantil com mais de 10 anos de experiência.',
    },
    publishedAt: '2024-01-04',
    readingTime: 7,
    categories: ['Estimulação Precoce', 'Desenvolvimento'],
    tags: ['estimulação precoce', 'desenvolvimento infantil', 'neuroplasticidade'],
  },
  {
    id: '4',
    slug: 'dislexia-sinais-identificacao',
    title: 'Dislexia: Como Identificar os Primeiros Sinais',
    excerpt: 'Aprenda a reconhecer os sinais precoces da dislexia e como buscar ajuda adequada para seu filho.',
    content: `# Dislexia: Como Identificar os Primeiros Sinais\n\nA dislexia é um transtorno específico de aprendizagem que afeta a capacidade de leitura e escrita. Identificar os sinais precocemente pode fazer toda a diferença no desenvolvimento da criança.`,
    author: {
      name: 'Ana Nascimento',
      bio: 'Fonoaudióloga especializada em Desenvolvimento Infantil com mais de 10 anos de experiência.',
    },
    publishedAt: '2023-12-28',
    readingTime: 8,
    categories: ['Desenvolvimento Infantil', 'Dislexia'],
    tags: ['dislexia', 'aprendizagem', 'leitura', 'escrita'],
  },
  {
    id: '5',
    slug: 'terapia-fonoaudiologica-autismo',
    title: 'Terapia Fonoaudiológica no Autismo',
    excerpt:
      'Entenda como a fonoaudiologia pode ajudar crianças com Transtorno do Espectro Autista (TEA) na comunicação.',
    content: `# Terapia Fonoaudiológica no Autismo\n\nA terapia fonoaudiológica desempenha um papel fundamental no desenvolvimento de crianças com Transtorno do Espectro Autista (TEA).`,
    author: {
      name: 'Ana Nascimento',
      bio: 'Fonoaudióloga especializada em Desenvolvimento Infantil com mais de 10 anos de experiência.',
    },
    publishedAt: '2023-12-22',
    readingTime: 9,
    categories: ['Autismo', 'Terapia'],
    tags: ['autismo', 'TEA', 'comunicação', 'terapia'],
  },
  {
    id: '6',
    slug: 'degluticao-atipica-criancas',
    title: 'Deglutição Atípica em Crianças: O que os Pais Devem Saber',
    excerpt:
      'Saiba identificar sinais de deglutição atípica e como isso pode afetar o desenvolvimento oral da criança.',
    content: `# Deglutição Atípica em Crianças\n\nA deglutição atípica é uma alteração no padrão normal de engolir que pode afetar o desenvolvimento oral e dental das crianças.`,
    author: {
      name: 'Ana Nascimento',
      bio: 'Fonoaudióloga especializada em Desenvolvimento Infantil com mais de 10 anos de experiência.',
    },
    publishedAt: '2023-12-18',
    readingTime: 6,
    categories: ['Deglutição', 'Desenvolvimento'],
    tags: ['deglutição', 'motricidade oral', 'desenvolvimento'],
  },
  {
    id: '7',
    slug: 'desenvolvimento-auditivo-bebe',
    title: 'Desenvolvimento Auditivo do Bebê: Marcos Importantes',
    excerpt:
      'Conheça os marcos do desenvolvimento auditivo nos primeiros anos de vida e sua importância para a linguagem.',
    content: `# Desenvolvimento Auditivo do Bebê\n\nO desenvolvimento auditivo é fundamental para o desenvolvimento da linguagem e comunicação.`,
    author: {
      name: 'Ana Nascimento',
      bio: 'Fonoaudióloga especializada em Desenvolvimento Infantil com mais de 10 anos de experiência.',
    },
    publishedAt: '2023-12-15',
    readingTime: 7,
    categories: ['Audição', 'Desenvolvimento Infantil'],
    tags: ['audição', 'bebê', 'desenvolvimento auditivo'],
  },
  {
    id: '33',
    slug: 'prevencao-alteracoes-comunicacao',
    title: 'Prevenção de Alterações da Comunicação',
    excerpt: 'Medidas preventivas para garantir o desenvolvimento saudável da comunicação infantil.',
    content: `# Prevenção de Alterações da Comunicação\n\nA prevenção é sempre o melhor caminho para garantir o desenvolvimento saudável.`,
    author: {
      name: 'Ana Nascimento',
      bio: 'Fonoaudióloga especializada em Desenvolvimento Infantil com mais de 10 anos de experiência.',
    },
    publishedAt: '2023-08-05',
    readingTime: 6,
    categories: ['Prevenção', 'Comunicação'],
    tags: ['prevenção', 'saúde comunicativa', 'desenvolvimento', 'cuidados'],
  },
];

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return mockBlogPosts.find((post) => post.slug === slug);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return mockBlogPosts.filter((post) =>
    post.categories.some((cat) => cat.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase())
  );
};

export const getFeaturedPosts = (): BlogPost[] => {
  return mockBlogPosts.filter((post) => post.featured);
};

export const getRecentPosts = (limit: number = 5): BlogPost[] => {
  return mockBlogPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
};

export const searchPosts = (query: string): BlogPost[] => {
  const searchTerm = query.toLowerCase();
  return mockBlogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  );
};

export const getAllCategories = (): { name: string; count: number }[] => {
  const categoryCounts: { [key: string]: number } = {};

  mockBlogPosts.forEach((post) => {
    post.categories.forEach((category) => {
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
  });

  return Object.entries(categoryCounts).map(([name, count]) => ({ name, count }));
};
