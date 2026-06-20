import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 group flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 pb-1.5 rounded-full text-xs font-semibold text-green-700 uppercase tracking-wide">
          {product.category}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-6 flex-grow">{product.shortDescription}</p>
        
        <Link 
          to={`/products/${product.slug}`}
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-green-50 text-green-700 font-medium rounded-xl hover:bg-green-600 hover:text-white transition-colors group/btn"
        >
          {t('home.viewDetails')}
          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
