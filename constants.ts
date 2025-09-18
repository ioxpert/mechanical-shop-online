import type { Product } from './types';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Tempered Glass Panel',
    description: 'High-strength, heat-resistant safety glass for windows, doors, and partitions.',
    price: 150.00,
    imageUrl: 'https://picsum.photos/seed/glass1/600/400',
    category: 'Glass',
  },
  {
    id: '2',
    name: 'Aluminum Window Frame',
    description: 'Durable and lightweight anodized aluminum frame for modern windows.',
    price: 220.50,
    imageUrl: 'https://picsum.photos/seed/frame2/600/400',
    category: 'Aluminum',
  },
  {
    id: '3',
    name: 'Laminated Glass Sheet',
    description: 'Safety glass that holds together when shattered. Ideal for storefronts and skylights.',
    price: 180.75,
    imageUrl: 'https://picsum.photos/seed/glass3/600/400',
    category: 'Glass',
  },
  {
    id: '4',
    name: 'Sliding Glass Door',
    description: 'Elegant and space-saving sliding door with a robust aluminum frame.',
    price: 750.00,
    imageUrl: 'https://picsum.photos/seed/door4/600/400',
    category: 'Aluminum',
  },
  {
    id: '5',
    name: 'Frosted Glass Partition',
    description: 'Provides privacy while allowing light to pass through. Perfect for office spaces.',
    price: 320.00,
    imageUrl: 'https://picsum.photos/seed/glass5/600/400',
    category: 'Glass',
  },
  {
    id: '6',
    name: 'Aluminum Curtain Wall System',
    description: 'A complete facade system for commercial buildings, offering weather resistance and style.',
    price: 1200.00,
    imageUrl: 'https://picsum.photos/seed/wall6/600/400',
    category: 'Aluminum',
  },
    {
    id: '7',
    name: 'Insulated Glass Unit (IGU)',
    description: 'Double or triple-paned glass for superior thermal and acoustic insulation.',
    price: 280.00,
    imageUrl: 'https://picsum.photos/seed/glass7/600/400',
    category: 'Glass',
  },
  {
    id: '8',
    name: 'Aluminum Door Handle',
    description: 'Sleek and ergonomic brushed aluminum handle for interior and exterior doors.',
    price: 45.99,
    imageUrl: 'https://picsum.photos/seed/handle8/600/400',
    category: 'Aluminum',
  },
  {
    id: '9',
    name: 'Frameless Wall Mirror',
    description: 'Modern and minimalist frameless mirror with polished edges. Perfect for any room.',
    price: 125.00,
    imageUrl: 'https://picsum.photos/seed/mirror9/600/400',
    category: 'Mirrors',
  },
  {
    id: '10',
    name: 'LED Bathroom Mirror',
    description: 'Backlit LED mirror with anti-fog function and touch controls. Adds a touch of luxury.',
    price: 299.99,
    imageUrl: 'https://picsum.photos/seed/mirror10/600/400',
    category: 'Mirrors',
  },
  {
    id: '11',
    name: 'Antique Gold Frame Mirror',
    description: 'An elegant, ornate mirror with a vintage gold-finished frame. A statement piece.',
    price: 210.50,
    imageUrl: 'https://picsum.photos/seed/mirror11/600/400',
    category: 'Mirrors',
  },
  {
    id: '12',
    name: 'Aluminum Railing System',
    description: 'Durable and low-maintenance aluminum railings for balconies, decks, and stairs.',
    price: 350.00,
    imageUrl: 'https://picsum.photos/seed/railing12/600/400',
    category: 'Aluminum',
  },
];

export const TEAM_MEMBERS = [
  {
    name: 'Hardeep Singh',
    role: 'Founder & Lead Glazier',
    bio: 'With over 20 years of experience, Hardeep founded the company with a vision for quality and precision. His expertise guides every project.',
    imageUrl: 'https://picsum.photos/seed/team1/400/400',
  },
  {
    name: 'Priya Kaur',
    role: 'Operations Manager',
    bio: 'Priya ensures that every project runs smoothly from initial consultation to final installation, guaranteeing customer satisfaction.',
    imageUrl: 'https://picsum.photos/seed/team2/400/400',
  },
  {
    name: 'Raj Patel',
    role: 'Senior Technician',
    bio: 'Raj specializes in complex aluminum framework and installations, bringing meticulous attention to detail to every job.',
    imageUrl: 'https://picsum.photos/seed/team3/400/400',
  },
];

export const TOOLS_MATERIALS = [
  {
    name: 'High-Grade Aluminum',
    description: 'We use only premium, corrosion-resistant aluminum for durable and long-lasting frames and structures.',
    imageUrl: 'https://picsum.photos/seed/material1/600/400',
  },
  {
    name: 'Safety Tempered Glass',
    description: 'Our tempered glass is heat-treated for increased strength and safety, making it ideal for a wide range of applications.',
    imageUrl: 'https://picsum.photos/seed/material2/600/400',
  },
  {
    name: 'Precision Cutting Tools',
    description: 'State-of-the-art cutting equipment allows us to achieve flawless edges and exact dimensions for a perfect fit every time.',
    imageUrl: 'https://picsum.photos/seed/tool1/600/400',
  },
];

export const CONTACT_INFO = {
  managers: [
    { name: 'Hardeep Singh', phone: '+91 123-456-7890' },
    { name: 'Manager 2', phone: '+91 098-765-4321' },
  ],
  email: 'contact.sgn@gmail.com',
  instagram: {
    handle: '@shri_guru_nanak_glass',
    url: 'https://www.instagram.com/shri_guru_nanak_glass',
  },
  address: '123 Glass & Aluminium Lane, Industrial Area, City, State 12345',
};

export const DEVELOPER_INFO = {
  name: 'Website Developer Name',
  phone: '+1 555-555-5555',
  email: 'developer@example.com',
  website: {
    name: 'developer-portfolio.com',
    url: 'https://developer-portfolio.com',
  },
};