import { getAllPosts as getSanityAllPosts, getPostBySlug as getSanityPostBySlug } from '@/libs/sanity';
import {
  convertSanityPostToBlogPost,
  convertSanityPostsToBlogPosts,
  getRecentPostsFromSanity,
  getPostsByCategoryFromSanity,
  getFeaturedPostsFromSanity,
  searchPostsFromSanity,
  getAllCategoriesFromSanity,
} from '@/libs/blogUtils';

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

// Cache para armazenar os posts para evitar múltiplas chamadas
let postsCache: BlogPost[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Função principal para buscar todos os posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const now = Date.now();

  // Verificar se o cache ainda é válido
  if (postsCache && now - cacheTimestamp < CACHE_DURATION) {
    console.log('Usando posts do cache');
    return postsCache;
  }

  // Buscar dados do Sanity
  try {
    console.log('Buscando posts do Sanity...');
    const sanityPosts = await getSanityAllPosts();
    console.log(`Encontrados ${sanityPosts.length} posts do Sanity`);

    postsCache = convertSanityPostsToBlogPosts(sanityPosts);
    cacheTimestamp = now;
    console.log(`Convertidos ${postsCache.length} posts com sucesso`);
    return postsCache;
  } catch (error) {
    console.error('Erro ao buscar posts do Sanity:', error);
    console.log('Usando dados estáticos como fallback');
  }

  // Usar dados estáticos como fallback apenas em caso de erro
  postsCache = fallbackBlogPosts;
  cacheTimestamp = now;
  return postsCache;
}

// Autor padrão
const author = {
  name: 'Ana Nascimento',
  bio: 'Fonoaudióloga especializada em Desenvolvimento Infantil com mais de 10 anos de experiência.',
  avatar: '/ana-profile.jpg',
};

// Posts estáticos (apenas como fallback)
const fallbackBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'desenvolvimento-fala-primeira-infancia',
    title: 'Desenvolvimento da Fala na Primeira Infância',
    excerpt:
      'Entenda os marcos importantes do desenvolvimento da fala em crianças de 0 a 3 anos e quando procurar ajuda profissional.',
    content: `<h1 class="text-3xl font-bold text-darkBlue mb-4">Desenvolvimento da Fala na Primeira Infância</h1><p class="mb-4 text-gray-800 leading-relaxed">O desenvolvimento da fala é fundamental nos primeiros anos de vida. Conheça os marcos importantes e quando buscar ajuda profissional.</p>`,
    author,
    publishedAt: '2024-01-15',
    readingTime: 8,
    categories: ['Desenvolvimento Infantil', 'Fala'],
    tags: ['fala', 'primeira infância', 'desenvolvimento', 'marcos'],
    featured: true,
  },
  {
    id: '2',
    slug: 'sinais-alerta-desenvolvimento-linguagem',
    title: 'Sinais de Alerta no Desenvolvimento da Linguagem',
    excerpt:
      'Conheça os principais sinais que podem indicar atrasos ou dificuldades no desenvolvimento da linguagem infantil.',
    content: `<h1 class="text-3xl font-bold text-darkBlue mb-4">Sinais de Alerta no Desenvolvimento da Linguagem</h1><p class="mb-4 text-gray-800 leading-relaxed">Identificar precocemente os sinais de alerta é crucial para intervenções eficazes.</p>`,
    author,
    publishedAt: '2024-01-10',
    readingTime: 6,
    categories: ['Desenvolvimento Infantil', 'Linguagem'],
    tags: ['sinais de alerta', 'linguagem', 'desenvolvimento', 'diagnóstico'],
  },
  {
    id: '3',
    slug: 'importancia-estimulacao-precoce',
    title: 'A Importância da Estimulação Precoce',
    excerpt:
      'Descubra como a estimulação precoce pode fazer toda a diferença no desenvolvimento neurológico e cognitivo das crianças.',
    content: `<h1 class="text-3xl font-bold text-darkBlue mb-4">A Importância da Estimulação Precoce</h1><p class="mb-4 text-gray-800 leading-relaxed">A estimulação precoce é fundamental para o desenvolvimento saudável da criança.</p>`,
    author,
    publishedAt: '2024-01-05',
    readingTime: 7,
    categories: ['Estimulação Precoce', 'Desenvolvimento'],
    tags: ['estimulação precoce', 'neurologia', 'cognição', 'desenvolvimento'],
    featured: true,
  },
  {
    id: '4',
    slug: 'exercicios-casa-desenvolvimento-fala',
    title: 'Exercícios em Casa para Desenvolvimento da Fala',
    excerpt:
      'Atividades práticas e divertidas que os pais podem fazer em casa para estimular o desenvolvimento da fala.',
    content: `<h1 class="text-3xl font-bold text-darkBlue mb-4">Exercícios em Casa para Desenvolvimento da Fala</h1><p class="mb-4 text-gray-800 leading-relaxed">Descubra atividades simples e eficazes para fazer em casa.</p>`,
    author,
    publishedAt: '2023-12-28',
    readingTime: 5,
    categories: ['Exercícios', 'Fala'],
    tags: ['exercícios', 'atividades', 'casa', 'pais'],
  },
  {
    id: '5',
    slug: 'quando-procurar-fonoaudiologo',
    title: 'Quando Procurar um Fonoaudiólogo?',
    excerpt: 'Saiba identificar os momentos adequados para buscar ajuda profissional especializada em fonoaudiologia.',
    content: `<h1 class="text-3xl font-bold text-darkBlue mb-4">Quando Procurar um Fonoaudiólogo?</h1><p class="mb-4 text-gray-800 leading-relaxed">Conheça os sinais que indicam a necessidade de consultar um profissional.</p>`,
    author,
    publishedAt: '2023-12-20',
    readingTime: 6,
    categories: ['Fonoaudiologia', 'Orientações'],
    tags: ['fonoaudiólogo', 'consulta', 'profissional', 'indicações'],
  },
];

