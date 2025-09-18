import React, { useState, FormEvent, ChangeEvent } from 'react';
import type { Product } from '../types';

interface CustomOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string | null;
  onAddToCart: (product: Product) => void;
}

const XMarkIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CustomOrderModal: React.FC<CustomOrderModalProps> = ({ isOpen, onClose, category, onAddToCart }) => {
  if (!isOpen || !category) return null;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    dimensions: '',
    details: '',
    fileName: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData(prev => ({...prev, fileName: file ? file.name : '' }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const customProduct: Product = {
      id: `custom-${category.replace(/\s/g, '')}-${Date.now()}`,
      name: `Custom ${category} Request`,
      description: `Customer: ${formData.name} (WhatsApp: ${formData.whatsapp})\nDimensions: ${formData.dimensions}\nDetails: ${formData.details}${formData.fileName ? `\nAttachment: ${formData.fileName}` : ''}`,
      price: 0,
      imageUrl: 'https://picsum.photos/seed/custom/400/400',
      category: category,
    };
    
    onAddToCart(customProduct);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="custom-order-title">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b">
          <h2 id="custom-order-title" className="text-2xl font-bold font-serif text-primary">Custom Order for {category}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-primary" aria-label="Close custom order form">
            <XMarkIcon />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6">
          {isSubmitted ? (
            <div className="text-center py-10">
              <h3 className="text-2xl font-bold text-primary mb-4">Thank You!</h3>
              <p className="text-gray-700">Your custom order request has been added to your cart. Please proceed to checkout to submit it.</p>
              <button
                onClick={onClose}
                className="mt-6 bg-secondary text-primary font-bold py-2 px-8 rounded-md hover:opacity-90 transition-all duration-300"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-primary font-semibold mb-2">Your Name</label>
                  <input type="text" id="name" name="name" required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" value={formData.name} onChange={handleInputChange} />
                </div>
                <div>
                  <label htmlFor="whatsapp" className="block text-primary font-semibold mb-2">Your WhatsApp Number</label>
                  <input type="tel" id="whatsapp" name="whatsapp" required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" value={formData.whatsapp} onChange={handleInputChange} />
                </div>
                <div>
                  <label htmlFor="dimensions" className="block text-primary font-semibold mb-2">Dimensions (e.g., W x H)</label>
                  <input type="text" id="dimensions" name="dimensions" placeholder="e.g., 24in x 36in" required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" value={formData.dimensions} onChange={handleInputChange}/>
                </div>
                <div>
                  <label htmlFor="file-upload" className="block text-primary font-semibold mb-2">Upload Design (Optional)</label>
                  <input type="file" id="file-upload" name="file-upload" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-primary hover:file:bg-secondary/20" onChange={handleFileChange} />
                </div>
              </div>
              <div className="mt-6">
                <label htmlFor="details" className="block text-primary font-semibold mb-2">Design Details & Requirements</label>
                <textarea id="details" name="details" rows={5} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" placeholder={`Please describe the custom ${category.toLowerCase().slice(0, -1)} you need...`} value={formData.details} onChange={handleInputChange}></textarea>
              </div>
              <div className="mt-8 text-right">
                <button type="submit" className="w-full md:w-auto bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-all duration-300">
                  Submit Request
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