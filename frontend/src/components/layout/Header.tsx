import React, { useState, useEffect } from 'react';
import { Globe, Sprout } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { apiService } from '../../api/services';
import { SiteSettings } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../common';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    apiService.getSettings()
      .then(res => {
        const data = res.data;
        setSettings(Array.isArray(data) ? data[0] : data);
      })
      .catch(err => console.error("Header settings fetch failed", err));
  }, []);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.products'), path: '/products' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.success'), path: '/success-gallery' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const getAbsoluteUrl = (url: string | undefined) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const baseUrl = import.meta.env.VITE_API_URL || 'https://111e-2409-4090-2013-6615-813f-b565-6073-7106.ngrok-free.app';
    return `${baseUrl.replace(/\/$/, '')}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const rawLogo = settings?.logoUrl || (settings as any)?.logo || (settings as any)?.logo_url || (settings as any)?.site_logo;
  const logoImage = getAbsoluteUrl(rawLogo);

  const primaryPhone = settings?.phoneList?.[0] || settings?.phones;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            {logoImage ? (
              <div className="flex items-center gap-2 md:gap-3">
                <div className="bg-white p-1.5 rounded-full shadow-sm border border-gray-100 flex-shrink-0 group-hover:shadow-md transition-all w-12 h-12 md:w-14 md:h-14 flex items-center justify-center overflow-hidden">
                  <img 
                    src={logoImage} 
                    alt={settings?.companyName || "Tupe Gold Farming"} 
                    className="h-full w-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105" 
                  />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent tracking-tight leading-none whitespace-nowrap">
                    {settings?.companyName || "Tupe Gold Farming"}
                  </h1>
                  <p className="text-[9px] md:text-[10px] text-gold-600 font-bold uppercase tracking-widest mt-0.5 whitespace-nowrap">Premium Biofertilizers</p>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-br from-green-700 to-green-900 p-2.5 rounded-xl shadow-inner border border-gold-400/50 group-hover:shadow-gold-500/20 transition-all">
                  <Sprout className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-black bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent tracking-tight leading-none">
                    {settings ? settings.companyName : "Tupe Gold Farming"}
                  </h1>
                  <p className="text-[10px] text-gold-600 font-bold uppercase tracking-widest mt-0.5">Premium Biofertilizers</p>
                </div>
              </>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-sm font-bold transition-all hover:text-green-700 ${
                  location.pathname === link.path ? 'text-green-800 border-b-2 border-gold-500 pb-1' : 'text-gray-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Language Switcher */}
            <div className="relative notranslate" translate="no">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 text-gray-700 hover:text-green-700 text-sm font-medium"
              >
                <Globe className="w-4 h-4" />
                {language === 'mr' ? 'मराठी' : language === 'hi' ? 'हिंदी' : 'English'}
              </button>
              
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <button 
                    className={`block w-full text-left px-4 py-2 text-sm ${language === 'mr' ? 'text-green-700 bg-green-50 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => { setLanguage('mr'); setLangMenuOpen(false); }}
                  >
                    मराठी
                  </button>
                  <button 
                    className={`block w-full text-left px-4 py-2 text-sm ${language === 'hi' ? 'text-green-700 bg-green-50 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => { setLanguage('hi'); setLangMenuOpen(false); }}
                  >
                    हिंदी
                  </button>
                  <button 
                    className={`block w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'text-green-700 bg-green-50 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => { setLanguage('en'); setLangMenuOpen(false); }}
                  >
                    English
                  </button>
                </div>
              )}
            </div>

            {primaryPhone && (
              <Button 
                href={`tel:${primaryPhone}`}
                size="sm"
              >
                {t('nav.consult')}
              </Button>
            )}
          </nav>

          <div className="flex gap-4 md:hidden">
            {/* Mobile Language Switcher */}
            <button 
              onClick={() => setLanguage(language === 'en' ? 'mr' : language === 'mr' ? 'hi' : 'en')}
              className="flex items-center gap-1 text-green-700 text-sm font-bold bg-green-50 px-2 py-1 rounded-md notranslate"
              translate="no"
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? 'ENG' : language === 'mr' ? 'मराठी' : 'हिंदी'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
