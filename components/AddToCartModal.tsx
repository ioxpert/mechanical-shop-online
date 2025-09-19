import React, { useState, useEffect } from 'react';
// FIX: Import AddToCartProduct type.
import type { Product, AddToCartProduct } from '../types';
import { useTranslation } from '../localization/useTranslation';

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  // FIX: Use the AddToCartProduct type for the onAddToCart prop.
  onAddToCart: (product: AddToCartProduct) => void;
}

const XMarkIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const AddToCartModal: React.FC<AddToCartModalProps> = ({ isOpen, onClose, product, onAddToCart }) => {
  const { t } = useTranslation();
  const [customInfo, setCustomInfo] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setCustomInfo('');
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleSubmit = () => {
    onAddToCart({ 
        ...product, 
        customInfo, 
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="add-to-cart-title">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-xl flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b">
          <h2 id="add-to-cart-title" className="text-2xl font-bold font-serif text-primary">{t('customizeItemTitle')}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-primary" aria-label={t('close')}>
            <XMarkIcon />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6">
          <div className="flex items-center space-x-4 mb-6">
            <img src={product.imageUrl} alt={t(product.nameKey)} className="w-24 h-24 object-cover rounded-md" />
            <div>
              <h3 className="text-xl font-bold text-primary">{t(product.nameKey)}</h3>
              <p className="text-lg font-semibold text-secondary">${product.price.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="customInfo" className="block text-primary font-semibold mb-2">{t('customizationNotesOptional')}</label>
              <textarea 
                id="customInfo" 
                name="customInfo" 
                rows={4} 
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" 
                placeholder={t('customizationPlaceholder')}
                value={customInfo}
                onChange={(e) => setCustomInfo(e.target.value)}
              ></textarea>
            </div>
            <p className="text-xs text-gray-500 pt-2">{t('customizationTip')}</p>
          </div>
        </div>
        
        <div className="p-6 border-t bg-gray-50 text-right">
          <button 
            onClick={handleSubmit} 
            className="w-full md:w-auto bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-all duration-300"
          >
            {t('addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;