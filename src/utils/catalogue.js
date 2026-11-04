/** Pure helpers for catalogue search / filter / sort — backend-ready shape. */

export const WATTAGE_RANGES = [
  { id: 'le100', label: 'Up to 100W', test: (w) => w <= 100 },
  { id: '101-200', label: '101W – 200W', test: (w) => w > 100 && w <= 200 },
  { id: 'gt200', label: 'Above 200W', test: (w) => w > 200 },
];

export const SORTS = {
  lighting: [
    { id: 'featured', label: 'Featured' },
    { id: 'name', label: 'Name (A–Z)' },
    { id: 'watt-asc', label: 'Wattage (low to high)' },
    { id: 'watt-desc', label: 'Wattage (high to low)' },
  ],
  gym: [
    { id: 'featured', label: 'Featured' },
    { id: 'name', label: 'Name (A–Z)' },
    { id: 'name-desc', label: 'Name (Z–A)' },
  ],
};

export function matchesQuery(p, q) {
  if (!q) return true;
  const hay = [p.name, p.categoryName, p.type, p.summary, p.usage, p.wattage && `${p.wattage}w`]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((t) => hay.includes(t));
}

export function applyCatalogue(list, { categories = [], wattages = [], types = [], usages = [], q = '', sort = 'featured' }) {
  const out = list.filter((p) => {
    if (categories.length && !categories.includes(p.category)) return false;
    if (types.length && !types.includes(p.type)) return false;
    if (usages.length && !usages.includes(p.usage)) return false;
    if (wattages.length) {
      const ok = WATTAGE_RANGES.filter((r) => wattages.includes(r.id)).some((r) => r.test(p.wattage ?? 0));
      if (!ok) return false;
    }
    return matchesQuery(p, q);
  });

  const byFeatured = (a, b) => (a.featured ?? 99) - (b.featured ?? 99);
  const sorters = {
    featured: byFeatured,
    name: (a, b) => a.name.localeCompare(b.name),
    'name-desc': (a, b) => b.name.localeCompare(a.name),
    'watt-asc': (a, b) => (a.wattage ?? 0) - (b.wattage ?? 0) || a.name.localeCompare(b.name),
    'watt-desc': (a, b) => (b.wattage ?? 0) - (a.wattage ?? 0) || a.name.localeCompare(b.name),
  };
  return [...out].sort(sorters[sort] ?? byFeatured);
}

export const unique = (list, key) => [...new Set(list.map((p) => p[key]).filter(Boolean))];
