import { Banner, BenefitItem, CropResult, Product, SiteSettings } from '../types';

export const SETTINGS: SiteSettings = {
  companyName: 'Tupe Gold Farming',
  phone: '+91 9527188188',
  phone2: '+91 9822188188',
  email: 'info@tupegoldfarming.com',
  address: {
    en: '123 Agri Business Park, Green Sector, Agriculture City, 456001',
    mr: '१२३ अग्री बिझनेस पार्क, ग्रीन सेक्टर, एग्रीकल्चर सिटी, ४५६००१'
  },
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
    title: {
      en: 'Precision Fermented Biofertilizers',
      mr: 'प्रगत फर्मेन्टेड जिवाणू खते'
    },
    subtitle: {
      en: '100% Organic certified solutions for sustainable and profitable agriculture.',
      mr: 'शाश्वत आणि अधिक फायदेशीर शेतीसाठी १००% सेंद्रिय प्रमाणित उपाय.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    ctaText: {
      en: 'Explore Our Products',
      mr: 'आमची उत्पादने पहा'
    },
    ctaLink: '/products',
  }
];

export const BENEFITS: BenefitItem[] = [
  {
    id: 'ben1',
    icon: 'Leaf',
    title: { en: 'Fixes Atmospheric Nitrogen', mr: 'हवेतील नत्र (नायट्रोजन) स्थिर करते' },
    description: {
      en: 'Converts atmospheric nitrogen into forms readily usable by plants.',
      mr: 'हवेतील नायट्रोजन अशा स्वरूपात बदलते जे वनस्पतींना सहजपणे वापरता येते.'
    },
  },
  {
    id: 'ben2',
    icon: 'Sprout',
    title: { en: 'Improves Root Development', mr: 'पांढऱ्या मुळांची वाढ' },
    description: {
      en: 'Stimulates vigorous root system growth for better nutrient uptake.',
      mr: 'अन्नद्रव्ये अधिक चांगल्या प्रकारे शोषण्यासाठी मुळांची जोरदारपणे वाढ करते.'
    },
  },
  {
    id: 'ben3',
    icon: 'Sun',
    title: { en: 'Enhances Seed Germination', mr: 'बियाण्याची उगवण क्षमता वाढवते' },
    description: {
      en: 'Promotes faster and more uniform seedling emergence.',
      mr: 'बियांची वेगाने आणि एकसमान उगवण होण्यास प्रोत्साहन देते.'
    },
  },
  {
    id: 'ben4',
    icon: 'Droplets',
    title: { en: 'Improves Soil Health', mr: 'मातीचे आरोग्य सुधारते' },
    description: {
      en: 'Restores organic matter and beneficial microbial activity in the soil.',
      mr: 'जमिनीतील सेंद्रिय कर्ब सजीव आणि उपयुक्त सूक्ष्मजीवांची वाढ जोमाने करते.'
    },
  },
  {
    id: 'ben5',
    icon: 'ShieldCheck',
    title: { en: 'Reduces Chemical Fertilizer Use', mr: 'रासायनिक खतांचा वापर कमी होतो' },
    description: {
      en: 'Lowers dependency on expensive and harmful synthetic fertilizers by up to 25%.',
      mr: 'खर्चिक आणि हानिकारक रासायनिक खतांवरील अवलंबित्व २५% पर्यंत कमी करते.'
    },
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'tupegold-azotobacter',
    name: { en: 'Tupe Gold Azotobacter', mr: 'तुपे गोल्ड अझोतोबॅक्टर' },
    category: { en: 'Nitrogen Fixer', mr: 'नायट्रोजन फिक्सर (नत्र स्थिर करणारे)' },
    shortDescription: {
      en: 'Free-living nitrogen-fixing bacteria suitable for all non-leguminous crops.',
      mr: 'सर्व प्रकारच्या (द्विदल सोडून) पिकांसाठी उपयुक्त मुक्त-वाढणारे नायट्रोजन-स्थिर करणारे जीवाणू.'
    },
    fullDescription: {
      en: 'Tupe Gold Azotobacter is a high-potency biofertilizer based on selective strains of nitrogen-fixing bacteria. It not only fixes atmospheric nitrogen but also produces growth-promoting substances that boost crop vigor and yield.',
      mr: 'तुपे गोल्ड अझोटोबॅक्टर हे नायट्रोजन स्थिर करणाऱ्या जीवाणूंच्या निवडक जातींवर आधारित अत्यंत प्रभावी जिवाणू खत आहे. हे हवेतील नायट्रोजन स्थिर करण्यासोबतच वनस्पतींच्या वाढीस चालना देणारे घटक तयार करते, ज्यामुळे पिकांची वाढ जोमाने होते आणि उत्पन्न वाढते.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    benefits: [
      { id: 'ab1', icon: 'Leaf', title: { en: 'Nitrogen Fixing', mr: 'नायट्रोजन स्थिर करणे' }, description: { en: 'Fixes 20-40 kg N/ha.', mr: '२०-४० किलो नत्र/हेक्टर स्थिर करते.' } },
      { id: 'ab2', icon: 'Sprout', title: { en: 'Growth Promotion', mr: 'वाढीला चालना' }, description: { en: 'Secretes growth hormones like IAA and Gibberellins.', mr: 'IAA आणि Gibberellins सारखे वाढ वाढवणारे हार्मोन्स स्रवतात.' } },
    ],
    packSizes: [
      { size: '1', unit: { en: 'Liter', mr: 'लिटर' } },
      { size: '5', unit: { en: 'Liters', mr: 'लिटर' } },
    ],
    howToUse: [
      { method: { en: 'Seed Treatment', mr: 'बीजप्रक्रिया' }, dosage: { en: '10ml per kg of seed', mr: '१० मिली प्रती किलो बियाणे' }, instructions: { en: 'Mix well and dry in shade before sowing.', mr: 'चांगले मिसळा आणि पेरायच्या आधी सावलीत वाळवा.' } },
      { method: { en: 'Soil Application', mr: 'जमिनीत वापर' }, dosage: { en: '1-2 Liters per acre', mr: '१-२ लिटर प्रती एकर' }, instructions: { en: 'Mix with organic manure and broadcast.', mr: 'सेंद्रिय खतासोबत मिसळा and broadcast.' } },
    ],
    cropsTargeted: [
      { en: 'Sugarcane', mr: 'ऊस' },
      { en: 'Cotton', mr: 'कापूस' },
      { en: 'Wheat', mr: 'गहू' },
      { en: 'Mango', mr: 'आंबा' },
      { en: 'Banana', mr: 'केळी' },
      { en: 'Tomato', mr: 'टोमॅटो' },
      { en: 'Onion', mr: 'कांदा' }
    ],
  },
  {
    id: 'tupegold-psb',
    name: { en: 'Tupe Gold PSB', mr: 'तुपे गोल्ड पीएसबी' },
    category: { en: 'Phosphate Solubilizer', mr: 'फॉस्फेट विरघळविणारे' },
    shortDescription: {
      en: 'Phosphate Solubilizing Bacteria that converts insoluble rock phosphate into available forms.',
      mr: 'अघुलनशील फॉस्फरसला पिकांना शोषून घेण्यायोग्य बनवणारे फॉस्फेट विरघळवणारे जीवाणू.'
    },
    fullDescription: {
      en: 'Tupe Gold PSB contains highly efficient phosphate solubilizing bacteria capable of solubilizing inorganic phosphorus from insoluble compounds and providing it to the plants, reducing the need for phosphatic fertilizers.',
      mr: 'तुपे गोल्ड PSB मध्ये अत्यंत कार्यक्षम फॉस्फेट विरघळवणारे जीवाणू असतात जे जमिनीतील स्थिर फॉस्फरस विरघळवून पिकांना उपलब्ध करून देतात, ज्यामुळे फॉस्फेट रासायनिक खतांची गरज कमी होते.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    benefits: [
      { id: 'pb1', icon: 'Droplets', title: { en: 'P Solubilization', mr: 'स्फुरद (P) विरघळवणे' }, description: { en: 'Enhances phosphorus availability by 15-20%.', mr: 'फॉस्फरसची उपलब्धता १५-२०% ने वाढवते.' } },
      { id: 'pb2', icon: 'Sprout', title: { en: 'Better Rooting', mr: 'उत्तम मुळांची वाढ' }, description: { en: 'Improves root elongation and mass.', mr: 'मुळांची लांबी आणि मजबुती वाढवते.' } },
    ],
    packSizes: [
      { size: '1', unit: { en: 'Liter', mr: 'लिटर' } },
      { size: '5', unit: { en: 'Liters', mr: 'लिटर' } },
    ],
    howToUse: [
      { method: { en: 'Soil Application', mr: 'जमिनीत वापर' }, dosage: { en: '1-2 Liters per acre', mr: '१-२ लिटर प्रती एकर' }, instructions: { en: 'Apply during land preparation or with irrigation.', mr: 'जमीन तयार करताना किंवा ठिबकमधून द्या.' } },
    ],
    cropsTargeted: [
      { en: 'All agricultural crops', mr: 'सर्व प्रकारची पिके' },
      { en: 'Horticulture varieties', mr: 'फळबागा' }
    ],
  },
  {
    id: 'tupegold-kmb',
    name: { en: 'Tupe Gold KMB', mr: 'तुपे गोल्ड केएमबी' },
    category: { en: 'Potash Mobilizer', mr: 'पोटॅश उपलब्ध करणारे' },
    shortDescription: {
      en: 'Potassium Mobilizing Bacteria that makes soil potash available to crops.',
      mr: 'जमिनीतील पोटॅशियम (पालाश) विरघळवून पिकांना उपलब्ध करणारे जीवाणू.'
    },
    fullDescription: {
      en: 'Tupe Gold KMB helps in mobilizing bound potassium in the soil and makes it available to the plant system. It is highly beneficial for fruit quality, disease resistance, and water stress management in crops.',
      mr: 'तुपे गोल्ड KMB जमिनीतील अडकलेले पोटॅशियम पिकांना उपलब्ध करून देण्यास मदत करते. यामुळे फळांची गुणवत्ता सुधारते, रोगांचा प्रतिकार करण्याची क्षमता वाढते आणि पाण्याच्या टंचाईवर मात करण्यासाठी पिकांना मदत होते.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    benefits: [
      { id: 'kb1', icon: 'Sun', title: { en: 'Potash Mobilization', mr: 'पालाश (Potash) उपलब्ध करणे' }, description: { en: 'Improves potassium uptake efficiency.', mr: 'पोटॅशियम शोषणाची क्षमता वाढवते.' } },
      { id: 'kb2', icon: 'ShieldCheck', title: { en: 'Disease Resistance', mr: 'रोग प्रतिकारशक्ती' }, description: { en: 'Enhances natural resistance against pathogens.', mr: 'पिकांची रोगांविरुद्ध नैसर्गिक प्रतिकारक्षमता वाढवते.' } },
    ],
    packSizes: [
      { size: '1', unit: { en: 'Liter', mr: 'लिटर' } },
    ],
    howToUse: [
      { method: { en: 'Soil Drenching', mr: 'आळवणी / ठिबक' }, dosage: { en: '2 Liters per acre', mr: '२ लिटर प्रती एकर' }, instructions: { en: 'Drench in root zone.', mr: 'मुळांच्या जवळ सोडा.' } },
    ],
    cropsTargeted: [
      { en: 'Banana', mr: 'केळी' },
      { en: 'Mango', mr: 'आंबा' },
      { en: 'Tomato', mr: 'टोमॅटो' },
      { en: 'Sugarcane', mr: 'ऊस' },
      { en: 'Cotton', mr: 'कापूस' }
    ],
  },
  {
    id: 'tupegold-plus',
    name: { en: 'Tupe Gold Plus (NPK Consortia)', mr: 'तुपे गोल्ड प्लस (NPK कन्सोर्टिया)' },
    category: { en: 'Complete Nutrition', mr: 'परिपूर्ण पोषण' },
    shortDescription: {
      en: 'A balanced microbial consortium containing Nitrogen fixing, Phosphate solubilizing, and Potash mobilizing bacteria.',
      mr: 'नत्र स्थिर करणारे, स्फुरद विघळवणारे आणि पालाश उपलब्ध करणाऱ्या जीवाणूंचे एकत्रित संतुलन.'
    },
    fullDescription: {
      en: 'Tupe Gold Plus is a comprehensive biofertilizer consortia that provides comprehensive nutritional support. It balances N, P, and K availability naturally, offering a complete organic solution for progressive farmers aiming for maximum yield without chemical degradation.',
      mr: 'तुपे गोल्ड Plus (NPK) हे एक संपूर्ण जैविक खताचे मिश्रण आहे जे पिकांना N, P आणि K चे नैसर्गिकरित्या समतोल पोषण प्रदान करते. जे प्रगतशील शेतकरी रासायनिक खतांचा अतिवापर टाळून कमाल उत्पन्न घेण्याचे उद्दिष्ट ठेवतात त्यांच्यासाठी हे योग्य सेंद्रिय समाधान आहे.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    benefits: [
      { id: 'np1', icon: 'Leaf', title: { en: 'Complete Nutrition', mr: 'परिपूर्ण पोषण' }, description: { en: 'Balanced NPK support for optimal growth.', mr: 'पिकांच्या उत्तम वाढीसाठी एनपीके चा (NPK) योग्य समतोल.' } },
      { id: 'np2', icon: 'ShieldCheck', title: { en: 'Soil Restoration', mr: 'जमीन सुधारक' }, description: { en: 'Revitalizes degraded agricultural soils fast.', mr: 'खराब व निस्त्त्व झालेल्या जमिनी सुधारण्यास जलद मदत करते.' } },
    ],
    packSizes: [
      { size: '1', unit: { en: 'Liter', mr: 'लिटर' } },
      { size: '5', unit: { en: 'Liters', mr: 'लिटर' } },
      { size: '20', unit: { en: 'Liters', mr: 'लिटर' } },
    ],
    howToUse: [
      { method: { en: 'Drip Irrigation', mr: 'ठिबक सिंचन' }, dosage: { en: '2-4 Liters per acre', mr: '२-४ लिटर प्रती एकर' }, instructions: { en: 'Run through drip system at 15-day intervals.', mr: '१५ दिवसांच्या अंतराने ठिबक प्रणालीतून सोडा.' } },
    ],
    cropsTargeted: [
      { en: 'Sugarcane', mr: 'ऊस' },
      { en: 'Wheat', mr: 'गहू' },
      { en: 'Coriander', mr: 'कोथिंबीर' },
      { en: 'Bitter Gourd', mr: 'कारले' },
      { en: 'Onion', mr: 'कांदा' }
    ],
  },
];

