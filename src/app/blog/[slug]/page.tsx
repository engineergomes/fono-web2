'use client';

import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import UrlProvider from '@/providers/UrlProvider';
import { useBlog } from '@/context/BlogContext';
import { urlFor, extractTextFromBlocks } from '@/libs/sanity';
import { PortableTextRenderer } from '@/components/Blog/PortableTextRenderer';
import { useParams } from 'next/navigation';
import Link from 'next/link';

function ClientBlogPost() {
  const params = useParams();
  const slug = params?.slug as string;

  const { getPostBySlug, isLoading, error } = useBlog();
  const post = getPostBySlug(slug);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-lg">Carregando post...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold text-red-800 mb-2">Erro ao carregar post</h2>
        <p className="text-red-600 mb-4">{error}</p>
        <Link href="/blog" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
          Voltar para o Blog
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Post não encontrado</h2>
        <p className="text-gray-600 mb-6">O post que você está procurando não existe ou foi removido.</p>
        <Link href="/blog" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Voltar para o Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        {post.mainImage && (
          <div className="w-full h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden mb-6">
            <img
              src={urlFor(post.mainImage).url()}
              alt={post.mainImage.alt || post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="mb-4">
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
            ← Voltar para o blog
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

        {post.excerpt && <p className="text-xl text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>}

        <div className="flex items-center justify-between text-sm text-gray-500 border-b border-gray-200 pb-6">
          <div className="flex items-center space-x-4">
            {post.author && (
              <div className="flex items-center">
                {post.author.image && (
                  <img
                    src={urlFor(post.author.image).url()}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900">{post.author.name}</p>
                  <p className="text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>

          {post.readingTime && <span className="text-gray-500">{post.readingTime} min de leitura</span>}
        </div>

        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4">
            {post.categories.map((category) => (
              <span key={category.title} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {category.title}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {post.body ? (
          <PortableTextRenderer content={post.body} />
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <p className="text-yellow-800">
              O conteúdo deste post está sendo processado. Tente novamente em alguns instantes.
            </p>
          </div>
        )}
      </div>

      {/* Author Bio */}
      {post.author && post.author.bio && (
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Sobre o autor</h3>
          <div className="flex items-start space-x-4">
            {post.author.image && (
              <img
                src={urlFor(post.author.image).url()}
                alt={post.author.name}
                className="w-16 h-16 rounded-full flex-shrink-0"
              />
            )}
            <div>
              <p className="font-medium text-gray-900 mb-2">{post.author.name}</p>
              <p className="text-gray-600">{extractTextFromBlocks(post.author.bio)}</p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default function BlogPostPage() {
  return (
    <main className="flex flex-col items-center justify-center scroll-smooth">
      <UrlProvider>
        <Header />
        <Container className="px-4 py-8">
          <ClientBlogPost />
        </Container>
        <Footer />
      </UrlProvider>
    </main>
  );
}
