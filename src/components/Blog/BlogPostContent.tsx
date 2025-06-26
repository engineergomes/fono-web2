import React from 'react';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/libs/sanity';

interface BlogPostContentProps {
  content: any;
}

// Componentes customizados para renderizar diferentes tipos de blocos
const components = {
  types: {
    image: ({ value }: any) => (
      <figure className="my-6">
        <img src={urlFor(value).url()} alt={value.alt || ''} className="w-full h-auto rounded-lg shadow-md" />
        {value.caption && (
          <figcaption className="text-center text-sm text-gray-600 mt-2 italic">{value.caption}</figcaption>
        )}
      </figure>
    ),
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-6">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold text-gray-900 mb-3 mt-5">{children}</h3>,
    normal: ({ children }: any) => <p className="mb-4 text-gray-800 leading-relaxed">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6 italic text-gray-700 bg-gray-50">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noindex nofollow' : undefined}
          className="text-blue-600 hover:text-blue-800 underline transition-colors"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="text-gray-800">{children}</li>,
    number: ({ children }: any) => <li className="text-gray-800">{children}</li>,
  },
};

export function BlogPostContent({ content }: BlogPostContentProps) {
  // Verificar se o conteúdo é válido
  if (!content || (!Array.isArray(content) && typeof content !== 'string')) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <p className="text-yellow-800">Conteúdo não disponível no momento. O artigo está sendo processado.</p>
      </div>
    );
  }

  // Se for string (HTML), renderizar diretamente
  if (typeof content === 'string') {
    return <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />;
  }

  // Se for array (Portable Text), usar PortableText
  if (Array.isArray(content)) {
    return (
      <div className="prose prose-lg max-w-none">
        <PortableText value={content} components={components} />
      </div>
    );
  }

  return null;
}

// Exemplo de uso:
// <BlogPostContent content={post.body} /> ← usar 'body' do schema
