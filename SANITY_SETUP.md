# Configuração do Sanity para o Blog

Este projeto foi configurado para usar o Sanity CMS como backend para o blog. Aqui estão as instruções para configurar o Sanity.

## Variáveis de Ambiente Necessárias

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# Configurações do Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_TOKEN=your_sanity_token_here
```

## Como Obter as Configurações

### 1. Project ID

- Acesse [manage.sanity.io](https://manage.sanity.io)
- Selecione seu projeto
- O Project ID estará visível no painel

### 2. Dataset

- Normalmente é `production`
- Pode ser verificado no painel do projeto

### 3. Token

- No painel do Sanity, vá em "API"
- Clique em "Tokens"
- Crie um novo token com permissões de leitura (e escrita se necessário)
- **IMPORTANTE: Mantenha este token seguro e nunca o commit no repositório**

## Schemas Necessários no Sanity

O projeto espera os seguintes schemas no Sanity Studio:

### Post Schema (`post.js`)

```javascript
export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
    },
    {
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
};
```

### Author Schema (`author.js`)

```javascript
export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
};
```

### Category Schema (`category.js`)

```javascript
export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
  ],
};
```

### Tag Schema (`tag.js`)

```javascript
export default {
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
  ],
};
```

### Block Content Schema (`blockContent.js`)

```javascript
export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    },
    {
      type: 'image',
      options: { hotspot: true },
    },
  ],
};
```

## Funcionalidades Implementadas

✅ Fetch de todos os posts do Sanity
✅ Busca de post individual por slug
✅ Filtro de posts por categoria
✅ Posts em destaque
✅ Posts recentes
✅ Busca por texto
✅ Listagem de categorias com contagem
✅ Cache de dados (5 minutos)
✅ Fallback para dados estáticos em caso de erro
✅ Loading states nos componentes
✅ Tratamento de erros
✅ Suporte a imagens do Sanity

## Como Testar

1. Configure as variáveis de ambiente
2. Popule o Sanity com alguns posts de teste
3. Execute o projeto: `npm run dev`
4. Acesse `/blog` para ver os posts
5. Teste navegação individual, categorias e busca

## Migração dos Dados Existentes

Os dados estáticos em `src/data/allBlogPosts.ts` foram mantidos como fallback. Para migrar para o Sanity:

1. Use os dados estáticos como referência para criar posts no Sanity
2. Certifique-se de que as categorias e autor existam no Sanity
3. Teste a integração
4. Se tudo funcionar, os dados estáticos serão usados apenas como fallback

## Problemas Comuns

### Erro de CORS

- Verifique se as origens estão configuradas corretamente no painel do Sanity

### Token Inválido

- Verifique se o token foi copiado corretamente
- Confirme se o token tem as permissões necessárias

### Imagens não Carregam

- Verifique se `cdn.sanity.io` está nas domains permitidas no `next.config.js`

### Dados não Aparecem

- Verifique se os schemas estão corretos no Sanity Studio
- Confirme se existem dados publicados no dataset
