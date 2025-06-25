import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services/Services';
import { Summary } from '@/components/Summary';
import { OpenHours } from '@/components/OpenHours/OpenHours';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Instagram } from '@/components/Instagram';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center scroll-smooth">
      <Header />
      <Hero />
      <Summary />
      <Services />
      <OpenHours />
      <Instagram />
      <Footer />
    </main>
  );
}
