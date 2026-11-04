import usePageMeta from '../../hooks/usePageMeta';
import SmartImage from '../../components/Common/SmartImage';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import CatalogueView from '../../components/Catalogue/CatalogueView';
import EnquiryCTA from '../../components/Home/EnquiryCTA';
import { getByDivision, LIGHTING_CATEGORIES } from '../../data/products';
import { SORTS } from '../../utils/catalogue';

const products = getByDivision('lighting');

const RANGE = [
  { k: 'Street', v: '50W – 150W' },
  { k: 'Flood', v: '150W – 400W' },
  { k: 'Solar', v: 'Off-grid' },
  { k: 'High bay', v: '100W – 200W' },
];

export default function Lighting() {
  usePageMeta('Professional Lighting Solutions', 'LED street lights, flood lights, solar street lights and industrial high-bay lighting for infrastructure, construction and industrial projects.');
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <SmartImage image="powerLines" eager className="absolute inset-0 -z-10" sizes="100vw" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/20" aria-hidden="true" />
        <div className="wrap pb-0 pt-10 lg:pt-14">
          <Breadcrumbs tone="light" items={[{ label: 'Home', to: '/' }, { label: 'Products', to: '/products' }, { label: 'Crista Lights' }]} />
          <div className="grid gap-8 py-16 lg:grid-cols-12 lg:py-24">
            <div className="lg:col-span-8">
              <p className="flex items-center gap-3 text-eyebrow font-medium uppercase text-white/60"><span className="h-px w-6 bg-accent" aria-hidden="true" />Crista Lights · Division 01</p>
              <h1 className="display-lg mt-6 text-white">Professional Lighting Solutions</h1>
              <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/70">
                A focused range of LED street lights, flood lights, solar street lights and industrial luminaires for roads,
                sites, campuses and facilities — specified and quoted to the needs of each project.
              </p>
            </div>
          </div>
          <dl className="grid grid-cols-2 border-t border-white/15 md:grid-cols-4">
            {RANGE.map((r, i) => (
              <div key={r.k} className={`py-5 ${i % 2 ? 'border-l border-white/15 pl-5' : ''} ${i >= 2 ? 'border-t border-white/15 md:border-t-0' : ''} ${i === 2 ? 'md:border-l md:pl-5' : ''}`}>
                <dt className="text-[12px] uppercase tracking-[0.14em] text-white/50">{r.k}</dt>
                <dd className="mt-1 font-display text-lg text-white">{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CatalogueView products={products} categories={LIGHTING_CATEGORIES} allLabel="All Lighting" filters={['category', 'watt', 'type']} sorts={SORTS.lighting} />

      <section className="wrap pb-6">
        <p className="border-t border-line pt-5 text-[13px] text-muted">
          Technical values shown are sample data for reference only. Final specifications, photometry and warranty terms are confirmed in each quotation.
        </p>
      </section>
      <EnquiryCTA image="construction" />
    </>
  );
}
