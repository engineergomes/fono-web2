'use client';

import { BlogProvider } from '@/context/BlogContext';

export function BlogProviderWrapper({ children }: { children: React.ReactNode }) {
  return <BlogProvider>{children}</BlogProvider>;
}
