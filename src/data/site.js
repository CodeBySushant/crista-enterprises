/**
 * Company details. Set `placeholder: true` on any contact value
 * to mark it visually as unconfirmed.
 */
export const site = {
  name: 'Crista Enterprises',
  tagline: 'Ideas into impact.',
  description:
    'Crista Enterprises supplies commercial and industrial LED lighting and commercial gym equipment to contractors, institutions, facilities and dealers.',
  contact: {
    email: { value: 'contact@cristaenterprises.com', href: 'mailto:contact@cristaenterprises.com' },
    phone: { value: '+91 82712 78494', href: 'tel:+918271278494' },
    address: { value: 'Bhopal, Madhya Pradesh' },
    hours: { value: 'Mon – Sat, business hours' },
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
