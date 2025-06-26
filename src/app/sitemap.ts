import { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories } from '@/libs/sanity';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fonoana.com.br';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/fonoaudiologa-jaragua-sul`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/buscar`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.3,
    },
  ];

  try {
    // Gerar URLs para todos os posts do blog
    const posts = await getAllPosts();
    const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug.current}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // Gerar URLs para todas as categorias
    const categories = await getAllCategories();
    const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
      url: `${baseUrl}/blog/categoria/${encodeURIComponent(category.title)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...postRoutes, ...categoryRoutes];
  } catch (error) {
    console.error('Erro ao gerar sitemap:', error);
    // Retorna apenas as rotas estáticas em caso de erro
    return staticRoutes;
  }
}
