import { SanityBlogPost, urlFor } from './sanity';
import { BlogPost } from '../data/allBlogPosts';

// Helper function to extract text from rich text blocks
function extractTextFromBlocks(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return '';

  return blocks
    .map((block) => {
      if (block && block._type === 'block' && block.children) {
        return block.children.map((child: any) => (child && child.text ? String(child.text) : '')).join(' ');
      }
      return '';
    })
    .join(' ')
    .trim();
}

// Função para converter um post do Sanity para o formato usado no blog
export function convertSanityPostToBlogPost(sanityPost: SanityBlogPost): BlogPost {
  console.log(`Convertendo post: ${sanityPost.title}`);

  // Use 'body' as the primary content field, fallback to 'content' for backward compatibility
  const contentField = sanityPost.body || sanityPost.content;
  console.log('Tipo do conteúdo:', typeof contentField);
  console.log('É array?', Array.isArray(contentField));

  // Garantir que o conteúdo seja convertido de forma segura
  let convertedContent: string;
  try {
    convertedContent = convertPortableTextToHTML(contentField);
    console.log('Conversão bem-sucedida, tamanho:', convertedContent.length);
  } catch (error) {
    console.error('Erro ao converter conteúdo Portable Text:', error);
    convertedContent = createFallbackContent(sanityPost.title);
  }

  // Verificação final de segurança
  if (!convertedContent || typeof convertedContent !== 'string' || convertedContent.trim() === '') {
    console.warn('Conteúdo inválido após conversão, usando fallback');
    convertedContent = createFallbackContent(sanityPost.title);
  }

  // Convert author bio from rich text blocks to string
  let authorBio = 'Fonoaudióloga especializada em Desenvolvimento Infantil';
  if (sanityPost.author?.bio && Array.isArray(sanityPost.author.bio)) {
    const extractedBio = extractTextFromBlocks(sanityPost.author.bio);
    if (extractedBio) {
      authorBio = extractedBio;
    }
  }

  return {
    id: sanityPost._id,
    slug: sanityPost.slug.current,
    title: sanityPost.title,
    excerpt: sanityPost.excerpt || `Artigo sobre ${sanityPost.title}`,
    content: convertedContent,
    image: sanityPost.mainImage ? urlFor(sanityPost.mainImage).url() : undefined,
    author: {
      name: sanityPost.author?.name || 'Ana Nascimento',
      bio: authorBio,
      avatar: sanityPost.author?.image ? urlFor(sanityPost.author.image).url() : undefined,
    },
    publishedAt: sanityPost.publishedAt,
    readingTime: sanityPost.readingTime || calculateReadingTime(contentField),
    categories: sanityPost.categories?.map((cat) => cat.title) || [],
    tags: sanityPost.tags?.map((tag) => tag.title) || [],
    featured: sanityPost.featured || false,
  };
}

// Função para criar conteúdo de fallback
function createFallbackContent(title: string): string {
  return `
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-darkBlue mb-6">${title}</h1>
      <div class="p-6 bg-blue-50 border border-blue-200 rounded-lg mb-6">
        <p class="text-blue-800 mb-4">
          Este artigo está sendo processado e em breve estará disponível com todo o conteúdo.
        </p>
        <p class="text-blue-700">
          Nossa equipe está trabalhando para garantir que você tenha acesso ao melhor conteúdo sobre fonoaudiologia e desenvolvimento infantil.
        </p>
      </div>
      <div class="text-center">
        <p class="text-gray-600 mb-4">Enquanto isso, conheça nossos outros artigos ou entre em contato para agendar uma consulta.</p>
        <a href="/blog" class="inline-block bg-lightBlue text-white px-6 py-3 rounded-lg hover:bg-darkBlue transition-colors">
          Ver Outros Artigos
        </a>
      </div>
    </div>
  `;
}

