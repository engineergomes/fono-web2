'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { SanityBlogPost } from '@/libs/sanity';
import { sanityService } from '@/services/sanityService';

interface BlogData {
  allPosts: SanityBlogPost[];
  featuredPosts: SanityBlogPost[];
  categories: Array<{
    title: string;
    description?: string;
    postCount: number;
  }>;
  recentPosts: SanityBlogPost[];
  isLoading: boolean;
  error: string | null;
}

interface BlogContextType extends BlogData {
  getPostBySlug: (slug: string) => SanityBlogPost | null;
  getPostsByCategory: (category: string) => SanityBlogPost[];
  searchPosts: (query: string) => SanityBlogPost[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [blogData, setBlogData] = useState<BlogData>({
    allPosts: [],
    featuredPosts: [],
    categories: [],
    recentPosts: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchAllBlogData = async () => {
      console.log('🔄 BlogProvider: Iniciando carregamento dos dados do blog...');

      try {
        setBlogData((prev) => ({ ...prev, isLoading: true, error: null }));

        // Buscar todos os posts de uma vez (com todo o conteúdo)
        console.log('📡 Buscando todos os posts...');
        const allPosts = await sanityService.getAllPosts();
        console.log(`✅ Posts carregados: ${allPosts.length} posts`);

        // Buscar categorias
        console.log('📡 Buscando categorias...');
        const categories = await sanityService.getAllCategories();
        console.log(`✅ Categorias carregadas: ${categories.length} categorias`);

        // Processar dados localmente em vez de fazer mais requisições
        const featuredPosts = allPosts.filter((post) => post.featured);
        const recentPosts = allPosts.slice(0, 5); // 5 posts mais recentes

        console.log(`✨ Dados processados:
          - Posts totais: ${allPosts.length}
          - Posts em destaque: ${featuredPosts.length}
          - Posts recentes: ${recentPosts.length}
          - Categorias: ${categories.length}`);

        setBlogData({
          allPosts,
          featuredPosts,
          categories,
          recentPosts,
          isLoading: false,
          error: null,
        });

        console.log('🎉 BlogProvider: Todos os dados carregados com sucesso!');
      } catch (error) {
        console.error('❌ Erro ao carregar dados do blog:', error);
        setBlogData((prev) => ({
          ...prev,
          isLoading: false,
          error: 'Erro ao carregar dados do blog',
        }));
      }
    };

    fetchAllBlogData();
  }, []);

  // Função para buscar post por slug (localmente, sem requisição)
  const getPostBySlug = (slug: string): SanityBlogPost | null => {
    console.log(`🔍 Buscando post com slug: ${slug} (busca local)`);
    const post = blogData.allPosts.find((post) => post.slug?.current === slug) || null;

    if (post) {
      console.log(`✅ Post encontrado: ${post.title}`);
    } else {
      console.log(`❌ Post não encontrado com slug: ${slug}`);
    }

    return post;
  };

  // Função para buscar posts por categoria (localmente)
  const getPostsByCategory = (category: string): SanityBlogPost[] => {
    console.log(`🔍 Buscando posts da categoria: ${category} (busca local)`);
    const posts = blogData.allPosts.filter(
      (post) =>
        post.categories?.some(
          (cat) => cat.title?.toLowerCase().replace(/\s+/g, '-') === category || cat.title === category
        )
    );
    console.log(`✅ Encontrados ${posts.length} posts na categoria ${category}`);
    return posts;
  };

  // Função para buscar posts (localmente)
  const searchPosts = (query: string): SanityBlogPost[] => {
    if (!query || query.length < 2) return [];

    console.log(`🔍 Buscando posts com termo: "${query}" (busca local)`);
    const lowerQuery = query.toLowerCase();
    const posts = blogData.allPosts.filter(
      (post) => post.title?.toLowerCase().includes(lowerQuery) || post.excerpt?.toLowerCase().includes(lowerQuery)
    );
    console.log(`✅ Encontrados ${posts.length} posts com o termo "${query}"`);
    return posts;
  };

  const contextValue: BlogContextType = {
    ...blogData,
    getPostBySlug,
    getPostsByCategory,
    searchPosts,
  };

  return <BlogContext.Provider value={contextValue}>{children}</BlogContext.Provider>;
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}
