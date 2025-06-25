'use client';

import React, { createContext, useContext } from 'react';
import { useAdvancedSearch } from '@/hooks/useAdvancedSearch';
import { useBlog } from './BlogContext';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  debouncedQuery: string;
  searchResults: any[];
  isSearching: boolean;
  hasSearched: boolean;
  clearSearch: () => void;
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  clearCategories: () => void;
  hasActiveFilters: boolean;
  filteredPosts: any[];
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const { allPosts } = useBlog();

  const searchHook = useAdvancedSearch({
    posts: allPosts,
    debounceMs: 300,
  });

  // Posts filtrados: só usa os resultados da busca quando a busca debounced está completa
  // Durante a digitação (isSearching = true), mantém os posts anteriores
  const filteredPosts = searchHook.hasSearched ? searchHook.searchResults : allPosts;

  const contextValue: SearchContextType = {
    ...searchHook,
    filteredPosts,
  };

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
