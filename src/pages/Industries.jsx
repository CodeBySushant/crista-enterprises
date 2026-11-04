import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import usePageMeta from '../hooks/usePageMeta';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import SmartImage from '../components/Common/SmartImage';
import Reveal from '../components/Common/Reveal';
import EnquiryCTA from '../components/Home/EnquiryCTA';
import { industries } from '../data/industries';

const productLink = (name) => {
  const map = {
    'LED Street Lights': '/products/lighting?category=street',
    'LED Flood Lights': '/products/lighting?category=flood',
    'Solar Street Lights': '/products/lighting?category=solar',
    'LED High Bay': '/products/lighting?category=industrial',
    'Strength Equipment': '/products/gym-equipment?category=strength',
    'Cardio Equipment': '/products/gym-equipment?category=cardio',
    'Weight Training': '/products/gym-equipment?category=weights',
  };
  return map[name] ?? '/products';
};

export default function Industries() {
  usePageMeta('Industries We Serve', 'Crista Enterprises supplies lighting and gym equipment to infrastructure, construction, industrial, commercial, education, fitness and hospitality sectors.');
  return (
    <>
      <section className="border-b border-line">
        <div className="wrap pt-10 lg:pt-14">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Industries' }]} />
          <div className="grid gap-8 py-14 lg:grid-cols-12 lg:py-20">
            <div className="lg:col-span-7">
              <p className="eyebrow">Industries we serve</p>
              <h1 className="display-lg mt-6">Products matched to the sectors we supply.</h1>
            </div>
            <p className="lede self-end lg:col-span-4 lg:col-start-9">
              From roads and construction sites to factories, campuses, hotels and gyms — each sector has different requirements. Here is how our range maps to them.
            </p>
          </div>
          <nav aria-label="Jump to industry" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-6 sm:mx-0 sm:px-0">
            {industries.map((ind) => (
              <a key={ind.id} href={`#${ind.id}`} className="shrink-0 rounded-sm border border-line px-3.5 py-2 text-[13px] text-charcoal hover:border-ink">{ind.name}</a>
            ))}
          </nav>
        </div>
      </section>

      <div className="wrap py-10 lg:py-16">
        {industries.map((ind, i) => (
          <Reveal as="section" key={ind.id} id={ind.id} aria-labelledby={`${ind.id}-h`} className="grid scroll-mt-32 gap-8 border-b border-line py-10 last:border-b-0 md:grid-cols-12 md:items-center lg:gap-12 lg:py-14">
            <SmartImage image={ind.image} className={`aspect-[16/10] md:col-span-6 ${i % 2 ? 'md:order-2 md:col-start-7' : ''}`} sizes="50vw" />
            <div className={`md:col-span-5 ${i % 2 ? 'md:order-1 md:col-start-1' : 'md:col-start-8'}`}>
              <span className="tabular text-[12px] text-accent-ink">{String(i + 1).padStart(2, '0')}</span>
              <h2 id={`${ind.id}-h`} className="mt-3 font-display text-[30px] font-medium tracking-[-0.025em] sm:text-[36px]">{ind.name}</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted">{ind.summary}</p>
              <p className="mt-8 text-[12px] uppercase tracking-[0.14em] text-muted">Relevant products</p>
              <ul className="mt-3 border-t border-line">
                {ind.products.map((p) => (
                  <li key={p} className="border-b border-line">
                    <Link to={productLink(p)} className="group flex items-center justify-between py-3 text-[15px] text-ink hover:text-accent-ink">
                      {p}<ArrowRight className="h-4 w-4 opacity-40 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
      <EnquiryCTA image="powerLines" />
    </>
  );
}
