// Utilitário para limpar cache durante desenvolvimento
export const clearSanityCache = () => {
  if (typeof window !== 'undefined') {
    // Limpar localStorage do React Query
    Object.keys(localStorage).forEach((key) => {
      if (key.includes('REACT_QUERY') || key.includes('posts') || key.includes('categories')) {
        localStorage.removeItem(key);
      }
    });

    // Limpar sessionStorage também
    Object.keys(sessionStorage).forEach((key) => {
      if (key.includes('REACT_QUERY') || key.includes('posts') || key.includes('categories')) {
        sessionStorage.removeItem(key);
      }
    });

    console.log('✅ Cache do Sanity limpo! Recarregue a página.');
  }
};

// Para usar no console do navegador:
if (typeof window !== 'undefined') {
  (window as any).clearSanityCache = clearSanityCache;
}
