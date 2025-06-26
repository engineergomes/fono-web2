'use client';

import Container from '@/components/Container';
import { BlogHero, BlogSidebar } from '@/components/Blog';
import { useBlog } from '@/context/BlogContext';
import { useSearch } from '@/context/SearchContext';
import { urlFor } from '@/libs/sanity';
import Link from 'next/link';

function ClientBlogList() {
  const { featuredPosts, isLoading, error } = useBlog();
  const { filteredPosts, hasActiveFilters, searchQuery, selectedCategories } = useSearch();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Carregando posts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-600">Erro ao carregar posts: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Featured Posts - sempre reserva o espaço */}
      <section
        className={`transition-opacity duration-300 ${
          hasActiveFilters ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
        }`}
      >
        {featuredPosts.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Posts em Destaque</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {featuredPosts.slice(0, 2).map((post) => (
                <article
                  key={post._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
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
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                      <Link href={`/blog/${post.slug.current}`} className="hover:text-blue-600 transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.author?.name}</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                    {post.categories && post.categories.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {post.categories.slice(0, 2).map((category: any) => (
                          <span key={category.title} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {category.title}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Header section - altura fixa para evitar layout shift */}
      <section className="min-h-[60px] flex flex-col justify-center">
        {hasActiveFilters ? (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {searchQuery ? `Resultados para "${searchQuery}"` : 'Posts Filtrados'}
              {selectedCategories.length > 0 && (
                <span className="text-lg font-normal text-gray-600 ml-2">
                  em {selectedCategories.length === 1 ? 'categoria' : 'categorias'}: {selectedCategories.join(', ')}
                </span>
              )}
            </h2>
            <p className="text-gray-600 mt-1">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'post encontrado' : 'posts encontrados'}
              {searchQuery && filteredPosts.length > 0 && (
                <span className="ml-2 text-sm">• Ordenados por relevância</span>
              )}
            </p>
          </div>
        ) : (
          <h2 className="text-2xl font-bold mb-6">Todos os Posts</h2>
        )}
      </section>

      {/* Posts Grid - estrutura consistente */}
      <section>
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative"
              >
                {/* Container fixo para badges - sempre presente para manter layout */}
                <div className="absolute top-2 left-2 right-2 z-10 flex justify-between h-6">
                  {/* Badge esquerdo - tipo de match */}
                  <div className="flex">
                    {searchQuery && 'matchType' in post && (
                      <span
                        className={`text-white text-xs px-2 py-1 rounded-full transition-all duration-200 ${
                          post.matchType === 'title'
                            ? 'bg-green-500'
                            : post.matchType === 'excerpt'
                            ? 'bg-blue-500'
                            : post.matchType === 'category'
                            ? 'bg-purple-500'
                            : 'bg-gray-500'
                        }`}
                      >
                        {post.matchType === 'title'
                          ? 'Título'
                          : post.matchType === 'excerpt'
                          ? 'Descrição'
                          : post.matchType === 'category'
                          ? 'Categoria'
                          : 'Conteúdo'}
                      </span>
                    )}
                  </div>

                  {/* Badge direito - relevância */}
                  <div className="flex">
                    {searchQuery && 'relevanceScore' in post && post.relevanceScore > 0 && (
                      <span className="bg-lightPurple text-white text-xs px-2 py-1 rounded-full transition-all duration-200">
                        {Math.round(post.relevanceScore)}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Imagem com altura fixa */}
                <div className="h-40 bg-gray-200">
                  {post.mainImage && (
                    <img
                      src={urlFor(post.mainImage).url()}
                      alt={post.mainImage.alt || post.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Conteúdo com altura mínima consistente */}
                <div className="p-4 min-h-[160px] flex flex-col">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 flex-grow">
                    <Link href={`/blog/${post.slug.current}`} className="hover:text-blue-600 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-2 text-sm">{post.excerpt}</p>

                  {/* Footer com altura fixa */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>{post.author?.name}</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
                    </div>

                    {/* Container para categorias com altura mínima */}
                    <div className="min-h-[24px] flex flex-wrap gap-1">
                      {post.categories &&
                        post.categories.length > 0 &&
                        post.categories.slice(0, 2).map((category: any) => (
                          <span
                            key={category.title}
                            className={`text-xs px-2 py-1 rounded transition-colors ${
                              selectedCategories.includes(category.title)
                                ? 'bg-lightBlue text-white'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {category.title}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : hasActiveFilters ? (
          /* Container com altura fixa para evitar layout shift */
          <div className="min-h-[300px] flex items-center justify-center">
            <div className="text-center py-12 bg-gray-50 rounded-lg max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Nenhum resultado encontrado</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery && selectedCategories.length > 0
                  ? `Não encontramos posts com "${searchQuery}" nas categorias selecionadas.`
                  : searchQuery
                  ? `Não encontramos posts com "${searchQuery}".`
                  : 'Não há posts nas categorias selecionadas.'}
              </p>
              <p className="text-sm text-gray-500 mb-4">Tente ajustar os filtros ou usar termos de busca diferentes.</p>
            </div>
          </div>
        ) : (
          <div className="min-h-[200px] flex items-center justify-center">
            <p className="text-gray-600 text-center py-8">Nenhum post encontrado.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <Container className="px-4 w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <ClientBlogList />
          </div>
          <BlogSidebar />
        </div>
      </Container>
    </>
  );
}
