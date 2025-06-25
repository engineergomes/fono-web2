'use client';

import { useState, useEffect } from 'react';
import { BlogCard } from './BlogCard';
import { getAllBlogPosts, getPostsByCategory, BlogPost } from '../../data/allBlogPosts';

interface BlogListProps {
  category?: string;
}

export function BlogList({ category }: BlogListProps = {}) {
  const [visiblePosts, setVisiblePosts] = useState(9);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        let fetchedPosts: BlogPost[];
        if (category) {
          fetchedPosts = await getPostsByCategory(category);
        } else {
          fetchedPosts = await getAllBlogPosts();
        }

        setPosts(fetchedPosts);
      } catch (err) {
        console.error('Erro ao carregar posts:', err);
        setError('Erro ao carregar os artigos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category]);

  if (loading) {
    return (
      <section className="py-16">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-lightBlue"></div>
          <p className="mt-4 text-lightGray">Carregando artigos...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-lightBlue hover:bg-darkBlue text-white font-semibold py-2 px-4 rounded"
          >
            Tentar Novamente
          </button>
        </div>
      </section>
    );
  }

  const displayedPosts = posts.slice(0, visiblePosts);
  const hasMorePosts = visiblePosts < posts.length;

  const loadMorePosts = () => {
    setVisiblePosts((prev) => Math.min(prev + 9, posts.length));
  };

  return (
    <section className="py-16">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-darkBlue text-center mb-4">
          {category ? 'Artigos da Categoria' : 'Últimos Artigos'}
        </h2>
        <p className="text-lg text-lightGray text-center max-w-2xl mx-auto">
          {category
            ? `Artigos filtrados por categoria (${posts.length} artigos)`
            : 'Confira nossos artigos mais recentes sobre fonoaudiologia e desenvolvimento infantil'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {displayedPosts.map((post) => (
          <BlogCard
            key={post.id}
            post={{
              _id: post.id,
              title: post.title,
              slug: post.slug,
              excerpt: post.excerpt,
              publishedAt: post.publishedAt,
              mainImage: post.image || '/blog-placeholder.jpg',
              categories: post.categories,
            }}
          />
        ))}
      </div>

      {hasMorePosts && (
        <div className="text-center mt-12">
          <button
            onClick={loadMorePosts}
            className="bg-lightBlue hover:bg-darkBlue text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Carregar Mais Artigos ({posts.length - visiblePosts} restantes)
          </button>
        </div>
      )}
    </section>
  );
}
