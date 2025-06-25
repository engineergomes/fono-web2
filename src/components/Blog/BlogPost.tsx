import Link from 'next/link';

interface Author {
  name: string;
  bio: string;
  image: string;
}

interface BlogPostData {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: Author;
  mainImage: string;
  categories: string[];
}

interface BlogPostProps {
  post: BlogPostData;
}

export function BlogPost({ post }: BlogPostProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  // Validação para garantir que o conteúdo seja uma string válida
  const getValidContent = (content: any): string => {
    if (typeof content === 'string') {
      return content;
    }

    if (content && typeof content === 'object') {
      console.warn('Conteúdo do post é um objeto, convertendo para mensagem de fallback');
      return '<p>Conteúdo não disponível no momento. O artigo está sendo processado.</p>';
    }

    return '<p>Conteúdo não disponível.</p>';
  };

  return (
    <article className="py-16 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link href="/blog" className="text-lightBlue hover:text-darkBlue transition-colors duration-300">
          ← Voltar para o Blog
        </Link>
      </nav>

      {/* Header do Post */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {Array.isArray(post.categories) &&
            post.categories.map((category) => (
              <span key={category} className="text-sm bg-lightBlue text-white px-3 py-1 rounded-full">
                {category}
              </span>
            ))}
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-darkBlue mb-4 leading-tight">{post.title}</h1>

        <p className="text-xl text-lightGray mb-6">{post.excerpt}</p>

        <div className="flex items-center gap-4 text-sm text-lightGray">
          <time>{formatDate(post.publishedAt)}</time>
          <span>•</span>
          <span>Por {post.author?.name || 'Autor não informado'}</span>
        </div>
      </header>

      {/* Imagem Principal */}
      <div className="mb-8">
        <div className="relative h-64 md:h-96 bg-gradient-to-br from-lightBlue to-lightPurple rounded-lg flex items-center justify-center">
          <span className="text-white text-lg">Imagem do Artigo</span>
        </div>
      </div>

      {/* Conteúdo do Post */}
      <div className="prose prose-lg max-w-none">
        <div
          className="blog-content text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: getValidContent(post.content) }}
        />
      </div>

      {/* Autor */}
      <div className="mt-12 p-6 bg-lightGreen rounded-lg">
        <h3 className="text-xl font-bold text-darkBlue mb-4">Sobre o Autor</h3>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-lightBlue to-lightPurple rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">AN</span>
          </div>
          <div>
            <h4 className="font-semibold text-darkBlue">{post.author?.name || 'Autor não informado'}</h4>
            <p className="text-lightGray">{post.author?.bio || 'Biografia não disponível'}</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-darkBlue mb-4">Precisa de Ajuda Profissional?</h3>
          <p className="text-lightGray mb-6">
            Agende uma consulta e receba orientação personalizada para o desenvolvimento do seu filho.
          </p>
          <Link
            href="https://api.whatsapp.com/send/?phone=5547997775008&text&type=phone_number&app_absent=0"
            className="inline-block bg-lightBlue hover:bg-darkBlue text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Agendar Consulta
          </Link>
        </div>
      </div>
    </article>
  );
}
