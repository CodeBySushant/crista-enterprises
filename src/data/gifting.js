/**
 * Corporate gifting catalogue (frontend data source).
 * ------------------------------------------------------------
 * SAMPLE DATA: hamper names, contents and budget bands are illustrative.
 * Final contents and pricing are confirmed per order (quantity, branding,
 * packaging, delivery). Shaped so it can later come from an API.
 */

export const GIFT_COLLECTIONS = [
  { id: 'diwali', name: 'Diwali', note: 'Festive hampers, diyas, sweets & dry fruits' },
  { id: 'new-year', name: 'New Year', note: 'Desk kits, planners & gourmet boxes' },
  { id: 'holi', name: 'Holi', note: 'Herbal colours, sweets & thandai' },
  { id: 'welcome', name: 'Employee Welcome Kits', note: 'Onboarding & milestone kits' },
  { id: 'client', name: 'Client & Partner Gifts', note: 'Premium, executive gifting' },
  { id: 'wellness', name: 'Wellness', note: 'Self-care & healthy snacking' },
];

/** Per-collection colour palettes for the hamper renders. */
export const PALETTES = {
  diwali: { bg: '#f6efe6', primary: '#7a1f2b', secondary: '#c9973f', accent: '#f2c14e', ink: '#3a0f15' },
  'new-year': { bg: '#eef1f5', primary: '#1f2a44', secondary: '#9aa6b8', accent: '#d8dee8', ink: '#121a2c' },
  holi: { bg: '#fbf0f4', primary: '#b8336a', secondary: '#f4b400', accent: '#2bb5a0', ink: '#5a1734' },
  welcome: { bg: '#eef3ef', primary: '#202124', secondary: '#2fc56a', accent: '#d9e6dc', ink: '#17191c' },
  client: { bg: '#f3f1ec', primary: '#1c1a17', secondary: '#b08d57', accent: '#e4d3b0', ink: '#0e0d0b' },
  wellness: { bg: '#eef3ee', primary: '#5d7a5f', secondary: '#c9b48a', accent: '#a9c4a5', ink: '#2c3b2d' },
};

export const BUDGET_BANDS = [
  { id: 'lt1000', label: 'Under ₹1,000', min: 0, max: 999 },
  { id: '1000-2500', label: '₹1,000 – ₹2,500', min: 1000, max: 2500 },
  { id: 'gt2500', label: 'Above ₹2,500', min: 2501, max: Infinity },
];

export const OCCASIONS = ['Diwali', 'New Year', 'Holi', 'Employee onboarding', 'Work anniversary / rewards', 'Client & partner gifting', 'Other festival / event'];

export const RECIPIENT_RANGES = ['10 – 50', '51 – 200', '201 – 500', '500+'];

export const CUSTOMISATION = [
  { title: 'Logo branding', text: 'Your logo on boxes, sleeves, mugs, diaries and other suitable items.' },
  { title: 'Personalised message cards', text: 'A note from leadership or HR, printed on a card in every hamper.' },
  { title: 'Mix-and-match contents', text: 'Swap items to fit your budget, dietary needs or company culture.' },
  { title: 'Bulk & multi-location dispatch', text: 'Delivery to one office or several locations, coordinated on request.' },
];

const h = (p) => ({ ...p, sample: true });

