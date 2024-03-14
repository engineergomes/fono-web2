import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services/Services';
import { Summary } from '@/components/Summary';
import { OpenHours } from '@/components/OpenHours/OpenHours';

import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Instagram } from '@/components/Instagram';
import UrlProvider from '@/providers/UrlProvider';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center font-montserrat scroll-smooth">
      <UrlProvider>
        <Header />
        <Hero />
        <Summary />
        <OpenHours />
        <Instagram />
        <Services />
        <Footer />
      </UrlProvider>
    </main>
  );
}
