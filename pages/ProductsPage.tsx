import React, { useMemo } from 'react';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface ProductsPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products, onAddToCart }) => {
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

  // Defines the display order and titles for product categories
  const categoryOrder: { key: string; title: string }[] = [
    { key: 'Glass', title: 'Glass Items' },
    { key: 'Aluminum', title: 'Aluminum Items' },
    { key: 'Mirrors', title: 'Mirror Items' },
  ];

  return (
    <div className="bg-light py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold font-serif text-center text-primary mb-16">Our Products</h1>
        
        <div className="space-y-20">
          {categoryOrder.map(({ key, title }) => (
            productsByCategory[key] && productsByCategory[key].length > 0 && (
              <section key={key} aria-labelledby={`category-title-${key}`}>
                <div className="border-b-2 border-secondary pb-4 mb-10">
                    <h2 id={`category-title-${key}`} className="text-3xl font-bold font-serif text-primary">{title}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                  {productsByCategory[key].map(product => (
                    <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                  ))}
                </div>
              </section>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;