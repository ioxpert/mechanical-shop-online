// FIX: Import TranslationKey for strong typing of translation keys.
import type { TranslationKey } from './localization/LanguageContext';

export interface Product {
  id: string;
  // FIX: Use TranslationKey type for type safety.
  nameKey: TranslationKey;
  // FIX: Use TranslationKey type for type safety.
  descriptionKey: TranslationKey;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
  customInfo?: string;
  customImageName?: string;
  customImageBase64?: string;
  // FIX: Add optional description for custom order text.
  description?: string;
}

export interface TeamMember {
  name: string; // Name might not need translation, kept as string
  // FIX: Use TranslationKey type for type safety.
  roleKey: TranslationKey;
  // FIX: Use TranslationKey type for type safety.
  bioKey: TranslationKey;
  imageUrl: string;
}

export interface ToolMaterial {
  // FIX: Use TranslationKey type for type safety.
  nameKey: TranslationKey;
  // FIX: Use TranslationKey type for type safety.
  descriptionKey: TranslationKey;
  imageUrl: string;
}

// FIX: Add a reusable type for the product object passed to onAddToCart.
export type AddToCartProduct = Product & {
  customInfo?: string;
  customImageName?: string;
  customImageBase64?: string;
  description?: string;
};
