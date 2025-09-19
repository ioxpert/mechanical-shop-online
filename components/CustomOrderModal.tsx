import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
// FIX: Import AddToCartProduct type.
import type { Product, AddToCartProduct } from '../types';
import { useTranslation } from '../localization/useTranslation';

interface CustomOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string | null;
  // FIX: Use the AddToCartProduct type for the onAddToCart prop.
  onAddToCart: (product: AddToCartProduct) => void;
}

const XMarkIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CustomOrderModal: React.FC<CustomOrderModalProps> = ({ isOpen, onClose, category, onAddToCart }) => {
  const { t } = useTranslation();
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ dimensions: '', details: '' });
  const [customImageUrl, setCustomImageUrl] = useState<string | undefined>(undefined);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setIsSubmitted(false);
      setFormData({ dimensions: '', details: '' });
      setCustomImageUrl(undefined);
      setIsUploading(false);
      setUploadError(null);
      setSelectedFileName(null);
    }
  }, [isOpen]);

  if (!isOpen || !category) return null;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
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
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');
      const result = await response.json();

      if (result.url) {
        setCustomImageUrl(result.url);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error(error);
      setUploadError('Image upload failed. Please try again.');
      setSelectedFileName(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    let description = `${t('formDimensions')}: ${formData.dimensions}\n${t('formDetails')}: ${formData.details}`;
    if (customImageUrl) {
        description += `\n${t('attachedImage')}: Image uploaded`;
    }

    const customProduct = {
      id: `custom-${category.replace(/\s/g, '')}-${Date.now()}`,
      nameKey: 'customOrderRequest' as const, 
      descriptionKey: 'customOrderRequest' as const,
      description,
      price: 0,
      imageUrl: customImageUrl || 'https://picsum.photos/seed/custom/400/400',
      category: category,
      customImageUrl: customImageUrl,
    };
    
    onAddToCart(customProduct);
    setIsSubmitted(true);
  };
  
  const categoryName = category;
  const title = t('customOrderFor', { category: categoryName });
  const detailsPlaceholder = t('customOrderPlaceholder', { category: categoryName.toLowerCase() });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="custom-order-title">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b">
          <h2 id="custom-order-title" className="text-2xl font-bold font-serif text-primary">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-primary" aria-label={t('close')}>
            <XMarkIcon />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6">
          {isSubmitted ? (
            <div className="text-center py-10">
              <h3 className="text-2xl font-bold text-primary mb-4">{t('thankYou')}</h3>
              <p className="text-gray-700">{t('customOrderSubmitted')}</p>
              <button
                onClick={onClose}
                className="mt-6 bg-secondary text-primary font-bold py-2 px-8 rounded-md hover:opacity-90 transition-all duration-300"
              >
                {t('close')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="dimensions" className="block text-primary font-semibold mb-2">{t('formDimensions')}</label>
                  <input type="text" id="dimensions" name="dimensions" placeholder={t('formDimensionsPlaceholder')} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" value={formData.dimensions} onChange={handleInputChange}/>
                </div>
                <div>
                  <label htmlFor="file-upload" className="block text-primary font-semibold mb-2">{t('formUpload')}</label>
                  <input type="file" id="file-upload" name="file-upload" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-primary hover:file:bg-secondary/20" onChange={handleFileChange} disabled={isUploading} />
                  {isUploading && <p className="text-xs text-gray-600 mt-2">Uploading {selectedFileName}...</p>}
                  {uploadError && <p className="text-xs text-red-500 mt-2">{uploadError}</p>}
                  {customImageUrl && <p className="text-xs text-green-600 mt-2">✅ Image uploaded successfully.</p>}
                </div>
              </div>
              <div className="mt-6">
                <label htmlFor="details" className="block text-primary font-semibold mb-2">{t('formDetails')}</label>
                <textarea id="details" name="details" rows={5} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" placeholder={detailsPlaceholder} value={formData.details} onChange={handleInputChange}></textarea>
              </div>
              <div className="mt-8 text-right">
                <button type="submit" className="w-full md:w-auto bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isUploading}>
                  {isUploading ? t('uploading') : t('submitRequest')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomOrderModal;
