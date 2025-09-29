import type { Product, TeamMember, ToolMaterial } from './types';
// FIX: Import TranslationKey for strong typing.
import type { TranslationKey } from './localization/LanguageContext';

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
    price: 995.00,
    imageUrl: 'product_img/colored_etched_glass.png',
    category: 'Glass',
  },
  {
    id: '2',
    nameKey: 'product2Name',
    descriptionKey: 'product2Desc',
    price: 11000.00,
    imageUrl: 'product_img/grey_aluminum_door.png', //https://picsum.photos/seed/frame2/600/400
    category: 'Aluminum',
  },
  {
    id: '3',
    nameKey: 'product3Name',
    descriptionKey: 'product3Desc',
    price: 180.75,
    imageUrl: 'product_img/thoughen_door-frame.png',  //https://picsum.photos/seed/glass3/600/400
    category: 'Glass',
  },
  {
    id: '4',
    nameKey: 'product4Name',
    descriptionKey: 'product4Desc',
    price: 750.00,
    imageUrl: 'product_img/grey_aluminum_window_frame.png',  // https://picsum.photos/seed/door4/600/400
    category: 'Aluminum',
  },
  {
    id: '5',
    nameKey: 'product5Name',
    descriptionKey: 'product5Desc',
    price: 320.00,
    imageUrl: 'product_img/HD_print_glass(table-top).jpg',   //https://picsum.photos/seed/glass5/600/400
    category: 'Glass',
  },
  {
    id: '6',
    nameKey: 'product6Name',
    descriptionKey: 'product6Desc',
    price: 1200.00,
    imageUrl: 'product_img/front_side_door_frame.png',  //https://picsum.photos/seed/wall6/600/400
    category: 'Aluminum',
  },
    {
    id: '7',
    nameKey: 'product7Name',
    descriptionKey: 'product7Desc',
    price: 1960.00,
    imageUrl: 'product_img/flower_etching_full_size_glass.png',  //https://picsum.photos/seed/glass7/600/400
    category: 'Glass',
  },
  {
    id: '8',
    nameKey: 'product8Name',
    descriptionKey: 'product8Desc',
    price: 45.99,
    imageUrl: 'product_img/aluminum_window_door_frame.png',  //https://picsum.photos/seed/handle8/600/400
    category: 'Aluminum',
  },
  {
    id: '9',
    nameKey: 'product9Name',
    descriptionKey: 'product9Desc',
    price: 2200.00,
    imageUrl: 'product_img/squoval_light_mirror.png',  // https://picsum.photos/seed/mirror9/600/400
    category: 'Mirrors',
  },
  {
    id: '10',
    nameKey: 'product10Name',
    descriptionKey: 'product10Desc',
    price: 550.00,
    imageUrl: 'product_img/jeweled_mirror.png',  //https://picsum.photos/seed/mirror10/600/400
    category: 'Mirrors',
  },
  {
    id: '11',
    nameKey: 'product11Name',
    descriptionKey: 'product11Desc',
    price: 570.00,
    imageUrl: 'product_img/rectangular_mirror_with_floral_carvings_border_lines.png',  //https://picsum.photos/seed/mirror11/600/400
    category: 'Mirrors',
  },
  {
    id: '12',
    nameKey: 'product12Name',
    descriptionKey: 'product12Desc',
    price: 2500.00,
    imageUrl: 'product_img/moon_type_rounded_led_mirror.png',      // https://picsum.photos/seed/railing12/600/400
    category: 'Mirrors',
  },
  {
    id: '13',
    nameKey: 'product13Name',
    descriptionKey: 'product13Desc',
    price: 4999.99,
    imageUrl: 'product_img/diffrent_type_of_etching.png',
    category: 'Glass',
  },
  {
    id: '14',
    nameKey: 'product14Name',
    descriptionKey: 'product14Desc',
    price: 0.00,
    imageUrl: 'product_img/flower_etching_glass.png',  //https://picsum.photos/seed/placeholder14/600/400
    category: 'Glass',
  },
  {
    id: '15',
    nameKey: 'product15Name',
   descriptionKey: 'product15Desc',
    price: 0.00,
    imageUrl: 'product_img/window_glass.png',  //https://picsum.photos/seed/placeholder15/600/400
    category: 'Glass',
  },
  {
    id: '16',
    nameKey: 'product16Name',
    descriptionKey: 'product16Desc',
    price: 0.00,
    imageUrl: 'product_img/rounded_glass_table.png',  //https://picsum.photos/seed/placeholder16/600/400
    category: 'Glass',
  },
  {
    id: '17',
    nameKey: 'product17Name',
    descriptionKey: 'product17Desc',
    price: 0.00,
    imageUrl: 'product_img/frosted_glass_pannel_with_leaf_etching.png',
    //https://picsum.photos/seed/placeholder17/600/400
    category: 'Glass',
  },
  {
    id: '18',
    nameKey: 'product18Name',
    descriptionKey: 'product18Desc',
    price: 0.00,
    imageUrl: 'product_img/guru_nanak_devji_hd_print.png',  //https://picsum.photos/seed/placeholder18/600/400
    category: 'Glass',
  },
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