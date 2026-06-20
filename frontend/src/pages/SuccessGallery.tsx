import React, { useEffect, useState } from 'react';
import { apiService } from '../api/services';
import { CropResult } from '../types';
import { TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Container, PageHeader, SectionHeader } from '../components/common';

export const SuccessGallery: React.FC = () => {
  const { t } = useLanguage();
  const [cropResults, setCropResults] = useState<CropResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resultsRes = await apiService.getCropResults();
        setCropResults(resultsRes.data);
      } catch (e) { console.error("Crop Results fetch failed", e); }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader 
        title="Success Gallery" 
        subtitle="See how SV Gold transforms farming with proven results across various crops."
      />

      <section className="py-20 bg-gray-50 flex-grow">
        <Container>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cropResults.map((result) => (
                <div key={result.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full transform hover:-translate-y-1">
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src={result.imageUrl} 
                      alt={result.cropName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-gold-500 to-gold-400 backdrop-blur-md text-green-950 px-4 py-1.5 rounded-full text-sm font-black shadow-lg flex items-center gap-1.5 border border-gold-300">
                      <TrendingUp className="w-4 h-4 text-green-900" />
                      +{result.yieldIncreasePercentage} {t('home.yieldIncrease')}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-black text-gray-900 mb-3 leading-tight">{result.cropName}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{result.description}</p>
                  </div>
                </div>
              ))}
              
              {cropResults.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No success stories available yet.
                </div>
              )}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
};
