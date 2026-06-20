import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useLanguage();
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full transform hover:-translate-y-1 hover:border-gold-200">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-green-50 via-gray-50 to-gold-50/30 p-6 flex items-center justify-center">
        <img 
          src={imgError ? 'https://via.placeholder.com/400x300?text=Product+Image' : product.imageUrl} 
          alt={product.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 max-h-48 drop-shadow-md"
        />
        <div className="absolute top-4 left-4 bg-gradient-to-r from-gold-400 to-gold-500 text-green-950 px-4 py-1.5 rounded-full text-xs font-black shadow-sm border border-gold-300 uppercase tracking-widest backdrop-blur-md">
          {product.category}
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-xl font-black text-gray-900 mb-3 leading-tight">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-8 flex-grow leading-relaxed">{product.shortDescription}</p>
        
        <Link 
          to={`/products/${product.slug}`}
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-green-50 text-green-800 font-bold rounded-2xl hover:bg-gradient-to-r hover:from-gold-500 hover:to-gold-400 hover:text-green-950 hover:shadow-lg hover:shadow-gold-500/20 transition-all duration-300 group/btn"
        >
          {t('home.viewDetails')}
          <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
