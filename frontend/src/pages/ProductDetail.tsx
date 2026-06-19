import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../api/services';
import { Product, SiteSettings } from '../types';
import { ArrowLeft, CheckCircle2, Package, Phone, Leaf, Droplets, Sprout, ShieldCheck, Sun } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Container, SectionHeader, IconWrapper, Button } from '../components/common';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Leaf': return <Leaf className="w-6 h-6" />;
    case 'Sprout': return <Sprout className="w-6 h-6" />;
    case 'Sun': return <Sun className="w-6 h-6" />;
    case 'Droplets': return <Droplets className="w-6 h-6" />;
    case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
    default: return <CheckCircle2 className="w-6 h-6" />;
  }
};

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();

  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;
      setLoading(true);

      // Fetch product independently
      try {
        const productRes = await apiService.getProduct(id);
        setProduct(productRes.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }

      // Fetch settings independently
      try {
        const settingsRes = await apiService.getSettings();
        setSettings(settingsRes.data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }

      setLoading(false);
    };

    fetchProductData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-32 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('productDetail.notFound')}</h2>
        <Link to="/products" className="text-green-600 hover:text-green-700 font-medium">
          ← {t('productDetail.back')}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      
      {/* Breadcrumb / Nav */}
      <div className="bg-gray-50 border-b border-gray-100 py-4">
        <Container>
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-green-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t('productDetail.back')}
          </Link>
        </Container>
      </div>

      {/* Main Product Info */}
      <div className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 sticky top-32">
                <img 
                  src={product.imageUrl} 
                  alt={product.name[language] || product.name['en']}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-green-800 shadow-sm uppercase tracking-wider">
                  {product.category[language] || product.category['en']}
                </div>
              </div>
            </div>

            {/* Details */}
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                {product.name[language] || product.name['en']}
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed mb-10">
                {product.fullDescription[language] || product.fullDescription['en']}
              </p>

              {product.benefits && product.benefits.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">{t('productDetail.keyBenefits')}</h3>
                  <div className="space-y-6">
                    {product.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex gap-4 items-start">
                        <IconWrapper icon={getIcon(benefit.icon)} className="w-12 h-12" />
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-1">
                            {benefit.title[language] || benefit.title['en']}
                          </h4>
                          <p className="text-gray-600">
                            {benefit.description[language] || benefit.description['en']}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {product.packSizes && product.packSizes.length > 0 && (
                <div className="mb-12 bg-gray-50 rounded-2xl p-8 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Package className="text-green-600" />
                    {t('productDetail.packSizes')}
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {product.packSizes.map((size, idx) => (
                      <div key={idx} className="bg-white border-2 border-green-200 text-green-800 px-6 py-3 rounded-xl font-bold shadow-sm">
                        {size.size} {size.unit[language] || size.unit['en']}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {settings && (
                <div className="flex gap-4">
                   <Button
                    href={settings.phone ? `tel:${settings.phone}` : '#'}
                    fullWidth
                    className="rounded-xl"
                    size="lg"
                   >
                     <Phone className="w-5 h-5" />
                     {t('productDetail.inquire')}
                   </Button>
                </div>
              )}

            </div>
          </div>
        </Container>
      </div>

      {/* How to use section */}
      {product.howToUse && product.howToUse.length > 0 && (
        <div className="bg-green-50 py-24 border-t border-green-100">
          <Container>
            <SectionHeader
              title={t('productDetail.appDosage')}
              subtitle={t('productDetail.appDosageSub')}
            />

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[500px]">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider">{t('productDetail.method')}</th>
                      <th className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider">{t('productDetail.dosage')}</th>
                      <th className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider">{t('productDetail.instructions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {product.howToUse.map((method, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-5 font-bold text-gray-900">{method.method[language] || method.method['en']}</td>
                        <td className="px-6 py-5 text-gray-600 font-medium">{method.dosage[language] || method.dosage['en']}</td>
                        <td className="px-6 py-5 text-gray-600">{method.instructions[language] || method.instructions['en']}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {product.cropsTargeted && product.cropsTargeted.length > 0 && (
              <div className="mt-16 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{t('productDetail.targetCrops')}</h3>
                <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                  {product.cropsTargeted.map((crop, idx) => (
                    <span key={idx} className="bg-white px-4 py-2 rounded-full border border-green-200 text-green-800 text-sm font-medium shadow-sm">
                      {crop[language] || crop['en']}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </div>
      )}

    </div>
  );
};
