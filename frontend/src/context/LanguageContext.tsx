import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'mr' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Keep English as the master source for keys used in the app
export const translations = {
  en: {
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.consult": "Consult an Expert",
    "footer.quickLinks": "Quick Links",
    "footer.ourSolutions": "Our Solutions",
    "footer.contactUs": "Contact Us",
    "footer.privacyPolicy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.allRights": "All rights reserved.",
    "footer.desc": "Pioneering sustainable agriculture with precision fermented biofertilizers. Tupe Gold Farming is committed to improving soil health and crop yields globally.",
    "footer.certifications": "Organic Certifications",
    
    // Home
    "home.learnMore": "Learn More",
    "home.exploreProducts": "Explore Products",
    "home.getFreeAdvice": "Get Free Advice",
    "home.acresTreated": "Acres Treated",
    "home.yieldIncrease": "Yield Increase",
    "home.fertilizerSaved": "Fertilizer Saved",
    "home.organicNPOP": "Organic NPOP",
    "home.whyChoose": "Why Choose Biofertilizers?",
    "home.whyChooseSub": "Our precision-fermented solutions work synergistically with nature to maximize your farm's potential while restoring soil vitality.",
    "home.ourBioSolutions": "Our Bio-Solutions",
    "home.ourBioSolutionsSub": "Targeted microbial consortia for every stage of your crop's lifecycle.",
    "home.viewAllProducts": "View All Products",
    "home.provenResults": "Proven Results Across Crops",
    "home.provenResultsSub": "See how Tupe Gold Farming is transforming yields for farmers nationwide.",
    "home.readyToTransform": "Ready to Transform Your Farm's Productivity?",
    "home.readyToTransformSub": "Get in touch with our agronomists for a custom nutrition plan tailored to your soil and crops.",
    "home.call": "Call",
    "home.whatsapp": "WhatsApp Us",
    "home.viewDetails": "View Details",

    // Products
    "products.title": "Our Biofertilizers",
    "products.sub": "Discover our range of precision-fermented microorganisms designed to unlock your soil's potential and naturally boost crop yields.",
    "products.filterAll": "All",

    // Product Detail
    "productDetail.notFound": "Product Not Found",
    "productDetail.back": "Back to our products",
    "productDetail.keyBenefits": "Key Benefits",
    "productDetail.packSizes": "Available Pack Sizes",
    "productDetail.inquire": "Inquire Now",
    "productDetail.appDosage": "Application & Dosage",
    "productDetail.appDosageSub": "Follow these guidelines for optimal results. Mix thoroughly before use.",
    "productDetail.method": "Method",
    "productDetail.dosage": "Dosage",
    "productDetail.instructions": "Instructions",
    "productDetail.targetCrops": "Targeted Crops",
    
    // About
    "about.title": "Pioneering Sustainable Agriculture",
    "about.sub": "Tupe Gold Farming is dedicated to restoring soil vitality and boosting farm profitability through advanced bio-solutions.",
    "about.mission": "Our Mission",
    "about.missionText1": "To drastically reduce the dependency on synthetic chemical fertilizers by providing farmers with highly effective, precision-fermented biological alternatives. We believe that true agricultural transformation begins beneath the soil surface.",
    "about.missionText2": "Under the brand \"Tupe Gold Farming\", we manufacture robust consortia of beneficial microorganisms that fix nitrogen, solubilize phosphorus, and mobilize potash, ensuring complete plant nutrition safely and sustainably.",
    "about.whyStandOut": "Why Tupe Gold Farming Stands Out",
    "about.organic": "100% Organic Certified",
    "about.organicDesc": "Certified organically compliant under NPOP standards, safe for all organic farming operations and export crops.",
    "about.fermentation": "Precision Fermentation",
    "about.fermentationDesc": "Cultured in state-of-the-art bioreactors ensuring highest CFU counts and zero contamination for maximum field efficacy.",
    "about.ecoFriendly": "Eco-Friendly",
    "about.ecoFriendlyDesc": "Leaves zero toxic residue in soil, water, or harvested crop. Promotes natural biodiversity in the soil root zone.",

    // Contact
    "contact.title": "Contact Us",
    "contact.sub": "Have questions about our biofertilizers or need crop-specific advice? Our agricultural experts are here to help.",
    "contact.getInTouch": "Get in Touch",
    "contact.phoneTitle": "Phone Number",
    "contact.phoneDesc": "We're available Mon-Sat, 9am - 6pm.",
    "contact.emailTitle": "Email Address",
    "contact.emailDesc": "Send us an email anytime.",
    "contact.officeTitle": "Office Address",
    "contact.sendMessage": "Send us a Message",
    "contact.fullName": "Full Name",
    "contact.namePlaceholder": "e.g. Ramesh Singh",
    "contact.phoneNumber": "Phone Number",
    "contact.phonePlaceholder": "Mobile Number",
    "contact.emailAddr": "Email Address",
    "contact.emailPlaceholder": "Your Email",
    "contact.howHelp": "How can we help you?",
    "contact.howHelpPlaceholder": "Tell us about your farm, crop type, and acreage...",
    "contact.sendBtn": "Send Message",
    "contact.successMsg": "Thank you for contacting Tupe Gold Farming. We will get back to you shortly."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('mr');

  useEffect(() => {
    const savedLang = localStorage.getItem('appLang') as Language;
    if (savedLang) {
      setLanguage(savedLang);
      // Give Google Translate a moment to initialize
      setTimeout(() => triggerGoogleTranslate(savedLang), 1000);
    } else {
      setTimeout(() => triggerGoogleTranslate('mr'), 1000);
    }
  }, []);

  const triggerGoogleTranslate = (langCode: string, retries = 5) => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    } else if (retries > 0) {
      setTimeout(() => triggerGoogleTranslate(langCode, retries - 1), 500);
    }
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('appLang', lang);
    triggerGoogleTranslate(lang);
  };

  const t = (key: string) => {
    // Always return English. Google Translate will handle the visual translation in the browser.
    return (translations.en as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
