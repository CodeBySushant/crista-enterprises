/**
 * Central image registry.
 * ------------------------------------------------------------
 * Every photograph on the site is referenced from here so it can be swapped
 * for real Crista photography later without touching components.
 *
 * Current sources are Unsplash (free licence). Each entry has an `alt` and a
 * `tone` used by <SmartImage> to render a clean branded fallback if the
 * remote image ever fails to load — so the UI never shows a broken image.
 *
 * Product catalogue imagery uses <ProductRender> (studio-style technical
 * renders) until actual product photographs are supplied.
 */
const u = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const images = {
  heroNight: {
    src: u('photo-1519501025264-65ba15a82390', 2200),
    alt: 'City road illuminated by street lighting at night',
    tone: 'dark',
  },
  streetNight: {
    src: u('photo-1514565131-fce0801e5785'),
    alt: 'Illuminated city streets at night',
    tone: 'dark',
  },
  powerLines: {
    src: u('photo-1473341304170-971dccb5ac1e'),
    alt: 'Electrical transmission infrastructure at dusk',
    tone: 'dark',
  },
  construction: {
    src: u('photo-1504307651254-35680f356dfd'),
    alt: 'Construction site with structural steelwork',
    tone: 'light',
  },
  constructionCrane: {
    src: u('photo-1541888946425-d81bb19240f5'),
    alt: 'Large construction project under way',
    tone: 'light',
  },
  warehouse: {
    src: u('photo-1586528116311-ad8dd3c8310d'),
    alt: 'Industrial warehouse with high-bay racking',
    tone: 'light',
  },
  warehouseStock: {
    src: u('photo-1553413077-190dd305871c'),
    alt: 'Warehouse aisles stocked for bulk distribution',
    tone: 'light',
  },
  industrial: {
    src: u('photo-1581091226825-a6a2a5aee158'),
    alt: 'Industrial facility interior',
    tone: 'dark',
  },
  solar: {
    src: u('photo-1509391366360-2e959784a276'),
    alt: 'Solar photovoltaic panels',
    tone: 'light',
  },
  stadium: {
    src: u('photo-1522778119026-d647f0596c20'),
    alt: 'Sports ground under floodlights',
    tone: 'dark',
  },
  gymFloor: {
    src: u('photo-1534438327276-14e5300c3a48'),
    alt: 'Commercial gym floor with strength equipment',
    tone: 'dark',
  },
  gymWide: {
    src: u('photo-1540497077202-7c8a3999166f'),
    alt: 'Commercial fitness centre with equipment rows',
    tone: 'dark',
  },
  gymCardio: {
    src: u('photo-1571902943202-507ec2618e8f'),
    alt: 'Cardio equipment in a fitness centre',
    tone: 'dark',
  },
  gymStrength: {
    src: u('photo-1517836357463-d25dfeac3438'),
    alt: 'Strength training area in a commercial gym',
    tone: 'dark',
  },
  hotel: {
    src: u('photo-1566073771259-6a8506099945'),
    alt: 'Hotel exterior and grounds',
    tone: 'light',
  },
  commercial: {
    src: u('photo-1497366216548-37526070297c'),
    alt: 'Commercial interior space',
    tone: 'light',
  },
  campus: {
    src: u('photo-1562774053-701939374585'),
    alt: 'Educational institution campus building',
    tone: 'light',
  },
};

export default images;
