import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductRender from '../ProductRender/ProductRender';
import { useQuote } from '../../context/QuoteContext';
import cn from '../../utils/cn';

/**
 * Showroom-style product tile (used for gym and lighting): product floating on
 * a light-to-graphite gradient, name and actions set on the dark base.
 */
export default function GymProductCard({ product: p, className }) {
  const { openQuote } = useQuote();

  return (
    <article
      className={cn(
        'group/card relative flex aspect-[4/5] min-h-[400px] flex-col sm:aspect-[5/8] justify-end overflow-hidden rounded-md',
        'bg-[linear-gradient(180deg,#eceded_0%,#e7e8e9_42%,#9a9da1_72%,#55585d_100%)]',
        'transition-shadow duration-500 hover:shadow-[0_24px_48px_-28px_rgba(23,25,28,0.6)]',
        className,
      )}
    >
      <span className="absolute left-4 top-4 z-[1] text-[11px] font-medium uppercase tracking-[0.14em] text-ink/50">{p.categoryName}</span>
      {p.division === 'lighting' && p.wattage && (
        <span className="absolute right-4 top-3.5 z-[1] font-display text-[14px] font-semibold tabular text-ink/70">{p.wattage}W</span>
      )}

      <div className="absolute inset-x-[6%] top-[9%] h-[56%] transition-transform duration-700 ease-brand group-hover/card:-translate-y-1 group-hover/card:scale-[1.04]">
        <ProductRender kind={p.render.kind} size={p.render.size} label={p.name} tone="none" />
      </div>

      <div className="relative z-[1] p-5">
        <h3 className="font-display text-[16px] font-semibold uppercase leading-snug tracking-[0.02em] text-white">
          <Link to={p.url} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {p.name}
          </Link>
        </h3>
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-[13px] text-white/75 transition-colors group-hover/card:text-accent">
            View details <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/card:translate-x-0.5" aria-hidden="true" />
          </span>
          <button
            type="button"
            onClick={() => openQuote({ product: p.slug })}
            className="relative z-[2] rounded-sm border border-white/25 px-2.5 py-1.5 text-[12px] font-medium text-white/85 transition-colors hover:border-white hover:bg-white hover:text-ink"
            aria-label={`Request a quote for ${p.name}`}
          >
            Get quote
          </button>
        </div>
      </div>
    </article>
  );
}
