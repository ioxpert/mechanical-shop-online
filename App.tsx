import React, { useState, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
// FIX: Import AddToCartProduct type.
import type { CartItem, Product, AddToCartProduct } from './types';
import { PRODUCTS } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import { LanguageProvider } from './localization/LanguageContext';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // FIX: Use the AddToCartProduct type for the product parameter.
  const addToCart = (product: AddToCartProduct) => {
    setCartItems(prevItems => {
      const hasCustomization = (product.customInfo && product.customInfo.trim() !== '') || product.customImageUrl || product.description;
      
      if (hasCustomization) {
        const newItem: CartItem = {
          ...product,
          id: `${product.id}-${Date.now()}`, // Create a unique ID for the customized item
          quantity: 1,
        };
        return [...prevItems, newItem];
      }

      // If there is no custom info, check if a standard version of the item already exists.
      const existingItem = prevItems.find(item => item.id === product.id && (!item.customInfo || item.customInfo.trim() === '') && !item.customImageUrl);
      
      if (existingItem) {
        // If it exists, just increment the quantity.
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      
      // Otherwise, add the new standard item to the cart.
      return [...prevItems, { ...product, quantity: 1, customInfo: '', customImageUrl: undefined }];
    });
  };

  const incrementQuantity = (itemId: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
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
    <LanguageProvider>
      <div className="flex flex-col min-h-screen bg-light text-primary">
        <Header cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage onAddToCart={addToCart} />} />
            <Route path="/products" element={<ProductsPage products={PRODUCTS} onAddToCart={addToCart} />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onRemoveFromCart={removeFromCart}
          onIncrementQuantity={incrementQuantity}
          onClearCart={clearCart}
        />
      </div>
    </LanguageProvider>
  );
};

export default App;
