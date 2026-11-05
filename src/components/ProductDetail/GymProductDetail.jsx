import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Check, Info, Mail, Phone } from 'lucide-react';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Button from '../Buttons/Button';
import ProductRender from '../ProductRender/ProductRender';
import ProductGrid from '../ProductGrid/ProductGrid';
import EnquiryForm from '../EnquiryForm/EnquiryForm';
import Reveal from '../Common/Reveal';
import { DIVISIONS, getRelated } from '../../data/products';
import { site } from '../../data/site';
import { useQuote } from '../../context/QuoteContext';

const SERIES = { strength: 'Strength', cardio: 'Cardio', weights: 'Free Weights', accessories: 'Accessories' };
const ease = [0.2, 0.7, 0.2, 1];

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

/** Showroom-style detail page for gym equipment. */
export default function GymProductDetail({ product: p }) {
  const { openQuote } = useQuote();
  const division = DIVISIONS.gym;
  const series = SERIES[p.category] ?? p.categoryName;
  const related = getRelated(p, 3);

  const Summary = ({ light }) => (
    <div>
      <p className={`text-[12px] font-semibold uppercase tracking-[0.16em] ${light ? 'text-white/55' : 'text-muted'}`}>{series} series · {p.usage}</p>
      <p className={`mt-4 max-w-md text-[17px] leading-relaxed ${light ? 'text-white/80' : 'text-charcoal/80'}`}>{p.summary}</p>
      <dl className={`mt-8 grid grid-cols-3 border-y ${light ? 'border-white/15' : 'border-line'}`}>
        {p.highlights.map((h, i) => (
          <div key={h.label} className={`py-4 ${i ? `border-l pl-4 ${light ? 'border-white/15' : 'border-line'}` : ''}`}>
            <dt className={`text-[11px] uppercase tracking-[0.12em] ${light ? 'text-white/50' : 'text-muted'}`}>{h.label}</dt>
            <dd className={`mt-1 text-[15px] font-semibold ${light ? 'text-white' : 'text-ink'}`}>{h.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button variant="accent" size="lg" icon={ArrowRight} onClick={() => openQuote({ product: p.slug })}>Request a Quote</Button>
        <Button variant={light ? 'outline-light' : 'outline'} size="lg" icon={ArrowDown} onClick={() => scrollTo('specifications')}>Specifications</Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Showroom hero — dark band, product crossing into the page below */}
      <section className="relative overflow-hidden bg-[linear-gradient(to_bottom,#1f242b_0%,#17191c_68%,rgb(var(--c-paper-rgb))_68%)]">
        <div className="wrap relative pt-8 lg:pt-10">
          <Breadcrumbs tone="light" items={[{ label: 'Home', to: '/' }, { label: division.name, to: division.path }, { label: p.categoryName, to: `${division.path}?category=${p.category}` }, { label: p.name }]} />

          <div className="grid gap-8 pt-10 lg:grid-cols-12 lg:pt-14">
            <div className="relative lg:col-span-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/60">{p.categoryName}</p>
              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}
                className="mt-3 font-display text-[44px] font-semibold uppercase leading-none tracking-[0.06em] text-white sm:text-[64px] lg:text-[76px]"
                aria-hidden="true"
              >
                {series}
              </motion.p>
              <span className="mt-4 block h-[5px] w-28 bg-accent sm:w-40" aria-hidden="true" />

              {/* watermark */}
              <span aria-hidden="true" className="pointer-events-none absolute left-[-2%] top-[46%] select-none whitespace-nowrap font-display text-[90px] font-bold uppercase leading-none tracking-[0.08em] text-white/[0.04] sm:text-[150px] lg:text-[180px]">
                {series}
              </span>

              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.1 }}
                className="relative mx-auto mt-6 h-[300px] max-w-[620px] drop-shadow-[0_30px_30px_rgba(0,0,0,0.25)] sm:h-[400px] lg:h-[460px]"
              >
                <ProductRender kind={p.render.kind} size={p.render.size} label={p.name} tone="none" />
              </motion.div>
            </div>

            <div className="hidden pt-20 lg:col-span-5 lg:col-start-8 lg:block">
              <Summary light />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile summary (light) */}
      <div className="wrap pt-4 lg:hidden"><Summary /></div>

      {/* Body: content + sticky enquiry */}
      <section className="wrap grid gap-14 py-14 lg:grid-cols-12 lg:gap-12 lg:py-16">
        <div className="lg:col-span-7">
          <h1 className="font-display text-[30px] font-semibold uppercase leading-[1.1] tracking-[0.01em] sm:text-[40px]">{p.name}</h1>
          <p className="mt-6 text-[16px] leading-[1.75] text-charcoal/85">
            <strong className="font-semibold text-ink">{p.name}.</strong> {p.description}
          </p>

          <div id="specifications" className="mt-12 grid scroll-mt-28 gap-12 md:grid-cols-2 md:gap-10">
            <Reveal>
              <h2 className="font-display text-[22px] font-medium uppercase tracking-[0.04em]">Features</h2>
              <ul className="mt-5 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 text-[15px] leading-relaxed text-charcoal">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-accent-ink" strokeWidth={2.25} aria-hidden="true" />{f}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="font-display text-[22px] font-medium uppercase tracking-[0.04em]">Specification</h2>
              <dl className="mt-5 border-t border-line">
                {p.specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-[minmax(0,44%)_1fr] gap-4 border-b border-line py-3 text-[14px]">
                    <dt className="text-muted">{s.label}</dt>
                    <dd className="text-ink">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <p className="mt-8 flex items-start gap-2.5 bg-mist px-4 py-3 text-[13px] leading-relaxed text-charcoal/80">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted" strokeWidth={1.75} aria-hidden="true" />
            <span><strong className="font-medium text-ink">Sample specification.</strong> Features and values are indicative placeholders, not verified product data. Final specifications are confirmed in your quotation.</span>
          </p>

          <div className="mt-12">
            <h2 className="font-display text-[22px] font-medium uppercase tracking-[0.04em]">Ideal for</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {p.applications.map((a) => <li key={a} className="rounded-sm border border-line bg-white px-3.5 py-2 text-[14px] text-charcoal">{a}</li>)}
            </ul>
          </div>
        </div>

        <aside id="enquire" className="lg:col-span-5" aria-labelledby="enquire-title">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)]">
            <div className="border border-line bg-white">
              <div className="border-b border-line bg-ink px-6 py-5 text-white sm:px-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">Enquire about this product</p>
                <h2 id="enquire-title" className="mt-1.5 font-display text-[20px] font-semibold text-white">{p.name}</h2>
              </div>
              <div className="p-6 sm:p-8">
                <EnquiryForm key={p.slug} variant="quote" compact initial={{ product: p.slug }} />
              </div>
            </div>
            <ul className="mt-4 grid gap-2 text-[13px] sm:grid-cols-2">
              <li><a href={site.contact.phone.href} className="flex items-center gap-2 text-charcoal hover:text-ink"><Phone className="h-4 w-4 text-muted" strokeWidth={1.5} aria-hidden="true" />{site.contact.phone.value}</a></li>
              <li><a href={site.contact.email.href} className="flex items-center gap-2 text-charcoal hover:text-ink"><Mail className="h-4 w-4 text-muted" strokeWidth={1.5} aria-hidden="true" />{site.contact.email.value}</a></li>
            </ul>
          </div>
        </aside>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line bg-white py-14 lg:py-20">
          <div className="wrap">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-display text-[26px] font-semibold uppercase tracking-[0.02em] sm:text-[32px]">More {series.toLowerCase()} equipment</h2>
              <Button to={division.path} variant="link" icon={ArrowRight}>View all gym equipment</Button>
            </div>
            <ProductGrid products={related} cols="sm:grid-cols-2 lg:grid-cols-3" className="mt-10" />
          </div>
        </section>
      )}
    </>
  );
}
