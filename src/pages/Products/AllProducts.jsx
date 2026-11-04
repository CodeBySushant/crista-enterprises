import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import usePageMeta from '../../hooks/usePageMeta';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import CatalogueView from '../../components/Catalogue/CatalogueView';
import SmartImage from '../../components/Common/SmartImage';
import { products, LIGHTING_CATEGORIES, GYM_CATEGORIES, DIVISIONS } from '../../data/products';
import { SORTS } from '../../utils/catalogue';

const ALL_CATS = [...LIGHTING_CATEGORIES, ...GYM_CATEGORIES];

export default function AllProducts() {
  usePageMeta('All Products', 'Browse the complete Crista Enterprises range of commercial LED lighting and commercial gym equipment.');
  return (
    <>
      <section className="border-b border-line">
        <div className="wrap pt-10 lg:pt-14">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Products' }]} />
          <div className="grid gap-10 py-14 lg:grid-cols-12 lg:py-20">
            <div className="lg:col-span-6">
              <p className="eyebrow">Product range</p>
              <h1 className="display-lg mt-6">All Products</h1>
              <p className="lede mt-5 max-w-lg">Search and filter across both Crista divisions, or go directly to a dedicated catalogue.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
              {[{ d: DIVISIONS.lighting, img: 'heroNight', n: '01' }, { d: DIVISIONS.gym, img: 'gymFloor', n: '02' }].map(({ d, img, n }) => (
                <Link key={d.id} to={d.path} className="group relative block aspect-[4/3] overflow-hidden sm:aspect-[4/5]">
                  <SmartImage image={img} className="absolute inset-0" imgClassName="transition-transform duration-700 ease-brand group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
                    <span>
                      <span className="tabular text-[12px] text-accent">{n}</span>
                      <span className="mt-1 block font-display text-xl font-medium">{d.name}</span>
                      <span className="block text-[13px] text-white/65">{d.tagline}</span>
                    </span>
                    <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CatalogueView products={products} categories={ALL_CATS} allLabel="All Products" filters={['category', 'type']} sorts={SORTS.gym} />
    </>
  );
}
