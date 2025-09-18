import React, { useState } from 'react';
import type { CartItem, Product } from '../types';
import { CONTACT_INFO } from '../constants';

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
  const [isCheckoutView, setIsCheckoutView] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
    location: null as { latitude: number; longitude: number; } | null,
  });
  const [locationStatus, setLocationStatus] = useState<'idle' | 'fetching' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFormValid = customerDetails.name.trim() !== '' && customerDetails.phone.trim() !== '' && customerDetails.address.trim() !== '';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({...prev, [name]: value}));
  };
  
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('error');
      return;
    }
    setLocationStatus('fetching');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCustomerDetails(prev => ({
          ...prev,
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
        }));
        setLocationStatus('success');
      },
      () => {
        setLocationStatus('error');
      }
    );
  };

  const handleFinalSubmit = () => {
    if (!isFormValid || cartItems.length === 0) return;

    const standardItems = cartItems.filter(item => !item.id.startsWith('custom-'));
    const customItems = cartItems.filter(item => item.id.startsWith('custom-'));

    let message = '*New Order from Shri Guru Nanak Glass & Aluminium Website*\n\n';
    
    message += '--- *Customer Details* ---\n';
    message += `*Name:* ${customerDetails.name}\n`;
    message += `*Phone:* ${customerDetails.phone}\n`;
    message += `*Address:* ${customerDetails.address}\n`;
    if (customerDetails.location) {
      const { latitude, longitude } = customerDetails.location;
      message += `*Location:* https://www.google.com/maps?q=${latitude},${longitude}\n`;
    }
    message += '\n';

    message += '--- *Order Items* ---\n';

    if (standardItems.length > 0) {
      standardItems.forEach(item => {
        message += `- ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}\n`;
      });
      message += '\n';
    }

    if (customItems.length > 0) {
      customItems.forEach(item => {
        message += `*${item.name}*\n${item.description}\n\n`;
      });
    }

    message += `--------------------\n`;
    message += `*Subtotal: $${subtotal.toFixed(2)}*\n\n`;
    message += `Please confirm this order.`;
    
    const whatsappNumber = CONTACT_INFO.managers[0].phone.replace(/\D/g, '');
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    // Reset state after submission
    onClearCart();
    setIsCheckoutView(false);
    setCustomerDetails({ name: '', phone: '', address: '', location: null });
    setLocationStatus('idle');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-end" onClick={onClose}>
      <div className="w-full max-w-md h-full bg-white shadow-xl flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold font-serif text-primary">{isCheckoutView ? 'Your Information' : 'Your Cart'}</h2>
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
            {isCheckoutView ? (
              <form>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-primary font-semibold mb-2">Full Name</label>
                    <input type="text" id="name" name="name" required value={customerDetails.name} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-primary font-semibold mb-2">Phone Number</label>
                    <input type="tel" id="phone" name="phone" required value={customerDetails.phone} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-primary font-semibold mb-2">Delivery Address</label>
                    <textarea id="address" name="address" rows={3} required value={customerDetails.address} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"></textarea>
                  </div>
                   <div>
                    <label className="block text-primary font-semibold mb-2">Location (Optional)</label>
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      disabled={locationStatus === 'fetching'}
                      className="w-full p-3 border border-dashed border-secondary text-secondary rounded-md hover:bg-secondary/10 transition-colors disabled:opacity-50 disabled:cursor-wait"
                    >
                      {locationStatus === 'fetching' ? 'Getting Location...' : 'Get Current Location'}
                    </button>
                    {locationStatus === 'success' && customerDetails.location && (
                      <p className="text-green-600 text-sm mt-2">
                        Location captured successfully!
                      </p>
                    )}
                    {locationStatus === 'error' && (
                      <p className="text-red-500 text-sm mt-2">
                        Could not get location. Please check browser permissions or enter address manually.
                      </p>
                    )}
                  </div>
                </div>
              </form>
            ) : (
              <>
                <div className="space-y-6">
                  {cartItems.map(item => {
                    const isCustom = item.id.startsWith('custom-');
                    return (
                      <div key={item.id} className="flex items-start space-x-4">
                        <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                        <div className="flex-grow">
                          <h3 className="font-semibold text-primary">{item.name}</h3>
                          {isCustom ? (
                            <>
                              <p className="text-gray-500 text-sm whitespace-pre-wrap mt-1">{item.description}</p>
                              <p className="text-xs text-secondary italic mt-2">
                                The final price for this custom order will be provided after contacting us, as it depends on the size and specifications you've chosen.
                              </p>
                            </>
                          ) : (
                            <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
                          )}
                           {!isCustom && (
                              <div className="flex items-center mt-2">
                                <button onClick={() => onRemoveFromCart(item.id)} className="px-2 py-1 border rounded-md">-</button>
                                <span className="px-3">{item.quantity}</span>
                                <button onClick={() => onAddToCart(item)} className="px-2 py-1 border rounded-md">+</button>
                              </div>
                           )}
                        </div>
                        {!isCustom && (
                          <p className="font-semibold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
                <button onClick={onClearCart} className="text-sm text-red-500 hover:underline mt-6">
                  Clear Cart
                </button>
              </>
            )}
          </div>
        )}
        
        {cartItems.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            {isCheckoutView ? (
              <div className="flex flex-col space-y-4">
                 <button 
                  onClick={handleFinalSubmit}
                  disabled={!isFormValid}
                  className="w-full bg-primary text-white font-bold py-3 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                  Submit Order
                </button>
                <button 
                  onClick={() => setIsCheckoutView(false)}
                  className="w-full bg-gray-200 text-gray-700 font-bold py-3 rounded-md hover:bg-gray-300 transition-colors">
                  Back to Cart
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-700">Subtotal:</span>
                  <span className="text-xl font-bold text-primary">${subtotal.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => setIsCheckoutView(true)}
                  className="w-full bg-secondary text-primary font-bold py-3 rounded-md hover:opacity-90 transition-opacity">
                  Proceed to Checkout
                </button>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default CartModal;