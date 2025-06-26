import { Metadata } from 'next';
import { redirect } from 'next/navigation';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fonoana.com.br';

export const metadata: Metadata = {
  title: 'Fonoaudióloga Ana Nascimento | Jaraguá do Sul - Desenvolvimento Infantil',
  description:
    'Fonoaudióloga especializada em desenvolvimento infantil em Jaraguá do Sul. Consultas, avaliações e terapias para crianças. Agende sua consulta.',
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: 'Fonoaudióloga Ana Nascimento | Jaraguá do Sul',
    description: 'Fonoaudióloga especializada em desenvolvimento infantil. Consultório em Jaraguá do Sul.',
    url: baseUrl,
    siteName: 'Fonoaudióloga Ana Nascimento',
    images: [
      {
        url: `${baseUrl}/logo-extended-og.png`,
        width: 1200,
        height: 630,
        alt: 'Fonoaudióloga Ana Nascimento',
      },
    ],
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fonoaudióloga Ana Nascimento | Jaraguá do Sul',
    description: 'Fonoaudióloga especializada em desenvolvimento infantil. Consultório em Jaraguá do Sul.',
    images: [`${baseUrl}/logo-extended-og.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  // Server-side redirect for better SEO
  redirect('/fonoaudiologa-jaragua-sul');
}
