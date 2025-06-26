'use client';

import Link from 'next/link';
import { useBlog } from '@/context/BlogContext';
import { useSearch } from '@/context/SearchContext';

export function BlogSidebar() {
  const { recentPosts, isLoading } = useBlog();
  const { selectedCategories, toggleCategory, hasActiveFilters, filteredPosts, clearSearch, clearCategories } =
    useSearch();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    });
  };

  const clearAllFilters = () => {
    clearSearch();
    clearCategories();
  };

  return (
    <aside className="w-full lg:w-80 space-y-8">
      {/* Filtros Ativos - apenas se houver filtros */}
      {hasActiveFilters && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-blue-800">Filtros Ativos</h3>
            <button
              onClick={clearAllFilters}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              Limpar todos
            </button>
          </div>

          <div className="text-sm text-blue-700 mb-3">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'post encontrado' : 'posts encontrados'}
          </div>

          {selectedCategories.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs text-blue-600 font-medium">Categorias selecionadas:</div>
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {category}
                    <button
                      onClick={() => toggleCategory(category)}
                      className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                      title={`Remover ${category}`}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

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
          href="https://api.whatsapp.com/send/?phone=5547997775008&text&type=phone_number&app_absent=0"
          className="inline-block bg-white text-lightBlue font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-300"
        >
          Agendar Consulta
        </Link>
      </div>
    </aside>
  );
}
