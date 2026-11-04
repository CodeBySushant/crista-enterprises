export const mainNav = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Products', to: '/products', mega: true },
  { label: 'Industries', to: '/industries' },
  { label: 'Contact Us', to: '/contact' },
];

/** Mega menu columns — one per division. */
export const productMenu = [
  {
    id: 'lighting',
    title: 'Crista Lights',
    kicker: 'Division 01',
    description: 'Commercial and industrial LED lighting for roads, sites and facilities.',
    to: '/products/lighting',
    cta: 'Explore lighting',
    image: 'heroNight',
    links: [
      { label: 'LED Street Lights', to: '/products/lighting?category=street', note: '50W – 150W' },
      { label: 'LED Flood Lights', to: '/products/lighting?category=flood', note: '150W – 400W' },
      { label: 'Solar Street Lights', to: '/products/lighting?category=solar', note: 'Off-grid' },
      { label: 'Industrial Lighting', to: '/products/lighting?category=industrial', note: 'High bay' },
    ],
  },
  {
    id: 'gym',
    title: 'Crista Gym Equipment',
    kicker: 'Division 02',
    description: 'Commercial fitness equipment for gyms, hotels and institutions.',
    to: '/products/gym-equipment',
    cta: 'Explore gym equipment',
    image: 'gymFloor',
    links: [
      { label: 'Strength Equipment', to: '/products/gym-equipment?category=strength', note: 'Selectorised & plate' },
      { label: 'Cardio Equipment', to: '/products/gym-equipment?category=cardio', note: 'Treadmills, bikes' },
      { label: 'Weight Training', to: '/products/gym-equipment?category=weights', note: 'Racks, benches' },
      { label: 'Gym Accessories', to: '/products/gym-equipment?category=accessories', note: 'Flooring & more' },
    ],
  },
];

export const footerNav = {
  products: [
    { label: 'Crista Lights', to: '/products/lighting' },
    { label: 'LED Street Lights', to: '/products/lighting?category=street' },
    { label: 'LED Flood Lights', to: '/products/lighting?category=flood' },
    { label: 'Solar Street Lights', to: '/products/lighting?category=solar' },
    { label: 'Crista Gym Equipment', to: '/products/gym-equipment' },
    { label: 'Commercial Gym Equipment', to: '/products/gym-equipment?category=strength' },
  ],
  company: [
    { label: 'About Us', to: '/about' },
    { label: 'Our Products', to: '/products' },
    { label: 'Industries', to: '/industries' },
    { label: 'Contact Us', to: '/contact' },
  ],
  support: [
    { label: 'Request a Quote', quote: true },
    { label: 'Bulk Orders', to: '/contact?type=bulk' },
    { label: 'Become a Dealer', to: '/contact?type=dealer' },
    { label: 'Product Enquiries', to: '/contact?type=product' },
  ],
};
