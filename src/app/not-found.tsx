import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fonoana.com.br';

export const metadata: Metadata = {
  title: 'Página não encontrada - Fonoaudióloga Ana Nascimento',
  description:
    'A página que você está procurando não foi encontrada. Explore nossos serviços de fonoaudiologia em Jaraguá do Sul.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${baseUrl}/404`,
  },
};

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center scroll-smooth min-h-screen">
      <Header />
      <Container className="px-4 py-16 flex-grow">
        <div className="max-w-4xl mx-auto text-center">
          <div className="py-16">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Página não encontrada</h2>
            <p className="text-xl text-gray-600 mb-8">A página que você está procurando não existe ou foi removida.</p>

            <div className="space-y-6">
              <div className="space-y-4">
                <Link
                  href="/fonoaudiologa-jaragua-sul"
                  className="inline-block bg-lightBlue text-white px-8 py-3 rounded-lg hover:bg-darkBlue transition-colors font-medium mr-4"
                >
                  Página Inicial
                </Link>

                <Link
                  href="/blog"
                  className="inline-block bg-lightPurple text-white px-8 py-3 rounded-lg hover:bg-darkBlue transition-colors font-medium"
                >
                  Ver Blog
                </Link>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Páginas úteis:</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/fonoaudiologa-jaragua-sul#servicos"
                    className="text-lightBlue hover:text-darkBlue font-medium"
                  >
                    Nossos Serviços
                  </Link>
                  <Link
                    href="/fonoaudiologa-jaragua-sul#sobre"
                    className="text-lightBlue hover:text-darkBlue font-medium"
                  >
                    Sobre a Dra. Ana
                  </Link>
                  <Link
                    href="/fonoaudiologa-jaragua-sul#contato"
                    className="text-lightBlue hover:text-darkBlue font-medium"
                  >
                    Contato
                  </Link>
                  <Link
                    href="/fonoaudiologa-jaragua-sul#horarios"
                    className="text-lightBlue hover:text-darkBlue font-medium"
                  >
                    Horários
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  );
}
