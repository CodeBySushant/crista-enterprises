import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ProductRender from '../ProductRender/ProductRender';
import { useQuote } from '../../context/QuoteContext';
import cn from '../../utils/cn';

export default function ProductCard({ product: p, showHighlights = true, className }) {
  const { openQuote } = useQuote();
  const isLighting = p.division === 'lighting';

  return (
    <article className={cn('group/card relative flex h-full flex-col border border-line bg-white transition-[border-color,box-shadow] duration-300 hover:border-ink/25 hover:shadow-[0_18px_40px_-28px_rgba(23,25,28,0.45)]', className)}>
      <Link to={p.url} className="relative block aspect-[4/3] overflow-hidden" tabIndex={-1} aria-hidden="true">
        <div className="absolute inset-0 transition-transform duration-700 ease-brand group-hover/card:scale-[1.035]">
          <ProductRender kind={p.render.kind} size={p.render.size} label={p.name} />
        </div>
        <span className="absolute left-3 top-3 bg-white/90 px-2 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-charcoal backdrop-blur">
          {p.categoryName}
        </span>
        {isLighting && p.wattage && (
          <span className="absolute right-3 top-3 font-display text-[13px] font-semibold tabular text-ink/70">{p.wattage}W</span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[18px] font-medium leading-snug tracking-[-0.015em]">
          <Link to={p.url} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {p.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-muted">{p.summary}</p>

        {showHighlights && (
          <dl className="mt-5 grid grid-cols-3 border-y border-line">
            {p.highlights.map((h, i) => (
              <div key={h.label} className={cn('py-3', i > 0 && 'border-l border-line pl-3')}>
                <dt className="text-[11px] uppercase tracking-[0.1em] text-muted">{h.label}</dt>
                <dd className="mt-1 text-[13px] font-medium leading-snug text-ink">{h.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="relative z-[1] mt-auto flex items-center justify-between gap-3 pt-5">
          <Link to={p.url} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink transition-colors hover:text-accent-ink">
            View details <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={() => openQuote({ product: p.slug })}
            className="h-9 rounded-sm border border-ink/15 px-3.5 text-[13px] font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
            aria-label={`${isLighting ? 'Enquire now' : 'Request a quote'} about ${p.name}`}
          >
            {isLighting ? 'Enquire Now' : 'Request a Quote'}
          </button>
        </div>
      </div>
    </article>
  );
}
