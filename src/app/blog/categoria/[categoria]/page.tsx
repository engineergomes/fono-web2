import { Metadata } from 'next';
import { getAllCategories, getPostsByCategory } from '@/libs/sanity';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    categoria: string;
  };
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fonoana.com.br';

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoria = decodeURIComponent(params.categoria);
  const posts = await getPostsByCategory(categoria);
  const postCount = posts.length;

  return {
    title: `${categoria} - Blog | Fonoaudióloga Ana Nascimento`,
    description: `Artigos sobre ${categoria} em fonoaudiologia e desenvolvimento infantil. ${postCount} artigos disponíveis com dicas e informações especializadas.`,
    alternates: {
      canonical: `${baseUrl}/blog/categoria/${encodeURIComponent(categoria)}`,
    },
    openGraph: {
      title: `${categoria} - Blog | Fonoaudióloga Ana Nascimento`,
      description: `Artigos sobre ${categoria} em fonoaudiologia e desenvolvimento infantil.`,
      url: `${baseUrl}/blog/categoria/${encodeURIComponent(categoria)}`,
      siteName: 'Fonoaudióloga Ana Nascimento',
      images: [
        {
          url: `${baseUrl}/og-blog.jpg`,
          width: 1200,
          height: 630,
          alt: `Artigos sobre ${categoria} - Fonoaudióloga Ana Nascimento`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoria} - Blog | Fonoaudióloga Ana Nascimento`,
      description: `Artigos sobre ${categoria} em fonoaudiologia e desenvolvimento infantil.`,
      images: [`${baseUrl}/og-blog.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
    keywords: [categoria, 'fonoaudiologia', 'desenvolvimento infantil', 'speech therapy', 'artigos especializados'],
  };
}

// Gera parâmetros estáticos para todas as categorias (SSG)
export async function generateStaticParams() {
  try {
    const categories = await getAllCategories();

    return categories.map((category) => ({
      categoria: encodeURIComponent(category.title),
    }));
  } catch (error) {
    console.error('Erro ao gerar parâmetros estáticos para categorias:', error);
    return [];
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categoria = decodeURIComponent(params.categoria);

  try {
    const posts = await getPostsByCategory(categoria);

    if (posts.length === 0) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Categoria: {categoria}</h1>
          <p className="text-gray-600">
            {posts.length} {posts.length === 1 ? 'artigo encontrado' : 'artigos encontrados'} sobre {categoria}
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Implementar card de post aqui */}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <a href={`/blog/${post.slug.current}`} className="text-blue-600 hover:text-blue-800 font-medium">
                  Ler artigo →
                </a>
              </div>
            </article>
          ))}
        </section>
      </div>
    );
  } catch (error) {
    console.error('Erro ao carregar categoria:', error);
    notFound();
  }
}
