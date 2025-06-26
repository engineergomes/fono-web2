# Blog Client Side - React Query + Axios + Sanity

O blog foi completamente convertido para **Client Side Rendering (CSR)** usando **React Query** e **Axios** para fazer requisições ao **Sanity CMS**. Isso oferece uma experiência mais dinâmica e interativa para os usuários.

## 🚀 O que foi Convertido

### ✅ Páginas Convertidas

1. **`/blog`** - Lista principal de posts
2. **`/blog/[slug]`** - Página individual do post
3. **`/blog/categoria/[categoria]`** - Posts por categoria
4. **`/blog/buscar`** - Página de busca

### 🔄 Mudanças Principais

- **De SSR para CSR**: Todas as páginas agora são renderizadas no client
- **React Query**: Gerenciamento inteligente de estado e cache
- **Axios**: Requisições HTTP diretas para o Sanity API
- **Loading States**: Estados de carregamento elegantes
- **Error Handling**: Tratamento robusto de erros
- **Real-time Updates**: Dados atualizados automaticamente

## 📁 Estrutura do Blog Client Side

```
src/app/blog/
├── layout.tsx              # Layout base com metadados
├── page.tsx                # Lista principal (Client Side)
├── [slug]/
│   └── page.tsx           # Post individual (Client Side)
├── categoria/
│   └── [categoria]/
│       └── page.tsx       # Posts por categoria (Client Side)
└── buscar/
    └── page.tsx           # Página de busca (Client Side)
```

## 🎯 Funcionalidades Implementadas

### 1. Lista Principal de Posts (`/blog`)

```tsx
'use client';

import { useAllPosts, useFeaturedPosts } from '@/hooks/useSanityData';

function ClientBlogList() {
  const { data: posts, isLoading, error } = useAllPosts();
  const { data: featuredPosts } = useFeaturedPosts();

  // Renderização com loading states e error handling
}
```

**Funcionalidades:**

- ✅ Posts em destaque no topo
- ✅ Grid responsivo de todos os posts
- ✅ Loading states elegantes
- ✅ Error handling com retry
- ✅ Links para categorias
- ✅ Badges para posts em destaque

### 2. Post Individual (`/blog/[slug]`)

```tsx
'use client';

import { usePostBySlug } from '@/hooks/useSanityData';
import { useParams } from 'next/navigation';

function ClientBlogPost() {
  const params = useParams();
  const slug = params?.slug as string;
  const { data: post, isLoading, error } = usePostBySlug(slug);

  // Renderização do post completo
}
```

**Funcionalidades:**

- ✅ Navegação breadcrumb
- ✅ Imagem destacada
- ✅ Informações do autor
- ✅ Data de publicação formatada
- ✅ Tempo de leitura
- ✅ Tags e categorias
- ✅ Bio do autor
- ✅ Conteúdo renderizado (HTML/Portable Text)

### 3. Posts por Categoria (`/blog/categoria/[categoria]`)

```tsx
'use client';

import { usePostsByCategory } from '@/hooks/useSanityData';
import { useParams } from 'next/navigation';

function ClientCategoryPosts() {
  const params = useParams();
  const categoria = params?.categoria as string;
  const { data: posts, isLoading, error } = usePostsByCategory(categoria);

  // Renderização dos posts da categoria
}
```

**Funcionalidades:**

- ✅ Header da categoria com contador
- ✅ Grid de posts filtrados
- ✅ Navegação para outras categorias
- ✅ Estado vazio com sugestões
- ✅ Breadcrumb navigation

### 4. Busca de Posts (`/blog/buscar`)

```tsx
'use client';

import { useSearchPosts } from '@/hooks/useSanityData';
import { useState, useEffect } from 'react';

function ClientSearchResults() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const { data: searchResults, isLoading } = useSearchPosts(debouncedSearch);

  // Debounced search with real-time results
}
```

**Funcionalidades:**

- ✅ Busca em tempo real com debounce (300ms)
- ✅ Campo de busca interativo
- ✅ Resultados instantâneos
- ✅ Sugestões de termos de busca
- ✅ Estados vazios informativos
- ✅ URL atualizada automaticamente

## 🎨 Estados de UI

### Loading States

```tsx
if (isLoading) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span className="ml-2">Carregando...</span>
    </div>
  );
}
```

### Error States

```tsx
if (error) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4">
      <p className="text-red-600">Erro: {error.message}</p>
    </div>
  );
}
```

