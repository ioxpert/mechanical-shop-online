import type { Product, TeamMember, ToolMaterial } from '../../types';
// FIX: Import TranslationKey for strong typing.
import type { TranslationKey } from '../localization/LanguageContext';
import { Mirror_Items_Prize, Aluminum_Items_Prize, Glass_Items_Prize } from './prizeList';

// FIX: Add explicit type to ensure nameKey is a valid TranslationKey.
export const NAV_LINKS: { nameKey: TranslationKey; path: string }[] = [
  { nameKey: 'navHome', path: '/' },
  { nameKey: 'navProducts', path: '/products' },
  { nameKey: 'navAbout', path: '/about' },
  { nameKey: 'navContact', path: '/contact' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    nameKey: 'product1Name',
    descriptionKey: 'product1Desc',
    price: Glass_Items_Prize.glass_items.color_etching_glass,
    imageUrl: 'product_img/colored_etched_glass.png',
    category: 'Glass',
  },
  {
    id: '2',
    nameKey: 'product2Name',
    descriptionKey: 'product2Desc',
    price: Aluminum_Items_Prize.items.grey_aluminum_door,
    imageUrl: 'product_img/grey_aluminum_door.png', //https://picsum.photos/seed/frame2/600/400
    category: 'Aluminum',
  },
  {
    id: '3',
    nameKey: 'product3Name',
    descriptionKey: 'product3Desc',
    price: Glass_Items_Prize.thoughen_items.toughen_frame_door,
    imageUrl: 'product_img/thoughen_door-frame.png',  //https://picsum.photos/seed/glass3/600/400
    category: 'Glass',
  },
  {
    id: '4',
    nameKey: 'product4Name',
    descriptionKey: 'product4Desc',
    price: Aluminum_Items_Prize.items.grey_aluminum_casement_window,
    imageUrl: 'product_img/grey_aluminum_window_frame.png',  // https://picsum.photos/seed/door4/600/400
    category: 'Aluminum',
  },
  {
    id: '5',
    nameKey: 'product5Name',
    descriptionKey: 'product5Desc',
    price: Glass_Items_Prize.hd_printing_items.table_top,
    imageUrl: 'product_img/HD_print_glass(table-top).jpg',   //https://picsum.photos/seed/glass5/600/400
    category: 'Glass',
  },
  {
    id: '6',
    nameKey: 'product6Name',
    descriptionKey: 'product6Desc',
    price: Aluminum_Items_Prize.items.white_aluminum_swing_door_frame,
    imageUrl: 'product_img/front_side_door_frame.png',  //https://picsum.photos/seed/wall6/600/400
    category: 'Aluminum',
  },
    {
    id: '7',
    nameKey: 'product7Name',
    descriptionKey: 'product7Desc',
    price: Glass_Items_Prize.glass_items.etched_glass_floral_design,
    imageUrl: 'product_img/flower_etching_full_size_glass.png',  //https://picsum.photos/seed/glass7/600/400
    category: 'Glass',
  },
  {
    id: '8',
    nameKey: 'product8Name',
    descriptionKey: 'product8Desc',
    price: Aluminum_Items_Prize.items.aluminum_grid_window_door_frame,
    imageUrl: 'product_img/aluminum_window_door_frame.png',  //https://picsum.photos/seed/handle8/600/400
    category: 'Aluminum',
  },
  {
    id: '9',
    nameKey: 'product9Name',
    descriptionKey: 'product9Desc',
    price: Mirror_Items_Prize.items.squoval_light,
    imageUrl: 'product_img/squoval_light_mirror.png',  // https://picsum.photos/seed/mirror9/600/400
    category: 'Mirrors',
  },
  {
    id: '10',
    nameKey: 'product10Name',
    descriptionKey: 'product10Desc',
    price: Mirror_Items_Prize.items.stone_embedded,
    imageUrl: 'product_img/jeweled_mirror.png',  //https://picsum.photos/seed/mirror10/600/400
    category: 'Mirrors',
  },
  {
    id: '11',
    nameKey: 'product11Name',
    descriptionKey: 'product11Desc',
    price: Mirror_Items_Prize.items.rectangular_floral,
    imageUrl: 'product_img/rectangular_mirror_with_floral_carvings_border_lines.png',  //https://picsum.photos/seed/mirror11/600/400
    category: 'Mirrors',
  },
  {
    id: '12',
    nameKey: 'product12Name',
    descriptionKey: 'product12Desc',
    price: Mirror_Items_Prize.items.moon_type,
    imageUrl: 'product_img/moon_type_rounded_led_mirror.png',      // https://picsum.photos/seed/railing12/600/400
    category: 'Mirrors',
  },
  {
    id: '13',
    nameKey: 'product13Name',
    descriptionKey: 'product13Desc',
    price: Glass_Items_Prize.glass_items.decorative_etched_frosted_glass,
    imageUrl: 'product_img/diffrent_type_of_etching.png',
    category: 'Glass',
  },
  {
    id: '14',
    nameKey: 'product14Name',
    descriptionKey: 'product14Desc',
    price: Glass_Items_Prize.glass_items.decorative_floral_etching_glass,
    imageUrl: 'product_img/flower_etching_glass.png',  //https://picsum.photos/seed/placeholder14/600/400
    category: 'Glass',
  },
  {
    id: '15',
    nameKey: 'product15Name',
   descriptionKey: 'product15Desc',
    price: Glass_Items_Prize.glass_items.designer_etched_window_glass,
    imageUrl: 'product_img/window_glass.png',  //https://picsum.photos/seed/placeholder15/600/400
    category: 'Glass',
  },
  {
    id: '16',
    nameKey: 'product16Name',
    descriptionKey: 'product16Desc',
    price: Glass_Items_Prize.glass_items.rounded_table_top,
    imageUrl: 'product_img/rounded_table_glass.png',  //https://picsum.photos/seed/placeholder16/600/400
    category: 'Glass',
  },
  {
    id: '17',
    nameKey: 'product17Name',
    descriptionKey: 'product17Desc',
    price: Glass_Items_Prize.glass_items.frosted_glass_panel,
    imageUrl: 'product_img/frosted_glass_pannel_with_leaf_etching.png',
    //https://picsum.photos/seed/placeholder17/600/400
    category: 'Glass',
  },
  {
    id: '18',
    nameKey: 'product18Name',
    descriptionKey: 'product18Desc',
    price: Glass_Items_Prize.hd_printing_items.photo,
    imageUrl: 'product_img/guru_nanak_devji_hd_print.png',  //https://picsum.photos/seed/placeholder18/600/400
    category: 'Glass',
  },
  {
    id: '19',
    nameKey: 'product19Name',
    descriptionKey: 'product19Desc',
    price: Glass_Items_Prize.glass_items.butterfly_flower_etched_glass,
    imageUrl: 'product_img/butterfly_and_flower_etched_glass.png',  //https://picsum.photos/seed/placeholder19/600/400
    category: 'Glass',
  },
  {
    id: '20',
    nameKey: 'product20Name',
    descriptionKey: 'product20Desc',
    price: Mirror_Items_Prize.items.decorative_frosted,
    imageUrl: 'product_img/decorative_frosted_glass_mirror_with_etched_floral_border.png',  //https://picsum.photos/seed/placeholder20/600/400
    category: 'Mirrors',
  },
  {
    id: '21',
    nameKey: 'product21Name',
    descriptionKey: 'product21Desc',
    price: Glass_Items_Prize.glass_items.decorative_frosted_floral_design_glass,
    imageUrl: 'product_img/sunflower_etching_long_pieces.png',  //https://picsum.photos/seed/placeholder21/600/400
    category: 'Glass',
  },
  {
    id: '22',
    nameKey: 'product22Name',
    descriptionKey: 'product22Desc',
    price: Mirror_Items_Prize.items.custom_cut_apple_logo,
    imageUrl: 'product_img/apple_logo_mirror.png',  //https://picsum.photos/seed/placeholder22/600/400
    category: 'Mirrors',
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Baljinder Singh',
    roleKey: 'teamMember1Role',
    bioKey: 'teamMember1Bio',
    imageUrl: 'team\\baljinder singh.jpg',  //https://picsum.photos/seed/team1/400/400
  },
  // {
  //   name: 'Priya Kaur',
  //   roleKey: 'teamMember2Role',
  //   bioKey: 'teamMember2Bio',
  //   imageUrl: 'https://picsum.photos/seed/team2/400/400',
  // },
  {
    name: 'Sukhdeep Singh',
    roleKey: 'teamMember3Role',
    bioKey: 'teamMember3Bio',
    imageUrl: 'team\\sukhdeep singh.jpg',  //https://picsum.photos/seed/team3/400/400
  },
];

