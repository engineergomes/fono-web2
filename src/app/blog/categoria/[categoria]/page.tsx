import { Metadata } from 'next';

interface CategoryPageProps {
  params: {
    categoria: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoria = decodeURIComponent(params.categoria);

  return {
    title: `Categoria: ${categoria} - Blog`,
    description: `Posts da categoria ${categoria}`,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoria = decodeURIComponent(params.categoria);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Categoria: {categoria}</h1>
      <p>Posts da categoria em desenvolvimento.</p>
    </div>
  );
}
