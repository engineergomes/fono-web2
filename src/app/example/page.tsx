import BlogPostsList from '@/components/examples/BlogPostsList';

export const metadata = {
  title: 'React Query + Axios Example | Fono Ana',
  description: 'Demonstração da integração React Query + Axios com Sanity CMS',
};

export default function ExamplePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">React Query + Axios + Sanity</h1>
          <p className="text-lg text-gray-600">
            Esta página demonstra como usar React Query com Axios para fazer requisições ao Sanity CMS
          </p>
        </div>

        <BlogPostsList />
      </div>
    </main>
  );
}
