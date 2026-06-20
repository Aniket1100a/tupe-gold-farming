import React, { useEffect, useState } from 'react';
import { apiService } from '../api/services';
import { Banner, BenefitItem, Product, CropResult, SiteSettings } from '../types';
import { ProductCard } from '../components/products/ProductCard';
import { ArrowRight, CheckCircle2, TrendingUp, PhoneCall, ShieldCheck, Leaf, Sprout, Droplets, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Button, Container, SectionHeader, IconWrapper } from '../components/common';

// Helper to map icon names to Lucide components
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Leaf': return <Leaf className="w-8 h-8" />;
    case 'Sprout': return <Sprout className="w-8 h-8" />;
    case 'Sun': return <Sun className="w-8 h-8" />;
    case 'Droplets': return <Droplets className="w-8 h-8" />;
    case 'ShieldCheck': return <ShieldCheck className="w-8 h-8" />;
    default: return <CheckCircle2 className="w-8 h-8" />;
  }
};

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [benefits, setBenefits] = useState<BenefitItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cropResults, setCropResults] = useState<CropResult[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const bannersRes = await apiService.getBanners();
        setBanners(bannersRes.data);
      } catch (e) { console.error("Banners fetch failed", e); }

      try {
        const benefitsRes = await apiService.getBenefits();
        setBenefits(benefitsRes.data);
      } catch (e) { console.error("Benefits fetch failed", e); }

      try {
        const productsRes = await apiService.getProducts({ featured: true });
        setProducts(productsRes.data);
      } catch (e) { console.error("Products fetch failed", e); }

      try {
        const resultsRes = await apiService.getCropResults();
        setCropResults(resultsRes.data);
      } catch (e) { console.error("Crop Results fetch failed", e); }

      try {
        const settingsRes = await apiService.getSettings();
        setSettings(settingsRes.data);
      } catch (e) { console.error("Settings fetch failed", e); }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const heroBanner = banners.length > 0 ? banners[0] : null;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      {heroBanner && (
        <section className="relative w-full min-h-[100vh] flex items-center justify-center bg-green-950 pt-32 pb-20 lg:pt-16 lg:pb-24">
          <div className="absolute inset-0 z-0">
            <img
              src={heroBanner.imageUrl}
              alt="Agriculture Field"
              className="w-full h-full object-cover object-center opacity-60 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-green-950/90 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-green-950/80 to-transparent"></div>
          </div>

          <Container className="relative z-10 w-full">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 mt-4 lg:mt-0">
              <div className="max-w-2xl lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-green-500/10 border border-green-400/20 text-green-300 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  {t('home.organicNPOP')}
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight drop-shadow-md">
                  {heroBanner.title}
                </h1>
                <p className="text-lg sm:text-xl text-green-50 mb-10 max-w-xl leading-relaxed drop-shadow">
                  {heroBanner.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Button to="/products" variant="primary" size="lg">
                    {t('home.exploreProducts')}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button to="/contact" variant="glass" size="lg">
                    {t('home.getFreeAdvice')}
                  </Button>
                </div>
              </div>

              {/* Floating Products Presentation */}
              <div className="w-full lg:w-1/2 relative min-h-[350px] sm:min-h-[450px] flex items-center justify-center mt-10 lg:mt-0">
                {products.length > 0 ? (
                  <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
                    {/* Background glowing orb */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-green-500/30 rounded-full blur-[80px] pointer-events-none"></div>
                    
                    {products[0] && (
                      <Link to={`/products/${products[0].slug || products[0].id}`} className="absolute top-0 right-0 sm:right-[10%] lg:right-0 w-[55%] sm:w-[200px] bg-white/10 backdrop-blur-2xl rounded-[1.5rem] border border-white/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] p-3 hover:scale-105 transition-all duration-500 z-20 group animate-float">
                        <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mb-3 bg-white/5 shadow-inner relative group-hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] transition-all">
                          <img src={products[0].imageUrl} alt={products[0].name} className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"></div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <span className="inline-block text-[9px] font-bold text-white tracking-widest uppercase bg-green-600/90 px-1.5 py-0.5 rounded backdrop-blur-md truncate max-w-full">{products[0].category}</span>
                          </div>
                        </div>
                        <div className="px-1 text-left">
                          <div className="text-white font-black text-base sm:text-lg truncate tracking-tight">{products[0].name}</div>
                          <div className="text-green-200 text-[10px] sm:text-xs font-medium mt-1 opacity-80 truncate">{products[0].shortDescription || 'Premium Biofertilizer'}</div>
                        </div>
                      </Link>
                    )}
                    
                    {(products[1] || products[0]) && (
                      <Link to={`/products/${(products[1] || products[0]).slug || (products[1] || products[0]).id}`} className="absolute bottom-4 left-0 sm:left-[10%] lg:left-0 w-[50%] sm:w-[180px] bg-white/5 backdrop-blur-xl rounded-[1.5rem] border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] p-2 hover:scale-105 transition-all duration-500 z-10 group mt-10 animate-float-delayed">
                        <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mb-3 bg-white/5 shadow-inner relative group-hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] transition-all">
                          <img src={(products[1] || products[0]).imageUrl} alt={(products[1] || products[0]).name} className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"></div>
                        </div>
                        <div className="px-1 text-left">
                          <div className="text-white/90 font-bold text-sm sm:text-base truncate tracking-tight">{(products[1] || products[0]).name}</div>
                        </div>
                      </Link>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Stats Bar */}
      <section className="bg-green-700 py-12 relative z-20 -mt-10 mx-4 sm:mx-6 lg:mx-auto max-w-7xl rounded-2xl shadow-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 px-4 sm:px-8">
          <div className="text-center px-2">
            <div className="text-3xl sm:text-4xl font-black text-white mb-2">50,000+</div>
            <div className="text-[10px] sm:text-xs md:text-sm font-medium text-green-100 uppercase tracking-wider">{t('home.acresTreated')}</div>
          </div>
          <div className="text-center px-2">
            <div className="text-3xl sm:text-4xl font-black text-white mb-2">25-30%</div>
            <div className="text-[10px] sm:text-xs md:text-sm font-medium text-green-100 uppercase tracking-wider">{t('home.yieldIncrease')}</div>
          </div>
          <div className="text-center px-2">
            <div className="text-3xl sm:text-4xl font-black text-white mb-2">20-25%</div>
            <div className="text-[10px] sm:text-xs md:text-sm font-medium text-green-100 uppercase tracking-wider">{t('home.fertilizerSaved')}</div>
          </div>
          <div className="text-center px-2">
            <div className="text-3xl sm:text-4xl font-black text-white mb-2">100%</div>
            <div className="text-[10px] sm:text-xs md:text-sm font-medium text-green-100 uppercase tracking-wider">{t('home.organicNPOP')}</div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50">
        <Container>
          <SectionHeader 
            title={t('home.whyChoose')} 
            subtitle={t('home.whyChooseSub')} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <IconWrapper icon={getIcon(benefit.icon)} className="mb-6" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <SectionHeader 
              title={t('home.ourBioSolutions')} 
              subtitle={t('home.ourBioSolutionsSub')} 
              align="left"
              className="mb-0 max-w-2xl"
            />
            <Link to="/products" className="inline-flex items-center gap-2 text-green-600 font-bold hover:text-green-700 mb-2">
              {t('home.viewAllProducts')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* Crop Results */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <Container>
          <SectionHeader 
            title={t('home.provenResults')} 
            subtitle={t('home.provenResultsSub')} 
          />

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
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      {settings && (
        <section className="py-20 relative overflow-hidden bg-green-800">
          <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('home.readyToTransform')}</h2>
            <p className="text-xl text-green-100 mb-10">{t('home.readyToTransformSub')}</p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Button
                href={`tel:${settings.phone}`}
                variant="white"
                size="lg"
              >
                <PhoneCall className="w-5 h-5" />
                {t('home.call')} {settings.phone}
              </Button>
              <Button
                href={`https://wa.me/${settings.whatsapp.replace(/\D/g,'')}`}
                variant="secondary"
                size="lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                {t('home.whatsapp')}
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
