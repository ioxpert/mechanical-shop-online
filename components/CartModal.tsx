import React, { useState, useEffect } from 'react';
import type { CartItem, Product } from '../types';
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

type CheckoutStep = 'cart' | 'form' | 'confirmation';
type CustomImage = { name: string; base64: string; };

const XMarkIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cartItems, onRemoveFromCart, onIncrementQuantity, onClearCart }) => {
  const { t } = useTranslation();
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('cart');
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
    location: null as { latitude: number; longitude: number; } | null,
  });
  const [locationStatus, setLocationStatus] = useState<'idle' | 'fetching' | 'success' | 'error'>('idle');
  const [finalOrderDetails, setFinalOrderDetails] = useState<{ whatsappUrl: string; images: CustomImage[] } | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setCheckoutStep('cart');
        setCustomerDetails({ name: '', phone: '', address: '', location: null });
        setLocationStatus('idle');
        setFinalOrderDetails(null);
      }, 300);
    }
  }, [isOpen]);
  
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => {
    const isCustomized = item.id.startsWith('custom-') || (item.customInfo && item.customInfo.trim() !== '') || item.customImageName;
    if (isCustomized) {
      return sum;
    }
    return sum + item.price * item.quantity;
  }, 0);
  
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

  const handleProceedToForm = () => {
    setCheckoutStep('form');
  };

  const handleFormSubmit = () => {
    if (!isFormValid || cartItems.length === 0) return;

    const orderItems = cartItems.filter(item => !item.id.startsWith('custom-'));
    const customRequests = cartItems.filter(item => item.id.startsWith('custom-'));

    let message = `*${t('whatsappOrderTitle')}*\n\n`;
    
    message += `--- *${t('whatsappCustomerDetails')}* ---\n`;
    message += `*${t('formName')}:* ${customerDetails.name}\n`;
    message += `*${t('formPhone')}:* ${customerDetails.phone}\n`;
    message += `*${t('formAddress')}:* ${customerDetails.address}\n`;
    if (customerDetails.location) {
      const { latitude, longitude } = customerDetails.location;
      message += `*${t('formLocation')}:* https://www.google.com/maps?q=${latitude},${longitude}\n`;
    }
    message += '\n';

    message += `--- *${t('whatsappOrderItems')}* ---\n`;

    if (orderItems.length > 0) {
      orderItems.forEach(item => {
        const isCustomized = (item.customInfo && item.customInfo.trim() !== '') || item.customImageName;
        message += `- ${t(item.nameKey)}`;
        if (!isCustomized) {
          message += ` (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`;
        }
        message += '\n';
        
        if (item.customInfo) {
          message += `  *${t('customizationNotes')}:* ${item.customInfo}\n`;
        }
        if (item.customImageName) {
            message += `  *${t('attachedImage')}:* ${item.customImageName}\n`;
        }
      });
      message += '\n';
    }

    if (customRequests.length > 0) {
      customRequests.forEach(item => {
        message += `*${t(item.nameKey)}*\n${item.description}\n\n`;
      });
    }

    message += `--------------------\n`;
    if (subtotal > 0) {
        message += `*${t('subtotalStandardItems')}: $${subtotal.toFixed(2)}*\n\n`;
    }
    
    const hasCustomizedItems = cartItems.some(
      item => (item.customInfo && item.customInfo.trim() !== '') || item.id.startsWith('custom-') || item.customImageName
    );

    if (hasCustomizedItems) {
      message += `*${t('note')}:* ${t('customPriceNoteWhatsapp')}\n\n`;
    }

    message += t('whatsappOrderConfirmation');
    
    const whatsappNumber = CONTACT_INFO.managers[0].phone.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    const customImages: CustomImage[] = cartItems
        .filter(item => item.customImageName && item.customImageBase64)
        .map(item => ({ name: item.customImageName!, base64: item.customImageBase64! }));

    setFinalOrderDetails({ whatsappUrl, images: customImages });
    setCheckoutStep('confirmation');
  };
  
  const handleFinalClose = () => {
    onClearCart();
    onClose();
  }

  const renderTitle = () => {
    switch (checkoutStep) {
      case 'cart': return t('cartTitle');
      case 'form': return t('formTitle');
      case 'confirmation': return t('confirmationTitle');
      default: return t('cartTitle');
    }
  };

  const locationButtonText = () => {
    switch(locationStatus){
      case 'fetching': return t('locationFetching');
      case 'success': return t('locationSuccess');
      default: return t('locationGet');
    }
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

        {cartItems.length === 0 && checkoutStep !== 'confirmation' ? (
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
                    const hasCustomImage = !!item.customImageName;
                    const isCustomized = isCustomOrderRequest || hasCustomInfo || hasCustomImage;

                    return (
                      <div key={item.id} className="flex items-start space-x-4">
                        <img src={item.imageUrl} alt={t(item.nameKey)} className="w-20 h-20 object-cover rounded-md" />
                        <div className="flex-grow">
                          <h3 className="font-semibold text-primary">{t(item.nameKey)}</h3>

                          {isCustomOrderRequest && (
                            <p className="text-gray-500 text-sm whitespace-pre-wrap mt-1">{item.description}</p>
                          )}
                          
                          {(hasCustomInfo || hasCustomImage) && (
                            <div className="text-sm text-gray-700 mt-2 p-2 bg-accent rounded-md">
                              {hasCustomInfo && (
                                <p><span className="font-semibold">{t('yourNotes')}:</span> {item.customInfo}</p>
                              )}
                              {hasCustomImage && (
                                <p className="mt-1"><span className="font-semibold">{t('attachedImage')}:</span> {item.customImageName}</p>
                              )}
                            </div>
                          )}

                          {isCustomized ? (
                            <p className="text-xs text-secondary italic mt-2">
                              {t('customPriceNote')}
                            </p>
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
                <button onClick={onClearCart} className="text-sm text-red-500 hover:underline mt-6">
                  {t('clearCart')}
                </button>
              </>
            )}
            {checkoutStep === 'form' && (
              <form>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-primary font-semibold mb-2">{t('formName')}</label>
                    <input type="text" id="name" name="name" required value={customerDetails.name} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-primary font-semibold mb-2">{t('formPhone')}</label>
                    <input type="tel" id="phone" name="phone" required value={customerDetails.phone} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-primary font-semibold mb-2">{t('formAddress')}</label>
                    <textarea id="address" name="address" rows={3} required value={customerDetails.address} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"></textarea>
                  </div>
                   <div>
                    <label className="block text-primary font-semibold mb-2">{t('formLocationOptional')}</label>
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      disabled={locationStatus === 'fetching'}
                      className="w-full p-3 border border-dashed border-secondary text-secondary rounded-md hover:bg-secondary/10 transition-colors disabled:opacity-50 disabled:cursor-wait"
                    >
                      {locationButtonText()}
                    </button>
                    {locationStatus === 'success' && customerDetails.location && (
                      <p className="text-green-600 text-sm mt-2">
                        {t('locationSuccessMsg')}
                      </p>
                    )}
                    {locationStatus === 'error' && (
                      <p className="text-red-500 text-sm mt-2">
                        {t('locationErrorMsg')}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            )}
            {checkoutStep === 'confirmation' && finalOrderDetails && (
                <div className="text-center">
                    <h3 className="text-xl font-bold text-primary mb-4">{t('confirmationHeader')}</h3>
                    <p className="text-gray-600 mb-6">{t('confirmationSubheader')}</p>
                    
                    <a 
                        href={finalOrderDetails.whatsappUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full block bg-green-500 text-white font-bold py-3 px-4 rounded-md hover:bg-green-600 transition-colors mb-6 text-center"
                    >
                        {t('confirmationStep1')}
                    </a>

                    {finalOrderDetails.images.length > 0 && (
                        <div className="text-left border-t pt-6">
                            <h4 className="font-bold text-primary mb-2">{t('confirmationStep2')}</h4>
                            <p className="text-sm text-gray-500 mb-4">{t('confirmationStep2Subheader')}</p>
                            <div className="space-y-4">
                                {finalOrderDetails.images.map((image, index) => (
                                    <div key={index} className="flex items-center justify-between bg-accent p-3 rounded-md">
                                        <div className="flex items-center space-x-3">
                                            <img src={image.base64} alt={image.name} className="w-12 h-12 object-cover rounded" />
                                            <span className="text-sm text-primary truncate">{image.name}</span>
                                        </div>
                                        <a 
                                            href={image.base64} 
                                            download={image.name}
                                            className="bg-secondary text-primary font-semibold py-1 px-3 rounded-md text-sm hover:opacity-90"
                                        >
                                            {t('download')}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
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
                <button 
                  onClick={handleProceedToForm}
                  className="w-full bg-secondary text-primary font-bold py-3 rounded-md hover:opacity-90 transition-opacity">
                  {t('proceedToCheckout')}
                </button>
              </>
            )}
            {checkoutStep === 'form' && (
              <div className="flex flex-col space-y-4">
                 <button 
                  onClick={handleFormSubmit}
                  disabled={!isFormValid}
                  className="w-full bg-primary text-white font-bold py-3 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                  {t('submitOrder')}
                </button>
                <button 
                  onClick={() => setCheckoutStep('cart')}
                  className="w-full bg-gray-200 text-gray-700 font-bold py-3 rounded-md hover:bg-gray-300 transition-colors">
                  {t('backToCart')}
                </button>
              </div>
            )}
            {checkoutStep === 'confirmation' && (
                <button
                    onClick={handleFinalClose}
                    className="w-full bg-primary text-white font-bold py-3 rounded-md hover:opacity-90 transition-opacity"
                >
                    {t('done')}
                </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default CartModal;
