
import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';

interface HomePageProps {
  onAddToCart: (product: Product) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onAddToCart }) => {
  const featuredProducts = PRODUCTS.slice(0, 3);

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
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products" className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-all duration-300">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-light">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold font-serif text-primary mb-6">Get In Touch</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-10">
            Have a project in mind or need a custom quote? Our team is ready to help you bring your vision to life. Contact us today!
          </p>
          <form className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-4">
              <input type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
            <div className="mb-4">
              <input type="email" placeholder="Your Email" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
            <div className="mb-6">
              <textarea placeholder="Your Message" rows={5} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"></textarea>
            </div>
            <button type="submit" className="w-full bg-secondary text-primary font-bold py-3 px-8 rounded-md hover:opacity-90 transition-all duration-300">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
