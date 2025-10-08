// FIX: Import TranslationKey for strong typing of translation keys.
import type { TranslationKey } from './src/localization/LanguageContext';

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
  description?: string;
};


// Mirror Prize
export interface MirrorItemsPrize {
  mirror: {
    three: number;
    five: number;
    design: number;
    granding: number;
    drilling: number;
  };
  items: {
    squoval_light: number;
    stone_embedded: number;
    rectangular_floral: number;
    moon_type: number;
    decorative_frosted: number;
    custom_cut_apple_logo: number;
  };
};

// Aluminum Prize 

export interface AluminumItemsPrize {
  aluminum: {
    without_color_kg: number;
    with_color_kg: number;
    special_type_kg: number;
    without_color_sqft: number;
    with_color_sqft: number;
    special_type_sqft: number;
  },
  items: {
    grey_aluminum_door: number;
    grey_aluminum_casement_window: number;
    white_aluminum_swing_door_frame: number;
    aluminum_grid_window_door_frame: number;

  }
}

export interface GlassItemsPrize {

  glass: {
    five_white: number;
    five_black: number;
    eight_white: number;
    eight_black: number;
    ten_white: number;
    twelve_white: number;
    desgin_light: number;
    desgin_heavy: string;
    colored: string;
    granding: number;
    drilling: number;
  },

  glass_items: {
     color_etching_glass: number;
     etched_glass_floral_design: number;
     decorative_etched_frosted_glass: number;
     decorative_floral_etching_glass: number;
     designer_etched_window_glass: number;
     rounded_table_top: number;
     frosted_glass_panel: number;
     butterfly_flower_etched_glass: number;
     decorative_frosted_floral_design_glass: number;
     
  },

  thoughened:{
    twelve:number;
    ten: number;
    eight: number;
    five: number;
  },

  thoughen_items: {
    toughen_frame_door: number;
  },

  hd_printing: number;

  hd_printing_items: {
  table_top: number;
  photo: number;
  },
}