import Link from 'next/link';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import UrlProvider from '@/providers/UrlProvider';

export default function BlogNotFound() {
  return (
    <main className="flex flex-col items-center justify-center scroll-smooth">
      <UrlProvider>
        <Header />

        <Container className="px-4">
          <section className="py-20 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-8xl mb-6">📝</div>
              <h1 className="text-4xl font-bold text-darkBlue mb-4">Artigo não encontrado</h1>
              <p className="text-lg text-lightGray mb-8">
                O artigo que você está procurando pode ter sido removido ou não existe.
              </p>

              <div className="space-y-4">
                <Link
                  href="/blog"
                  className="inline-block bg-lightBlue hover:bg-darkBlue text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
                >
                  Ver Todos os Artigos
                </Link>

                <div className="text-sm">
                  <Link href="/blog/buscar" className="text-lightBlue hover:text-darkBlue underline">
                    Buscar artigos
                  </Link>
                  {' ou '}
                  <Link href="/#contato" className="text-lightBlue hover:text-darkBlue underline">
                    entrar em contato
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </Container>

        <Footer />
      </UrlProvider>
    </main>
  );
}
