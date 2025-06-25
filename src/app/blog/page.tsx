'use client';

import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import { BlogHero, BlogSidebar } from '@/components/Blog';
import UrlProvider from '@/providers/UrlProvider';
import { useBlog } from '@/context/BlogContext';
import { urlFor } from '@/libs/sanity';
import Link from 'next/link';

function ClientBlogList() {
  const { allPosts, featuredPosts, isLoading, error } = useBlog();

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
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section>
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
                      {post.categories.slice(0, 2).map((category) => (
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

      {/* All Posts */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Todos os Posts</h2>
        {allPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPosts.map((post) => (
              <article
                key={post._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {post.mainImage && (
                  <div className="h-40 bg-gray-200">
                    <img
                      src={urlFor(post.mainImage).url()}
                      alt={post.mainImage.alt || post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                    <Link href={`/blog/${post.slug.current}`} className="hover:text-blue-600 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-2 text-sm">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>{post.author?.name}</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.categories.slice(0, 2).map((category) => (
                        <span key={category.title} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {category.title}
                        </span>
                      ))}
                    </div>
                  )}
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

export default function BlogPage() {
  return (
    <main className="flex flex-col items-center justify-center scroll-smooth">
      <UrlProvider>
        <Header />
        <BlogHero />
        <Container className="px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <ClientBlogList />
            </div>
            <BlogSidebar />
          </div>
        </Container>
        <Footer />
      </UrlProvider>
    </main>
  );
}
