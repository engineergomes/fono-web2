'use client';

import { Header } from '@/components/Header';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  // const endOfPageRef = useRef<HTMLDivElement>(null);

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
        const response = await fetch(`http://localhost:3000/api/post?page=${page}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar posts');
        }
        const data = await response.json();
        if (data.length === 0) {
          setAllPostsLoaded(true);
        } else {
          setPosts(data);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const renderPosts = () => {
    return posts.map((post) => (
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
    <div className="text-black flex flex-col items-center bg-slate-300 p-10">
      <Header />
      <h1 className="text-7xl font-medium mb-8">Blog</h1>
      {renderPosts()}
      {loading && <p>Carregando...</p>}
      {/* <div ref={endOfPageRef} style={{ height: '10px' }} /> */}
      {allPostsLoaded && <p>Todos os posts foram carregados.</p>}
    </div>
  );
}

export default Blog;
