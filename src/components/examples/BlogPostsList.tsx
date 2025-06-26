'use client';

import React from 'react';
import { useAllPosts, useFeaturedPosts, useCategories } from '@/hooks/useSanityData';
import { urlFor } from '@/libs/sanity';

export function BlogPostsList() {
  // Using React Query hooks to fetch data
  const { data: posts, isLoading: postsLoading, error: postsError } = useAllPosts();

  const { data: featuredPosts, isLoading: featuredLoading } = useFeaturedPosts();

  const { data: categories, isLoading: categoriesLoading } = useCategories();

  if (postsLoading) {
    return (
      <div className="loading-container p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Carregando posts...</span>
      </div>
    );
  }

  if (postsError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-600">Erro ao carregar posts: {postsError.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Blog Posts with React Query + Axios</h1>

      {/* Featured Posts Section */}
      {!featuredLoading && featuredPosts && featuredPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-blue-600">Posts em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <article key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
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
                  <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.author?.name}</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                  {post.categories && post.categories.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.categories.map((category) => (
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
        </section>
      )}

      {/* Categories Section */}
      {!categoriesLoading && categories && categories.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-green-600">Categorias</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <div
                key={category.title}
                className="bg-green-100 text-green-800 px-4 py-2 rounded-lg border border-green-200"
              >
                {category.title} ({category.postCount})
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All Posts Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Todos os Posts</h2>
        {posts && posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post._id}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-6">
                  {post.mainImage && (
                    <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded">
                      <img
                        src={urlFor(post.mainImage).url()}
                        alt={post.mainImage.alt || post.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span>{post.author?.name}</span>
                        <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
                        {post.readingTime && <span>{post.readingTime} min de leitura</span>}
                      </div>
                      {post.featured && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Destaque</span>
                      )}
                    </div>
                    {post.categories && post.categories.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {post.categories.map((category) => (
                          <span key={category.title} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {category.title}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">Nenhum post encontrado.</p>
        )}
      </section>
    </div>
  );
}

export default BlogPostsList;
