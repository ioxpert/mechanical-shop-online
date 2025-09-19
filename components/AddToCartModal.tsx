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
  const [customImageUrl, setCustomImageUrl] = useState<string | undefined>(undefined);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);


  useEffect(() => {
    if (!isOpen) {
      setCustomInfo('');
      setCustomImageUrl(undefined);
      setIsUploading(false);
      setUploadError(null);
      setSelectedFileName(null);
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFileName(null);
      setCustomImageUrl(undefined);
      setUploadError(null);
      return;
    }

    setSelectedFileName(file.name);
    setIsUploading(true);
    setUploadError(null);
    setCustomImageUrl(undefined);

    const formData = new FormData();
    formData.append('image', file);

    try {
      // This assumes a backend endpoint exists at `/api/upload-image`
      // to handle the file upload and return a public URL.
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const result = await response.json();
      if (result.url) {
        setCustomImageUrl(result.url);
      } else {
        throw new Error('Invalid response from server.');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      setUploadError('Failed to upload image. Please try again.');
      setSelectedFileName(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = () => {
    onAddToCart({ 
        ...product, 
        customInfo, 
        customImageUrl,
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
             <div>
              <label htmlFor="image-upload" className="block text-primary font-semibold mb-2">{t('addImageOptional')}</label>
              <input 
                type="file" 
                id="image-upload" 
                name="image-upload" 
                accept="image/*"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-primary hover:file:bg-secondary/20"
                onChange={handleFileChange}
                disabled={isUploading}
              />
              {isUploading && <p className="text-xs text-gray-600 mt-2">Uploading {selectedFileName}...</p>}
              {uploadError && <p className="text-xs text-red-500 mt-2">{uploadError}</p>}
              {customImageUrl && <p className="text-xs text-green-600 mt-2">✅ Image uploaded successfully.</p>}
            </div>
            <p className="text-xs text-gray-500 pt-2">{t('customizationTip')}</p>
          </div>
        </div>
        
        <div className="p-6 border-t bg-gray-50 text-right">
          <button 
            onClick={handleSubmit} 
            disabled={isUploading}
            className="w-full md:w-auto bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? t('uploading') : t('addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