### Empty States

```tsx
// Estado vazio personalizado para cada contexto
<div className="text-center py-12 bg-gray-50 rounded-lg">
  <h3 className="text-xl font-semibold text-gray-800 mb-4">Nenhum resultado encontrado</h3>
  <p className="text-gray-600 mb-6">Mensagem contextual</p>
  <Link href="/blog" className="btn-primary">
    Ação sugerida
  </Link>
</div>
```

## 🔧 Hooks Utilizados

### React Query Hooks

- `useAllPosts()` - Todos os posts
- `usePostBySlug(slug)` - Post específico por slug
- `useFeaturedPosts()` - Posts em destaque
- `usePostsByCategory(category)` - Posts por categoria
- `useSearchPosts(query)` - Busca de posts

### Next.js Hooks

- `useParams()` - Parâmetros da URL
- `useSearchParams()` - Query parameters
- `useState()` / `useEffect()` - Estado local

## 🎯 Benefícios do Client Side

### 1. **Performance**

- ✅ Cache inteligente do React Query
- ✅ Background updates automáticos
- ✅ Requisições otimizadas
- ✅ Shared cache entre páginas

### 2. **Experiência do Usuário**

- ✅ Transições suaves entre páginas
- ✅ Loading states informativos
- ✅ Busca em tempo real
- ✅ Navegação instantânea após cache

### 3. **Desenvolvimento**

- ✅ Debugging com React Query DevTools
- ✅ Error boundaries automatizados
- ✅ Retry logic configurável
- ✅ TypeScript completo

### 4. **SEO Considerations**

- ⚠️ **Importante**: Client side rendering pode impactar SEO
- 💡 **Solução**: Considere implementar SSG para páginas críticas
- 🔧 **Alternativa**: Use ISR (Incremental Static Regeneration)

## 🚀 Como Testar

1. **Página Principal**

   ```
   http://localhost:3000/blog
   ```

2. **Post Individual**

   ```
   http://localhost:3000/blog/[slug-do-post]
   ```

3. **Categoria**

   ```
   http://localhost:3000/blog/categoria/desenvolvimento-infantil
   ```

4. **Busca**

   ```
   http://localhost:3000/blog/buscar?q=desenvolvimento
   ```

5. **React Query DevTools**
   - Abra qualquer página do blog
   - Procure o ícone do React Query no canto inferior direito
   - Clique para ver o estado das queries

## 📊 Monitoramento

### React Query DevTools

- **Cache Status**: Veja quais dados estão em cache
- **Network Requests**: Monitor requests para o Sanity
- **Query States**: Loading, success, error states
- **Background Updates**: Veja refetches automáticos

### Network Tab

- Verifique as requisições para `api.sanity.io`
- Monitor tempo de resposta
- Verifique cache headers

## 🔄 Cache Strategy

```tsx
// Configuração do cache no ReactQueryProvider
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minuto
      gcTime: 1000 * 60 * 60 * 24, // 24 horas
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

### Tempos de Cache

- **Posts**: 5 minutos (staleTime)
- **Post individual**: 10 minutos
- **Categorias**: 15 minutos
- **Busca**: 2 minutos

## 🎨 Estilos e Responsividade

### Classes Customizadas

```css
/* Adicionado ao globals.css */
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
```

### Grid Responsivo

- **Mobile**: 1 coluna
- **Tablet**: 2 colunas
- **Desktop**: 3 colunas
- **Featured Posts**: Sempre 2 colunas máximo

## 🔗 Navegação

### Links Internos

- Todos os links usam `next/link` para navegação SPA
- Hover effects nos cards dos posts
- Breadcrumbs em todas as páginas

### URL Structure

- `/blog` - Lista principal
- `/blog/post-slug` - Post individual
- `/blog/categoria/categoria-slug` - Posts por categoria
- `/blog/buscar?q=termo` - Busca com query params

## 🎉 Conclusão

O blog agora oferece uma experiência completamente client side com:

- ⚡ **Performance**: Cache inteligente e atualizações em background
- 🎨 **UX**: Loading states, error handling e transições suaves
- 🔍 **Busca**: Real-time search com debounce
- 📱 **Responsivo**: Design mobile-first
- 🛠️ **Developer Experience**: TypeScript, DevTools e debugging

O blog está pronto para produção e pode ser facilmente estendido com novas funcionalidades!
