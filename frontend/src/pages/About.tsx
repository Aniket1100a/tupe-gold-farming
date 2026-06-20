import React, { useEffect, useState } from 'react';
import { apiService } from '../api/services';
import { SiteSettings } from '../types';
import { ShieldCheck, Leaf, Sprout } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Container, IconWrapper, PageHeader } from '../components/common';

export const About: React.FC = () => {
  const { t } = useLanguage();
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    apiService.getSettings()
      .then(res => setSettings(res.data))
      .catch(err => console.error("About settings fetch failed", err));
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <PageHeader 
        title={t('about.title')}
        subtitle={t('about.sub')}
      />

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
               <h2 className="text-3xl font-black text-gray-900">{t('about.whyStandOut')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-gold-50/50 p-8 rounded-3xl border border-gold-200/50 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <IconWrapper icon={<ShieldCheck className="w-8 h-8" />} variant="gold" className="mb-6 shadow-md shadow-gold-500/10" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('about.organic')}</h3>
                <p className="text-gray-600">{t('about.organicDesc')}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-gold-50/50 p-8 rounded-3xl border border-gold-200/50 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <IconWrapper icon={<Sprout className="w-8 h-8" />} variant="gold" className="mb-6 shadow-md shadow-gold-500/10" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('about.fermentation')}</h3>
                <p className="text-gray-600">{t('about.fermentationDesc')}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-gold-50/50 p-8 rounded-3xl border border-gold-200/50 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <IconWrapper icon={<Leaf className="w-8 h-8" />} variant="gold" className="mb-6 shadow-md shadow-gold-500/10" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('about.ecoFriendly')}</h3>
                <p className="text-gray-600">{t('about.ecoFriendlyDesc')}</p>
              </div>
            </div>
          </div>
          {/* How It Works */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 md:order-1 relative">
              <div className="absolute inset-0 bg-gold-200/30 rounded-3xl transform -translate-x-4 translate-y-4"></div>
              <img 
                src="https://images.unsplash.com/photo-1592982537447-6f2cf3cdd8bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Soil and roots" 
                className="rounded-3xl relative z-10 w-full h-[500px] object-cover shadow-xl border-4 border-white"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">How Does SVGOLD Work?</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium">
                SVGOLD is a liquid formulation containing active Azotobacter strains. It acts as an environmental catalyst in the rhizosphere (root zone):
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center shrink-0 border border-green-200 shadow-sm">
                    <span className="font-black text-green-700 text-lg">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Atmospheric Nitrogen Fixation</h3>
                    <p className="text-gray-600 leading-relaxed">Naturally locks atmospheric nitrogen and converts it into bio-available ammonia for roots.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-100 to-gold-50 rounded-xl flex items-center justify-center shrink-0 border border-gold-200 shadow-sm">
                    <span className="font-black text-gold-700 text-lg">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Phytohormone Secretion</h3>
                    <p className="text-gray-600 leading-relaxed">Synthesizes natural growth hormones (Auxins, Gibberellins) to stimulate vigorous root branching.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center shrink-0 border border-green-200 shadow-sm">
                    <span className="font-black text-green-700 text-lg">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Biocontrol Properties</h3>
                    <p className="text-gray-600 leading-relaxed">Restricts the development of soil-borne pathogens by producing iron-chelating siderophores.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-100 to-gold-50 rounded-xl flex items-center justify-center shrink-0 border border-gold-200 shadow-sm">
                    <span className="font-black text-gold-700 text-lg">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Rhizosphere Conditioning</h3>
                    <p className="text-gray-600 leading-relaxed">Increases soil aggregation, aeration, and water retention capacity.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};
