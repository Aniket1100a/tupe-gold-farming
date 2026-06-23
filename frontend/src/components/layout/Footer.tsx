import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { apiService } from '../../api/services';
import { Product, SiteSettings } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    apiService.getSettings()
      .then(res => {
        const data = res.data;
        setSettings(Array.isArray(data) ? data[0] : data);
      })
      .catch(err => console.error("Footer settings fetch failed", err));

    apiService.getProducts()
      .then(res => setProducts(res.data.slice(0, 5)))
      .catch(err => console.error("Footer products fetch failed", err));
  }, []);

  const getAbsoluteUrl = (url: string | undefined) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const baseUrl = import.meta.env.VITE_API_URL || 'https://111e-2409-4090-2013-6615-813f-b565-6073-7106.ngrok-free.app';
    return `${baseUrl.replace(/\/$/, '')}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const rawLogo = settings?.logoUrl || (settings as any)?.logo || (settings as any)?.logo_url || (settings as any)?.site_logo;
  const logoImage = getAbsoluteUrl(rawLogo);

  const phoneNumbers = settings?.phoneList && settings.phoneList.length > 0
    ? settings.phoneList
    : (settings?.phones ? [settings.phones] : []);

  const emailAddresses = settings?.emailList && settings.emailList.length > 0
    ? settings.emailList
    : (settings?.emails ? [settings.emails] : []);

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Col */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              {logoImage ? (
                <div className="flex items-center gap-3">
                  <div className="bg-white p-1.5 rounded-full inline-flex flex-shrink-0 w-12 h-12 md:w-14 md:h-14 items-center justify-center overflow-hidden">
                    <img 
                      src={logoImage} 
                      alt={settings?.companyName || "Tupe Gold Farming"} 
                      className="h-full w-full object-contain opacity-95 hover:opacity-100 transition-opacity drop-shadow-md" 
                    />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-none">
                      {settings?.companyName || "Tupe Gold Farming"}
                    </h2>
                    <p className="text-[10px] text-green-400 font-medium uppercase tracking-wider mt-1">Premium Biofertilizers</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-green-600 p-2 rounded-lg">
                    <Sprout className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight leading-none">Tupe Gold Farming</h2>
                    <p className="text-[10px] text-green-400 font-medium uppercase tracking-wider">Biofertilizers</p>
                  </div>
                </>
              )}
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              {t('footer.desc')}
            </p>
            <div className="flex gap-4">
              {settings?.socialLinks.facebook && <a href={settings.socialLinks.facebook} className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>}
              {settings?.socialLinks.twitter && <a href={settings.socialLinks.twitter} className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>}
              {settings?.socialLinks.instagram && <a href={settings.socialLinks.instagram} className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>}
              {settings?.socialLinks.linkedin && <a href={settings.socialLinks.linkedin} className="text-gray-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-green-400 transition-colors text-sm">{t('nav.home')}</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-green-400 transition-colors text-sm">{t('nav.products')}</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors text-sm">{t('nav.about')}</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-green-400 transition-colors text-sm">{t('nav.contact')}</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">{t('footer.certifications')}</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.ourSolutions')}</h3>
            <ul className="space-y-3">
              {products.map(p => (
                 <li key={p.id}>
                   <Link to={`/products/${p.slug}`} className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                     {p.name}
                   </Link>
                 </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.contactUs')}</h3>
            <ul className="space-y-4">
              {settings?.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-gray-400 text-sm">{settings.address}</span>
                </li>
              )}
              {phoneNumbers.length > 0 && (
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-green-500 shrink-0" />
                  <div className="flex flex-col gap-1">
                    {phoneNumbers.map((phone, idx) => (
                      <span key={idx} className="text-gray-400 text-sm">{phone}</span>
                    ))}
                  </div>
                </li>
              )}
              {emailAddresses.length > 0 && (
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-green-500 shrink-0" />
                  <div className="flex flex-col gap-1">
                    {emailAddresses.map((email, idx) => (
                      <span key={idx} className="text-gray-400 text-sm">{email}</span>
                    ))}
                  </div>
                </li>
              )}
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {settings?.companyName || 'Tupe Gold Farming'}. {t('footer.allRights')}</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacyPolicy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
