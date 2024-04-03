'use client';

import { Header } from '@/components/Header';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

type BlogParams = {
  params: {
    id: string;
  };
};

export default function BlogPost({ params }: BlogParams) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/post?id=${params.id}`);
        if (response.data) {
          setPost(response.data);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="text-black flex justify-center items-center h-screen">Carregando...</main>
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Header />
        <main className="text-black flex justify-center items-center h-screen">Post não encontrado</main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="text-black flex justify-center items-center h-screen flex-col">
        <h2 className="text-6xl font-bold mb-8">{post.title}</h2>
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{children}</h2>
            ),
            p: ({ children }) => <p style={{ marginBottom: '0.5rem' }}>{children}</p>,
            ul: ({ children }) => (
              <ul style={{ listStyleType: 'disc', paddingLeft: '1rem', marginBottom: '0.5rem' }}>{children}</ul>
            ),
            li: ({ children }) => <li style={{ marginBottom: '0.5rem' }}>{children}</li>,
            a: ({ children, href }) => (
              <a href={href} style={{ color: 'blue' }}>
                {children}
              </a>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </main>
    </>
  );
}
