
import React from 'react';
import type { CartItem, Product } from '../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveFromCart: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onClearCart: () => void;
}

const XMarkIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cartItems, onRemoveFromCart, onAddToCart, onClearCart }) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-end" onClick={onClose}>
      <div className="w-full max-w-md h-full bg-white shadow-xl flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold font-serif text-primary">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-primary">
            <XMarkIcon />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-gray-500">Your cart is empty.</p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto p-6">
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-primary">{item.name}</h3>
                    <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button onClick={() => onRemoveFromCart(item.id)} className="px-2 py-1 border rounded-md">-</button>
                      <span className="px-3">{item.quantity}</span>
                      <button onClick={() => onAddToCart(item)} className="px-2 py-1 border rounded-md">+</button>
                    </div>
                  </div>
                  <p className="font-semibold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            {cartItems.length > 0 && 
              <button onClick={onClearCart} className="text-sm text-red-500 hover:underline mt-6">
                Clear Cart
              </button>
            }
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-700">Subtotal:</span>
              <span className="text-xl font-bold text-primary">${subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-secondary text-primary font-bold py-3 rounded-md hover:opacity-90 transition-opacity">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
