# Blog da Fonoaudióloga Ana Nascimento

## Estrutura do Blog

### Páginas Criadas

1. **Página Principal do Blog** (`/blog`)

   - Lista todos os artigos
   - Sidebar com categorias e posts recentes
   - Layout responsivo

2. **Página Individual de Artigo** (`/blog/[slug]`)

   - Conteúdo completo do artigo
   - Informações do autor
   - Call-to-action para agendamento
   - Breadcrumb de navegação

3. **Página de Categoria** (`/blog/categoria/[categoria]`)

   - Lista artigos filtrados por categoria
   - Mesmo layout da página principal

4. **Página de Busca** (`/blog/buscar`)

   - Campo de busca em tempo real
   - Resultados filtrados
   - Interface de busca avançada

5. **Página 404 Customizada** (`/blog/not-found`)
   - Página de erro personalizada para o blog

### Componentes do Blog

1. **BlogHero** - Seção hero das páginas do blog
2. **BlogList** - Lista de artigos com paginação
3. **BlogCard** - Card individual de artigo
4. **BlogPost** - Conteúdo completo do artigo
5. **BlogSidebar** - Sidebar com categorias e posts recentes
6. **BlogSearch** - Componente de busca

### Funcionalidades

- ✅ Design responsivo seguindo padrões do site
- ✅ Navegação integrada no header principal
- ✅ Sistema de categorias
- ✅ Busca em tempo real
- ✅ SEO otimizado com metadata dinâmica
- ✅ Breadcrumbs e navegação intuitiva
- ✅ Call-to-actions estratégicos
- ✅ Estilos CSS customizados para conteúdo

### Cores e Design

O blog segue exatamente os mesmos padrões de design do site:

- **lightBlue**: #45B3DF
- **darkBlue**: rgba(35,54,104,1)
- **lightPurple**: #BFA5CD
- **lightGreen**: #d9ecda
- **lightGray**: #70747F

### Próximos Passos

Para integrar com Sanity.io:

1. **Instalar dependências do Sanity**:

   ```bash
   npm install @sanity/client @sanity/image-url
   ```

2. **Configurar cliente do Sanity**:

   ```typescript
   // src/lib/sanity.ts
   import { createClient } from '@sanity/client';

   export const sanity = createClient({
     projectId: 'seu-project-id',
     dataset: 'production',
     useCdn: false,
     apiVersion: '2024-01-01',
   });
   ```

3. **Substituir mock data** nos componentes pelos dados reais do Sanity

4. **Configurar schemas no Sanity Studio** para:
   - Posts do blog
   - Categorias
   - Autores
   - Tags

### Estrutura de Dados Esperada

```typescript
interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Rich text/HTML
  publishedAt: string;
  author: {
    name: string;
    bio: string;
    image: string;
  };
  mainImage: string;
  categories: string[];
}
```

### SEO e Performance

- Metadata dinâmica para cada página
- OpenGraph tags configuradas
- URLs amigáveis com slugs
- Imagens otimizadas (placeholders preparados)
- Loading states preparados para dados externos

## Como Usar

1. Navegue para `/blog` para ver a página principal
2. Clique em qualquer artigo para ver o conteúdo completo
3. Use a sidebar para navegar por categorias
4. Use `/blog/buscar` para buscar artigos específicos
5. URLs de categoria seguem o padrão `/blog/categoria/[categoria-slug]`
