import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Language = 'en' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
}

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
    "footer.desc": "Pioneering sustainable agriculture with precision fermented biofertilizers. TupeGoldFarming is committed to improving soil health and crop yields globally.",
    "footer.certifications": "Organic Certifications",
    
    // Home
    "home.learnMore": "Learn More",
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
    "home.provenResultsSub": "See how TupeGoldFarming is transforming yields for farmers nationwide.",
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
    "about.sub": "TupeGoldFarming is dedicated to restoring soil vitality and boosting farm profitability through advanced bio-solutions.",
    "about.mission": "Our Mission",
    "about.missionText1": "To drastically reduce the dependency on synthetic chemical fertilizers by providing farmers with highly effective, precision-fermented biological alternatives. We believe that true agricultural transformation begins beneath the soil surface.",
    "about.missionText2": "Under the brand \"TupeGoldFarming\", we manufacture robust consortia of beneficial microorganisms that fix nitrogen, solubilize phosphorus, and mobilize potash, ensuring complete plant nutrition safely and sustainably.",
    "about.whyStandOut": "Why TupeGoldFarming Stands Out",
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
    "contact.successMsg": "Thank you for contacting TupeGoldFarming. We will get back to you shortly."
  },
  mr: {
    "nav.home": "मुख्य पृष्ठ",
    "nav.products": "उत्पादने",
    "nav.about": "आमच्याबद्दल",
    "nav.contact": "संपर्क",
    "nav.consult": "तज्ञांचा सल्ला घ्या",
    "footer.quickLinks": "जलद दुवे",
    "footer.ourSolutions": "आमचे उपाय",
    "footer.contactUs": "संपर्क साधा",
    "footer.privacyPolicy": "गोपनीयता धोरण",
    "footer.terms": "सेवा अटी",
    "footer.allRights": "सर्व हक्क राखीव.",
    "footer.desc": "प्रिसिजन फर्मेन्टेड जिवाणू खतांसह शाश्वत शेतीचा पुढाकार. TupeGoldFarming मातीचे आरोग्य आणि पिकांचे उत्पन्न वाढवण्यासाठी वचनबद्ध आहे.",
    "footer.certifications": "सेंद्रिय प्रमाणपत्रे",
    
    // Home
    "home.learnMore": "अधिक जाणून घ्या",
    "home.acresTreated": "एकर क्षेत्रावर वापर",
    "home.yieldIncrease": "उत्पन्नात वाढ",
    "home.fertilizerSaved": "खतांची बचत",
    "home.organicNPOP": "१००% सेंद्रिय NPOP",
    "home.whyChoose": "जिवाणू खते का निवडावी?",
    "home.whyChooseSub": "आमची अत्याधुनिक जिवाणू खते निसर्गाशी एकरूप होऊन काम करतात आणि मातीची सुपीकता वाढवून शेतीची उत्पादकता वाढवतात.",
    "home.ourBioSolutions": "आमची बायो-सोल्यूशन्स",
    "home.ourBioSolutionsSub": "पिकाच्या प्रत्येक टप्प्यासाठी उपयुक्त सूक्ष्मजीवांचे मिश्रण.",
    "home.viewAllProducts": "सर्व उत्पादने पहा",
    "home.provenResults": "विविध पिकांमधील सिद्ध परिणाम",
    "home.provenResultsSub": "पाहा कसे TupeGoldFarming देशभरातील शेतकरी बांधवांचे उत्पन्न वाढवत आहे.",
    "home.readyToTransform": "तुमच्या शेतीची उत्पादकता वाढवण्यास तयार आहात?",
    "home.readyToTransformSub": "तुमची माती आणि पिके यांच्यासाठी योग्य पोषण योजनेबाबत आमच्या कृषी तज्ञांशी संपर्क साधा.",
    "home.call": "कॉल करा",
    "home.whatsapp": "WhatsApp करा",
    "home.viewDetails": "तपशील पहा",

    // Products
    "products.title": "आमची जिवाणू खते",
    "products.sub": "शेतीचे आरोग्य सुधारणारे आणि पिकांचे उत्पन्न नैसर्गिकरित्या वाढवणारे आमचे जिवाणू खतांचे उत्पादन पहा.",
    "products.filterAll": "सर्व",

    // Product Detail
    "productDetail.notFound": "उत्पादन सापडले नाही",
    "productDetail.back": "उत्पादनांच्या यादीत परत जा",
    "productDetail.keyBenefits": "मुख्य फायदे",
    "productDetail.packSizes": "उपलब्ध पॅकिंग आकार",
    "productDetail.inquire": "चौकशी करा",
    "productDetail.appDosage": "वापर आणि प्रमाण",
    "productDetail.appDosageSub": "उत्तम परिणामांसाठी खालील मार्गदर्शक सूचनांचे पालन करा. वापरण्यापूर्वी चांगले मिसळा.",
    "productDetail.method": "पद्धत",
    "productDetail.dosage": "प्रमाण",
    "productDetail.instructions": "सूचना",
    "productDetail.targetCrops": "उपयुक्त पिके",
    
    // About
    "about.title": "शाश्वत शेतीत आघाडीवर",
    "about.sub": "TupeGoldFarming प्रगत जिवाणू खतांच्या माध्यमातून मातीचे आरोग्य सुधारण्यास आणि शेती नफा वाढवण्यास समर्पित आहे.",
    "about.mission": "आमचे ध्येय",
    "about.missionText1": "शेतकऱ्यांना अत्यंत प्रभावी सुरक्षित जैविक पर्याय उपलब्ध करून देऊन रासायनिक खतांवरील अवलंबित्व लक्षणीयरीत्या कमी करणे. आमचा विश्वास आहे की खरी कृषी क्रांती मातीतून सुरू होते.",
    "about.missionText2": "\"TupeGoldFarming\" या ब्रँड अंतर्गत, आम्ही नायट्रोजन स्थिर करणारे, फॉस्फरस विरघळवणारे आणि पोटॅश उपलब्ध करून देणारे उपयुक्त सूक्ष्मजीव तयार करतो, ज्यामुळे पिकांना परिपूर्ण पोषण मिळते.",
    "about.whyStandOut": "TupeGoldFarming वेगळे का आहे?",
    "about.organic": "१००% सेंद्रिय प्रमाणित",
    "about.organicDesc": "NPOP मानकांनुसार सर्व सेंद्रिय शेती आणि निर्यात पिकांसाठी सुरक्षित, सेंद्रिय प्रमाणित.",
    "about.fermentation": "प्रगत फर्मेन्टेशन (किण्वन)",
    "about.fermentationDesc": "अत्याधुनिक बायोरिएक्टरमध्ये तयार केलेले, ज्यामुळे उच्च जीवाणू संख्या (CFU) मिळते आणि शेतात जास्तीत जास्त फायदा मिळतो.",
    "about.ecoFriendly": "पर्यावरण पूरक",
    "about.ecoFriendlyDesc": "माती, पाणी किंवा पिकामध्ये कोणताही विषारी अंश सोडत नाही. मातीत नैसर्गिक जैवविविधतेला प्रोत्साहन देते." ,

    // Contact
    "contact.title": "संपर्क साधा",
    "contact.sub": "आमच्या जिवाणू खतांबद्दल काही प्रश्न आहेत किंवा पिकांबद्दल सल्ला हवा आहे? आमचे कृषी तज्ञ मदतीसाठी येथे आहेत.",
    "contact.getInTouch": "संपर्कात रहा",
    "contact.phoneTitle": "फोन नंबर",
    "contact.phoneDesc": "आम्ही सोमवार ते शनिवार, सकाळी ९ ते संध्याकाळी ६ उपलब्ध आहोत.",
    "contact.emailTitle": "ईमेल पत्ता",
    "contact.emailDesc": "आम्हाला कधीही ईमेल पाठवा.",
    "contact.officeTitle": "कार्यालयाचा पत्ता",
    "contact.sendMessage": "आम्हाला संदेश पाठवा",
    "contact.fullName": "पूर्ण नाव",
    "contact.namePlaceholder": "उदा. रमेश सिंग",
    "contact.phoneNumber": "फोन नंबर",
    "contact.phonePlaceholder": "मोबाईल नंबर",
    "contact.emailAddr": "ईमेल पत्ता",
    "contact.emailPlaceholder": "तुमचा ईमेल",
    "contact.howHelp": "आम्ही तुम्हाला कशी मदत करू शकतो?",
    "contact.howHelpPlaceholder": "तुमच्या शेताचे आणि पिकाचे तपशील आम्हाला सांगा...",
    "contact.sendBtn": "संदेश पाठवा",
    "contact.successMsg": "TupeGoldFarming शी संपर्क साधल्याबद्दल धन्यवाद. आम्ही लवकरच तुमच्याशी संपर्क करू."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('mr'); // Default to Marathi

  useEffect(() => {
    const savedLang = localStorage.getItem('appLang');
    if (savedLang === 'en' || savedLang === 'mr') {
      setLanguage(savedLang as Language);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('appLang', lang);
  };

  const t = (key: keyof typeof translations['en']) => {
    return translations[language][key] || translations['en'][key] || key;
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
