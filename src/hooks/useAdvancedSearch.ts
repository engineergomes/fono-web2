import { useState, useEffect, useMemo, useCallback } from 'react';
import { SanityBlogPost } from '@/libs/sanity';

interface SearchResult extends SanityBlogPost {
  relevanceScore: number;
  matchType: 'title' | 'excerpt' | 'content' | 'category';
}

interface UseAdvancedSearchProps {
  posts: SanityBlogPost[];
  debounceMs?: number;
}

interface UseAdvancedSearchReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  debouncedQuery: string;
  searchResults: SearchResult[];
  isSearching: boolean;
  hasSearched: boolean;
  clearSearch: () => void;
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  clearCategories: () => void;
  hasActiveFilters: boolean;
  filteredPosts: SearchResult[];
}

// Função para calcular similaridade entre strings usando algoritmo de Levenshtein simplificado
const calculateSimilarity = (str1: string, str2: string): number => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) return 1;

  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
};

// Implementação do algoritmo de Levenshtein (distância de edição)
const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(matrix[j][i - 1] + 1, matrix[j - 1][i] + 1, matrix[j - 1][i - 1] + indicator);
    }
  }

  return matrix[str2.length][str1.length];
};

// Função para criar padrões de regex flexíveis
const createFlexibleRegex = (query: string): RegExp[] => {
  const words = query.toLowerCase().trim().split(/\s+/);
  const patterns: RegExp[] = [];

  // Padrão exato
  patterns.push(new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'));

  // Padrões para cada palavra individualmente
  words.forEach((word) => {
    if (word.length >= 2) {
      patterns.push(new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'));
    }
  });

  // Padrão com palavras em qualquer ordem
  if (words.length > 1) {
    const wordPattern = words.map((w) => `(?=.*${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`).join('');
    patterns.push(new RegExp(wordPattern, 'gi'));
  }

  return patterns;
};

// Função para calcular score de relevância
const calculateRelevanceScore = (
  post: SanityBlogPost,
  query: string
): { score: number; matchType: 'title' | 'excerpt' | 'content' | 'category' } => {
  const lowerQuery = query.toLowerCase();
  const title = (post.title || '').toLowerCase();
  const excerpt = (post.excerpt || '').toLowerCase();
  const categories = post.categories?.map((cat) => cat.title?.toLowerCase() || '').join(' ') || '';

  let maxScore = 0;
  let bestMatchType: 'title' | 'excerpt' | 'content' | 'category' = 'content';

  // Score para título (peso maior)
  if (title.includes(lowerQuery)) {
    const exactMatch = title === lowerQuery ? 100 : 0;
    const startsWithMatch = title.startsWith(lowerQuery) ? 80 : 0;
    const containsMatch = title.includes(lowerQuery) ? 60 : 0;
    const similarity = calculateSimilarity(title, lowerQuery) * 70;

    const titleScore = Math.max(exactMatch, startsWithMatch, containsMatch, similarity);
    if (titleScore > maxScore) {
      maxScore = titleScore;
      bestMatchType = 'title';
    }
  }

  // Score para excerpt
  if (excerpt.includes(lowerQuery)) {
    const containsMatch = excerpt.includes(lowerQuery) ? 40 : 0;
    const similarity = calculateSimilarity(excerpt, lowerQuery) * 35;

    const excerptScore = Math.max(containsMatch, similarity);
    if (excerptScore > maxScore) {
      maxScore = excerptScore;
      bestMatchType = 'excerpt';
    }
  }

  // Score para categorias
  if (categories.includes(lowerQuery)) {
    const categoryScore = categories.includes(lowerQuery) ? 50 : 0;
    if (categoryScore > maxScore) {
      maxScore = categoryScore;
      bestMatchType = 'category';
    }
  }

  // Busca por palavras individuais com regex flexível
  const patterns = createFlexibleRegex(lowerQuery);
  patterns.forEach((pattern) => {
    const titleMatches = (title.match(pattern) || []).length;
    const excerptMatches = (excerpt.match(pattern) || []).length;
    const categoryMatches = (categories.match(pattern) || []).length;

    const patternScore = titleMatches * 30 + excerptMatches * 15 + categoryMatches * 25;
    if (patternScore > maxScore) {
      maxScore = patternScore;
      bestMatchType = titleMatches > 0 ? 'title' : excerptMatches > 0 ? 'excerpt' : 'category';
    }
  });

  return { score: maxScore, matchType: bestMatchType };
};

// Função para filtrar por categorias
const filterByCategories = (posts: SanityBlogPost[], selectedCategories: string[]): SanityBlogPost[] => {
  if (selectedCategories.length === 0) return posts;

  return posts.filter((post) => post.categories?.some((category) => selectedCategories.includes(category.title || '')));
};

export const useAdvancedSearch = ({ posts, debounceMs = 300 }: UseAdvancedSearchProps): UseAdvancedSearchReturn => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Debounce effect - só atualiza isSearching quando está digitando
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setDebouncedQuery('');
      setIsSearching(false);
      return;
    }

    // Marca como pesquisando apenas para o indicador visual no hero
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
      setIsSearching(false);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchQuery, debounceMs]);

  // Search results with scoring - só atualiza quando debouncedQuery muda
  const searchResults = useMemo(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      return [];
    }

    const results: SearchResult[] = posts
      .map((post) => {
        const { score, matchType } = calculateRelevanceScore(post, debouncedQuery);
        return {
          ...post,
          relevanceScore: score,
          matchType,
        };
      })
      .filter((result) => result.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);

    return results;
  }, [posts, debouncedQuery]); // Só recalcula quando debouncedQuery muda

  // Combina busca por texto e filtros de categoria
  const filteredPosts = useMemo(() => {
    let result: SearchResult[] = [];

    if (debouncedQuery && debouncedQuery.length >= 2) {
      // Se há busca por texto, usa os resultados da busca
      result = searchResults;
    } else {
      // Se não há busca, usa todos os posts (com score padrão)
      result = posts.map((post) => ({
        ...post,
        relevanceScore: 0,
        matchType: 'content' as const,
      }));
    }

    // Aplica filtro de categorias
    if (selectedCategories.length > 0) {
      result = result.filter(
        (post) => post.categories?.some((category) => selectedCategories.includes(category.title || ''))
      );
    }

    return result;
  }, [posts, searchResults, debouncedQuery, selectedCategories]);

  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  }, []);

  const clearCategories = useCallback(() => {
    setSelectedCategories([]);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setDebouncedQuery('');
    setIsSearching(false);
  }, []);

  const hasSearched = debouncedQuery.length >= 2;
  const hasActiveFilters = hasSearched || selectedCategories.length > 0;

  return {
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    searchResults,
    isSearching,
    hasSearched,
    clearSearch,
    selectedCategories,
    toggleCategory,
    clearCategories,
    hasActiveFilters,
    filteredPosts,
  };
};
