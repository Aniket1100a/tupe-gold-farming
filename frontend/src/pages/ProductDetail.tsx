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
  const { id } = useParams<{ id: string }>(); // acts as slug
  const [product, setProduct] = useState<Product | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (id) {
          const productRes = await apiService.getProductBySlug(id);
          setProduct(productRes.data);
        }
        const settingsRes = await apiService.getSettings();
        setSettings(settingsRes.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="py-32 text-center min-h-[60vh] flex justify-center items-center">
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
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-gradient-to-br from-green-50 via-gray-50 to-gold-50/30 sticky top-32">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-contain object-center mix-blend-multiply"
                />
                <div className="absolute top-6 left-6 bg-gradient-to-r from-gold-400 to-gold-500 text-green-950 px-4 py-2 rounded-full text-sm font-black shadow-lg border border-gold-300 uppercase tracking-widest backdrop-blur-md">
                  {product.category}
                </div>
              </div>
            </div>

            {/* Details */}
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">{product.name}</h1>
              <p className="text-xl text-gray-700 leading-relaxed mb-10">
                {product.fullDescription}
              </p>

              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">{t('productDetail.keyBenefits')}</h3>
                <div className="space-y-6">
                  {(product.benefits?.length > 0 ? product.benefits : [
                      { id: '1', title: 'Improved Soil Health', description: 'Enhances the microbial activity in the soil making it more fertile over time.', icon: 'leaf' },
                      { id: '2', title: 'Higher Yields', description: 'Significantly increases crop yield and overall quality of the harvest.', icon: 'trending-up' },
                      { id: '3', title: 'Eco-Friendly', description: '100% natural and safe for the environment, reducing chemical footprint.', icon: 'shield-check' }
                  ]).map(benefit => (
                    <div key={benefit.id} className="flex gap-4 items-start">
                      <IconWrapper icon={getIcon(benefit.icon)} className="w-12 h-12" />
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">{benefit.title}</h4>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-12 bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Package className="text-green-600" />
                  {t('productDetail.packSizes')}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {(product.packSizes?.length > 0 ? product.packSizes : [
                      { size: '1', unit: 'Liter' },
                      { size: '2', unit: 'Liters' },
                      { size: '5', unit: 'Liters' }
                  ]).map((size, idx) => (
                    <div key={idx} className="bg-white border-2 border-green-200 text-green-800 px-6 py-3 rounded-xl font-bold shadow-sm">
                      {size.size} {size.unit}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                 <Button 
                  href={settings ? `tel:${settings.phone}` : '#'}
                  fullWidth
                  className="rounded-xl"
                  size="lg"
                 >
                   <Phone className="w-5 h-5" />
                   {t('productDetail.inquire')}
                 </Button>
              </div>

            </div>
          </div>
        </Container>
      </div>

      {/* Targeted crops section */}
      <div className="bg-green-50 py-24 border-t border-green-100">
        <Container>
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{t('productDetail.targetCrops')}</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {(product.cropsTargeted?.length > 0 ? product.cropsTargeted : ["Sugarcane", "Wheat", "Cotton", "Vegetables"]).map((crop, idx) => (
                <span key={idx} className="bg-white px-4 py-2 rounded-full border border-green-200 text-green-800 text-sm font-medium shadow-sm">
                  {crop}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </div>

    </div>
  );
};
