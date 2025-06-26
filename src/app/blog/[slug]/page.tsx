import { Metadata } from 'next';
import Container from '@/components/Container';
import { getPostBySlug, getAllPosts } from '@/libs/sanity';
import { urlFor, extractTextFromBlocks } from '@/libs/sanity';
import { PortableTextRenderer } from '@/components/Blog/PortableTextRenderer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Blog/Breadcrumb';

// Força SSG para todas as páginas de blog
export const dynamic = 'force-static';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Gera metadata dinâmica para SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);

    if (!post) {
      return {
        title: 'Post não encontrado',
        description: 'O post que você está procurando não foi encontrado.',
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fonoana.com.br';
    const url = `${baseUrl}/blog/${post.slug.current}`;
    const imageUrl = post.mainImage ? urlFor(post.mainImage).url() : `${baseUrl}/og-default.jpg`;

    return {
      title: `${post.title} | Blog - Fonoaudióloga Ana Nascimento`,
      description: post.excerpt || `Artigo sobre ${post.title} por ${post.author?.name || 'Ana Nascimento'}`,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: post.title,
        description: post.excerpt || `Artigo sobre ${post.title}`,
        url: url,
        siteName: 'Fonoaudióloga Ana Nascimento',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.mainImage?.alt || post.title,
          },
        ],
        type: 'article',
        publishedTime: post.publishedAt,
        authors: [post.author?.name || 'Ana Nascimento'],
        tags: post.categories?.map((cat: any) => cat.title) || [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt || `Artigo sobre ${post.title}`,
        images: [imageUrl],
      },
      robots: {
        index: true,
        follow: true,
      },
      authors: [{ name: post.author?.name || 'Ana Nascimento' }],
      keywords: [
        ...(post.categories?.map((cat: any) => cat.title) || []),
        ...(post.tags?.map((tag: any) => tag.title) || []),
        'fonoaudiologia',
        'desenvolvimento infantil',
        'speech therapy',
      ],
    };
  } catch (error) {
    console.error('Erro ao gerar metadata:', error);
    return {
      title: 'Blog - Fonoaudióloga Ana Nascimento',
      description: 'Artigos sobre fonoaudiologia e desenvolvimento infantil',
    };
  }
}

// Gera parâmetros estáticos para todas as páginas de blog (SSG)
export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();

    return posts.map((post) => ({
      slug: post.slug.current,
    }));
  } catch (error) {
    console.error('Erro ao gerar parâmetros estáticos:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = await getPostBySlug(params.slug);

    if (!post) {
      notFound();
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fonoana.com.br';

    // JSON-LD structured data for the article
    const articleJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      image: post.mainImage ? urlFor(post.mainImage).url() : undefined,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      author: {
        '@type': 'Person',
        name: post.author?.name || 'Ana Nascimento',
        url: baseUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Fonoaudióloga Ana Nascimento',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${baseUrl}/blog/${post.slug.current}`,
      },
      articleSection: post.categories?.map((cat: any) => cat.title).join(', '),
      keywords: [
        ...(post.categories?.map((cat: any) => cat.title) || []),
        ...(post.tags?.map((tag: any) => tag.title) || []),
      ].join(', '),
    };

    const breadcrumbItems = [{ label: 'Início', href: '/' }, { label: 'Blog', href: '/blog' }, { label: post.title }];

    return (
      <main className="flex flex-col items-center justify-center scroll-smooth">
        <Container className="px-4 py-8">
          {/* JSON-LD structured data */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

          <article className="max-w-4xl mx-auto">
            <Breadcrumb items={breadcrumbItems} />
            {/* Header */}
            <header className="mb-8">
              {post.mainImage && (
                <div className="w-full h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden mb-6">
                  <img
                    src={urlFor(post.mainImage).url()}
                    alt={post.mainImage.alt || post.title}
                    className="w-full h-full object-cover"
                    width={800}
                    height={400}
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
                          width={40}
                          height={40}
                        />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{post.author.name}</p>
                        <time className="text-gray-500" dateTime={post.publishedAt}>
                          {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                    </div>
                  )}
                </div>

                {post.readingTime && <span className="text-gray-500">{post.readingTime} min de leitura</span>}
              </div>

              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4">
                  {post.categories.map((category: any) => (
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
              <section className="mt-12 p-6 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold mb-3">Sobre o autor</h2>
                <div className="flex items-start space-x-4">
                  {post.author.image && (
                    <img
                      src={urlFor(post.author.image).url()}
                      alt={post.author.name}
                      className="w-16 h-16 rounded-full flex-shrink-0"
                      width={64}
                      height={64}
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900 mb-2">{post.author.name}</p>
                    <p className="text-gray-600">{extractTextFromBlocks(post.author.bio)}</p>
                  </div>
                </div>
              </section>
            )}
          </article>
        </Container>
      </main>
    );
  } catch (error) {
    console.error('Erro ao carregar post:', error);
    notFound();
  }
}
