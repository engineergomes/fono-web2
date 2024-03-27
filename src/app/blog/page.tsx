'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

function Blog() {
  const [post, setPost] = useState<Post>();
  const router = useRouter();

  interface Post {
    id: number;
    title: string;
    content: string;
    published: boolean;
  }

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('http://localhost:3000/api/post/');
        console.log(response); // Verificar a resposta da solicitação

        if (!response.ok) {
          throw new Error('Erro ao buscar posts');
        }
        const data = await response.json();
        setPost(data);
        // prisma.$disconnect;
      } catch (error) {
        console.error(error);
        // prisma.$disconnect;
      }
    }

    fetchPosts();
  }, []); // Executa somente uma vez, quando o componente monta
  if (!post) return <p className="text-black">Post não encontrado</p>;

  return (
    <div className="text-black">
      <h1>Blog</h1>
      <ul>
        <li>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </li>
      </ul>
    </div>
  );
}

export default Blog;
