import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '../Common/SectionHeader';
import ProductGrid from '../ProductGrid/ProductGrid';
import Button from '../Buttons/Button';
import { getFeatured } from '../../data/products';
import cn from '../../utils/cn';

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'street', label: 'Street' },
  { id: 'flood', label: 'Flood' },
  { id: 'solar', label: 'Solar' },
];

export default function FeaturedLighting() {
  const [tab, setTab] = useState('all');
  const featured = useMemo(() => getFeatured('lighting', 8), []);
  const list = tab === 'all' ? featured : featured.filter((p) => p.category === tab);

  return (
    <section className="py-20 lg:py-28" aria-labelledby="featured-title">
      <div className="wrap">
        <SectionHeader
          index="03"
          eyebrow="Featured lighting products"
          title={<span id="featured-title">Lighting Solutions for Every Environment.</span>}
          lede="Street, flood and solar luminaires for roads, sites, yards and campuses. Specifications are configurable per project."
          aside={<Button to="/products/lighting" variant="outline" icon={ArrowRight}>Full lighting catalogue</Button>}
        />
        <div className="mt-12 flex items-center justify-between gap-4 border-b border-line">
          <div role="tablist" aria-label="Filter featured lighting" className="no-scrollbar flex overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={cn('relative h-12 px-4 text-[14px] transition-colors first:pl-0', tab === t.id ? 'font-medium text-ink' : 'text-muted hover:text-ink')}
              >
                {t.label}
                <span className={cn('absolute bottom-[-1px] right-4 h-[2px] bg-ink transition-opacity', t.id === 'all' ? 'left-0' : 'left-4', tab === t.id ? 'opacity-100' : 'opacity-0')} aria-hidden="true" />
              </button>
            ))}
          </div>
          <p className="hidden text-[13px] text-muted sm:block">Prices are quoted per specification and quantity.</p>
        </div>
        <ProductGrid products={list} cols="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" className="mt-8" />
      </div>
    </section>
  );
}