// Função para converter múltiplos posts
export function convertSanityPostsToBlogPosts(sanityPosts: SanityBlogPost[]): BlogPost[] {
  return sanityPosts.map((post, index) => {
    try {
      console.log(`Convertendo post ${index + 1}/${sanityPosts.length}: ${post.title}`);
      return convertSanityPostToBlogPost(post);
    } catch (error) {
      console.error(`Erro ao converter post ${post._id} (${post.title}):`, error);

      // Convert author bio for fallback
      let authorBio = 'Fonoaudióloga especializada em Desenvolvimento Infantil';
      if (post.author?.bio && Array.isArray(post.author.bio)) {
        const extractedBio = extractTextFromBlocks(post.author.bio);
        if (extractedBio) {
          authorBio = extractedBio;
        }
      }

      // Retornar um post com conteúdo fallback em caso de erro
      return {
        id: post._id,
        slug: post.slug.current,
        title: post.title,
        excerpt: post.excerpt || `Artigo sobre ${post.title}`,
        content: createFallbackContent(post.title),
        author: {
          name: post.author?.name || 'Ana Nascimento',
          bio: authorBio,
        },
        publishedAt: post.publishedAt,
        readingTime: 5,
        categories: post.categories?.map((cat) => cat.title) || [],
        tags: post.tags?.map((tag) => tag.title) || [],
        featured: post.featured || false,
      };
    }
  });
}

// Função ultra-robusta para converter Portable Text para HTML
function convertPortableTextToHTML(content: any): string {
  console.log('Iniciando conversão de Portable Text...');

  // Verificações de segurança mais rigorosas
  if (!content) {
    console.warn('Content is null or undefined');
    return '<p class="mb-4 text-gray-800 leading-relaxed">Conteúdo não disponível</p>';
  }

  if (typeof content === 'string') {
    console.log('Content is already a string, returning as is');
    return content;
  }

  if (!Array.isArray(content)) {
    console.warn('Content is not an array, type:', typeof content);
    console.warn('Content value:', content);

    // Se for um objeto, tentar extrair algum texto
    if (typeof content === 'object' && content !== null) {
      if (content.children && Array.isArray(content.children)) {
        console.log('Found children array, trying to extract text');
        return convertPortableTextToHTML(content.children);
      }
      if (content.text && typeof content.text === 'string') {
        console.log('Found text property');
        return `<p class="mb-4 text-gray-800 leading-relaxed">${content.text}</p>`;
      }
    }

    return '<p class="mb-4 text-gray-800 leading-relaxed">Conteúdo não disponível - formato inválido</p>';
  }

  if (content.length === 0) {
    console.warn('Content array is empty');
    return '<p class="mb-4 text-gray-800 leading-relaxed">Conteúdo vazio</p>';
  }

  console.log(`Processing ${content.length} blocks`);

  try {
    const processedBlocks = content
      .map((block, index) => {
        try {
          console.log(`Processing block ${index + 1}/${content.length}:`, block?._type);

          if (!block || typeof block !== 'object') {
            console.warn(`Block ${index} is not a valid object:`, typeof block);
            return '';
          }

          // Bloco de texto
          if (block._type === 'block') {
            const children = block.children || [];
            console.log(`Block has ${children.length} children`);

            // Processar spans com formatação
            const textParts = children
              .map((child: any, childIndex: number) => {
                if (!child || typeof child !== 'object') {
                  console.warn(`Child ${childIndex} in block ${index} is not valid:`, typeof child);
                  return '';
                }

                let text = child.text || '';

                // Garantir que text é uma string
                if (typeof text !== 'string') {
                  console.warn(`Text in child ${childIndex} is not a string:`, typeof text);
                  text = String(text);
                }

                // Aplicar formatação
                if (child.marks && Array.isArray(child.marks)) {
                  child.marks.forEach((mark: string) => {
                    if (typeof mark === 'string') {
                      switch (mark) {
                        case 'strong':
                          text = `<strong>${text}</strong>`;
                          break;
                        case 'em':
                          text = `<em>${text}</em>`;
                          break;
                        case 'underline':
                          text = `<u>${text}</u>`;
                          break;
                        case 'code':
                          text = `<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">${text}</code>`;
                          break;
                      }
                    }
                  });
                }

                return text;
              })
              .filter((text: string) => text !== '');

            const finalText = textParts.join('');

            if (!finalText.trim()) {
              console.log(`Block ${index} resulted in empty text`);
              return '';
            }

            // Aplicar estilo do bloco
            const style = block.style || 'normal';
            console.log(`Applying style: ${style}`);

            switch (style) {
              case 'h1':
                return `<h1 class="text-3xl font-bold text-darkBlue mb-4">${finalText}</h1>`;
              case 'h2':
                return `<h2 class="text-2xl font-bold text-darkBlue mb-3">${finalText}</h2>`;
              case 'h3':
                return `<h3 class="text-xl font-bold text-darkBlue mb-2">${finalText}</h3>`;
              case 'h4':
                return `<h4 class="text-lg font-bold text-darkBlue mb-2">${finalText}</h4>`;
              case 'blockquote':
                return `<blockquote class="border-l-4 border-lightBlue pl-4 italic text-gray-700 my-4">${finalText}</blockquote>`;
              case 'normal':
              default:
                return `<p class="mb-4 text-gray-800 leading-relaxed">${finalText}</p>`;
            }
          }

          // Bloco de imagem
          else if (block._type === 'image') {
            try {
              const imageUrl = urlFor(block).url();
              const alt = block.alt || 'Imagem do artigo';
              console.log(`Processing image: ${alt}`);
              return `<div class="my-6"><img src="${imageUrl}" alt="${alt}" class="w-full rounded-lg shadow-lg" /></div>`;
            } catch (imageError) {
              console.warn(`Erro ao processar imagem no bloco ${index}:`, imageError);
              return '<div class="my-6 p-4 bg-gray-100 rounded-lg text-center text-gray-600">Imagem não disponível</div>';
            }
          }

          // Quebra de linha
          else if (block._type === 'break') {
            return '<br />';
          }

          console.warn(`Unknown block type at index ${index}:`, block._type);
          return '';
        } catch (blockError) {
          console.error(`Erro ao processar bloco ${index}:`, blockError);
          return '<p class="mb-4 text-red-600 italic">Erro ao processar este bloco de conteúdo.</p>';
        }
      })
      .filter((html) => html && html.trim() !== '');

    const result = processedBlocks.join('\n');
    console.log(`Conversion complete. Result length: ${result.length}`);

    // Se não conseguiu processar nenhum bloco, retornar fallback
    if (!result.trim()) {
      console.warn('No blocks were successfully processed');
      return '<p class="mb-4 text-gray-800 leading-relaxed">Conteúdo não disponível - erro na conversão</p>';
    }

    return result;
  } catch (error) {
    console.error('Erro geral ao processar Portable Text:', error);
    return '<p class="mb-4 text-red-600">Erro na conversão do conteúdo. Por favor, tente novamente mais tarde.</p>';
  }
}

