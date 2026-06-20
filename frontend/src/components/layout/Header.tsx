import React, { useState, useEffect } from 'react';
import { Menu, X, Sprout, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { apiService } from '../../api/services';
import { SiteSettings } from '../../types';
import { useLanguage, Language } from '../../context/LanguageContext';
import { Button } from '../common';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    // Fetch settings for the "Consult" button phone number
    apiService.getSettings()
      .then(res => setSettings(res.data))
      .catch(err => console.error("Header settings fetch failed", err));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.products'), path: '/products' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'mr', label: 'मराठी' },
    { code: 'hi', label: 'हिन्दी' },
  ];

  const currentLangLabel = languages.find(l => l.code === language)?.label || 'English';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-green-700 p-2 rounded-lg">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-800 tracking-tight leading-none">Tupe Gold Farming</h1>
              <p className="text-[10px] text-green-600 font-medium uppercase tracking-wider">Biofertilizers</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-green-600 ${
                  location.pathname === link.path ? 'text-green-700 border-b-2 border-green-600 pb-1' : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 text-gray-700 hover:text-green-700 text-sm font-medium"
              >
                <Globe className="w-4 h-4" />
                {currentLangLabel}
              </button>
              
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`block w-full text-left px-4 py-2 text-sm ${language === lang.code ? 'text-green-700 bg-green-50 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                      onClick={() => { setLanguage(lang.code); setLangMenuOpen(false); }}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button 
              href={settings?.phone ? `tel:${settings.phone}` : '#'}
              size="sm"
            >
              {t('nav.consult')}
            </Button>
          </nav>

          <div className="flex gap-4 md:hidden">
            {/* Mobile Language Switcher */}
            <button 
              onClick={() => {
                const currentIndex = languages.findIndex(l => l.code === language);
                const nextIndex = (currentIndex + 1) % languages.length;
                setLanguage(languages[nextIndex].code);
              }}
              className="flex items-center gap-1 text-green-700 text-sm font-bold bg-green-50 px-2 py-1 rounded-md"
            >
              <Globe className="w-4 h-4" />
              {language.toUpperCase()}
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="text-gray-700 hover:text-green-700 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100">
          <nav className="flex flex-col px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium px-2 py-1 rounded-md ${
                  location.pathname === link.path ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a 
              href={settings?.phone ? `tel:${settings.phone}` : '#'}
              className="px-4 py-3 bg-green-700 text-white text-center font-medium rounded-lg"
            >
              {t('nav.consult')}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
