
import React from 'react';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface ProductsPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products, onAddToCart }) => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold font-serif text-center text-primary mb-12">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
