import axios from 'axios';
import { SanityBlogPost } from '@/libs/sanity';

// Sanity configuration
const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const SANITY_TOKEN = process.env.NEXT_PUBLIC_SANITY_TOKEN;

// Create Axios instance for Sanity API
const sanityApi = axios.create({
  baseURL: `https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${SANITY_DATASET}`,
  headers: {
    'Content-Type': 'application/json',
    ...(SANITY_TOKEN && { Authorization: `Bearer ${SANITY_TOKEN}` }),
  },
});

// API service functions using Axios
export const sanityService = {
  // Get all blog posts
  getAllPosts: async (): Promise<SanityBlogPost[]> => {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      body[],
      excerpt,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        name,
        bio,
        image {
          asset->{
            _id,
            url
          }
        }
      },
      publishedAt,
      categories[]->{
        title,
        description
      },
      tags[]->{
        title
      },
      featured,
      readingTime
    }`;

    const response = await sanityApi.get('', {
      params: { query },
    });

    return response.data.result || [];
  },

  // Get post by slug
  getPostBySlug: async (slug: string): Promise<SanityBlogPost | null> => {
    const query = `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      body[],
      excerpt,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        name,
        bio,
        image {
          asset->{
            _id,
            url
          }
        }
      },
      publishedAt,
      categories[]->{
        title,
        description
      },
      tags[]->{
        title
      },
      featured,
      readingTime
    }`;

    const response = await sanityApi.get('', {
      params: {
        query,
        $slug: `"${slug}"`, // Quote string values for Sanity
      },
    });

    return response.data.result || null;
  },

  // Get featured posts
  getFeaturedPosts: async (): Promise<SanityBlogPost[]> => {
    const query = `*[_type == "post" && featured == true] | order(publishedAt desc) {
      _id,
      title,
      slug,
      body[],
      excerpt,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        name,
        bio,
        image {
          asset->{
            _id,
            url
          }
        }
      },
      publishedAt,
      categories[]->{
        title,
        description
      },
      tags[]->{
        title
      },
      featured,
      readingTime
    }`;

    const response = await sanityApi.get('', {
      params: { query },
    });

    return response.data.result || [];
  },

  // Get posts by category
  getPostsByCategory: async (category: string): Promise<SanityBlogPost[]> => {
    const query = `*[_type == "post" && $category in categories[]->title] | order(publishedAt desc) {
      _id,
      title,
      slug,
      body[],
      excerpt,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        name,
        bio,
        image {
          asset->{
            _id,
            url
          }
        }
      },
      publishedAt,
      categories[]->{
        title,
        description
      },
      tags[]->{
        title
      },
      featured,
      readingTime
    }`;

    const response = await sanityApi.get('', {
      params: {
        query,
        $category: `"${category}"`, // Quote string values for Sanity
      },
    });

    return response.data.result || [];
  },

  // Get all categories
  getAllCategories: async () => {
    const query = `*[_type == "category"] {
      title,
      description,
      "postCount": count(*[_type == "post" && references(^._id)])
    }`;

    const response = await sanityApi.get('', {
      params: { query },
    });

    return response.data.result || [];
  },

  // Search posts
  searchPosts: async (searchQuery: string): Promise<SanityBlogPost[]> => {
    const query = `*[_type == "post" && title match $searchQuery] | order(publishedAt desc) {
      _id,
      title,
      slug,
      body[],
      excerpt,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        name,
        bio,
        image {
          asset->{
            _id,
            url
          }
        }
      },
      publishedAt,
      categories[]->{
        title,
        description
      },
      tags[]->{
        title
      },
      featured,
      readingTime
    }`;

    const response = await sanityApi.get('', {
      params: {
        query,
        $searchQuery: `"${searchQuery}*"`, // Already correctly quoted for Sanity
      },
    });

    return response.data.result || [];
  },
};

export default sanityService;
