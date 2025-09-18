import React, { useState, useEffect } from 'react';
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

type CheckoutStep = 'cart' | 'confirmation';
type CustomImage = { name: string; base64: string; };

const XMarkIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Helper to convert a data URL to a File object
const dataURLtoFile = (dataurl: string, filename: string): File | null => {
  const arr = dataurl.split(',');
  if (arr.length < 2) return null;
  const match = arr[0].match(/:(.*?);/);
  if (!match) return null;
  const mime = match[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};


const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cartItems, onRemoveFromCart, onIncrementQuantity, onClearCart }) => {
  const { t } = useTranslation();
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('cart');
  const [finalOrderDetails, setFinalOrderDetails] = useState<{ whatsappUrl: string; images: CustomImage[] } | null>(null);
  const [isPreparingOrder, setIsPreparingOrder] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setCheckoutStep('cart');
        setFinalOrderDetails(null);
        setIsPreparingOrder(false);
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
  
  const handleProceedToCheckout = async () => {
    if (cartItems.length === 0) return;
    setIsPreparingOrder(true);

    const orderItems = cartItems.filter(item => !item.id.startsWith('custom-'));
    const customRequests = cartItems.filter(item => item.id.startsWith('custom-'));

    let message = `*${t('whatsappOrderTitle')}*\n\n`;
    
    message += `--- *${t('whatsappOrderItems')}* ---\n`;

    if (orderItems.length > 0) {
      orderItems.forEach(item => {
        const isCustomized = (item.customInfo && item.customInfo.trim() !== '') || item.customImageName;
        message += `- ${t(item.nameKey)}`;
        if (!isCustomized) {
          message += ` (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`;
        }
        message += '\n';
        message += `  *${t('itemImage')}:* ${item.imageUrl}\n`;
        
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

    // Attempt to use Web Share API for custom images
    const customImageFiles: File[] = cartItems
      .map(item => item.customImageBase64 && item.customImageName ? dataURLtoFile(item.customImageBase64, item.customImageName) : null)
      .filter((file): file is File => file !== null);

    if (navigator.share && customImageFiles.length > 0 && navigator.canShare && navigator.canShare({ files: customImageFiles })) {
      try {
        await navigator.share({
          title: t('whatsappOrderTitle'),
          text: message,
          files: customImageFiles,
        });
        onClearCart();
        onClose();
        setIsPreparingOrder(false);
        return;
      } catch (err) {
        console.error('User cancelled share or error:', err);
      }
    }
    
    // Fallback logic
    const whatsappNumber = CONTACT_INFO.managers[0].phone.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    const customImagesForDownload: CustomImage[] = cartItems
        .filter(item => item.customImageName && item.customImageBase64)
        .map(item => ({ name: item.customImageName!, base64: item.customImageBase64! }));

    if (customImagesForDownload.length > 0) {
        setFinalOrderDetails({ whatsappUrl, images: customImagesForDownload });
        setCheckoutStep('confirmation');
    } else {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        onClearCart();
        onClose();
    }
    setIsPreparingOrder(false);
  };
  
  const handleFinalClose = () => {
    onClearCart();
    onClose();
  }

  const renderTitle = () => {
    switch (checkoutStep) {
      case 'cart': return t('cartTitle');
      case 'confirmation': return t('confirmationTitle');
      default: return t('cartTitle');
    }
  };

  const proceedButtonContent = () => {
      if (isPreparingOrder) {
          return (
            <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('proceedToCheckout')}...
            </div>
          );
      }
      return t('proceedToCheckout');
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
                  onClick={handleProceedToCheckout}
                  disabled={isPreparingOrder}
                  className="w-full bg-secondary text-primary font-bold py-3 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center h-12"
                >
                  {proceedButtonContent()}
                </button>
              </>
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