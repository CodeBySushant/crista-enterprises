import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import usePageMeta from '../../hooks/usePageMeta';
import SmartImage from '../../components/Common/SmartImage';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import CatalogueView from '../../components/Catalogue/CatalogueView';
import EnquiryCTA from '../../components/Home/EnquiryCTA';
import { getByDivision, GYM_CATEGORIES } from '../../data/products';
import { SORTS } from '../../utils/catalogue';

const products = getByDivision('gym');

export default function GymEquipment() {
  usePageMeta('Commercial Fitness Equipment', 'Commercial strength, cardio and free-weight equipment plus gym accessories for fitness centres, hotels, schools and institutions.');
  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col justify-between px-4 pb-12 pt-10 sm:px-6 lg:pl-[max(2.5rem,calc((100vw-1360px)/2+2.5rem))] lg:pr-16 lg:pt-14">
            <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Products', to: '/products' }, { label: 'Crista Gym Equipment' }]} />
            <div className="py-14 lg:py-20">
              <p className="flex items-center gap-3 text-eyebrow font-medium uppercase text-muted"><span className="h-px w-6 bg-accent" aria-hidden="true" />Crista Gym Equipment · Division 02</p>
              <h1 className="display-lg mt-6">Commercial Fitness Equipment</h1>
              <p className="lede mt-6 max-w-lg">Equipment solutions for modern gyms, fitness centres and institutional facilities.</p>
            </div>
            <ul className="grid grid-cols-2 border-t border-line">
              {GYM_CATEGORIES.map((c, i) => (
                <li key={c.slug} className={`border-b border-line ${i % 2 ? 'border-l pl-4' : 'pr-4'}`}>
                  <Link to={`/products/gym-equipment?category=${c.slug}`} className="group flex items-center justify-between py-4 text-[14px] text-charcoal hover:text-ink">
                    <span><span className="tabular mr-3 text-[12px] text-muted">{String(i + 1).padStart(2, '0')}</span>{c.name}</span>
                    <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid min-h-[360px] grid-cols-5 gap-1 bg-white lg:min-h-[620px]">
            <SmartImage image="gymFloor" eager className="col-span-3" sizes="30vw" />
            <div className="col-span-2 grid grid-rows-2 gap-1">
              <SmartImage image="gymCardio" className="h-full" sizes="20vw" />
              <SmartImage image="gymStrength" className="h-full" sizes="20vw" />
            </div>
          </div>
        </div>
      </section>

      <CatalogueView products={products} categories={GYM_CATEGORIES} allLabel="All Equipment" filters={['category', 'type', 'usage']} sorts={SORTS.gym} />

      <section className="wrap pb-6">
        <p className="border-t border-line pt-5 text-[13px] text-muted">
          Dimensions, capacities and materials shown are sample data for reference. Final specifications are confirmed with each quotation.
        </p>
      </section>
      <EnquiryCTA image="gymWide" />
    </>
  );
}
