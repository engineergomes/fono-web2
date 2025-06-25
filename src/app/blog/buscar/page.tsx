import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buscar Posts - Blog',
  description: 'Busque por posts no nosso blog',
};

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Buscar Posts</h1>
      <p>Página de busca em desenvolvimento.</p>
    </div>
  );
}
