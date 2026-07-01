import { client } from './client';
// Fallbacks for type definitions, assuming you have types or you want to return generic promises.
import { Banner, BenefitItem, Product, CropResult, SiteSettings, Review } from '../types';

export const apiService = {
  getBanners: async () => client.get<Banner[]>('/api/content/banners/'),
  getBenefits: async () => client.get<BenefitItem[]>('/api/content/benefits/'),
  getProducts: async ({ featured, category }: { featured?: boolean, category?: string } = {}) => {
    return client.get<Product[]>('/api/products/', {
      params: { featured, category }
    });
  },
  getProductBySlug: async (slug: string) => client.get<Product>(`/api/products/${slug}/`),
  getCropResults: async () => client.get<CropResult[]>('/api/content/crop-results/'),
  getSettings: async () => {
    const res = await client.get<any>('/api/core/site-settings/');
    const data = Array.isArray(res.data) ? res.data[0] : res.data;
    // ensure we return it wrapped in the expected AxiosResponse shape or just mutate data
    return { ...res, data: data as SiteSettings };
  },
  getCategories: async () => client.get<{name: string, slug: string}[]>('/api/products/categories/'),

  // Reviews
  getReviews: async () => client.get<Review[]>('/api/content/reviews/'),
  createReview: async (formData: FormData) => {
    return client.post('/api/content/reviews/create/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
