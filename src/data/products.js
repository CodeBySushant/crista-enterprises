/**
 * Product catalogue (frontend data source).
 * ------------------------------------------------------------
 * Shaped so it can later be replaced 1:1 by an API response.
 *
 * IMPORTANT: all technical specifications below are SAMPLE DATA for layout
 * purposes (`specStatus: 'sample'`). The UI labels them as such. Replace with
 * verified manufacturer data before publishing.
 */

export const DIVISIONS = {
  lighting: {
    id: 'lighting',
    name: 'Crista Lights',
    path: '/products/lighting',
    tagline: 'Commercial & industrial LED lighting',
  },
  gym: {
    id: 'gym',
    name: 'Crista Gym Equipment',
    path: '/products/gym-equipment',
    tagline: 'Commercial fitness equipment',
  },
};

export const LIGHTING_CATEGORIES = [
  { slug: 'street', name: 'LED Street Lights' },
  { slug: 'flood', name: 'LED Flood Lights' },
  { slug: 'solar', name: 'Solar Street Lights' },
  { slug: 'industrial', name: 'Industrial Lighting' },
];

export const GYM_CATEGORIES = [
  { slug: 'strength', name: 'Strength Equipment' },
  { slug: 'cardio', name: 'Cardio Equipment' },
  { slug: 'weights', name: 'Weight Training' },
  { slug: 'accessories', name: 'Gym Accessories' },
];

/* ---------- Lighting helpers ---------- */
const lightSpecs = ({ watt, efficacy = 130, cct = '5700K (3000K / 4000K on request)', ip = 'IP66', mounting, material = 'Die-cast aluminium housing, toughened glass / PC lens', led = 'SMD 3030', voltage = 'AC 100–300V, 50/60Hz' }) => [
  { label: 'Wattage', value: `${watt}W` },
  { label: 'Lumen output', value: `≈ ${(watt * efficacy).toLocaleString('en-IN')} lm` },
  { label: 'LED type', value: led },
  { label: 'Input voltage', value: voltage },
  { label: 'Colour temperature', value: cct },
  { label: 'IP rating', value: ip },
  { label: 'Material', value: material },
  { label: 'Mounting type', value: mounting },
  { label: 'Warranty', value: 'Confirmed per order / project' },
];

const street = (watt, extra = {}) => ({
  slug: `${watt}w-led-street-light`,
  name: `${watt}W LED Street Light`,
  division: 'lighting',
  category: 'street',
  type: 'Pole Mount',
  wattage: watt,
  render: { kind: 'street', size: watt },
  photo: watt >= 150 ? 'heroNight' : 'streetNight',
  summary:
    watt <= 50
      ? 'Compact street luminaire for internal roads, campuses, lanes and parking areas.'
      : watt <= 100
        ? 'Mid-power street luminaire for urban roads, colonies and industrial estates.'
        : 'High-output street luminaire for arterial roads, highways and wide carriageways.',
  description: `The ${watt}W LED Street Light is designed for dependable outdoor illumination with a sealed, heat-dissipating housing and wide-distribution optics. It suits municipal, institutional and private infrastructure projects where consistent light levels and low maintenance matter. Optics, colour temperature and mounting accessories can be specified per project.`,
  highlights: [
    { label: 'Output', value: `≈ ${(watt * 130).toLocaleString('en-IN')} lm` },
    { label: 'Protection', value: 'IP66' },
    { label: 'Mount', value: 'Side-entry pole' },
  ],
  specs: lightSpecs({ watt, mounting: 'Side-entry, Ø40–60 mm pole spigot' }),
  applications: ['Urban and arterial roads', 'Campus and township roads', 'Industrial estates', 'Parking areas'],
  ...extra,
});

