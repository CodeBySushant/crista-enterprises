/**
 * Company details. Contact values are deliberately PLACEHOLDERS —
 * replace with official details before launch. `placeholder: true`
 * lets the UI mark them visually.
 */
export const site = {
  name: 'Crista Enterprises',
  tagline: 'Ideas into impact.',
  description:
    'Crista Enterprises supplies commercial and industrial LED lighting and commercial gym equipment to contractors, institutions, facilities and dealers.',
  contact: {
    email: { value: 'sales@[your-domain]', placeholder: true },
    phone: { value: '+91 [business phone]', placeholder: true },
    address: { value: '[Registered business address]', placeholder: true },
    hours: { value: 'Mon – Sat, business hours', placeholder: true },
  },
  social: [
    { id: 'linkedin', label: 'LinkedIn', href: '#' },
    { id: 'instagram', label: 'Instagram', href: '#' },
    { id: 'facebook', label: 'Facebook', href: '#' },
    { id: 'youtube', label: 'YouTube', href: '#' },
  ],
};

export const ENQUIRY_TYPES = [
  { value: 'quote', label: 'Request a quote' },
  { value: 'bulk', label: 'Bulk / project order' },
  { value: 'dealer', label: 'Become a dealer / distributor' },
  { value: 'product', label: 'Product information' },
  { value: 'other', label: 'Other' },
];

export const QUANTITY_RANGES = ['1 – 10 units', '11 – 50 units', '51 – 200 units', '200+ units', 'Project-based / not sure yet'];
