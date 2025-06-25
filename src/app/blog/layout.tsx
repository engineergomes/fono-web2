import type { Metadata } from 'next';
import { BlogProviderWrapper } from '@/components/BlogProviderWrapper';

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
  return <BlogProviderWrapper>{children}</BlogProviderWrapper>;
}
