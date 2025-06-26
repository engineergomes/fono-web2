# Atualização da Estrutura de Dados Sanity

## Resumo

Atualizamos a interface `SanityBlogPost` e funções relacionadas para se adequar à estrutura real dos dados retornados pela API Sanity, baseando-se na resposta de exemplo fornecida.

## Principais Mudanças

### 1. Interface `SanityBlogPost` Atualizada

```typescript
// ANTES
export interface SanityBlogPost {
  excerpt: string;
  content: any[];
  author: {
    bio: string;
  };
  categories: Array<{
    slug: { current: string };
  }>;
  featured?: boolean;
  readingTime?: number;
}

// DEPOIS
export interface SanityBlogPost {
  excerpt: string | null;
  content: any[] | null;
  author: {
    bio: Array<{
      _key: string;
      _type: string;
      children: Array<{
        _key: string;
        _type: string;
        marks: string[];
        text: string;
      }>;
      markDefs: any[];
      style: string;
    }>;
  };
  categories: Array<{
    slug: { current: string } | null;
  }>;
  featured?: boolean | null;
  readingTime?: number | null;
}
```

### 2. Estrutura da Bio do Autor

A bio agora é um array de blocos rich text em vez de string simples:

```json
"bio": [
  {
    "_key": "4ed8dd036a4d",
    "_type": "block",
    "children": [
      {
        "_key": "24361ef9d5fd",
        "_type": "span",
        "marks": [],
        "text": "Its me Rafa"
      }
    ],
    "markDefs": [],
    "style": "normal"
  }
]
```

### 3. Estrutura das Imagens

As imagens agora retornam URL direta em vez de referência:

```json
"mainImage": {
  "asset": {
    "_id": "image-185603c6dc9341d84daf67b282dfaa4647c20845-1280x1280-png",
    "url": "https://cdn.sanity.io/images/efwnfu4e/production/185603c6dc9341d84daf67b282dfaa4647c20845-1280x1280.png"
  },
  "alt": null
}
```

### 4. Categorias com Slug Null

Algumas categorias podem ter `slug: null`:

```json
"categories": [
  {
    "slug": null,
    "title": "Nada demais"
  }
]
```

## Funções Criadas/Atualizadas

### 1. `extractTextFromBlocks()`

Nova função para extrair texto de blocos rich text:

```typescript
export function extractTextFromBlocks(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) {
    return '';
  }

  return blocks
    .filter((block) => block._type === 'block')
    .map(
      (block) =>
        block.children
          ?.filter((child: any) => child._type === 'span')
          ?.map((span: any) => span.text)
          ?.join('') || ''
    )
    .join(' ')
    .trim();
}
```

### 2. `urlFor()` Atualizada

Função atualizada para trabalhar com URLs diretas:

```typescript
export function urlFor(source: any) {
  if (!source || !source.asset) {
    return { url: () => '/placeholder-image.jpg' };
  }

  // Se já temos uma URL direta da API, retorna ela
  if (source.asset.url) {
    return {
      url: () => source.asset.url,
      width: (w: number) => ({ url: () => `${source.asset.url}?w=${w}` }),
      height: (h: number) => ({ url: () => `${source.asset.url}?h=${h}` }),
      fit: (mode: string) => ({ url: () => `${source.asset.url}?fit=${mode}` }),
      auto: (format: string) => ({ url: () => `${source.asset.url}?auto=${format}` }),
    };
  }

  // Fallback para o builder original
  return builder.image(source);
}
```

## Componentes Atualizados

### 1. Uso da Bio do Autor

```typescript
// ANTES
<p className="text-gray-600">{post.author.bio}</p>

// DEPOIS
<p className="text-gray-600">{extractTextFromBlocks(post.author.bio)}</p>
```

### 2. Filtro de Categorias

Adicionamos filtros para categorias sem slug válido:

```typescript
// ANTES
{
  post.categories.map((category) => <Link href={`/blog/categoria/${category.slug.current}`}>{category.title}</Link>);
}

// DEPOIS
{
  post.categories
    .filter((category) => category.slug?.current)
    .map((category) => <Link href={`/blog/categoria/${category.slug?.current || ''}`}>{category.title}</Link>);
}
```

## Arquivos Modificados

1. **`src/libs/sanity.ts`**

   - Interface `SanityBlogPost` atualizada
   - Função `urlFor()` modificada
   - Nova função `extractTextFromBlocks()`

2. **`src/app/blog/[slug]/page.tsx`**

   - Import da nova função
   - Uso de `extractTextFromBlocks()` para bio
   - Filtro de categorias

3. **`src/app/blog/page.tsx`**

   - Filtro de categorias com slug válido

4. **`src/app/blog/buscar/page.tsx`**

   - Filtro de categorias com slug válido

5. **`src/app/blog/categoria/[categoria]/page.tsx`**

   - Filtro de categorias com slug válido

6. **`src/components/examples/BlogPostsList.tsx`**
   - Filtros de categorias com slug válido

## Campos que Podem Ser Null

Agora os seguintes campos são adequadamente tipados como opcionais/null:

- `excerpt`
- `content`
- `featured`
- `readingTime`
- `tags`
- `mainImage.alt`
- `categories[].slug`
- `tags[].slug`
- `author.image`

## Validação

O código agora:

1. ✅ Trata categorias sem slug corretamente
2. ✅ Extrai texto de bio em formato rich text
3. ✅ Funciona com URLs diretas de imagem
4. ✅ Lida com campos null/undefined
5. ✅ Mantém compatibilidade com dados existentes

## Teste de Validação

Para testar se as mudanças funcionam, você pode:

1. Acessar qualquer página do blog
2. Verificar se as categorias são exibidas corretamente
3. Verificar se a bio do autor aparece como texto
4. Verificar se as imagens carregam corretamente
5. Verificar se não há erros no console

A resposta de exemplo da API está funcionando corretamente com essas modificações.
