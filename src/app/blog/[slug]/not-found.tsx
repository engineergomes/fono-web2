import { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import Breadcrumb from '@/components/Blog/Breadcrumb';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fonoana.com.br';

export const metadata: Metadata = {
  title: 'Artigo não encontrado - Blog | Fonoaudióloga Ana Nascimento',
  description: 'O artigo que você está procurando não foi encontrado. Explore outros artigos sobre fonoaudiologia.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const breadcrumbItems = [
    { label: 'Início', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Artigo não encontrado' },
  ];

  return (
    <main className="flex flex-col items-center justify-center scroll-smooth">
      <Container className="px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Breadcrumb items={breadcrumbItems} />

          <div className="py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Artigo não encontrado</h1>
            <p className="text-xl text-gray-600 mb-8">O artigo que você está procurando não existe ou foi removido.</p>

            <div className="space-y-4">
              <Link
                href="/blog"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Ver todos os artigos
              </Link>

              <div className="block">
                <Link href="/blog/buscar" className="text-blue-600 hover:text-blue-800 font-medium">
                  Buscar artigos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
