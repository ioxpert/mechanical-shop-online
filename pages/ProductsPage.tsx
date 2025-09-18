import React, { useMemo, useState } from 'react';
// FIX: Import AddToCartProduct type.
import type { Product, AddToCartProduct } from '../types';
import ProductCard from '../components/ProductCard';
import CustomOrderModal from '../components/CustomOrderModal';
import AddToCartModal from '../components/AddToCartModal';
import { useTranslation } from '../localization/useTranslation';
// FIX: Import TranslationKey for strong typing.
import type { TranslationKey } from '../localization/LanguageContext';

interface ProductsPageProps {
  products: Product[];
  // FIX: Use the AddToCartProduct type for the onAddToCart prop.
  onAddToCart: (product: AddToCartProduct) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products, onAddToCart }) => {
  const { t } = useTranslation();
  const [isCustomOrderModalOpen, setIsCustomOrderModalOpen] = useState(false);
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenCustomOrderModal = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    setIsCustomOrderModalOpen(true);
  };

  const handleAddToCartClick = (product: Product) => {
    setSelectedProduct(product);
    setIsAddToCartModalOpen(true);
  };
  
  const productsByCategory = useMemo(() => {
    return products.reduce((acc, product) => {
      const category = product.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
  }, [products]);

  // FIX: Use TranslationKey for titleKey to ensure type safety.
  const categoryOrder: { key: string; titleKey: TranslationKey }[] = [
    { key: 'Mirrors', titleKey: 'categoryMirrors' },
    { key: 'Aluminum', titleKey: 'categoryAluminum' },
    { key: 'Glass', titleKey: 'categoryGlass' },
  ];

  return (
    <div className="bg-light py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold font-serif text-center text-primary mb-16">{t('ourProducts')}</h1>
        
        <div className="space-y-20">
          {categoryOrder.map(({ key, titleKey }) => (
            productsByCategory[key] && productsByCategory[key].length > 0 && (
              <section key={key} aria-labelledby={`category-title-${key}`}>
                <div className="flex flex-col sm:flex-row justify-between items-baseline border-b-2 border-secondary pb-4 mb-10">
                    <h2 id={`category-title-${key}`} className="text-3xl font-bold font-serif text-primary mb-4 sm:mb-0">{t(titleKey)}</h2>
                    <button 
                      onClick={() => handleOpenCustomOrderModal(t(titleKey))}
                      className="bg-secondary text-primary font-bold py-2 px-6 rounded-md hover:opacity-90 transition-all duration-300 whitespace-nowrap"
                    >
                      {t('requestCustomOrder')}
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                  {productsByCategory[key].map(product => (
                    <ProductCard key={product.id} product={product} onAddToCartClick={handleAddToCartClick} />
                  ))}
                </div>
              </section>
            )
          ))}
        </div>
      </div>
      <CustomOrderModal 
        isOpen={isCustomOrderModalOpen}
        onClose={() => setIsCustomOrderModalOpen(false)}
        category={selectedCategory}
        onAddToCart={onAddToCart}
      />
      <AddToCartModal
        isOpen={isAddToCartModalOpen}
        onClose={() => setIsAddToCartModalOpen(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
    </div>
  );
};

export default ProductsPage;
