# React Query + Axios + Sanity Integration

This project now includes **TanStack React Query** with **Axios** for making HTTP requests to **Sanity CMS**. This setup provides powerful caching, background updates, and excellent developer experience for data fetching.

## 🚀 What's Included

- **@tanstack/react-query** - Powerful data synchronization for React
- **@tanstack/react-query-devtools** - Development tools for debugging queries
- **Axios** - HTTP client for making API requests
- **Custom Sanity Service** - Service layer using Axios instead of Sanity client
- **React Query Hooks** - Custom hooks for Sanity data fetching
- **Example Components** - Ready-to-use components demonstrating the integration

## 📦 Installation

The packages are already installed. If you need to install them manually:

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools --legacy-peer-deps
```

## 🏗️ Architecture

### 1. React Query Provider (`src/providers/ReactQueryProvider.tsx`)

```tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### 2. Sanity Service with Axios (`src/services/sanityService.ts`)

Instead of using the Sanity client directly, this service uses Axios to make HTTP requests to Sanity's API:

```tsx
import axios from 'axios';

const sanityApi = axios.create({
  baseURL: `https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${SANITY_DATASET}`,
  headers: {
    'Content-Type': 'application/json',
    ...(SANITY_TOKEN && { Authorization: `Bearer ${SANITY_TOKEN}` }),
  },
});

export const sanityService = {
  getAllPosts: async (): Promise<SanityBlogPost[]> => {
    const response = await sanityApi.get('', { params: { query } });
    return response.data.result || [];
  },
  // ... more methods
};
```

### 3. Custom React Query Hooks (`src/hooks/useSanityData.ts`)

```tsx
import { useQuery } from '@tanstack/react-query';
import { sanityService } from '@/services/sanityService';

export const useAllPosts = (options?: UseQueryOptions<SanityBlogPost[]>) => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: sanityService.getAllPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

export const usePostBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['posts', slug],
    queryFn: () => sanityService.getPostBySlug(slug),
    enabled: !!slug,
  });
};
```

## 🎯 Usage Examples

### Basic Usage

```tsx
'use client';

import { useAllPosts } from '@/hooks/useSanityData';

export function BlogList() {
  const { data: posts, isLoading, error } = useAllPosts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {posts?.map((post) => (
        <article key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

### With Loading States and Error Handling

```tsx
'use client';

import { usePostBySlug } from '@/hooks/useSanityData';

export function BlogPost({ slug }: { slug: string }) {
  const { data: post, isLoading, error, isFetching } = usePostBySlug(slug);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Carregando post...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-600">Erro ao carregar post: {error.message}</p>
      </div>
    );
  }

  if (!post) {
    return <div>Post não encontrado</div>;
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.excerpt}</p>
      {/* Render content */}
    </article>
  );
}
```

### Search with Debouncing

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchPosts } from '@/hooks/useSanityData';

export function SearchPosts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: searchResults, isLoading } = useSearchPosts(debouncedSearch);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar posts..."
        className="w-full p-2 border rounded"
      />

      {isLoading && <div>Buscando...</div>}

      {searchResults?.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
        </div>
      ))}
    </div>
  );
}
```

## 🧪 Available Hooks

- `useAllPosts()` - Fetch all blog posts
- `usePostBySlug(slug)` - Fetch a specific post by slug
- `useFeaturedPosts()` - Fetch featured posts
- `usePostsByCategory(category)` - Fetch posts by category
- `useCategories()` - Fetch all categories
- `useSearchPosts(query)` - Search posts
- `useInfinitePosts()` - Infinite scroll pagination (example)

## 🔧 Environment Variables

Make sure you have these environment variables set:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_TOKEN=your_token
```

## 🎨 Features

### Automatic Caching

React Query automatically caches responses and serves them instantly on subsequent requests.

### Background Updates

Data is refetched in the background to keep the cache fresh.

### Optimistic Updates

You can implement optimistic updates for better UX when mutating data.

### Error Handling

Built-in error handling with retry logic and error boundaries.

### Developer Tools

React Query DevTools provide insight into query states, cache contents, and network requests.

## 🚀 Example Page

Visit `/example` to see the integration in action with a complete blog posts listing.

## 📊 React Query DevTools

The DevTools are automatically included in development mode. Look for the React Query icon in the bottom-right corner of your screen to open the DevTools panel.

## 🔄 Query Keys

Query keys are structured for optimal caching:

```tsx
const sanityQueryKeys = {
  posts: ['posts'],
  post: (slug: string) => ['posts', slug],
  featuredPosts: ['posts', 'featured'],
  postsByCategory: (category: string) => ['posts', 'category', category],
  categories: ['categories'],
  searchPosts: (query: string) => ['posts', 'search', query],
};
```

## 🎯 Benefits

1. **Better Performance** - Intelligent caching and background updates
2. **Better UX** - Loading states, error handling, and optimistic updates
3. **Developer Experience** - DevTools, TypeScript support, and predictable APIs
4. **Flexibility** - Using Axios gives you full control over HTTP requests
5. **Scalability** - Easy to extend with more queries and mutations

## 🔗 Useful Links

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Axios Documentation](https://axios-http.com/)
- [Sanity API Documentation](https://www.sanity.io/docs/http-api)
