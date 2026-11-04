import { Check } from 'lucide-react';
import cn from '../../utils/cn';

function CheckRow({ checked, onChange, label, count, disabled }) {
  return (
    <label className={cn('group flex cursor-pointer items-center gap-3 py-2 text-[14px]', disabled && 'cursor-not-allowed opacity-40')}>
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={onChange} disabled={disabled} />
      <span
        aria-hidden="true"
        className={cn(
          'flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[2px] border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-ink',
          checked ? 'border-ink bg-ink text-white' : 'border-[#c9cdd1] bg-white group-hover:border-ink/60',
        )}
      >
        {checked && <Check className="h-3 w-3" strokeWidth={3} />}
      </span>
      <span className="flex-1 text-charcoal">{label}</span>
      {count !== undefined && <span className="tabular text-[12px] text-muted">{count}</span>}
    </label>
  );
}

/** Filter groups: [{ id, title, options: [{ value, label, count }] }] */
export default function FilterPanel({ groups, selected, onToggle, onClear, activeCount }) {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-ink pb-3">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">Filters</p>
        <button type="button" onClick={onClear} disabled={!activeCount} className="text-[13px] text-muted underline-offset-4 hover:text-ink hover:underline disabled:pointer-events-none disabled:opacity-40">
          Clear all
        </button>
      </div>
      {groups.map((g) => (
        <fieldset key={g.id} className="border-b border-line py-4">
          <legend className="sr-only">{g.title}</legend>
          <p aria-hidden="true" className="mb-1 text-[12px] font-medium uppercase tracking-[0.12em] text-muted">{g.title}</p>
          {g.options.map((o) => (
            <CheckRow
              key={o.value}
              label={o.label}
              count={o.count}
              checked={selected[g.id]?.includes(o.value) ?? false}
              disabled={o.count === 0 && !selected[g.id]?.includes(o.value)}
              onChange={() => onToggle(g.id, o.value)}
            />
          ))}
        </fieldset>
      ))}
    </div>
  );
}
