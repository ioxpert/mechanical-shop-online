
import type { Product } from './types';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About Us', path: '/#about' },
  { name: 'Contact', path: '/#contact' },
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
    category: 'Doors',
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
    category: 'Hardware',
  },
];
