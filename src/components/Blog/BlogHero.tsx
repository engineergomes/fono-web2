'use client';

import { useState, useEffect, useRef } from 'react';
import Container from '../Container';
import { useSearch } from '@/context/SearchContext';
import { useBlog } from '@/context/BlogContext';

export function BlogHero() {
  const {
    searchQuery,
    setSearchQuery,
    filteredPosts,
    isSearching,
    hasActiveFilters,
    selectedCategories,
    toggleCategory,
    clearSearch,
  } = useSearch();

  const { categories, isLoading } = useBlog();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha dropdown quando clica fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Mostrar apenas 3 badges, resto vai para dropdown
  const visibleCategories = categories.slice(0, 3);
  const dropdownCategories = categories.slice(3);

  return (
    <section className="bg-lightPurple w-full py-20 pt-32 bg-paper relative">
      <Container className="px-4">
        <div className="text-center text-white">
          <h1
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{
              fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
            }}
          >
            Blog
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8 min-h-[3.5rem] flex items-center justify-center">
            Artigos, dicas e informações sobre fonoaudiologia, desenvolvimento infantil e muito mais para ajudar você e
            sua família!
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={searchQuery}
                onChange={handleInputChange}
                className="w-full px-4 py-4 pl-12 pr-12 border-0 rounded-lg focus:ring-4 focus:ring-white/30 focus:outline-none text-gray-900 text-lg"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              {/* Loading indicator */}
              {isSearching && (
                <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-lightPurple"></div>
                </div>
              )}
            </div>

            {/* Category Badges */}
            <div className="mb-4">
              <div className="flex items-center justify-center mb-4">
                <span className="text-white/80 text-sm font-medium">Filtrar por categoria:</span>
              </div>

              <div className="flex flex-wrap justify-center gap-2 min-h-[40px] items-center">
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span className="ml-2 text-white/70 text-sm">Carregando categorias...</span>
                  </div>
                ) : (
                  <>
                    {/* Primeiras 3 categorias sempre visíveis */}
                    {visibleCategories.map((category, index) => {
                      const isSelected = selectedCategories.includes(category.title);

                      return (
                        <button
                          key={index}
                          onClick={() => toggleCategory(category.title)}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                            isSelected
                              ? 'bg-white text-lightPurple shadow-lg'
                              : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                          }`}
                        >
                          {isSelected && (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          )}
                          <span>{category.title}</span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              isSelected ? 'bg-lightPurple text-white' : 'bg-white/20 text-white/80'
                            }`}
                          >
                            {category.postCount}
                          </span>
                        </button>
                      );
                    })}

                    {/* Dropdown para categorias restantes */}
                    {dropdownCategories.length > 0 && (
                      <div className="relative" ref={dropdownRef}>
                        <button
                          onClick={() => setShowDropdown(!showDropdown)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 bg-white/20 text-white hover:bg-white/30 border border-white/30"
                          aria-expanded={showDropdown}
                          aria-haspopup="true"
                        >
                          <span>+{dropdownCategories.length} mais</span>
                          <svg
                            className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {showDropdown && (
                          <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-xl border min-w-[220px] z-50 py-2 max-h-60 overflow-y-auto">
                            {dropdownCategories.map((category, index) => {
                              const isSelected = selectedCategories.includes(category.title);

                              return (
                                <button
                                  key={index}
                                  onClick={() => {
                                    toggleCategory(category.title);
                                    setShowDropdown(false);
                                  }}
                                  className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-gray-50 flex items-center justify-between ${
                                    isSelected ? 'bg-lightPurple/10 text-lightPurple font-medium' : 'text-gray-700'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    {isSelected && (
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M5 13l4 4L19 7"
                                        />
                                      </svg>
                                    )}
                                    <span>{category.title}</span>
                                  </div>
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded-full ${
                                      isSelected ? 'bg-lightPurple text-white' : 'bg-gray-100 text-gray-600'
                                    }`}
                                  >
                                    {category.postCount}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Search Results Count - com altura fixa para evitar layout shift */}
            <div className="min-h-[24px] transition-opacity duration-200">
              {hasActiveFilters && (
                <div className="text-sm text-white/80">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'post encontrado' : 'posts encontrados'}
                  {/* Mostra filtros ativos */}
                  {selectedCategories.length > 0 && (
                    <span className="ml-2">
                      • {selectedCategories.length === 1 ? 'Categoria' : 'Categorias'}: {selectedCategories.join(', ')}
                    </span>
                  )}
                  {searchQuery && filteredPosts.length > 0 && <span className="ml-2">• Ordenados por relevância</span>}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