export const TOOLS_MATERIALS: ToolMaterial[] = [
  {
    nameKey: 'tool1Name',
    descriptionKey: 'tool1Desc',
    imageUrl: 'workshop_img/aluminum img.png',  //https://picsum.photos/seed/material1/600/400
  },
  {
    nameKey: 'tool2Name',
    descriptionKey: 'tool2Desc',
    imageUrl: 'workshop_img/whiteBlack glass sheets.jpg',  //https://picsum.photos/seed/material2/600/400
  },
  {
    nameKey: 'tool3Name',
    descriptionKey: 'tool3Desc',
    imageUrl: 'workshop_img/tools.png',  //https://picsum.photos/seed/tool1/600/400
  },
];

export const CONTACT_INFO = {
  managers: [
    { name: 'Baljinder Singh', phone: '+91 9610868884' },
    { name: 'Sukhdeep Singh', phone: '+91 9024844997' },
  ],
  whatsapp: '+91 8505019663',
  email: 'sggh0843@gmail.com',
  instagram: {
    handle: '@shri_gurunanak_glass',
    url: 'https://www.instagram.com/shri_gurunanak_glass?igsh=NHoyeTdhbWkxOGww',
  },
  address: 'In front of AAA Car Wash & Accessories, Padampur Gajsinghpur Road, Padampur, Rajasthan 335041',
};

export const DEVELOPER_INFO = {
  name: 'Sukh Ramghria',
  phone: '+91 9166463479',
  email: 'sukh.meet9896@gmail.com',
  website: {
    name: 'IOXPERT',
    url: 'https://ioxpert.com',
  },
};