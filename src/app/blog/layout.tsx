import type { Metadata } from 'next';
import { BlogProviderWrapper } from '@/components/BlogProviderWrapper';
import BlogHeader from '@/components/Blog/BlogHeader';
import Footer from '@/components/Footer';
import { SearchProvider } from '@/context/SearchContext';

export const metadata: Metadata = {
  title: 'Blog | Fonoaudióloga Ana Nascimento',
  description: 'Artigos e dicas sobre fonoaudiologia, desenvolvimento infantil e muito mais.',
  openGraph: {
    title: 'Blog | Fonoaudióloga Ana Nascimento',
    description: 'Artigos e dicas sobre fonoaudiologia, desenvolvimento infantil e muito mais.',
    type: 'website',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <BlogProviderWrapper>
      <SearchProvider>
        <main className="flex flex-col items-center justify-center scroll-smooth">
          <BlogHeader />
          {children}
          <Footer />
        </main>
      </SearchProvider>
    </BlogProviderWrapper>
  );
}
