import React, { useEffect, useState } from 'react';
import { apiService } from '../api/services';
import { Product } from '../types';
import { ProductCard } from '../components/products/ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { Container, PageHeader } from '../components/common';
import { Sparkles } from 'lucide-react';

export const Products: React.FC = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await apiService.getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          <p className="text-green-800 font-medium">Loading Products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title={t('products.title') || "Our Products"}
        subtitle={t('products.sub') || "Discover our range of precision-fermented microorganisms designed to unlock your soil's potential and naturally boost crop yields."}
      />

      <div className="py-20 -mt-10">
        <Container>
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Available</h3>
                <p className="text-gray-500 max-w-md mx-auto">We couldn't find any products at the moment. Please check back later or contact our support team.</p>
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};
