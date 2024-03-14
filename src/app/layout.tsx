import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  viewport: 'width=device-width, initial-scale=1',
  title: 'Fonoaudióloga Ana Nascimento | Jaragua do Sul',
  description:
    'Fonoaudióloga Ana Nascimento especializada em Desenvolvimento Infantil. Consultório em Jaraguá do Sul, oferecendo um ambiente acolhedor para crianças e famílias. Agende uma visita.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.fonoana.com.br/',
  },
  verification: {
    google: 'ZNy7erVwghCcVZwbL-LHf8jrA3lckGvcaDNH030MGM8',
  },
  icons: '/favicon.ico',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.fonoana.com.br',
    title: 'Fonoaudióloga Ana Nascimento | Jaragua do Sul',
    description:
      'Fonoaudióloga Ana Nascimento especializada em Desenvolvimento Infantil. Consultório em Jaraguá do Sul, oferecendo um ambiente acolhedor para crianças e famílias. Agende uma visita.',
    images: [
      {
        url: 'https://www.fonoana.com.br/logo-extended-og.png',
        width: 1200,
        height: 630,
        alt: 'Fono Ana',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@site',
    creator: '@creator',
    images: 'https://www.fonoana.com.br/logo-extended-og.png',
    description:
      'Fonoaudióloga Ana Nascimento especializada em Desenvolvimento Infantil. Consultório em Jaraguá do Sul, oferecendo um ambiente acolhedor para crianças e famílias. Agende uma visita.',
    title: 'Fonoaudióloga Ana Nascimento | Jaragua do Sul',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="scroll-smooth">
      <body className=" scroll-smooth w-screen overflow-x-hidden pt-20 lg:pt-24">{children}</body>
      <Script id="schema" type="application/ld+json" defer>
        {`
  "@context": "http://schema.org",
  "@type": "ProfessionalService",
  "name": "Fono Ana",
  "description": "Fonoaudióloga Ana Nascimento | Jaragua do Sul",
  "url": "https://www.fonoana.com.br/",
  "logo": "https://www.fonoana.com.br/logo-small-nobg.png",
  "telephone": "+55 (47) 99777-5008",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "R. Guilherme Dancker",
    "addressLocality": "Jaragua do Sul",
    "addressRegion": "SC",
    "postalCode": "89251-460",
    "addressCountry": "BR"
  }
`}
      </Script>
    </html>
  );
}
