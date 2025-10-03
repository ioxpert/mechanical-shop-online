import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
// FIX: Import AddToCartProduct type.
import type { Product, AddToCartProduct } from "../../types";
import { useTranslation } from "../localization/useTranslation";

interface CustomOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string | null;
  // FIX: Use the AddToCartProduct type for the onAddToCart prop.
  onAddToCart: (product: AddToCartProduct) => void;
}

const XMarkIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const CustomOrderModal: React.FC<CustomOrderModalProps> = ({
  isOpen,
  onClose,
  category,
  onAddToCart,
}) => {
  const { t } = useTranslation();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ dimensions: "", details: "" });

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setIsSubmitted(false);
      setFormData({ dimensions: "", details: "" });
    }
  }, [isOpen]);

  if (!isOpen || !category) return null;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const description = `${t("formDimensions")}: ${formData.dimensions}\n${t(
      "formDetails"
    )}: ${formData.details}`;

    const customProduct = {
      id: `custom-${category.replace(/\s/g, "")}-${Date.now()}`,
      nameKey: "customOrderRequest" as const,
      descriptionKey: "customOrderRequest" as const,
      description,
      price: 0,
      imageUrl: "https://picsum.photos/seed/custom/400/400",
      category: category,
    };

    onAddToCart(customProduct);
    setIsSubmitted(true);
  };

  const categoryName = category;
  const title = t("customOrderFor", { category: categoryName });
  const detailsPlaceholder = t("customOrderPlaceholder", {
    category: categoryName.toLowerCase(),
  });

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="custom-order-title">
      <div
        className="w-full max-w-2xl bg-white rounded-lg shadow-xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b">
          <h2
            id="custom-order-title"
            className="text-2xl font-bold font-serif text-primary">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-primary"
            aria-label={t("close")}>
            <XMarkIcon />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6">
          {isSubmitted ? (
            <div className="text-center py-10">
              <h3 className="text-2xl font-bold text-primary mb-4">
                {t("thankYou")}
              </h3>
              <p className="text-gray-700">{t("customOrderSubmitted")}</p>
              <button
                onClick={onClose}
                className="mt-6 bg-secondary text-primary font-bold py-2 px-8 rounded-md hover:opacity-90 transition-all duration-300">
                {t("close")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="dimensions"
                  className="block text-primary font-semibold mb-2">
                  {t("formDimensions")}
                </label>
                <input
                  type="text"
                  id="dimensions"
                  name="dimensions"
                  placeholder={t("formDimensionsPlaceholder")}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                  value={formData.dimensions}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-6">
                <label
                  htmlFor="details"
                  className="block text-primary font-semibold mb-2">
                  {t("formDetails")}
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={5}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder={detailsPlaceholder}
                  value={formData.details}
                  onChange={handleInputChange}></textarea>
              </div>
              <div className="mt-8 text-right">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-all duration-300">
                  {t("submitRequest")}
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
