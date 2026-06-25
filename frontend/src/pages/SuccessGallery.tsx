import React, { useEffect, useState } from 'react';
import { apiService } from '../api/services';
import { CropResult } from '../types';
import { TrendingUp, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Container, PageHeader, Modal, Button } from '../components/common';

const CropCard: React.FC<{ result: CropResult; onOpen: (result: CropResult) => void }> = ({ result, onOpen }) => {
  const { t } = useLanguage();

  return (
    <div
      className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full transform hover:-translate-y-1 cursor-pointer"
      onClick={() => onOpen(result)}
    >
      <div className="h-64 overflow-hidden relative">
        <img
          src={result.imageUrl}
          alt={result.cropName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
           <div className="bg-white/90 backdrop-blur-md p-3 rounded-full scale-50 group-hover:scale-100 transition-transform duration-300">
              <Eye className="w-6 h-6 text-green-700" />
           </div>
        </div>
        <div className="absolute top-4 right-4 bg-gradient-to-r from-gold-500 to-gold-400 backdrop-blur-md text-green-950 px-4 py-1.5 rounded-full text-sm font-black shadow-lg flex items-center gap-1.5 border border-gold-300">
          <TrendingUp className="w-4 h-4 text-green-900" />
          +{result.yieldIncreasePercentage} {t('home.yieldIncrease')}
        </div>
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-xl font-black text-gray-900 mb-3 leading-tight">{result.cropName}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">{result.description}</p>

        <div className="mt-auto">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={(e) => {
              e?.stopPropagation();
              onOpen(result);
            }}
          >
            View Detailed Review
          </Button>
        </div>
      </div>
    </div>
  );
};

const CropDetailModal: React.FC<{ result: CropResult | null; isOpen: boolean; onClose: () => void }> = ({ result, isOpen, onClose }) => {
  const { t } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) setActiveImageIndex(0);
  }, [isOpen]);

  if (!result) return null;

  const allImages = [
    { id: 'main', imageUrl: result.imageUrl },
    ...(result.galleryImages || []).map(img => ({ id: img.id.toString(), imageUrl: img.imageUrl }))
  ];

  const nextImage = () => setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={result.cropName}
      size="lg"
    >
      <div className="flex flex-col gap-8">
        <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-video">
          <img
            src={allImages[activeImageIndex].imageUrl}
            alt={result.cropName}
            className="w-full h-full object-contain"
          />

          {allImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </>
          )}

          <div className="absolute top-4 right-4 bg-gold-500 text-green-950 px-4 py-1.5 rounded-full text-sm font-black shadow-lg flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4" />
            +{result.yieldIncreasePercentage} {t('home.yieldIncrease')}
          </div>
        </div>

        {allImages.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {allImages.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setActiveImageIndex(idx)}
                className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${idx === activeImageIndex ? 'border-gold-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img.imageUrl} className="w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>
        )}

        <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100">
          <h4 className="text-lg font-bold text-green-900 mb-2">Detailed Results</h4>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{result.description}</p>
        </div>
      </div>
    </Modal>
  );
};

export const SuccessGallery: React.FC = () => {
  const [cropResults, setCropResults] = useState<CropResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState<CropResult | null>(null);

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
                <CropCard
                  key={result.id}
                  result={result}
                  onOpen={setSelectedCrop}
                />
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

      <CropDetailModal
        isOpen={!!selectedCrop}
        result={selectedCrop}
        onClose={() => setSelectedCrop(null)}
      />
    </div>
  );
};
