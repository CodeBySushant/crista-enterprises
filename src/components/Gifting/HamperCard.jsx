import { Check, Plus } from 'lucide-react';
import HamperRender from './HamperRender';
import { collectionName, formatBudget } from '../../data/gifting';
import cn from '../../utils/cn';

export default function HamperCard({ hamper, selected, onToggle }) {
  return (
    <article className={cn('group/card flex h-full flex-col border bg-white transition-[border-color,box-shadow] duration-300', selected ? 'border-ink shadow-[0_18px_40px_-28px_rgba(23,25,28,0.5)]' : 'border-line hover:border-ink/25 hover:shadow-[0_18px_40px_-28px_rgba(23,25,28,0.45)]')}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700 ease-brand group-hover/card:scale-[1.03]">
          <HamperRender hamper={hamper} />
        </div>
        <span className="absolute left-3 top-3 bg-white/90 px-2 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-charcoal backdrop-blur">
          {collectionName(hamper.collection)}
        </span>
        {hamper.tag && <span className="absolute right-3 top-3 bg-ink px-2 py-1 text-[11px] font-medium text-white">{hamper.tag}</span>}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[18px] font-semibold leading-snug">{hamper.name}</h3>
        <ul className="mt-3 space-y-1.5 text-[14px] text-muted">
          {hamper.contents.map((c) => (
            <li key={c} className="flex gap-2.5"><span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-muted/60" aria-hidden="true" />{c}</li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between border-t border-line pt-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.1em] text-muted">Indicative budget / hamper</p>
              <p className="mt-1 text-[15px] font-semibold tabular text-ink">{formatBudget(hamper.budget)}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onToggle(hamper.id)}
            aria-pressed={selected}
            className={cn(
              'mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-sm text-[14px] font-medium transition-colors duration-200',
              selected ? 'bg-ink text-white hover:bg-[#2a2d31]' : 'border border-ink/15 text-ink hover:border-ink hover:bg-ink hover:text-white',
            )}
          >
            {selected ? <><Check className="h-4 w-4" aria-hidden="true" />Added to enquiry</> : <><Plus className="h-4 w-4" aria-hidden="true" />Add to enquiry</>}
          </button>
        </div>
      </div>
    </article>
  );
}
