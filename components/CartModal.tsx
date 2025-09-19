import React, { useState, useEffect, useMemo } from 'react';
import type { CartItem } from '../types';
import { CONTACT_INFO } from '../constants';
import { useTranslation } from '../localization/useTranslation';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveFromCart: (productId: string) => void;
  onIncrementQuantity: (itemId: string) => void;
  onClearCart: () => void;
}

type CheckoutStep = 'cart' | 'form';

const XMarkIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cartItems, onRemoveFromCart, onIncrementQuantity, onClearCart }) => {
  const { t } = useTranslation();
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('cart');
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.trim());
  };

  const isPhoneValid = useMemo(() => validatePhoneNumber(customerInfo.phone), [customerInfo.phone]);

  const isFormValid = customerInfo.name.trim() !== '' && isPhoneValid && customerInfo.address.trim() !== '' && location !== null;

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setCheckoutStep('cart');
        setCustomerInfo({ name: '', phone: '', address: '' });
        setLocation(null);
        setIsSubmitting(false);
        setPhoneError('');
      }, 300);
    }
  }, [isOpen]);
  
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => {
    const isCustomized = item.id.startsWith('custom-') || (item.customInfo && item.customInfo.trim() !== '');
    if (isCustomized) {
      return sum;
    }
    return sum + item.price * item.quantity;
  }, 0);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
    if (name === 'phone' && phoneError) {
      setPhoneError('');
    }
  };

  const handlePhoneBlur = () => {
    if (customerInfo.phone.trim() !== '' && !isPhoneValid) {
      setPhoneError(t('invalidWhatsappNumber'));
    } else {
      setPhoneError('');
    }
  };

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      setIsFetchingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setIsFetchingLocation(false);
        },
        (error) => {
          console.error("Error getting location", error);
          alert("Could not fetch location.");
          setIsFetchingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleFinalSubmit = async () => {
    if (!isFormValid) {
        handlePhoneBlur();
        return;
    };
    setIsSubmitting(true);

    let message = `*${t('whatsappOrderTitle')}*\n\n`;
    message += `--- *${t('customerInfo')}* ---\n`;
    message += `*${t('formNameLabel')}:* ${customerInfo.name}\n`;
    message += `*${t('formPhoneLabel')}:* ${customerInfo.phone}\n`;
    message += `*${t('formAddressLabel')}:* ${customerInfo.address}\n`;
    if (location) {
      message += `*${t('formLocationLabel')}:* https://www.google.com/maps?q=${location.lat},${location.lon}\n`;
    }
    message += '\n';
    
    message += `--- *${t('whatsappOrderItems')}* ---\n`;
    cartItems.forEach(item => {
        if (!item.id.startsWith('custom-') && item.imageUrl) {
            message += `${item.imageUrl}\n`;
        }

        const isCustomized = item.customInfo || item.id.startsWith('custom-');
        message += `- ${t(item.nameKey)}`;
        if (!isCustomized) {
            message += ` (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`;
        }
        if (item.id.startsWith('custom-') && item.description) {
            message += `\n${item.description}`;
        }
        if (item.customInfo) message += `\n  *${t('customizationNotes')}:* ${item.customInfo}`;
        message += `\n\n`;
    });
    message += `--------------------\n`;
    if (subtotal > 0) message += `*${t('subtotalStandardItems')}: $${subtotal.toFixed(2)}*\n\n`;
    const hasCustomizedItems = cartItems.some(item => (item.customInfo && item.customInfo.trim() !== '') || item.id.startsWith('custom-'));
    if (hasCustomizedItems) {
      message += `*${t('note')}:* ${t('customPriceNoteWhatsapp')}\n`;
      message += `*${t('whatsappCustomOrderPrompt')}*\n\n`;
    }
    message += t('whatsappOrderConfirmation');

    const whatsappNumber = CONTACT_INFO.managers[0].phone.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onClearCart();
    onClose();
    setIsSubmitting(false);
  };

  const renderTitle = () => {
    switch (checkoutStep) {
      case 'cart': return t('cartTitle');
      case 'form': return t('formTitle');
      default: return t('cartTitle');
    }
  };

  const proceedButtonContent = () => {
    if (isSubmitting) {
      return (
        <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {t('submitOrderButton')}...
        </div>
      );
    }
    return t('submitOrderButton');
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-end" onClick={onClose}>
      <div className="w-full max-w-md h-full bg-white shadow-xl flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold font-serif text-primary">{renderTitle()}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-primary">
            <XMarkIcon />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-gray-500">{t('cartEmpty')}</p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto p-6">
            {checkoutStep === 'cart' && (
              <>
                <div className="space-y-6">
                  {cartItems.map(item => {
                    const isCustomOrderRequest = item.id.startsWith('custom-');
                    const hasCustomInfo = item.customInfo && item.customInfo.trim() !== '';
                    const isCustomized = isCustomOrderRequest || hasCustomInfo;

                    return (
                      <div key={item.id} className="flex items-start space-x-4">
                        <img src={item.imageUrl} alt={t(item.nameKey)} className="w-20 h-20 object-cover rounded-md" />
                        <div className="flex-grow">
                          <h3 className="font-semibold text-primary">{t(item.nameKey)}</h3>
                          {isCustomOrderRequest && <p className="text-gray-500 text-sm whitespace-pre-wrap mt-1">{item.description}</p>}
                          {hasCustomInfo && (
                            <div className="text-sm text-gray-700 mt-2 p-2 bg-accent rounded-md">
                              {hasCustomInfo && <p><span className="font-semibold">{t('yourNotes')}:</span> {item.customInfo}</p>}
                            </div>
                          )}
                          {isCustomized ? (
                            <p className="text-xs text-secondary italic mt-2">{t('customPriceNote')}</p>
                          ) : (
                            <>
                              <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
                              <div className="flex items-center mt-2">
                                <button onClick={() => onRemoveFromCart(item.id)} className="px-2 py-1 border rounded-md">-</button>
                                <span className="px-3">{item.quantity}</span>
                                <button onClick={() => onIncrementQuantity(item.id)} className="px-2 py-1 border rounded-md">+</button>
                              </div>
                            </>
                          )}
                        </div>
                        {!isCustomized && (
                          <p className="font-semibold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
                <button onClick={onClearCart} className="text-sm text-red-500 hover:underline mt-6">{t('clearCart')}</button>
              </>
            )}
             {checkoutStep === 'form' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-primary font-semibold mb-2">{t('formNameLabel')} <span className="text-red-500">{t('fieldRequired')}</span></label>
                  <input type="text" id="name" name="name" value={customerInfo.name} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-primary font-semibold mb-2">{t('formPhoneLabel')} <span className="text-red-500">{t('fieldRequired')}</span></label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={customerInfo.phone} 
                    onChange={handleInputChange} 
                    onBlur={handlePhoneBlur}
                    required 
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${phoneError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-secondary'}`}
                    />
                    {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
                </div>
                <div>
                  <label htmlFor="address" className="block text-primary font-semibold mb-2">{t('formAddressLabel')} <span className="text-red-500">{t('fieldRequired')}</span></label>
                  <input type="text" id="address" name="address" value={customerInfo.address} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" />
                </div>
                <div>
                    <label className="block text-primary font-semibold mb-2">{t('formLocationLabel')} <span className="text-red-500">{t('fieldRequired')}</span></label>
                    <button onClick={handleLocationRequest} disabled={isFetchingLocation} className="w-full p-3 border border-dashed border-secondary text-secondary rounded-md hover:bg-secondary/10 transition-colors disabled:opacity-50">
                        {isFetchingLocation ? t('fetchingLocation') : t('getLocationButton')}
                    </button>
                    {location && <p className="text-xs text-green-600 mt-2">Location captured successfully!</p>}
                </div>
              </div>
            )}
          </div>
        )}
        
        {cartItems.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            {checkoutStep === 'cart' && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-700">{t('subtotal')}:</span>
                  <span className="text-xl font-bold text-primary">${subtotal.toFixed(2)}</span>
                </div>
                <button onClick={() => setCheckoutStep('form')} className="w-full bg-secondary text-primary font-bold py-3 rounded-md hover:opacity-90 transition-opacity flex justify-center items-center h-12">
                  {t('proceedToCheckout')}
                </button>
              </>
            )}
            {checkoutStep === 'form' && (
              <button onClick={handleFinalSubmit} disabled={!isFormValid || isSubmitting} className="w-full bg-secondary text-primary font-bold py-3 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center h-12">
                {proceedButtonContent()}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default CartModal;