// Função melhorada para buscar post por slug
export const getPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  console.log(`Buscando post com slug: ${slug}`);

  try {
    const sanityPost = await getSanityPostBySlug(slug);
    console.log(`Post do Sanity encontrado:`, sanityPost ? 'SIM' : 'NÃO');

    if (sanityPost) {
      // Use 'body' as the primary content field for logging
      const contentField = sanityPost.body || sanityPost.content;
      console.log('Conteúdo bruto do Sanity:', typeof contentField, contentField);

      const convertedPost = convertSanityPostToBlogPost(sanityPost);
      console.log('Post convertido:', typeof convertedPost.content);

      // Validação adicional para garantir que o conteúdo seja uma string válida
      if (!convertedPost.content || typeof convertedPost.content !== 'string') {
        console.warn(`Conteúdo inválido para o post ${slug}, tipo:`, typeof convertedPost.content);
        convertedPost.content =
          '<div class="p-4 bg-yellow-100 border border-yellow-400 rounded"><p class="text-yellow-800">Conteúdo em processamento. Este post está sendo otimizado e estará disponível em breve.</p></div>';
      }

      // Verificar se há objetos não convertidos no conteúdo
      if (convertedPost.content.includes('[object Object]')) {
        console.error(`Objeto não convertido detectado no post ${slug}`);
        convertedPost.content =
          '<div class="p-4 bg-red-100 border border-red-400 rounded"><p class="text-red-800">Erro na conversão do conteúdo. Por favor, tente novamente mais tarde.</p></div>';
      }

      return convertedPost;
    }
  } catch (error) {
    console.error(`Erro ao buscar post ${slug} do Sanity:`, error);
  }

  // Fallback para dados estáticos
  console.log(`Usando fallback para post ${slug}`);
  const fallbackPost = fallbackBlogPosts.find((post: BlogPost) => post.slug === slug);

  if (fallbackPost) {
    // Garantir que o conteúdo do fallback também seja válido
    if (!fallbackPost.content || typeof fallbackPost.content !== 'string') {
      fallbackPost.content = '<p class="mb-4 text-gray-800 leading-relaxed">Conteúdo não disponível no momento.</p>';
    }
  }

  return fallbackPost;
};

export const getPostsByCategory = async (category: string): Promise<BlogPost[]> => {
  try {
    const allPosts = await getAllBlogPosts();
    return getPostsByCategoryFromSanity(allPosts, category);
  } catch (error) {
    console.error('Erro ao buscar posts por categoria:', error);
    // Fallback para dados estáticos
    return fallbackBlogPosts.filter((post: BlogPost) =>
      post.categories.some((cat: string) => cat.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase())
    );
  }
};

export const getFeaturedPosts = async (): Promise<BlogPost[]> => {
  try {
    const allPosts = await getAllBlogPosts();
    return getFeaturedPostsFromSanity(allPosts);
  } catch (error) {
    console.error('Erro ao buscar posts em destaque:', error);
    // Fallback para dados estáticos
    return fallbackBlogPosts.filter((post: BlogPost) => post.featured);
  }
};

export const getRecentPosts = async (limit: number = 5): Promise<BlogPost[]> => {
  try {
    const allPosts = await getAllBlogPosts();
    return getRecentPostsFromSanity(allPosts, limit);
  } catch (error) {
    console.error('Erro ao buscar posts recentes:', error);
    // Fallback para dados estáticos
    return fallbackBlogPosts
      .sort((a: BlogPost, b: BlogPost) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit);
  }
};

export const searchPosts = async (query: string): Promise<BlogPost[]> => {
  try {
    const allPosts = await getAllBlogPosts();
    return searchPostsFromSanity(allPosts, query);
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    // Fallback para dados estáticos
    const searchTerm = query.toLowerCase();
    return fallbackBlogPosts.filter(
      (post: BlogPost) =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm))
    );
  }
};

export const getAllCategories = async (): Promise<{ name: string; count: number }[]> => {
  try {
    const allPosts = await getAllBlogPosts();
    return getAllCategoriesFromSanity(allPosts);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    // Fallback para dados estáticos
    const categoryCounts: { [key: string]: number } = {};

    fallbackBlogPosts.forEach((post: BlogPost) => {
      post.categories.forEach((category: string) => {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });
    });

    return Object.entries(categoryCounts).map(([name, count]) => ({ name, count }));
  }
};

// Mantém export do array estático para compatibilidade (deprecated - use getAllBlogPosts())
export const allBlogPosts = fallbackBlogPosts;
