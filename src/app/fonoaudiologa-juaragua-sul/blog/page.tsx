'use client';

import { Header } from '@/components/Header';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const endOfPageRef = useRef<HTMLDivElement>(null);

  interface Post {
    id: number;
    title: string;
    content: string;
    published: boolean;
  }

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/post`);
        if (!response.ok) {
          throw new Error('Erro ao buscar posts');
        }
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMorePosts();
        }
      },
      { threshold: 0.5 }
    );

    if (endOfPageRef.current && posts.length > 0) {
      observer.observe(endOfPageRef.current);
    }

    return () => {
      if (endOfPageRef.current) {
        observer.unobserve(endOfPageRef.current);
      }
    };
  }, [loading, posts]);

  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Função para renderizar os posts de acordo com a página atual
  const renderPosts = () => {
    const startIndex = (page - 1) * 5; // Índice inicial dos posts a serem renderizados
    const endIndex = startIndex + 5; // Índice final (não incluído) dos posts a serem renderizados
    return posts.slice(startIndex, endIndex).map((post) => (
      <div key={post.id} className="bg-beige rounded-md p-4 lg:min-w-[1200px] my-4 bg-white">
        <h2 className="text-5xl font-bold mb-4 text-center">{post.title}</h2>
        <ReactMarkdown
          components={{
            h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 pl-20">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl font-bold mb-4 pl-20">{children}</h2>,
            p: ({ children }) => <p className="mb-4 pl-20">{children}</p>,
            ul: ({ children }) => <ul className="list-disc pl-20 mb-4">{children}</ul>,
            li: ({ children }) => <li className="mb-2">{children}</li>,
            a: ({ children, href }) => (
              <a href={href} className="text-blue-500 pl-20">
                {children}
              </a>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    ));
  };

  return (
    <div className="text-black flex flex-col items-center bg-slate-300">
      <Header />
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      {renderPosts()}
      {loading && <p>Carregando...</p>}
      <div ref={endOfPageRef} style={{ height: '10px' }} />
    </div>
  );
}

export default Blog;
