import Link from 'next/link';

interface BlogCardData {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  mainImage: string;
  categories: string[];
}

interface BlogCardProps {
  post: BlogCardData;
}

export function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48 bg-lightGreen">
          {/* Placeholder for image */}
          <div className="absolute inset-0 bg-gradient-to-br from-lightBlue to-lightPurple flex items-center justify-center">
            <span className="text-white text-sm">Imagem do Artigo</span>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories.map((category) => (
            <span key={category} className="text-xs bg-lightBlue text-white px-2 py-1 rounded-full">
              {category}
            </span>
          ))}
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold text-darkBlue mb-3 hover:text-lightBlue transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="text-lightGray mb-4 line-clamp-3">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <time className="text-sm text-lightGray">{formatDate(post.publishedAt)}</time>
          <Link
            href={`/blog/${post.slug}`}
            className="text-lightBlue hover:text-darkBlue font-semibold text-sm transition-colors duration-300"
          >
            Ler mais →
          </Link>
        </div>
      </div>
    </article>
  );
}
