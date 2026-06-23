import React, { useEffect, useState } from 'react';
import { apiService } from '../api/services';
import { Banner, BenefitItem, Product, CropResult, SiteSettings } from '../types';
import { ProductCard } from '../components/products/ProductCard';
import { ArrowRight, CheckCircle2, TrendingUp, PhoneCall, ShieldCheck, Leaf, Sprout, Droplets, Sun, Star, Quote } from 'lucide-react';
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
        const data = settingsRes.data;
        setSettings(Array.isArray(data) ? data[0] : data);
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
  const primaryPhone = settings?.phoneList?.[0] || settings?.phones;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      {heroBanner && (
        <section className="relative w-full min-h-[85vh] flex items-center justify-center bg-green-950 pt-32 pb-16 lg:pt-16 lg:pb-16 border-b-4 border-gold-500">
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
              <div className="max-w-2xl lg:w-5/12 flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse"></span>
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

              {/* Hero Image Presentation */}
              <div className="w-full lg:w-7/12 relative flex items-center justify-center mt-10 lg:mt-0 px-4 sm:px-8">
                <div className="relative w-full max-w-[750px] group">
                  {/* Background glowing orb */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gold-500/40 rounded-full blur-[120px] pointer-events-none group-hover:bg-gold-400/50 transition-colors duration-700"></div>
                  <div className="absolute -inset-4 bg-gradient-to-tr from-gold-600/40 via-gold-400/20 to-gold-600/40 rounded-[2.5rem] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  
                  <div className="relative w-full rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.4)] border-2 border-gold-400/40">
                    {/* The uploaded hero image */}
                    <img 
                      src="/hero-bg1.png" 
                      alt="Tupe Gold Farming Products" 
                      className="relative z-10 w-full h-auto object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                      onError={(e) => {
                        // Fallback placeholder if image isn't uploaded yet
                        (e.target as HTMLImageElement).src = 'https://placehold.co/800x600/10351f/d4af37?text=Upload+hero-bg1.png\\nTo+Public+Folder';
                      }}
                    />
                    {/* Optional gradient overlay to ensure text/surroundings blend smoothly if needed */}
                    <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.3)] rounded-3xl"></div>
                  </div>

                  {/* The uploaded logo overlay */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-56 sm:w-80 z-30 transition-all duration-700 group-hover:scale-110 pointer-events-none">
                    <img
                      src="/logo.png"
                      alt="Tupe Gold Farming"
                      className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>
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
              <div key={benefit.id} className="bg-gradient-to-br from-white to-gold-50/20 p-8 rounded-3xl shadow-sm border border-gold-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <IconWrapper icon={getIcon(benefit.icon)} variant="gold" className="mb-6 shadow-md shadow-gold-500/10" />
                <h3 className="text-xl font-black text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed font-medium">{benefit.description}</p>
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

      {/* Farmer Reviews Section */}
      <section className="py-24 bg-gray-50">
        <Container>
          <SectionHeader 
            title={t('home.farmerReviews')} 
            subtitle={t('home.farmerReviewsSub')} 
            align="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-gold-50/20 p-8 rounded-3xl shadow-sm border border-gold-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group">
              <Quote className="w-12 h-12 text-gold-200 absolute top-6 right-6 opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 text-gold-400 fill-gold-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 italic z-10 relative">
                "Since using Tupe Gold Farming biofertilizers, my sugarcane yield has increased by almost 30%. The soil feels softer and retains water much better. Truly a miraculous product!"
              </p>
              <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                <div className="w-12 h-12 bg-gradient-to-br from-gold-100 to-gold-200 rounded-full flex items-center justify-center text-green-950 font-black text-lg">
                  RJ
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Ramesh Jadhav</h4>
                  <p className="text-sm text-gold-600 font-bold">Sugarcane Farmer</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-gold-50/20 p-8 rounded-3xl shadow-sm border border-gold-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group">
              <Quote className="w-12 h-12 text-gold-200 absolute top-6 right-6 opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 text-gold-400 fill-gold-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 italic z-10 relative">
                "I was skeptical about organic farming, but the Azotobacter plus transformed my wheat fields. Yield is up, and I saved so much on chemical fertilizers."
              </p>
              <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                <div className="w-12 h-12 bg-gradient-to-br from-gold-100 to-gold-200 rounded-full flex items-center justify-center text-green-950 font-black text-lg">
                  SP
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Suresh Patil</h4>
                  <p className="text-sm text-gold-600 font-bold">Wheat Farmer</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-gold-50/20 p-8 rounded-3xl shadow-sm border border-gold-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group">
              <Quote className="w-12 h-12 text-gold-200 absolute top-6 right-6 opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 text-gold-400 fill-gold-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 italic z-10 relative">
                "Excellent results on my cotton crop. The plants are healthier, greener, and more resistant to diseases. The team also provided great guidance."
              </p>
              <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                <div className="w-12 h-12 bg-gradient-to-br from-gold-100 to-gold-200 rounded-full flex items-center justify-center text-green-950 font-black text-lg">
                  AG
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Anil Gaikwad</h4>
                  <p className="text-sm text-gold-600 font-bold">Cotton Farmer</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      {settings && (
        <section className="py-20 relative overflow-hidden bg-gradient-to-r from-green-900 via-green-800 to-green-900 border-t-4 border-gold-500">
          <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold-500/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 drop-shadow-md">{t('home.readyToTransform')}</h2>
            <p className="text-xl text-green-50 mb-10 font-medium">{t('home.readyToTransformSub')}</p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              {primaryPhone && (
                <Button
                  href={`tel:${primaryPhone}`}
                  variant="primary"
                  size="lg"
                >
                  <PhoneCall className="w-5 h-5 text-green-900" />
                  {t('home.call')} {primaryPhone}
                </Button>
              )}
              <Button
                href={`https://wa.me/${settings.whatsapp.replace(/\D/g,'')}`}
                variant="glass"
                size="lg"
              >
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                {t('home.whatsapp')}
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
