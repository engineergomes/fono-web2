import { Metadata } from 'next';
import BlogPostsList from '@/components/examples/BlogPostsList';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fonoana.com.br';

export const metadata: Metadata = {
  title: 'React Query + Axios Example | Fonoaudióloga Ana Nascimento',
  description:
    'Demonstração da integração React Query + Axios com Sanity CMS para o blog da Fonoaudióloga Ana Nascimento.',
  alternates: {
    canonical: `${baseUrl}/example`,
  },
  openGraph: {
    title: 'React Query + Axios Example | Fonoaudióloga Ana Nascimento',
    description: 'Demonstração da integração React Query + Axios com Sanity CMS.',
    url: `${baseUrl}/example`,
    siteName: 'Fonoaudióloga Ana Nascimento',
    images: [
      {
        url: `${baseUrl}/logo-extended-og.png`,
        width: 1200,
        height: 630,
        alt: 'React Query + Axios Example',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'React Query + Axios Example | Fonoaudióloga Ana Nascimento',
    description: 'Demonstração da integração React Query + Axios com Sanity CMS.',
    images: [`${baseUrl}/logo-extended-og.png`],
  },
  robots: {
    index: false, // Página de exemplo não deve ser indexada
    follow: true,
  },
};

export default function ExamplePage() {
  return <BlogPostsList />;
}
