import type { Metadata } from 'next';
import { BlogProviderWrapper } from '@/components/BlogProviderWrapper';
import BlogHeader from '@/components/Blog/BlogHeader';
import Footer from '@/components/Footer';
import { SearchProvider } from '@/context/SearchContext';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fonoana.com.br';

export const metadata: Metadata = {
  title: 'Blog | Fonoaudióloga Ana Nascimento',
  description:
    'Artigos e dicas sobre fonoaudiologia, desenvolvimento infantil, speech therapy e muito mais. Conteúdo especializado para pais, profissionais e estudantes.',
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
  openGraph: {
    title: 'Blog | Fonoaudióloga Ana Nascimento',
    description: 'Artigos e dicas sobre fonoaudiologia, desenvolvimento infantil, speech therapy e muito mais.',
    url: `${baseUrl}/blog`,
    siteName: 'Fonoaudióloga Ana Nascimento',
    images: [
      {
        url: `${baseUrl}/og-blog.jpg`,
        width: 1200,
        height: 630,
        alt: 'Blog da Fonoaudióloga Ana Nascimento - Artigos sobre fonoaudiologia e desenvolvimento infantil',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Fonoaudióloga Ana Nascimento',
    description: 'Artigos e dicas sobre fonoaudiologia, desenvolvimento infantil e muito mais.',
    images: [`${baseUrl}/og-blog.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    'fonoaudiologia',
    'desenvolvimento infantil',
    'speech therapy',
    'linguagem',
    'fala',
    'deglutição',
    'motricidade orofacial',
    'autismo',
    'atraso de fala',
    'estimulação precoce',
  ],
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
