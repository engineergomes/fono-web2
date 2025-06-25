'use client';

import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import { BlogHero, BlogSidebar } from '@/components/Blog';
import UrlProvider from '@/providers/UrlProvider';
import { useBlog } from '@/context/BlogContext';
import { urlFor } from '@/libs/sanity';
import { useParams } from 'next/navigation';
import Link from 'next/link';

function ClientCategoryPosts() {
  const params = useParams();
  const categoria = params?.categoria as string;

  const { getPostsByCategory, isLoading, error } = useBlog();
  const categoryPosts = getPostsByCategory(categoria);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Carregando posts da categoria...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-600">Erro ao carregar posts da categoria: {error}</p>
      </div>
    );
  }

  // Formatar o nome da categoria para exibição
  const categoryDisplayName = categoria.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Categoria: {categoryDisplayName}</h1>
        <p className="text-gray-600">
          {categoryPosts.length} {categoryPosts.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
        </p>
      </div>

      {categoryPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categoryPosts.map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {post.mainImage && (
                <div className="h-48 bg-gray-200">
                  <img
                    src={urlFor(post.mainImage).url()}
                    alt={post.mainImage.alt || post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                  <Link href={`/blog/${post.slug.current}`} className="hover:text-blue-600 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{post.author?.name}</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
                </div>

                {post.categories && post.categories.length > 1 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories
                      .filter((cat) => cat.title?.toLowerCase().replace(/\s+/g, '-') !== categoria)
                      .slice(0, 2)
                      .map((category) => (
                        <Link
                          key={category.title}
                          href={`/blog/categoria/${category.title?.toLowerCase().replace(/\s+/g, '-') || ''}`}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                        >
                          {category.title}
                        </Link>
                      ))}
                  </div>
                )}

                <Link
                  href={`/blog/${post.slug.current}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  Ler mais
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Nenhum artigo encontrado</h2>
          <p className="text-gray-600 mb-6">Não há artigos nesta categoria no momento.</p>
          <Link
            href="/blog"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ver todos os artigos
          </Link>
        </div>
      )}
    </div>
  );
}

export default function CategoryPage() {
  return (
    <main className="flex flex-col items-center justify-center scroll-smooth">
      <UrlProvider>
        <Header />
        <BlogHero />
        <Container className="px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <ClientCategoryPosts />
            </div>
            <BlogSidebar />
          </div>
        </Container>
        <Footer />
      </UrlProvider>
    </main>
  );
}
