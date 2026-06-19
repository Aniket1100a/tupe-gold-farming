import apiClient from './client';
import { Product, Banner, BenefitItem, CropResult, SiteSettings } from '../types';

export const apiService = {
  getProducts: (params?: { featured?: boolean; category?: string }) =>
    apiClient.get<Product[]>('products/', { params }),

  getProduct: (slug: string) =>
    apiClient.get<Product>(`products/${slug}/`),

  getBanners: () =>
    apiClient.get<Banner[]>('content/banners/'),

  getBenefits: () =>
    apiClient.get<BenefitItem[]>('content/benefits/'),

  getCropResults: () =>
    apiClient.get<CropResult[]>('content/crop-results/'),

  getSettings: () =>
    apiClient.get<SiteSettings>('core/site-settings/'),
};
