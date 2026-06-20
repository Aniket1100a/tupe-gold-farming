import { Banner, BenefitItem, CropResult, Product, SiteSettings } from '../types';

export const SETTINGS: SiteSettings = {
  companyName: 'Tupe Gold Farming',
  phone: '+91 9527188188',
  phone2: '+91 9822188188',
  email: 'info@tupegoldfarming.com',
  address: '123 Agri Business Park, Green Sector, Agriculture City, 456001',
  whatsapp: '+91 9527188188',
  socialLinks: {
    facebook: '#',
    twitter: '#',
    instagram: '#',
    linkedin: '#',
  },
};

export const BANNERS: Banner[] = [
  {
    id: 'banner1',
    title: 'Precision Fermented Biofertilizers',
    subtitle: '100% Organic certified solutions for sustainable and profitable agriculture.',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  }
];

export const BENEFITS: BenefitItem[] = [
  {
    id: 'ben1',
    icon: 'Leaf',
    title: 'Fixes Atmospheric Nitrogen',
    description: 'Converts atmospheric nitrogen into forms readily usable by plants.',
  },
  {
    id: 'ben2',
    icon: 'Sprout',
    title: 'Improves Root Development',
    description: 'Stimulates vigorous root system growth for better nutrient uptake.',
  },
  {
    id: 'ben3',
    icon: 'Sun',
    title: 'Enhances Seed Germination',
    description: 'Promotes faster and more uniform seedling emergence.',
  },
  {
    id: 'ben4',
    icon: 'Droplets',
    title: 'Improves Soil Health',
    description: 'Restores organic matter and beneficial microbial activity in the soil.',
  },
  {
    id: 'ben5',
    icon: 'ShieldCheck',
    title: 'Reduces Chemical Fertilizer Use',
    description: 'Lowers dependency on expensive and harmful synthetic fertilizers by up to 25%.',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'tupegold-azotobacter',
    slug: 'tupegold-azotobacter',
    name: 'Tupe Gold Azotobacter',
    category: 'Nitrogen Fixer',
    shortDescription: 'Free-living nitrogen-fixing bacteria suitable for all non-leguminous crops.',
    fullDescription: 'Tupe Gold Azotobacter is a high-potency biofertilizer based on selective strains of nitrogen-fixing bacteria. It not only fixes atmospheric nitrogen but also produces growth-promoting substances that boost crop vigor and yield.',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    benefits: [
      { id: 'ab1', icon: 'Leaf', title: 'Nitrogen Fixing', description: 'Fixes 20-40 kg N/ha.' },
      { id: 'ab2', icon: 'Sprout', title: 'Growth Promotion', description: 'Secretes growth hormones like IAA and Gibberellins.' },
    ],
    packSizes: [
      { size: '1', unit: 'Liter' },
      { size: '5', unit: 'Liters' },
    ],
    howToUse: [
      { method: 'Seed Treatment', dosage: '10ml per kg of seed', instructions: 'Mix well and dry in shade before sowing.' },
      { method: 'Soil Application', dosage: '1-2 Liters per acre', instructions: 'Mix with organic manure and broadcast.' },
    ],
    cropsTargeted: ['Sugarcane', 'Cotton', 'Wheat', 'Mango', 'Banana', 'Tomato', 'Onion'],
    is_featured: true,
  },
  {
    id: 'tupegold-psb',
    slug: 'tupegold-psb',
    name: 'Tupe Gold PSB',
    category: 'Phosphate Solubilizer',
    shortDescription: 'Phosphate Solubilizing Bacteria that converts insoluble rock phosphate into available forms.',
    fullDescription: 'Tupe Gold PSB contains highly efficient phosphate solubilizing bacteria capable of solubilizing inorganic phosphorus from insoluble compounds and providing it to the plants, reducing the need for phosphatic fertilizers.',
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    benefits: [
      { id: 'pb1', icon: 'Droplets', title: 'P Solubilization', description: 'Enhances phosphorus availability by 15-20%.' },
      { id: 'pb2', icon: 'Sprout', title: 'Better Rooting', description: 'Improves root elongation and mass.' },
    ],
    packSizes: [
      { size: '1', unit: 'Liter' },
      { size: '5', unit: 'Liters' },
    ],
    howToUse: [
      { method: 'Soil Application', dosage: '1-2 Liters per acre', instructions: 'Apply during land preparation or with irrigation.' },
    ],
    cropsTargeted: ['All agricultural crops', 'Horticulture varieties'],
    is_featured: false,
  },
  {
    id: 'tupegold-kmb',
    slug: 'tupegold-kmb',
    name: 'Tupe Gold KMB',
    category: 'Potash Mobilizer',
    shortDescription: 'Potassium Mobilizing Bacteria that makes soil potash available to crops.',
    fullDescription: 'Tupe Gold KMB helps in mobilizing bound potassium in the soil and makes it available to the plant system. It is highly beneficial for fruit quality, disease resistance, and water stress management in crops.',
    imageUrl: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    benefits: [
      { id: 'kb1', icon: 'Sun', title: 'Potash Mobilization', description: 'Improves potassium uptake efficiency.' },
      { id: 'kb2', icon: 'ShieldCheck', title: 'Disease Resistance', description: 'Enhances natural resistance against pathogens.' },
    ],
    packSizes: [
      { size: '1', unit: 'Liter' },
    ],
    howToUse: [
      { method: 'Soil Drenching', dosage: '2 Liters per acre', instructions: 'Drench in root zone.' },
    ],
    cropsTargeted: ['Banana', 'Mango', 'Tomato', 'Sugarcane', 'Cotton'],
    is_featured: false,
  },
  {
    id: 'tupegold-plus',
    slug: 'tupegold-plus',
    name: 'Tupe Gold Plus (NPK Consortia)',
    category: 'Complete Nutrition',
    shortDescription: 'A balanced microbial consortium containing Nitrogen fixing, Phosphate solubilizing, and Potash mobilizing bacteria.',
    fullDescription: 'Tupe Gold Plus is a comprehensive biofertilizer consortia that provides comprehensive nutritional support. It balances N, P, and K availability naturally, offering a complete organic solution for progressive farmers aiming for maximum yield without chemical degradation.',
    imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    benefits: [
      { id: 'np1', icon: 'Leaf', title: 'Complete Nutrition', description: 'Balanced NPK support for optimal growth.' },
      { id: 'np2', icon: 'ShieldCheck', title: 'Soil Restoration', description: 'Revitalizes degraded agricultural soils fast.' },
    ],
    packSizes: [
      { size: '1', unit: 'Liter' },
      { size: '5', unit: 'Liters' },
      { size: '20', unit: 'Liters' },
    ],
    howToUse: [
      { method: 'Drip Irrigation', dosage: '2-4 Liters per acre', instructions: 'Run through drip system at 15-day intervals.' },
    ],
    cropsTargeted: ['Sugarcane', 'Wheat', 'Coriander', 'Bitter Gourd', 'Onion'],
    is_featured: true,
  },
];

export const CROP_RESULTS: CropResult[] = [
  {
    id: 'cr1',
    cropName: 'Sugarcane',
    yieldIncreasePercentage: '30-32%',
    description: 'Dramatic increase in cane girth, weight, and overall sugar recovery. Reduced requirement for urea applications.',
    imageUrl: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cr2',
    cropName: 'Cotton',
    yieldIncreasePercentage: '24-26%',
    description: 'More bolls per plant and higher boll weight. Significant reduction in square dropping.',
    imageUrl: 'https://images.unsplash.com/photo-1592398516089-ea26c31bfce1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cr3',
    cropName: 'Wheat',
    yieldIncreasePercentage: '18-22%',
    description: 'Better tillering, fuller grain development, and increased protein content.',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cr4',
    cropName: 'Mango',
    yieldIncreasePercentage: '22-25%',
    description: 'Rejuvenated mature orchards, improved fruit size and color, reduced fruit drop.',
    imageUrl: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];
