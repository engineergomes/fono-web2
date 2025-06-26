import { useQuery, useInfiniteQuery, UseQueryOptions } from '@tanstack/react-query';
import { sanityService } from '@/services/sanityService';
import { SanityBlogPost } from '@/libs/sanity';

// Query keys for consistent caching
export const sanityQueryKeys = {
  posts: ['posts'] as const,
  post: (slug: string) => ['posts', slug] as const,
  featuredPosts: ['posts', 'featured'] as const,
  postsByCategory: (category: string) => ['posts', 'category', category] as const,
  categories: ['categories'] as const,
  searchPosts: (query: string) => ['posts', 'search', query] as const,
};

// Hook to get all posts
export const useAllPosts = (options?: UseQueryOptions<SanityBlogPost[]>) => {
  return useQuery({
    queryKey: sanityQueryKeys.posts,
    queryFn: sanityService.getAllPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// Hook to get a single post by slug
export const usePostBySlug = (slug: string, options?: UseQueryOptions<SanityBlogPost | null>) => {
  return useQuery({
    queryKey: sanityQueryKeys.post(slug),
    queryFn: () => sanityService.getPostBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};

// Hook to get featured posts
export const useFeaturedPosts = (options?: UseQueryOptions<SanityBlogPost[]>) => {
  return useQuery({
    queryKey: sanityQueryKeys.featuredPosts,
    queryFn: sanityService.getFeaturedPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// Hook to get posts by category
export const usePostsByCategory = (category: string, options?: UseQueryOptions<SanityBlogPost[]>) => {
  return useQuery({
    queryKey: sanityQueryKeys.postsByCategory(category),
    queryFn: () => sanityService.getPostsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// Hook to get all categories
export const useCategories = (options?: UseQueryOptions<any[]>) => {
  return useQuery({
    queryKey: sanityQueryKeys.categories,
    queryFn: sanityService.getAllCategories,
    staleTime: 15 * 60 * 1000, // 15 minutes (categories change less frequently)
    ...options,
  });
};

// Hook to search posts
export const useSearchPosts = (searchQuery: string, options?: UseQueryOptions<SanityBlogPost[]>) => {
  return useQuery({
    queryKey: sanityQueryKeys.searchPosts(searchQuery),
    queryFn: () => sanityService.searchPosts(searchQuery),
    enabled: !!searchQuery && searchQuery.length > 2, // Only search if query is longer than 2 characters
    staleTime: 2 * 60 * 1000, // 2 minutes (search results change more frequently)
    ...options,
  });
};

// Example of infinite query for paginated posts (if you implement pagination later)
export const useInfinitePosts = (pageSize = 10) => {
  return useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    queryFn: async ({ pageParam = 0 }) => {
      // This would need to be implemented in your sanityService
      // For now, it's just an example structure
      const allPosts = await sanityService.getAllPosts();
      const start = pageParam * pageSize;
      const end = start + pageSize;
      const posts = allPosts.slice(start, end);

      return {
        posts,
        nextCursor: end < allPosts.length ? pageParam + 1 : undefined,
        hasNextPage: end < allPosts.length,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
};

// Utility hook to prefetch a post (useful for link hover effects)
export const usePrefetchPost = () => {
  return (slug: string) => {
    // This would require access to QueryClient
    // You can implement this by using useQueryClient hook
  };
};
