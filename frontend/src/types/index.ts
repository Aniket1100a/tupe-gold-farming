export type LocalizedString = string;

export interface BenefitItem {
  id: string;
  icon: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface PackSize {
  size: string;
  unit: LocalizedString;
  price?: number;
}

export interface HowToUse {
  method: LocalizedString;
  dosage: LocalizedString;
  instructions: LocalizedString;
}

export interface Product {
  id: string;
  slug: string;
  name: LocalizedString;
  category: LocalizedString;
  shortDescription: LocalizedString;
  fullDescription: LocalizedString;
  imageUrl: string;
  benefits: BenefitItem[];
  packSizes: PackSize[];
  howToUse: HowToUse[];
  cropsTargeted: LocalizedString[];
  is_featured: boolean;
}

export interface GalleryImage {
  id: number;
  imageUrl: string;
}

export interface CropResult {
  id: string;
  cropName: LocalizedString;
  yieldIncreasePercentage: string;
  description: LocalizedString;
  imageUrl: string;
  galleryImages?: GalleryImage[];
}

export interface Banner {
  id: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  imageUrl: string;
}

export interface OfficeAddress {
  id: number;
  title: string;
  address: string;
  map_url?: string;
}

export interface Review {
  id: number;
  name: string;
  farmerType: string;
  rating: number;
  comment: string;
  imageUrl?: string;
  created_at: string;
}

export interface SiteSettings {
  companyName: string;
  phones: string;
  emails: string;
  phoneList: string[];
  emailList: string[];
  address: LocalizedString;
  addresses: OfficeAddress[];
  whatsapp: string;
  logoUrl?: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}