export const CROP_RESULTS: CropResult[] = [
  {
    id: 'cr1',
    cropName: { en: 'Sugarcane', mr: 'ऊस' },
    yieldIncreasePercentage: '30-32%',
    description: {
      en: 'Dramatic increase in cane girth, weight, and overall sugar recovery. Reduced requirement for urea applications.',
      mr: 'उसाची जाडी, वजन आणि साखरेचे प्रमाण यात लक्षणीय वाढ. युरिया खताची आवश्यकता कमी.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cr2',
    cropName: { en: 'Cotton', mr: 'कापूस' },
    yieldIncreasePercentage: '24-26%',
    description: {
      en: 'More bolls per plant and higher boll weight. Significant reduction in square dropping.',
      mr: 'कपाशीच्या बोंडांची संख्या and वजन वाढले. पाते गळतीमध्ये लक्षणीय घट.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1592398516089-ea26c31bfce1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cr3',
    cropName: { en: 'Wheat', mr: 'गहू' },
    yieldIncreasePercentage: '18-22%',
    description: {
      en: 'Better tillering, fuller grain development, and increased protein content.',
      mr: 'गव्हाला अधिक फुटवे, दाण्यांची उत्तम वाढ आणि दर्जेदार उत्पन्न.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cr4',
    cropName: { en: 'Mango', mr: 'आंबा' },
    yieldIncreasePercentage: '22-25%',
    description: {
      en: 'Rejuvenated mature orchards, improved fruit size and color, reduced fruit drop.',
      mr: 'जुन्या बागांचे पुनरुज्जीवन, फळांचा आकार आणि रंग सुधारतो, फळगळ कमी होते.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];