const flood = (watt, extra = {}) => ({
  slug: `${watt}w-led-flood-light`,
  name: `${watt}W LED Flood Light`,
  division: 'lighting',
  category: 'flood',
  type: 'Bracket Mount',
  wattage: watt,
  render: { kind: 'flood', size: watt },
  photo: watt >= 300 ? 'stadium' : 'construction',
  summary:
    watt <= 200
      ? 'Adjustable floodlight for façades, yards, signage and perimeter security.'
      : 'High-power floodlight for sports grounds, ports, large yards and work sites.',
  description: `The ${watt}W LED Flood Light combines a finned aluminium heat sink with an adjustable U-bracket for accurate aiming. It is suited to perimeter, façade, area and sports lighting where high, uniform output is required. Beam angle and colour temperature can be selected to match the application.`,
  highlights: [
    { label: 'Output', value: `≈ ${(watt * 125).toLocaleString('en-IN')} lm` },
    { label: 'Protection', value: 'IP66' },
    { label: 'Beam', value: '30° / 60° / 90°' },
  ],
  specs: lightSpecs({ watt, efficacy: 125, mounting: 'Adjustable U-bracket, wall / pole / cross-arm' }),
  applications: ['Building façades', 'Yards and loading areas', 'Sports grounds', 'Perimeter security'],
  ...extra,
});

const highbay = (watt, extra = {}) => ({
  slug: `${watt}w-led-high-bay`,
  name: `${watt}W LED High Bay`,
  division: 'lighting',
  category: 'industrial',
  type: 'Suspended',
  wattage: watt,
  render: { kind: 'highbay', size: watt },
  photo: watt >= 150 ? 'warehouse' : 'industrial',
  summary: 'Round high-bay luminaire for factories, warehouses and large-span interiors.',
  description: `The ${watt}W LED High Bay is built for mounting heights typically between 6 and 12 metres. A compact round body with radial heat-sink fins keeps the LED board cool in demanding industrial environments. Reflector and lens options allow the beam to be matched to rack aisles or open floors.`,
  highlights: [
    { label: 'Output', value: `≈ ${(watt * 135).toLocaleString('en-IN')} lm` },
    { label: 'Protection', value: 'IP65' },
    { label: 'Mount', value: 'Hook / chain' },
  ],
  specs: lightSpecs({ watt, efficacy: 135, ip: 'IP65', mounting: 'Suspension hook or chain; surface bracket optional', material: 'Die-cast aluminium body, PC / glass lens' }),
  applications: ['Factories and workshops', 'Warehouses and logistics', 'Indoor sports halls', 'Exhibition spaces'],
  ...extra,
});

export const lightingProducts = [
  street(50, { featured: 1 }),
  street(100, { featured: 2 }),
  street(150, { featured: 3 }),
  flood(150, { featured: 4 }),
  flood(200, { featured: 5 }),
  flood(300, { featured: 6 }),
  flood(400, { featured: 7 }),
  {
    slug: 'solar-street-light',
    name: 'Solar Street Light',
    division: 'lighting',
    category: 'solar',
    type: 'Pole Mount',
    wattage: 40,
    featured: 8,
    render: { kind: 'solar', size: 40 },
    photo: 'solar',
    summary: 'Off-grid street light with integrated panel, battery and dusk-to-dawn control.',
    description:
      'The Solar Street Light is a self-contained luminaire that needs no grid connection or trenching. An integrated photovoltaic panel charges the battery during the day and a light sensor switches the lamp at dusk. Suitable for rural roads, campuses, parks and remote sites. Panel, battery and autonomy can be configured per project.',
    highlights: [
      { label: 'Power', value: 'Off-grid' },
      { label: 'Protection', value: 'IP65' },
      { label: 'Control', value: 'Dusk-to-dawn' },
    ],
    specs: [
      { label: 'Wattage', value: '40W (LED load)' },
      { label: 'Lumen output', value: '≈ 4,800 lm' },
      { label: 'LED type', value: 'SMD 5050' },
      { label: 'Input voltage', value: '12.8V LiFePO₄ battery system' },
      { label: 'Solar panel', value: 'Monocrystalline, sized per site' },
      { label: 'Colour temperature', value: '6000K' },
      { label: 'IP rating', value: 'IP65' },
      { label: 'Material', value: 'Aluminium alloy body' },
      { label: 'Mounting type', value: 'Pole top / side arm' },
      { label: 'Warranty', value: 'Confirmed per order / project' },
    ],
    applications: ['Rural and village roads', 'Parks and pathways', 'Campuses', 'Remote and off-grid sites'],
  },
  highbay(100),
  highbay(150),
  highbay(200),
];

/* ---------- Gym helpers ---------- */
const gym = (p) => ({
  division: 'gym',
  ...p,
  specs: [
    { label: 'Equipment type', value: p.equipType },
    { label: 'Dimensions (L × W × H)', value: p.dims },
    { label: 'Material', value: p.material },
    { label: 'Weight capacity', value: p.capacity },
    { label: 'Resistance type', value: p.resistance },
    { label: 'Target muscle groups', value: p.muscles },
    { label: 'Usage category', value: p.usage },
  ],
});

