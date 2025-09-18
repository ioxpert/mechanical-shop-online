
import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCartClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCartClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
      <img className="w-full h-56 object-cover" src={product.imageUrl} alt={product.name} />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold font-serif text-primary mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => onAddToCartClick(product)}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
