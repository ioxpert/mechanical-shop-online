import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import AddToCartModal from '../components/AddToCartModal';

interface HomePageProps {
  onAddToCart: (product: Product & { customInfo?: string; customImageName?: string; }) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onAddToCart }) => {
  const featuredProducts = PRODUCTS.slice(0, 3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddToCartClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-[60vh] text-white flex items-center justify-center" 
        style={{ backgroundImage: 'url(https://picsum.photos/seed/hero/1600/900)' }}
      >
        <div className="absolute inset-0 bg-primary bg-opacity-60"></div>
        <div className="relative z-10 text-center p-6">
          <h1 className="text-5xl md:text-6xl font-bold font-serif mb-4 drop-shadow-lg">Crafting Visions in Glass & Aluminium</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">Precision engineering and elegant design for your architectural needs.</p>
          <Link 
            to="/products" 
            className="bg-secondary text-primary font-bold py-3 px-8 rounded-md hover:opacity-90 transition-all duration-300 text-lg"
          >
            Explore Products
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold font-serif text-center text-primary mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCartClick={handleAddToCartClick} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products" className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-all duration-300">
              View All Products
            </Link>
          </div>
        </div>
      </section>
      
      <AddToCartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
    </div>
  );
};

export default HomePage;
