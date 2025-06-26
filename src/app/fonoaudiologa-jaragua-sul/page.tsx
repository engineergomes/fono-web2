import { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services/Services';
import { Summary } from '@/components/Summary';
import { OpenHours } from '@/components/OpenHours/OpenHours';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Instagram } from '@/components/Instagram';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fonoana.com.br';

export const metadata: Metadata = {
  title: 'Fonoaudióloga em Jaraguá do Sul | Ana Nascimento - Desenvolvimento Infantil',
  description:
    'Fonoaudióloga especializada em desenvolvimento infantil em Jaraguá do Sul. Consultas especializadas, avaliações e terapias para crianças. Agende sua consulta com Ana Nascimento.',
  alternates: {
    canonical: `${baseUrl}/fonoaudiologa-jaragua-sul`,
  },
  openGraph: {
    title: 'Fonoaudióloga Ana Nascimento | Jaraguá do Sul - Desenvolvimento Infantil',
    description:
      'Fonoaudióloga especializada em desenvolvimento infantil. Consultório em Jaraguá do Sul com ambiente acolhedor para crianças e famílias.',
    url: `${baseUrl}/fonoaudiologa-jaragua-sul`,
    siteName: 'Fonoaudióloga Ana Nascimento',
    images: [
      {
        url: `${baseUrl}/logo-extended-og.png`,
        width: 1200,
        height: 630,
        alt: 'Fonoaudióloga Ana Nascimento - Desenvolvimento Infantil em Jaraguá do Sul',
      },
    ],
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fonoaudióloga Ana Nascimento | Jaraguá do Sul - Desenvolvimento Infantil',
    description: 'Fonoaudióloga especializada em desenvolvimento infantil. Consultório em Jaraguá do Sul.',
    images: [`${baseUrl}/logo-extended-og.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    'fonoaudióloga jaraguá do sul',
    'desenvolvimento infantil',
    'speech therapy',
    'terapia da fala',
    'fonoaudiologia',
    'ana nascimento',
    'consultório jaraguá do sul',
    'avaliação fonoaudiológica',
    'terapia infantil',
    'atraso de fala',
  ],
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Fonoaudióloga Ana Nascimento',
    description: 'Fonoaudióloga especializada em desenvolvimento infantil em Jaraguá do Sul',
    url: `${baseUrl}/fonoaudiologa-jaragua-sul`,
    telephone: '+55 (47) 99777-5008',
    email: 'contato@fonoana.com.br',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'R. Guilherme Dancker',
      addressLocality: 'Jaraguá do Sul',
      addressRegion: 'SC',
      postalCode: '89251-460',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-26.4866',
      longitude: '-49.0669',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    areaServed: {
      '@type': 'City',
      name: 'Jaraguá do Sul',
      containedInPlace: {
        '@type': 'State',
        name: 'Santa Catarina',
        containedInPlace: {
          '@type': 'Country',
          name: 'Brasil',
        },
      },
    },
    medicalSpecialty: 'Speech-Language Pathology',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de Fonoaudiologia',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'Avaliação Fonoaudiológica',
            description: 'Avaliação completa do desenvolvimento da fala e linguagem',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'Terapia de Fala',
            description: 'Terapia especializada para desenvolvimento da fala infantil',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'Estimulação Precoce',
            description: 'Estimulação do desenvolvimento neurológico e cognitivo',
          },
        },
      ],
    },
    priceRange: '$$',
    acceptsReservations: true,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
