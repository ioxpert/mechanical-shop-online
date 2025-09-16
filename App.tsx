
import React, { useState, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import type { CartItem, Product } from './types';
import { PRODUCTS } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => {
      return prevItems.reduce((acc, item) => {
        if (item.id === productId) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [] as CartItem[]);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-light text-primary">
      <Header cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage onAddToCart={addToCart} />} />
          <Route path="/products" element={<ProductsPage products={PRODUCTS} onAddToCart={addToCart} />} />
        </Routes>
      </main>
      <Footer />
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveFromCart={removeFromCart}
        onAddToCart={addToCart}
        onClearCart={clearCart}
      />
    </div>
  );
};

export default App;
