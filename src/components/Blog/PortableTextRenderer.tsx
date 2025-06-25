import React from 'react';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/libs/sanity';

interface PortableTextRendererProps {
  content: any;
  className?: string;
}

// Componentes customizados para renderizar diferentes tipos de blocos
const portableTextComponents = {
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
    h4: ({ children }: any) => <h4 className="text-lg font-semibold text-gray-900 mb-2 mt-4">{children}</h4>,
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

export function PortableTextRenderer({ content, className = '' }: PortableTextRendererProps) {
  // Se o conteúdo já é uma string HTML, renderizar diretamente
  if (typeof content === 'string') {
    return <div className={`prose prose-lg max-w-none ${className}`} dangerouslySetInnerHTML={{ __html: content }} />;
  }

  // Se o conteúdo é um array (Portable Text do Sanity)
  if (Array.isArray(content)) {
    return (
      <div className={`prose prose-lg max-w-none ${className}`}>
        <PortableText value={content} components={portableTextComponents} />
      </div>
    );
  }

  // Se o conteúdo é um objeto (caso de erro)
  if (content && typeof content === 'object') {
    console.warn('Tentativa de renderizar objeto Portable Text não suportado:', content);
    return (
      <div className={`prose prose-lg max-w-none ${className}`}>
        <p className="text-gray-600 italic">Conteúdo não disponível no momento. O artigo está sendo processado.</p>
      </div>
    );
  }

  // Fallback para casos não previstos
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <p className="text-gray-600 italic">Conteúdo não disponível.</p>
    </div>
  );
}

interface PortableTextBlockProps {
  block: any;
}

function PortableTextBlock({ block }: PortableTextBlockProps) {
  if (!block || typeof block !== 'object') {
    return null;
  }

  try {
    // Bloco de texto
    if (block._type === 'block') {
      const children = block.children || [];

      const content = children.map((child: any, index: number) => {
        if (!child || typeof child !== 'object') {
          return null;
        }

        let text = child.text || '';

        // Aplicar formatação baseada nas marks
        if (child.marks && Array.isArray(child.marks)) {
          child.marks.forEach((mark: string) => {
            switch (mark) {
              case 'strong':
                text = <strong key={`strong-${index}`}>{text}</strong>;
                break;
              case 'em':
                text = <em key={`em-${index}`}>{text}</em>;
                break;
              case 'underline':
                text = <u key={`u-${index}`}>{text}</u>;
                break;
              case 'code':
                text = (
                  <code key={`code-${index}`} className="bg-gray-100 px-1 py-0.5 rounded text-sm">
                    {text}
                  </code>
                );
                break;
            }
          });
        }

        return <span key={index}>{text}</span>;
      });

      // Aplicar estilo do bloco
      switch (block.style) {
        case 'h1':
          return <h1 className="text-3xl font-bold text-darkBlue mb-4">{content}</h1>;
        case 'h2':
          return <h2 className="text-2xl font-bold text-darkBlue mb-3">{content}</h2>;
        case 'h3':
          return <h3 className="text-xl font-bold text-darkBlue mb-2">{content}</h3>;
        case 'h4':
          return <h4 className="text-lg font-bold text-darkBlue mb-2">{content}</h4>;
        case 'blockquote':
          return (
            <blockquote className="border-l-4 border-lightBlue pl-4 italic text-gray-700 my-4">{content}</blockquote>
          );
        case 'normal':
        default:
          return <p className="mb-4 text-gray-800 leading-relaxed">{content}</p>;
      }
    }

    // Bloco de imagem
    if (block._type === 'image') {
      // Aqui você pode usar a função urlFor do Sanity se disponível
      const alt = block.alt || 'Imagem do artigo';
      const imageUrl = block.asset?.url || '/placeholder-image.jpg';

      return (
        <div className="my-6">
          <img src={imageUrl} alt={alt} className="w-full rounded-lg shadow-lg" />
          {block.caption && <p className="text-sm text-gray-600 text-center mt-2 italic">{block.caption}</p>}
        </div>
      );
    }

    // Quebra de linha
    if (block._type === 'break') {
      return <br />;
    }

    return null;
  } catch (error) {
    console.warn('Erro ao renderizar bloco Portable Text:', error);
    return null;
  }
}
