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

export interface SiteSettings {
  companyName: string;
  phones: string;
  emails: string;
  phoneList: string[];
  emailList: string[];
  address: LocalizedString;
  whatsapp: string;
  logoUrl?: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}
