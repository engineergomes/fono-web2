'use client';

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
        const response = await fetch(`http://localhost:3000/api/post/?page=${page}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar posts');
        }
        const data = await response.json();
        setPosts((prevPosts) => [...prevPosts, ...data]);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPosts();
  }, [page]); // Executa sempre que a página é atualizada

  // Função para carregar mais posts quando o usuário alcança o final da página
  const loadMorePosts = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // UseIntersectionObserver para detectar quando o elemento endOfPageRef está visível na tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 0.5 } // Defina o limite como 0.5 para carregar mais posts quando o elemento está 50% visível
    );

    if (endOfPageRef.current) {
      observer.observe(endOfPageRef.current);
    }

    return () => {
      if (endOfPageRef.current) {
        observer.unobserve(endOfPageRef.current);
      }
    };
  }, [loading]); // Executa sempre que o loading é atualizado

  return (
    <div className="text-black flex flex-col items-center bg-slate-300">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      {posts.map((post, index) => (
        <div
          key={post.id}
          className={`bg-beige rounded-md p-4 lg:min-w-[1200px] my-4 bg-white ${
            index === posts.length - 1 ? 'mb-8' : ''
          }`}
        >
          <h2 className="text-5xl font-bold mb-4 text-center">{post.title}</h2>
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 pl-20">{children}</h1>,
              h2: ({ children }) => <h2 className="text-xl font-bold mb-4 pl-20">{children}</h2>,
              p: ({ children }) => <p className="mb-4 pl-20">{children}</p>, // Adicionado padding à esquerda
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
      ))}
      {loading && <p>Carregando...</p>}
      <div ref={endOfPageRef} style={{ height: '10px' }} /> {/* Ref para o final da página */}
    </div>
  );
}

export default Blog;
