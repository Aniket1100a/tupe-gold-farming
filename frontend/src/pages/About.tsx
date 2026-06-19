import React, { useEffect, useState } from 'react';
import { apiService } from '../api/services';
import { SiteSettings } from '../types';
import { ShieldCheck, Leaf, Sprout } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Container, IconWrapper } from '../components/common';

export const About: React.FC = () => {
  const { t, language } = useLanguage();
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    apiService.getSettings()
      .then(res => setSettings(res.data))
      .catch(err => console.error("About settings fetch failed", err));
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-green-900 text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Farm" className="w-full h-full object-cover" />
        </div>
        <Container className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">{t('about.title')}</h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            {t('about.sub')}
          </p>
        </Container>
      </div>

      {/* Content */}
      <div className="py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t('about.mission')}</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {t('about.missionText1')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('about.missionText2')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1405852903341-d0b80615f7c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Farming" className="rounded-2xl h-64 object-cover w-full shadow-lg" />
              <img src="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Lab" className="rounded-2xl h-64 object-cover w-full shadow-lg mt-8" />
            </div>
          </div>

          {/* Certifications and Pillars */}
          <div className="mb-24">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-gray-900">{t('about.whyStandOut')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col items-center text-center">
                <IconWrapper icon={<ShieldCheck className="w-8 h-8" />} variant="white" className="mb-6" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('about.organic')}</h3>
                <p className="text-gray-600">{t('about.organicDesc')}</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col items-center text-center">
                <IconWrapper icon={<Sprout className="w-8 h-8" />} variant="white" className="mb-6" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('about.fermentation')}</h3>
                <p className="text-gray-600">{t('about.fermentationDesc')}</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col items-center text-center">
                <IconWrapper icon={<Leaf className="w-8 h-8" />} variant="white" className="mb-6" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('about.ecoFriendly')}</h3>
                <p className="text-gray-600">{t('about.ecoFriendlyDesc')}</p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};
