import { useParams } from 'react-router-dom';
import { ArrowRight, Check, Info, MessageSquare } from 'lucide-react';
import usePageMeta from '../../hooks/usePageMeta';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Button from '../../components/Buttons/Button';
import Gallery from '../../components/ProductDetail/Gallery';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import SmartImage from '../../components/Common/SmartImage';
import Reveal from '../../components/Common/Reveal';
import { getProduct, getRelated, DIVISIONS } from '../../data/products';
import { useQuote } from '../../context/QuoteContext';
import NotFound from '../NotFound';

function SampleNotice({ className }) {
  return (
    <p className={`flex items-start gap-2.5 bg-mist px-4 py-3 text-[13px] leading-relaxed text-charcoal/80 ${className ?? ''}`}>
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted" strokeWidth={1.75} aria-hidden="true" />
      <span><strong className="font-medium text-ink">Sample specification.</strong> Values are indicative placeholders, not verified product data. Final specifications are confirmed in your quotation.</span>
    </p>
  );
}

export default function ProductDetails() {
  const { slug } = useParams();
  const p = getProduct(slug);
  const { openQuote } = useQuote();
  usePageMeta(p?.name ?? 'Product not found', p ? `${p.name} — ${p.summary} Request a quote from Crista Enterprises.` : undefined);

  if (!p) return <NotFound />;

  const division = DIVISIONS[p.division];
  const related = getRelated(p, 4);
  const keySpecs = p.specs.slice(0, 6);

  return (
    <>
      <div className="wrap pt-8 lg:pt-10">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: division.name, to: division.path }, { label: p.categoryName, to: `${division.path}?category=${p.category}` }, { label: p.name }]} />
      </div>

      <section className="wrap grid gap-10 py-10 lg:grid-cols-12 lg:gap-14 lg:py-14">
        <div className="lg:col-span-7">
          <Gallery product={p} />
        </div>

        <div className="lg:col-span-5">
          <p className="flex items-center gap-3 text-eyebrow font-medium uppercase text-muted">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />{division.name} · {p.categoryName}
          </p>
          <h1 className="mt-5 font-display text-[34px] font-medium leading-[1.08] tracking-[-0.03em] sm:text-[44px]">{p.name}</h1>
          <p className="mt-5 text-[16px] leading-relaxed text-charcoal/80">{p.summary}</p>

          <div className="mt-8">
            <h2 className="text-[12px] font-medium uppercase tracking-[0.14em] text-muted">Key specifications</h2>
            <dl className="mt-3 border-t border-line">
              {keySpecs.map((s) => (
                <div key={s.label} className="grid grid-cols-[minmax(0,42%)_1fr] gap-4 border-b border-line py-3 text-[14px]">
                  <dt className="text-muted">{s.label}</dt>
                  <dd className="text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <SampleNotice className="mt-5" />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" icon={ArrowRight} onClick={() => openQuote({ product: p.slug })} className="flex-1">Request a Quote</Button>
            <Button size="lg" variant="outline" iconLeft={MessageSquare} to={`/contact?type=product&product=${p.slug}`} className="flex-1">Enquire Now</Button>
          </div>
          <ul className="mt-6 space-y-2 text-[13px] text-muted">
            {['Pricing based on specification and quantity', 'Bulk and project orders welcome', 'Specification guidance on request'].map((t) => (
              <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-accent-ink" aria-hidden="true" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* In-page sections */}
      <nav aria-label="Product sections" className="sticky top-[var(--header-h)] z-20 border-y border-line bg-paper/95 backdrop-blur">
        <ul className="wrap no-scrollbar flex gap-8 overflow-x-auto text-[14px]">
          {[['overview', 'Overview'], ['specifications', 'Specifications'], ['applications', 'Applications'], ['related', 'Related products']].map(([id, label]) => (
            <li key={id}><a href={`#${id}`} className="block whitespace-nowrap py-4 text-muted transition-colors hover:text-ink">{label}</a></li>
          ))}
        </ul>
      </nav>

      <section id="overview" className="wrap grid scroll-mt-40 gap-8 py-16 lg:grid-cols-12 lg:py-20">
        <h2 className="display-md lg:col-span-4">Overview</h2>
        <Reveal className="lg:col-span-7 lg:col-start-6">
          <p className="text-[17px] leading-relaxed text-charcoal/85">{p.description}</p>
          <dl className="mt-10 grid grid-cols-3 border-y border-line">
            {p.highlights.map((h, i) => (
              <div key={h.label} className={`py-5 ${i ? 'border-l border-line pl-5' : ''}`}>
                <dt className="text-[12px] uppercase tracking-[0.12em] text-muted">{h.label}</dt>
                <dd className="mt-1 font-display text-lg text-ink">{h.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <section id="specifications" className="scroll-mt-40 border-t border-line bg-white py-16 lg:py-20">
        <div className="wrap grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="display-md">Technical specifications</h2>
            <SampleNotice className="mt-6 max-w-sm" />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <table className="w-full border-collapse text-left text-[15px]">
              <caption className="sr-only">{p.name} technical specifications (sample data)</caption>
              <tbody>
                {p.specs.map((s) => (
                  <tr key={s.label} className="border-b border-line first:border-t">
                    <th scope="row" className="w-[42%] py-4 pr-6 align-top font-normal text-muted">{s.label}</th>
                    <td className="py-4 text-ink">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button variant="outline" onClick={() => openQuote({ product: p.slug })}>Request detailed datasheet</Button>
              <span className="text-[13px] text-muted">Datasheets are shared with quotations.</span>
            </div>
          </div>
        </div>
      </section>

      <section id="applications" className="wrap grid scroll-mt-40 gap-10 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <h2 className="display-md">Applications</h2>
          <ul className="mt-8 border-t border-line">
            {p.applications.map((a, i) => (
              <li key={a} className="flex items-center gap-5 border-b border-line py-4 text-[16px] text-ink">
                <span className="tabular text-[12px] text-accent-ink">{String(i + 1).padStart(2, '0')}</span>{a}
              </li>
            ))}
          </ul>
        </div>
        <SmartImage image={p.photo} className="aspect-[16/10] lg:col-span-6 lg:col-start-7" sizes="(min-width:1024px) 50vw, 100vw" />
      </section>

      <section id="related" className="scroll-mt-40 border-t border-line bg-white py-16 lg:py-20">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-md">Related products</h2>
            <Button to={division.path} variant="link" icon={ArrowRight}>View all {division.name}</Button>
          </div>
          <ProductGrid products={related} cols="sm:grid-cols-2 xl:grid-cols-4" className="mt-10" />
        </div>
      </section>
    </>
  );
}