export const hampers = [
  h({
    id: 'diya-dry-fruit-box', name: 'Diya & Dry Fruit Celebration Box', collection: 'diwali', featured: 1,
    budget: [1000, 1500], container: 'box', items: ['jar', 'diya', 'jar', 'candle'],
    contents: ['Premium almonds & cashews', 'Two hand-painted clay diyas', 'Scented festive candle', 'Personalised greeting card'],
    tag: 'Most requested',
  }),
  h({
    id: 'brass-diwali-hamper', name: 'Premium Brass Diwali Hamper', collection: 'diwali', featured: 2,
    budget: [2500, 4000], container: 'tray', items: ['sweetbox', 'diya', 'jar', 'diya'],
    contents: ['Brass diya pair', 'Kaju katli box', 'Assorted dry fruits', 'Decorative brass-finish tray'],
  }),
  h({
    id: 'festive-sweets-basket', name: 'Sweets & Snacks Festive Basket', collection: 'diwali', featured: 4,
    budget: [750, 1200], container: 'basket', items: ['sweetbox', 'pouch', 'choco', 'pouch'],
    contents: ['Assorted mithai box', 'Namkeen & savoury snacks', 'Butter cookies', 'Chocolate bars'],
  }),
  h({
    id: 'eco-diwali-set', name: 'Eco-Friendly Diwali Gift Set', collection: 'diwali',
    budget: [800, 1200], container: 'box', items: ['plant', 'jar', 'candle'],
    contents: ['Plantable seed card', 'Organic honey jar', 'Soy wax candle', 'Recycled kraft packaging'],
  }),
  h({
    id: 'new-year-desk-kit', name: 'New Year Desk Essentials Kit', collection: 'new-year', featured: 3,
    budget: [1200, 1800], container: 'kit', items: ['notebook', 'pen', 'mug', 'bottle'],
    contents: ['Dated 2027 diary', 'Metal pen', 'Ceramic coffee mug', 'Insulated bottle'],
    tag: 'Logo-ready',
  }),
  h({
    id: 'gourmet-new-year', name: 'Gourmet New Year Hamper', collection: 'new-year',
    budget: [1500, 2500], container: 'basket', items: ['tin', 'choco', 'jar', 'pouch'],
    contents: ['Premium coffee tin', 'Belgian-style chocolates', 'Roasted nuts', 'Artisan cookies'],
  }),
  h({
    id: 'holi-colours-pack', name: 'Holi Herbal Colours Pack', collection: 'holi', featured: 6,
    budget: [600, 900], container: 'box', items: ['pouch', 'pouch', 'sweetbox', 'bottle'],
    contents: ['Four herbal gulal packs', 'Gujiya box', 'Thandai mix bottle', 'Festive greeting card'],
  }),
  h({
    id: 'new-joiner-kit', name: 'New Joiner Welcome Kit', collection: 'welcome', featured: 5,
    budget: [1500, 2500], container: 'kit', items: ['bottle', 'notebook', 'mug', 'pen'],
    contents: ['Branded steel bottle', 'Notebook & pen set', 'Coffee mug', 'Welcome card from the team'],
    tag: 'Logo-ready',
  }),
  h({
    id: 'wfh-comfort-kit', name: 'Work-from-Home Comfort Kit', collection: 'welcome',
    budget: [1200, 2000], container: 'kit', items: ['plant', 'mug', 'tin', 'notebook'],
    contents: ['Desk succulent', 'Ceramic mug', 'Specialty coffee', 'Weekly planner'],
  }),
  h({
    id: 'executive-client-hamper', name: 'Executive Client Hamper', collection: 'client', featured: 7,
    budget: [3000, 5000], container: 'box', items: ['notebook', 'pen', 'jar', 'choco'],
    contents: ['Leather-finish diary', 'Premium pen', 'Dry fruit jar', 'Fine chocolates in a wooden box'],
    tag: 'Premium',
  }),
  h({
    id: 'tea-connoisseur', name: 'Tea Connoisseur Collection', collection: 'client',
    budget: [1500, 2500], container: 'tray', items: ['tin', 'tin', 'jar', 'mug'],
    contents: ['Assorted loose-leaf teas', 'Wildflower honey', 'Tea cookies', 'Glass tea cup'],
  }),
  h({
    id: 'wellness-box', name: 'Wellness & Self-Care Box', collection: 'wellness', featured: 8,
    budget: [1200, 2000], container: 'box', items: ['bottle', 'tin', 'pouch', 'candle'],
    contents: ['Bamboo-finish bottle', 'Green tea selection', 'Granola & seed mix', 'Aroma candle'],
  }),
];

export const formatBudget = ([a, b]) => `₹${a.toLocaleString('en-IN')} – ₹${b.toLocaleString('en-IN')}`;
export const collectionName = (id) => GIFT_COLLECTIONS.find((c) => c.id === id)?.name ?? '';
export const getHamper = (id) => hampers.find((x) => x.id === id);