// Função para calcular tempo de leitura (aproximado)
function calculateReadingTime(content: any): number {
  if (!content || !Array.isArray(content)) {
    return 5; // Fallback de 5 minutos
  }

  try {
    const wordCount = content
      .map((block) => {
        if (block && block._type === 'block' && block.children) {
          return block.children
            .map((child: any) => (child && child.text ? String(child.text) : ''))
            .join(' ')
            .split(' ')
            .filter((word: string) => word.trim().length > 0).length;
        }
        return 0;
      })
      .reduce((total, count) => total + count, 0);

    // Assumindo 200 palavras por minuto
    return Math.max(1, Math.ceil(wordCount / 200));
  } catch (error) {
    console.warn('Erro ao calcular tempo de leitura:', error);
    return 5; // Fallback de 5 minutos
  }
}

// Função para buscar posts recentes
export function getRecentPostsFromSanity(posts: BlogPost[], limit: number = 5): BlogPost[] {
  return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, limit);
}

// Função para buscar posts por categoria
export function getPostsByCategoryFromSanity(posts: BlogPost[], category: string): BlogPost[] {
  return posts.filter((post) =>
    post.categories.some((cat) => cat.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase())
  );
}

// Função para buscar posts em destaque
export function getFeaturedPostsFromSanity(posts: BlogPost[]): BlogPost[] {
  return posts.filter((post) => post.featured);
}

// Função para buscar posts (search)
export function searchPostsFromSanity(posts: BlogPost[], query: string): BlogPost[] {
  const searchTerm = query.toLowerCase();
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  );
}

// Função para obter todas as categorias com contagem
export function getAllCategoriesFromSanity(posts: BlogPost[]): { name: string; count: number }[] {
  const categoryCounts: { [key: string]: number } = {};

  posts.forEach((post) => {
    post.categories.forEach((category) => {
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
  });

  return Object.entries(categoryCounts).map(([name, count]) => ({ name, count }));
}