export const gymProducts = [
  gym({
    slug: 'commercial-treadmill', name: 'Commercial Treadmill', category: 'cardio', type: 'Motorised', usage: 'Commercial', featured: 1,
    render: { kind: 'treadmill' }, photo: 'gymCardio',
    summary: 'Heavy-duty motorised treadmill built for continuous gym-floor use.',
    description: 'A full-size commercial treadmill with a wide running deck, cushioned suspension and programmable console. Designed for high-traffic fitness centres, hotels and institutional gyms where equipment runs for long hours every day.',
    equipType: 'Motorised treadmill', dims: '≈ 2150 × 900 × 1600 mm', material: 'Steel frame, aluminium side rails', capacity: '≈ 180 kg user', resistance: 'AC motor, incline 0–15%', muscles: 'Full lower body, cardiovascular',
    highlights: [{ label: 'Drive', value: 'AC motor' }, { label: 'Incline', value: '0–15%' }, { label: 'User', value: '≈ 180 kg' }],
    applications: ['Commercial gyms', 'Hotel fitness rooms', 'Corporate wellness centres'],
  }),
  gym({
    slug: 'upright-exercise-bike', name: 'Upright Exercise Bike', category: 'cardio', type: 'Magnetic', usage: 'Commercial', featured: 2,
    render: { kind: 'bike' }, photo: 'gymCardio',
    summary: 'Self-generating upright bike with smooth magnetic resistance.',
    description: 'A commercial upright bike with a stable step-through frame, adjustable seat and multi-level magnetic resistance. Quiet operation makes it suitable for mixed-use fitness spaces and rehabilitation areas.',
    equipType: 'Upright cycle', dims: '≈ 1200 × 600 × 1450 mm', material: 'Powder-coated steel frame', capacity: '≈ 150 kg user', resistance: 'Magnetic, multi-level', muscles: 'Quadriceps, hamstrings, glutes, calves',
    highlights: [{ label: 'Resistance', value: 'Magnetic' }, { label: 'Power', value: 'Self-generating' }, { label: 'User', value: '≈ 150 kg' }],
    applications: ['Fitness centres', 'Institutional gyms', 'Physiotherapy spaces'],
  }),
  gym({
    slug: 'elliptical-cross-trainer', name: 'Elliptical Cross Trainer', category: 'cardio', type: 'Magnetic', usage: 'Commercial', featured: 6,
    render: { kind: 'elliptical' }, photo: 'gymWide',
    summary: 'Low-impact full-body cardio trainer with moving handlebars.',
    description: 'A rear-drive elliptical with a natural stride path and synchronised arm movement for full-body, low-impact cardio. Designed for daily use in commercial and institutional fitness facilities.',
    equipType: 'Elliptical cross trainer', dims: '≈ 2000 × 700 × 1650 mm', material: 'Steel frame, ABS covers', capacity: '≈ 150 kg user', resistance: 'Magnetic, multi-level', muscles: 'Full body, cardiovascular',
    highlights: [{ label: 'Impact', value: 'Low' }, { label: 'Drive', value: 'Rear' }, { label: 'User', value: '≈ 150 kg' }],
    applications: ['Commercial gyms', 'Hotels', 'Residential society clubhouses'],
  }),
  gym({
    slug: 'air-rowing-machine', name: 'Air Rowing Machine', category: 'cardio', type: 'Air', usage: 'Commercial',
    render: { kind: 'rower' }, photo: 'gymWide',
    summary: 'Air-resistance rower for conditioning and functional training zones.',
    description: 'A fan-resistance rowing machine where resistance increases with effort. Robust aluminium monorail and a simple performance monitor make it a staple for conditioning and functional training areas.',
    equipType: 'Rowing machine', dims: '≈ 2400 × 600 × 1000 mm', material: 'Aluminium monorail, steel front legs', capacity: '≈ 150 kg user', resistance: 'Air (fan) with damper', muscles: 'Back, legs, core, arms',
    highlights: [{ label: 'Resistance', value: 'Air' }, { label: 'Rail', value: 'Aluminium' }, { label: 'User', value: '≈ 150 kg' }],
    applications: ['Functional training zones', 'Sports academies', 'Fitness studios'],
  }),
  gym({
    slug: 'chest-press-machine', name: 'Selectorised Chest Press', category: 'strength', type: 'Selectorised', usage: 'Commercial', featured: 3,
    render: { kind: 'press' }, photo: 'gymFloor',
    summary: 'Pin-loaded chest press with a guided, converging press path.',
    description: 'A selectorised chest press with an enclosed weight stack, adjustable seat and converging arms for a natural pressing motion. Built for commercial strength floors where safety and ease of use are priorities.',
    equipType: 'Selectorised strength machine', dims: '≈ 1500 × 1300 × 1550 mm', material: 'Oval steel tube frame, powder coated', capacity: 'Weight stack ≈ 100 kg', resistance: 'Pin-loaded weight stack', muscles: 'Chest, front shoulders, triceps',
    highlights: [{ label: 'Stack', value: '≈ 100 kg' }, { label: 'Load', value: 'Pin-select' }, { label: 'Frame', value: 'Oval steel' }],
    applications: ['Commercial gyms', 'Hotel gyms', 'Institutional gyms'],
  }),
  gym({
    slug: 'lat-pulldown-low-row', name: 'Lat Pulldown / Low Row', category: 'strength', type: 'Selectorised', usage: 'Commercial',
    render: { kind: 'lat' }, photo: 'gymFloor',
    summary: 'Dual-function back station combining lat pulldown and seated row.',
    description: 'A space-efficient dual-function machine offering lat pulldown and low row from a single weight stack. Thigh hold-downs and a footplate keep users stable through both movements.',
    equipType: 'Dual-function strength machine', dims: '≈ 1700 × 1100 × 2200 mm', material: 'Steel frame, aircraft cable', capacity: 'Weight stack ≈ 100 kg', resistance: 'Pin-loaded weight stack', muscles: 'Lats, mid-back, biceps',
    highlights: [{ label: 'Functions', value: '2-in-1' }, { label: 'Stack', value: '≈ 100 kg' }, { label: 'Load', value: 'Pin-select' }],
    applications: ['Commercial gyms', 'College gyms', 'Corporate gyms'],
  }),
  gym({
    slug: 'leg-press-hack-squat', name: 'Plate-Loaded Leg Press', category: 'strength', type: 'Plate-loaded', usage: 'Commercial', featured: 4,
    render: { kind: 'legpress' }, photo: 'gymStrength',
    summary: '45° plate-loaded leg press with linear bearings and safety stops.',
    description: 'A 45-degree leg press with a large footplate, adjustable back pad and multi-position safety stops. Plate-loaded design supports heavy training loads for serious strength floors.',
    equipType: 'Plate-loaded strength machine', dims: '≈ 2300 × 1600 × 1500 mm', material: 'Heavy-gauge steel frame', capacity: '≈ 400 kg plate load', resistance: 'Olympic plates', muscles: 'Quadriceps, glutes, hamstrings',
    highlights: [{ label: 'Angle', value: '45°' }, { label: 'Load', value: '≈ 400 kg' }, { label: 'Type', value: 'Plate-loaded' }],
    applications: ['Strength gyms', 'Sports academies', 'Commercial gyms'],
  }),
  gym({
    slug: 'cable-crossover', name: 'Cable Crossover Station', category: 'strength', type: 'Selectorised', usage: 'Commercial',
    render: { kind: 'cable' }, photo: 'gymStrength',
    summary: 'Dual-stack functional cable station with adjustable pulleys.',
    description: 'A twin weight-stack cable crossover with height-adjustable pulleys and a central pull-up bar. Supports a wide range of functional, isolation and rehabilitation movements.',
    equipType: 'Functional cable station', dims: '≈ 3800 × 1000 × 2300 mm', material: 'Steel frame, nylon-coated cables', capacity: '2 × weight stack ≈ 90 kg', resistance: 'Dual pin-loaded stacks', muscles: 'Full body',
    highlights: [{ label: 'Stacks', value: '2 × ≈ 90 kg' }, { label: 'Pulleys', value: 'Adjustable' }, { label: 'Use', value: 'Functional' }],
    applications: ['Commercial gyms', 'Hotels', 'Sports facilities'],
  }),
  gym({
    slug: 'power-rack', name: 'Commercial Power Rack', category: 'weights', type: 'Free Weight', usage: 'Commercial', featured: 5,
    render: { kind: 'rack' }, photo: 'gymStrength',
    summary: 'Full power rack with safety arms, J-hooks and pull-up bar.',
    description: 'A heavy-duty power rack with numbered uprights, adjustable safety arms and plate storage. The core of any free-weight area for squats, presses and pull-ups.',
    equipType: 'Power rack', dims: '≈ 1500 × 1400 × 2300 mm', material: '75 × 75 mm steel uprights', capacity: '≈ 500 kg rated load', resistance: 'Free weight (barbell)', muscles: 'Full body',
    highlights: [{ label: 'Uprights', value: '75 mm steel' }, { label: 'Rated', value: '≈ 500 kg' }, { label: 'Safety', value: 'Spotter arms' }],
    applications: ['Strength & conditioning', 'Commercial gyms', 'Sports academies'],
  }),
  gym({
    slug: 'adjustable-bench', name: 'Adjustable FID Bench', category: 'weights', type: 'Free Weight', usage: 'Commercial',
    render: { kind: 'bench' }, photo: 'gymFloor',
    summary: 'Flat / incline / decline bench for dumbbell and barbell work.',
    description: 'A multi-position flat-incline-decline bench with a stable wide base and transport wheels. A versatile piece for dumbbell zones and rack stations.',
    equipType: 'Adjustable bench', dims: '≈ 1350 × 650 × 450 mm', material: 'Steel frame, high-density padding', capacity: '≈ 300 kg', resistance: 'Free weight', muscles: 'Chest, shoulders, arms, core',
    highlights: [{ label: 'Positions', value: 'FID' }, { label: 'Rated', value: '≈ 300 kg' }, { label: 'Wheels', value: 'Yes' }],
    applications: ['Dumbbell zones', 'Commercial gyms', 'Hotel gyms'],
  }),
  gym({
    slug: 'hex-dumbbell-set', name: 'Rubber Hex Dumbbell Set', category: 'weights', type: 'Free Weight', usage: 'Commercial',
    render: { kind: 'dumbbell' }, photo: 'gymFloor',
    summary: 'Rubber-encased hex dumbbells with knurled chrome handles.',
    description: 'Rubber-encased hexagonal dumbbells that resist rolling and protect floors. Knurled chrome handles provide secure grip. Available as sets with matching storage racks.',
    equipType: 'Free weights', dims: 'Per weight increment', material: 'Cast iron heads, rubber encasing, chrome handle', capacity: 'Sets configured per order', resistance: 'Free weight', muscles: 'Full body',
    highlights: [{ label: 'Finish', value: 'Rubber hex' }, { label: 'Handle', value: 'Knurled chrome' }, { label: 'Rack', value: 'Optional' }],
    applications: ['Dumbbell zones', 'Home & studio gyms', 'Institutions'],
  }),
  gym({
    slug: 'kettlebell-set', name: 'Cast Iron Kettlebell Set', category: 'accessories', type: 'Accessory', usage: 'Light Commercial',
    render: { kind: 'kettlebell' }, photo: 'gymWide',
    summary: 'Single-piece cast iron kettlebells for functional training.',
    description: 'Single-cast kettlebells with a smooth handle and flat base. Ideal for functional, group-training and conditioning areas.',
    equipType: 'Functional accessory', dims: 'Per weight increment', material: 'Single-cast iron, powder coat', capacity: 'Sets configured per order', resistance: 'Free weight', muscles: 'Full body, posterior chain',
    highlights: [{ label: 'Body', value: 'Single cast' }, { label: 'Base', value: 'Flat' }, { label: 'Use', value: 'Functional' }],
    applications: ['Functional zones', 'Studios', 'Sports academies'],
  }),
  gym({
    slug: 'rubber-gym-flooring', name: 'Rubber Gym Flooring Tiles', category: 'accessories', type: 'Accessory', usage: 'Commercial',
    render: { kind: 'flooring' }, photo: 'gymStrength',
    summary: 'Interlocking high-density rubber tiles for strength and cardio areas.',
    description: 'High-density rubber flooring tiles that absorb impact, reduce noise and protect sub-floors. Supplied in thicknesses suited to free-weight or cardio zones.',
    equipType: 'Gym flooring', dims: '≈ 1000 × 1000 mm per tile', material: 'Recycled SBR rubber with EPDM flecks', capacity: 'Free-weight zones', resistance: '—', muscles: '—',
    highlights: [{ label: 'Tile', value: '1 × 1 m' }, { label: 'Material', value: 'SBR / EPDM' }, { label: 'Use', value: 'All zones' }],
    applications: ['Gym floors', 'Functional zones', 'Sports facilities'],
  }),
];

