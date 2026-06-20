import { client } from './client';
// Fallbacks for type definitions, assuming you have types or you want to return generic promises.
import { Banner, BenefitItem, Product, CropResult, SiteSettings } from '../types';

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
  getSettings: async () => client.get<SiteSettings>('/api/core/site-settings/'),
  getCategories: async () => client.get<{name: string, slug: string}[]>('/api/products/categories/'),
};
