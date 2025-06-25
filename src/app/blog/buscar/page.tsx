'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import { BlogHero, BlogSidebar } from '@/components/Blog';
import UrlProvider from '@/providers/UrlProvider';
import { useBlog } from '@/context/BlogContext';
import { urlFor } from '@/libs/sanity';
import Link from 'next/link';

function ClientBlogSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchPosts, isLoading } = useBlog();

  const searchResults = searchPosts(searchQuery);
  const hasSearched = searchQuery.length >= 2;

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Buscar no Blog</h1>
        <p className="text-gray-600 mb-8">Digite pelo menos 2 caracteres para buscar artigos</p>
      </div>

      {/* Search Input */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Digite sua busca aqui..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="mt-4">
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
            ← Voltar para o blog
          </Link>
        </div>
      </div>

      {/* Search Results */}
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Carregando...</span>
        </div>
      ) : hasSearched ? (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Resultados da busca por "{searchQuery}"</h2>
            <p className="text-gray-600 mt-1">
              {searchResults.length} {searchResults.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
            </p>
          </div>

          {searchResults.length > 0 ? (
            <div className="space-y-6">
              {searchResults.map((post) => (
                <article key={post._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-6">
                    {post.mainImage && (
                      <div className="flex-shrink-0 w-32 h-24 bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={urlFor(post.mainImage).url()}
                          alt={post.mainImage.alt || post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        <Link href={`/blog/${post.slug.current}`} className="hover:text-blue-600 transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-4">
                          <span>{post.author?.name}</span>
                          <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
                          {post.readingTime && <span>{post.readingTime} min de leitura</span>}
                        </div>
                      </div>
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.categories.slice(0, 3).map((category) => (
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
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Nenhum resultado encontrado</h3>
              <p className="text-gray-600 mb-4">
                Não encontramos artigos com o termo "{searchQuery}". Tente uma busca diferente.
              </p>
              <Link
                href="/blog"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ver todos os artigos
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p>Digite algo no campo de busca para encontrar artigos</p>
        </div>
      )}
    </div>
  );
}

export default function BlogSearchPage() {
  return (
    <main className="flex flex-col items-center justify-center scroll-smooth">
      <UrlProvider>
        <Header />
        <BlogHero />
        <Container className="px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <ClientBlogSearch />
            </div>
            <BlogSidebar />
          </div>
        </Container>
        <Footer />
      </UrlProvider>
    </main>
  );
}