/* Gym feature highlights (SAMPLE — replace with manufacturer data). */
const GYM_FEATURES = {
  'commercial-treadmill': ['Wide running deck with cushioned suspension', 'Programmable console with preset workouts', 'Motorised incline for hill training', 'Heart-rate grip sensors', 'Emergency safety stop key'],
  'upright-exercise-bike': ['Step-through frame for easy access', 'Multi-level magnetic resistance', 'Self-generating — no power connection needed', 'Adjustable saddle and handlebar', 'Quiet, low-maintenance drive'],
  'elliptical-cross-trainer': ['Natural, low-impact stride path', 'Synchronised moving handlebars', 'Multi-level magnetic resistance', 'Large anti-slip foot pedals', 'Console with workout feedback'],
  'air-rowing-machine': ['Fan resistance that scales with effort', 'Adjustable air damper', 'Aluminium monorail with smooth seat travel', 'Performance monitor', 'Folds or stands for storage'],
  'chest-press-machine': ['Converging press path for natural movement', 'Independent arm movement', 'Multi-position handgrips', 'Adjustable seat with clear setting indicators', 'Enclosed, shrouded weight stack'],
  'lat-pulldown-low-row': ['Lat pulldown and seated row in one station', 'Thigh hold-down and footplate', 'Shared selectorised weight stack', 'Interchangeable handles', 'Space-efficient footprint'],
  'leg-press-hack-squat': ['45° sled on linear bearings', 'Large anti-slip footplate', 'Adjustable back pad', 'Multi-position safety stops', 'Integrated plate storage horns'],
  'cable-crossover': ['Twin selectorised weight stacks', 'Height-adjustable pulleys', 'Central multi-grip pull-up bar', 'Wide range of functional movements', 'Accessory storage hooks'],
  'power-rack': ['Numbered uprights for quick setup', 'Adjustable safety spotter arms', 'Steel J-hooks with protective liners', 'Multi-grip pull-up bar', 'Plate storage pegs'],
  'adjustable-bench': ['Flat, incline and decline positions', 'Wide, stable base', 'High-density padding', 'Transport wheels and handle', 'Quick-adjust seat'],
  'hex-dumbbell-set': ['Hexagonal heads prevent rolling', 'Rubber encasing protects floors', 'Knurled chrome handles', 'Clearly marked weights', 'Matching storage racks available'],
  'kettlebell-set': ['Single-piece cast iron construction', 'Smooth, wide handle', 'Flat base for stable storage', 'Colour-coded or marked weights', 'Suited to group and functional training'],
  'rubber-gym-flooring': ['Shock-absorbing high-density rubber', 'Reduces noise and vibration', 'Protects sub-floors from dropped weights', 'Interlocking or loose-lay options', 'Easy to clean and maintain'],
};

/* ---------- Shared ---------- */
const withMeta = (p) => ({
  ...p,
  specStatus: 'sample',
  categoryName: [...LIGHTING_CATEGORIES, ...GYM_CATEGORIES].find((c) => c.slug === p.category)?.name ?? '',
  url: `/products/${p.slug}`,
  features: p.features ?? GYM_FEATURES[p.slug] ?? [],
});

export const products = [...lightingProducts, ...gymProducts].map(withMeta);

export const getProduct = (slug) => products.find((p) => p.slug === slug);

export const getByDivision = (division) => products.filter((p) => p.division === division);

export const getFeatured = (division, n = 8) =>
  getByDivision(division)
    .filter((p) => p.featured)
    .sort((a, b) => a.featured - b.featured)
    .slice(0, n);

export const getRelated = (product, n = 4) => {
  const pool = getByDivision(product.division).filter((p) => p.slug !== product.slug);
  const same = pool.filter((p) => p.category === product.category);
  const rest = pool.filter((p) => p.category !== product.category);
  return [...same, ...rest].slice(0, n);
};
