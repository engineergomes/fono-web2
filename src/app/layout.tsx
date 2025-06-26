import { Whatsapp } from '@/components/widgets/Whatsapp';
import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import Script from 'next/script';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';
import GTMProvider from '@/providers/GTMProvider';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fonoana.com.br';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  viewport: 'width=device-width, initial-scale=1',
  title: 'Fonoaudióloga em Jaraguá do Sul | Ana Nascimento',
  description:
    'Fonoaudióloga em Jaraguá do Sul especializada em Desenvolvimento Infantil. Ambiente acolhedor para crianças e famílias. Agende sua consulta com Ana Nascimento.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    google: 'ZNy7erVwghCcVZwbL-LHf8jrA3lckGvcaDNH030MGM8',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: baseUrl,
    siteName: 'Fonoaudióloga Ana Nascimento',
    title: 'Fonoaudióloga Ana Nascimento | Jaraguá do Sul - Desenvolvimento Infantil',
    description:
      'Fonoaudióloga Ana Nascimento especializada em Desenvolvimento Infantil. Consultório em Jaraguá do Sul, oferecendo um ambiente acolhedor para crianças e famílias.',
    images: [
      {
        url: `${baseUrl}/logo-extended-og.png`,
        width: 1200,
        height: 630,
        alt: 'Fonoaudióloga Ana Nascimento - Jaraguá do Sul',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fonoaudióloga Ana Nascimento | Jaraguá do Sul - Desenvolvimento Infantil',
    description:
      'Fonoaudióloga Ana Nascimento especializada em Desenvolvimento Infantil. Consultório em Jaraguá do Sul, oferecendo um ambiente acolhedor para crianças e famílias.',
    images: [`${baseUrl}/logo-extended-og.png`],
  },
  keywords: [
    'fonoaudióloga',
    'jaraguá do sul',
    'desenvolvimento infantil',
    'speech therapy',
    'fonoaudiologia',
    'ana nascimento',
    'terapia da fala',
    'consultório',
    'santa catarina',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`scroll-smooth ${montserrat.variable}`} lang="pt-BR">
      <body className="scroll-smooth w-screen overflow-x-hidden">
        <GTMProvider>
          <ReactQueryProvider>
            {children}
            <Whatsapp />
          </ReactQueryProvider>
        </GTMProvider>
        <Script id="schema" type="application/ld+json" strategy="afterInteractive">
          {`{
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": "Fonoaudióloga Ana Nascimento",
            "description": "Fonoaudióloga especializada em desenvolvimento infantil em Jaraguá do Sul",
            "url": "${baseUrl}/",
            "logo": "${baseUrl}/logo-small-nobg.png",
            "telephone": "+55 (47) 99777-5008",
            "email": "contato@fonoana.com.br",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "R. Guilherme Dancker",
              "addressLocality": "Jaraguá do Sul",
              "addressRegion": "SC",
              "postalCode": "89251-460",
              "addressCountry": "BR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "-26.4866",
              "longitude": "-49.0669"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "18:00"
              }
            ],
            "areaServed": {
              "@type": "City",
              "name": "Jaraguá do Sul",
              "containedInPlace": {
                "@type": "State",
                "name": "Santa Catarina"
              }
            },
            "medicalSpecialty": "Speech-Language Pathology",
            "priceRange": "$$",
            "acceptsReservations": true
          }`}
        </Script>
      </body>
    </html>
  );
}
