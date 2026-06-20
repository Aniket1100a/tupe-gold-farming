import React from 'react';
import { Home, Package, Info, Star, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navLinks = [
    { name: t('nav.home'), path: '/', icon: <Home className="w-6 h-6" /> },
    { name: t('nav.products'), path: '/products', icon: <Package className="w-6 h-6" /> },
    { name: t('nav.about'), path: '/about', icon: <Info className="w-6 h-6" /> },
    { name: t('nav.success'), path: '/success-gallery', icon: <Star className="w-6 h-6" /> },
    { name: t('nav.contact'), path: '/contact', icon: <Phone className="w-6 h-6" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-5px_20px_-10px_rgba(0,0,0,0.1)] z-50 pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 w-16 ${
                isActive 
                  ? 'text-green-700 bg-green-50 scale-105' 
                  : 'text-gray-500 hover:text-green-600 hover:bg-gray-50'
              }`}
            >
              <div className={`mb-1 transition-transform duration-300 ${isActive ? 'translate-y-0.5' : ''}`}>
                {link.icon}
              </div>
              <span className={`text-[10px] text-center font-medium leading-none ${isActive ? 'font-bold mt-1' : 'opacity-80'}`}>
                {link.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
