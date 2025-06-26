import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fonoana.com.br';

export const metadata: Metadata = {
  title: 'Buscar Artigos - Blog | Fonoaudióloga Ana Nascimento',
  description:
    'Busque por artigos sobre fonoaudiologia, desenvolvimento infantil, speech therapy e muito mais. Encontre conteúdo especializado facilmente.',
  alternates: {
    canonical: `${baseUrl}/blog/buscar`,
  },
  openGraph: {
    title: 'Buscar Artigos - Blog | Fonoaudióloga Ana Nascimento',
    description: 'Busque por artigos sobre fonoaudiologia, desenvolvimento infantil e muito mais.',
    url: `${baseUrl}/blog/buscar`,
    siteName: 'Fonoaudióloga Ana Nascimento',
    images: [
      {
        url: `${baseUrl}/og-blog.jpg`,
        width: 1200,
        height: 630,
        alt: 'Buscar artigos - Fonoaudióloga Ana Nascimento',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buscar Artigos - Blog | Fonoaudióloga Ana Nascimento',
    description: 'Busque por artigos sobre fonoaudiologia, desenvolvimento infantil e muito mais.',
    images: [`${baseUrl}/og-blog.jpg`],
  },
  robots: {
    index: false, // Páginas de busca normalmente não devem ser indexadas
    follow: true,
  },
  keywords: ['buscar', 'pesquisar', 'fonoaudiologia', 'desenvolvimento infantil', 'speech therapy', 'artigos'],
};

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Buscar Posts</h1>
      <p>Página de busca em desenvolvimento.</p>
    </div>
  );
}
