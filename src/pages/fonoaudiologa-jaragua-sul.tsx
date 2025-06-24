import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services/Services';
import { Summary } from '@/components/Summary';
import { OpenHours } from '@/components/OpenHours/OpenHours';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Instagram } from '@/components/Instagram';
import UrlProvider from '@/providers/UrlProvider';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Fonoaudióloga em Jaraguá do Sul | Ana Nascimento</title>
        <meta
          name="description"
          content="Fono em Jaraguá do Sul, especializada em Desenvolvimento Infantil. Ambiente acolhedor para crianças e famílias. Fonoaudióloga Ana Nascimento - Agende uma visita."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.fonoana.com.br/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:url" content="https://www.fonoana.com.br" />
        <meta property="og:title" content="Fonoaudióloga Ana Nascimento | Jaragua do Sul" />
        <meta
          property="og:description"
          content="Fonoaudióloga Ana Nascimento especializada em Desenvolvimento Infantil. Consultório em Jaraguá do Sul, oferecendo um ambiente acolhedor para crianças e famílias. Agende uma visita."
        />
        <meta property="og:image" content="https://www.fonoana.com.br/logo-extended-og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Fono Ana" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@site" />
        <meta name="twitter:creator" content="@creator" />
        <meta name="twitter:image" content="https://www.fonoana.com.br/logo-extended-og.png" />
        <meta
          name="twitter:description"
          content="Fonoaudióloga Ana Nascimento especializada em Desenvolvimento Infantil. Consultório em Jaraguá do Sul, oferecendo um ambiente acolhedor para crianças e famílias. Agende uma visita."
        />
        <meta name="twitter:title" content="Fonoaudióloga Ana Nascimento | Jaragua do Sul" />
      </Head>

      <main className="flex flex-col items-center justify-center scroll-smooth">
        <Header />
        <Hero />
        <Summary />
        <Services />
        <OpenHours />
        <Instagram />
        <Footer />
      </main>
    </>
  );
}
