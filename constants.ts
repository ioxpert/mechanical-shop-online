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
    price: 150.00,
    imageUrl: 'https://picsum.photos/seed/glass1/600/400',
    category: 'Glass',
  },
  {
    id: '2',
    nameKey: 'product2Name',
    descriptionKey: 'product2Desc',
    price: 220.50,
    imageUrl: 'https://picsum.photos/seed/frame2/600/400',
    category: 'Aluminum',
  },
  {
    id: '3',
    nameKey: 'product3Name',
    descriptionKey: 'product3Desc',
    price: 180.75,
    imageUrl: 'https://picsum.photos/seed/glass3/600/400',
    category: 'Glass',
  },
  {
    id: '4',
    nameKey: 'product4Name',
    descriptionKey: 'product4Desc',
    price: 750.00,
    imageUrl: 'https://picsum.photos/seed/door4/600/400',
    category: 'Aluminum',
  },
  {
    id: '5',
    nameKey: 'product5Name',
    descriptionKey: 'product5Desc',
    price: 320.00,
    imageUrl: 'https://picsum.photos/seed/glass5/600/400',
    category: 'Glass',
  },
  {
    id: '6',
    nameKey: 'product6Name',
    descriptionKey: 'product6Desc',
    price: 1200.00,
    imageUrl: 'https://picsum.photos/seed/wall6/600/400',
    category: 'Aluminum',
  },
    {
    id: '7',
    nameKey: 'product7Name',
    descriptionKey: 'product7Desc',
    price: 280.00,
    imageUrl: 'https://picsum.photos/seed/glass7/600/400',
    category: 'Glass',
  },
  {
    id: '8',
    nameKey: 'product8Name',
    descriptionKey: 'product8Desc',
    price: 45.99,
    imageUrl: 'https://picsum.photos/seed/handle8/600/400',
    category: 'Aluminum',
  },
  {
    id: '9',
    nameKey: 'product9Name',
    descriptionKey: 'product9Desc',
    price: 125.00,
    imageUrl: 'https://picsum.photos/seed/mirror9/600/400',
    category: 'Mirrors',
  },
  {
    id: '10',
    nameKey: 'product10Name',
    descriptionKey: 'product10Desc',
    price: 299.99,
    imageUrl: 'https://picsum.photos/seed/mirror10/600/400',
    category: 'Mirrors',
  },
  {
    id: '11',
    nameKey: 'product11Name',
    descriptionKey: 'product11Desc',
    price: 210.50,
    imageUrl: 'https://picsum.photos/seed/mirror11/600/400',
    category: 'Mirrors',
  },
  {
    id: '12',
    nameKey: 'product12Name',
    descriptionKey: 'product12Desc',
    price: 350.00,
    imageUrl: 'https://picsum.photos/seed/railing12/600/400',
    category: 'Aluminum',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Hardeep Singh',
    roleKey: 'teamMember1Role',
    bioKey: 'teamMember1Bio',
    imageUrl: 'https://picsum.photos/seed/team1/400/400',
  },
  {
    name: 'Priya Kaur',
    roleKey: 'teamMember2Role',
    bioKey: 'teamMember2Bio',
    imageUrl: 'https://picsum.photos/seed/team2/400/400',
  },
  {
    name: 'Raj Patel',
    roleKey: 'teamMember3Role',
    bioKey: 'teamMember3Bio',
    imageUrl: 'https://picsum.photos/seed/team3/400/400',
  },
];

export const TOOLS_MATERIALS: ToolMaterial[] = [
  {
    nameKey: 'tool1Name',
    descriptionKey: 'tool1Desc',
    imageUrl: 'https://picsum.photos/seed/material1/600/400',
  },
  {
    nameKey: 'tool2Name',
    descriptionKey: 'tool2Desc',
    imageUrl: 'https://picsum.photos/seed/material2/600/400',
  },
  {
    nameKey: 'tool3Name',
    descriptionKey: 'tool3Desc',
    imageUrl: 'https://picsum.photos/seed/tool1/600/400',
  },
];

export const CONTACT_INFO = {
  managers: [
    { name: 'Baljinder Singh', phone: '+91 9610868884' },
    { name: 'Sukhdeep Singh', phone: '+91 9024844997' },
  ],
  email: 'contact.sgn@gmail.com',
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
    name: 'developer-portfolio.com',
    url: 'https://developer-portfolio.com',
  },
};