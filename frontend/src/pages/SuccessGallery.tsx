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
                <div key={result.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={result.imageUrl} 
                      alt={result.cropName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      +{result.yieldIncreasePercentage} {t('home.yieldIncrease')}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{result.cropName}</h3>
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
