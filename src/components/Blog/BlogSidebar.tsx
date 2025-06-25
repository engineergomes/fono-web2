'use client';

import Link from 'next/link';
import { useBlog } from '@/context/BlogContext';

export function BlogSidebar() {
  const { categories, recentPosts, isLoading } = useBlog();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    });
  };

  return (
    <aside className="w-full lg:w-80 space-y-8">
      {/* Busca Rápida */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-darkBlue mb-4">Buscar Artigos</h3>
        <Link
          href="/blog/buscar"
          className="block w-full text-center bg-lightBlue hover:bg-darkBlue text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          🔍 Buscar no Blog
        </Link>
      </div>

      {/* Categorias */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-darkBlue mb-4">Categorias</h3>
        <ul className="space-y-2">
          {isLoading ? (
            <li className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-lightBlue"></div>
            </li>
          ) : (
            categories.map((category, index) => {
              const categorySlug = category.title.toLowerCase().replace(/\s+/g, '-');
              return (
                <li key={index}>
                  <Link
                    href={`/blog/categoria/${categorySlug}`}
                    className="flex items-center justify-between text-lightGray hover:text-lightBlue transition-colors duration-300"
                  >
                    <span>{category.title}</span>
                    <span className="bg-lightGreen text-darkBlue text-xs px-2 py-1 rounded-full">
                      {category.postCount}
                    </span>
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      </div>

      {/* Posts Recentes */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-darkBlue mb-4">Posts Recentes</h3>
        <ul className="space-y-4">
          {isLoading ? (
            <li className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-lightBlue"></div>
            </li>
          ) : (
            recentPosts.map((post) => (
              <li key={post.slug?.current}>
                <Link href={`/blog/${post.slug?.current}`}>
                  <article className="group">
                    <h4 className="text-sm font-semibold text-darkBlue group-hover:text-lightBlue transition-colors duration-300 line-clamp-2 mb-1">
                      {post.title}
                    </h4>
                    <time className="text-xs text-lightGray">{formatDate(post.publishedAt)}</time>
                  </article>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-br from-lightBlue to-lightPurple rounded-lg p-6 text-white text-center">
        <h3 className="text-lg font-bold mb-3">Precisa de Ajuda?</h3>
        <p className="text-sm opacity-90 mb-4">Agende uma consulta personalizada</p>
        <Link
          href="/#contato"
          className="inline-block bg-white text-lightBlue font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-300"
        >
          Agendar Consulta
        </Link>
      </div>
    </aside>
  );
}
