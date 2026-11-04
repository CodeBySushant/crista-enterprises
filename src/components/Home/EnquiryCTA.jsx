import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import SmartImage from '../Common/SmartImage';
import Reveal from '../Common/Reveal';
import Button from '../Buttons/Button';
import { useQuote } from '../../context/QuoteContext';

const ROUTES = [
  { label: 'Bulk & project orders', to: '/contact?type=bulk' },
  { label: 'Dealer & distributor enquiries', to: '/contact?type=dealer' },
  { label: 'Product & specification questions', to: '/contact?type=product' },
];

export default function EnquiryCTA({ image = 'constructionCrane' }) {
  const { openQuote } = useQuote();
  return (
    <section className="bg-mist py-16 lg:py-24" aria-labelledby="cta-title">
      <div className="wrap">
        <Reveal className="grid overflow-hidden bg-white lg:grid-cols-12">
          <SmartImage image={image} className="aspect-[16/10] lg:col-span-5 lg:aspect-auto" sizes="(min-width:1024px) 40vw, 100vw" />
          <div className="flex flex-col justify-between p-7 sm:p-12 lg:col-span-7 lg:p-16">
            <div>
              <p className="flex items-center gap-3 text-eyebrow font-medium uppercase text-muted"><span className="h-px w-6 bg-accent" aria-hidden="true" />Business enquiries</p>
              <h2 id="cta-title" className="display-lg mt-6">Planning Your Next Project?</h2>
              <p className="lede mt-5 max-w-xl">Tell us what your business needs. Our team can help you find the right products for your requirements.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" icon={ArrowRight} onClick={() => openQuote()}>Request a Quote</Button>
                <Button size="lg" variant="outline" to="/contact">Contact Our Team</Button>
              </div>
            </div>
            <ul className="mt-12 grid border-t border-line sm:grid-cols-3">
              {ROUTES.map((r, i) => (
                <li key={r.label} className={i > 0 ? 'border-t border-line sm:border-l sm:border-t-0 sm:pl-5' : 'sm:pr-5'}>
                  <Link to={r.to} className="group flex items-start justify-between gap-3 py-4 text-[13px] text-charcoal hover:text-ink">
                    {r.label}
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent-ink" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
