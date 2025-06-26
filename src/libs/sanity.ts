import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Verificação de variáveis de ambiente
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.NEXT_PUBLIC_SANITY_TOKEN;

// Log das configurações (sem expor dados sensíveis)
console.log('Sanity Config:', {
  projectId: projectId ? 'CONFIGURED' : 'MISSING',
  dataset: dataset,
  token: token ? 'CONFIGURED' : 'MISSING',
  nodeEnv: process.env.NODE_ENV,
});

// Configuração do cliente Sanity com fallback
export const sanityClient = projectId
  ? createClient({
      projectId: projectId,
      dataset: dataset,
      token: token,
      useCdn: process.env.NODE_ENV === 'production',
      apiVersion: '2025-02-06',
    })
  : null;

// Builder para URLs de imagens
const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: any) {
  if (!source || !source.asset) {
    return { url: () => '/placeholder-image.jpg' };
  }

  // Se já temos uma URL direta da API, retorna ela
  if (source.asset.url) {
    return {
      url: () => source.asset.url,
      width: (w: number) => ({ url: () => `${source.asset.url}?w=${w}` }),
      height: (h: number) => ({ url: () => `${source.asset.url}?h=${h}` }),
      fit: (mode: string) => ({ url: () => `${source.asset.url}?fit=${mode}` }),
      auto: (format: string) => ({ url: () => `${source.asset.url}?auto=${format}` }),
    };
  }

  // Fallback para o builder original se disponível
  if (!builder) {
    console.warn('Sanity image builder not available');
    return { url: () => '/placeholder-image.jpg' };
  }
  return builder.image(source);
}

// Função para extrair texto de um array de blocos rich text
export function extractTextFromBlocks(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) {
    return '';
  }

  return blocks
    .filter((block) => block._type === 'block')
    .map(
      (block) =>
        block.children
          ?.filter((child: any) => child._type === 'span')
          ?.map((span: any) => span.text)
          ?.join('') || ''
    )
    .join(' ')
    .trim();
}

// Interface para o post do Sanity
export interface SanityBlogPost {
  _id: string;
  title: string;
  slug: {
    _type: string;
    current: string;
  };
  body: any[] | null; // Rich text content (Portable Text)
  content?: any[] | null; // Alias for body for backward compatibility
  excerpt?: string | null; // Opcional, pode não existir no schema
  mainImage?: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string | null;
  } | null;
  author: {
    name: string;
    bio: Array<{
      _key: string;
      _type: string;
      children: Array<{
        _key: string;
        _type: string;
        marks: string[];
        text: string;
      }>;
      markDefs: any[];
      style: string;
    }>;
    image?: {
      asset: {
        _id: string;
        url: string;
      };
    } | null;
  };
  publishedAt: string;
  categories: Array<{
    title: string;
    description?: string;
  }>;
  tags?: Array<{
    title: string;
  }>;
  featured?: boolean | null;
  readingTime?: number | null;
}

// Query para buscar todos os posts
export const allPostsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    body[],
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    author->{
      name,
      bio,
      image {
        asset->{
          _id,
          url
        }
      }
    },
    publishedAt,
    categories[]->{
      title,
      description
    },
    tags[]->{
      title
    },
    featured,
    readingTime
  }
`;

// Query para buscar um post específico por slug
// Query para buscar um post específico por slug
export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    body[],
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    author->{
      name,
      bio,
      image {
        asset->{
          _id,
          url
        }
      }
    },
    publishedAt,
    categories[]->{
      title,
      description
    },
    tags[]->{
      title
    },
    featured,
    readingTime
  }
`;

// Query para buscar posts por categoria
export const postsByCategoryQuery = `
  *[_type == "post" && $category in categories[]->title] | order(publishedAt desc) {
    _id,
    title,
    slug,
    body[],
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    author->{
      name,
      bio,
      image {
        asset->{
          _id,
          url
        }
      }
    },
    publishedAt,
    categories[]->{
      title,
      description
    },
    tags[]->{
      title
    },
    featured,
    readingTime
  }
`;

// Query para buscar posts em destaque
export const featuredPostsQuery = `
  *[_type == "post" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    body[],
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    author->{
      name,
      bio,
      image {
        asset->{
          _id,
          url
        }
      }
    },
    publishedAt,
    categories[]->{
      title,
      description
    },
    tags[]->{
      title
    },
    featured,
    readingTime
  }
`;

// Query para buscar todas as categorias
export const allCategoriesQuery = `
  *[_type == "category"] {
    title,
    description,
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`;

// Funções para buscar dados com proteção contra Sanity não configurado
export async function getAllPosts(): Promise<SanityBlogPost[]> {
  if (!sanityClient) {
    console.warn('Sanity client not configured, returning empty array');
    return [];
  }

  try {
    const posts = await sanityClient.fetch(allPostsQuery);
    console.log(`Sanity: Encontrados ${posts.length} posts`);
    return posts;
  } catch (error) {
    console.error('Erro ao buscar posts do Sanity:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  if (!sanityClient) {
    console.warn(`Sanity client not configured, cannot fetch post: ${slug}`);
    return null;
  }

  try {
    const post = await sanityClient.fetch(postBySlugQuery, { slug });
    console.log(`Sanity: Post ${slug} ${post ? 'encontrado' : 'não encontrado'}`);
    return post;
  } catch (error) {
    console.error(`Erro ao buscar post ${slug} do Sanity:`, error);
    return null;
  }
}

export async function getPostsByCategory(category: string): Promise<SanityBlogPost[]> {
  if (!sanityClient) {
    console.warn('Sanity client not configured, returning empty array');
    return [];
  }

  try {
    return await sanityClient.fetch(postsByCategoryQuery, { category });
  } catch (error) {
    console.error('Erro ao buscar posts por categoria do Sanity:', error);
    return [];
  }
}

export async function getFeaturedPosts(): Promise<SanityBlogPost[]> {
  if (!sanityClient) {
    console.warn('Sanity client not configured, returning empty array');
    return [];
  }

  try {
    return await sanityClient.fetch(featuredPostsQuery);
  } catch (error) {
    console.error('Erro ao buscar posts em destaque do Sanity:', error);
    return [];
  }
}

export async function getAllCategories(): Promise<Array<{ title: string; description?: string; postCount: number }>> {
  if (!sanityClient) {
    console.warn('Sanity client not configured, returning empty array');
    return [];
  }

  try {
    return await sanityClient.fetch(allCategoriesQuery);
  } catch (error) {
    console.error('Erro ao buscar categorias do Sanity:', error);
    return [];
  }
}

// Função para buscar posts (search)
export async function searchPosts(query: string): Promise<SanityBlogPost[]> {
  if (!sanityClient) {
    console.warn('Sanity client not configured, returning empty array');
    return [];
  }

  const searchQuery = `
    *[_type == "post" && (
      title match "*${query}*" ||
      body[].children[].text match "*${query}*"
    )] | order(publishedAt desc) {
      _id,
      title,
      slug,
      body[],
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        name,
        bio,
        image {
          asset->{
            _id,
            url
          }
        }
      },
      publishedAt,
      categories[]->{
        title,
        description
      },
      featured,
      readingTime
    }
  `;

  try {
    return await sanityClient.fetch(searchQuery);
  } catch (error) {
    console.error('Erro ao buscar posts do Sanity:', error);
    return [];
  }
}
