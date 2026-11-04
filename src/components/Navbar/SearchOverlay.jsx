import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CornerDownLeft, Search, X } from 'lucide-react';
import { products } from '../../data/products';
import { matchesQuery } from '../../utils/catalogue';
import useLockBody from '../../hooks/useLockBody';
import useEscape from '../../hooks/useEscape';
import ProductRender from '../ProductRender/ProductRender';
import cn from '../../utils/cn';

const SUGGESTIONS = ['Street light', 'Flood light', 'Solar', 'High bay', 'Treadmill', 'Power rack'];

export default function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  useLockBody(open);
  useEscape(open, onClose);

  useEffect(() => {
    if (open) {
      setQ('');
      setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [open]);

  const results = useMemo(() => (q.trim() ? products.filter((p) => matchesQuery(p, q.trim())).slice(0, 6) : []), [q]);

  const go = (path) => {
    onClose();
    navigate(path);
  };

  const onKeyDown = (e) => {
    if (!results.length) {
      if (e.key === 'Enter' && q.trim()) go(`/products?q=${encodeURIComponent(q.trim())}`);
      return;
    }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => (a + 1) % results.length); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => (a - 1 + results.length) % results.length); }
    if (e.key === 'Enter') { e.preventDefault(); go(results[active].url); }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Search products">
          <motion.div className="absolute inset-0 bg-ink/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-hidden="true" />
          <motion.div
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div className="wrap py-5 sm:py-8">
              <div className="flex items-center gap-3 border-b border-ink pb-3 sm:gap-4 sm:pb-4">
                <Search className="h-5 w-5 shrink-0 text-muted sm:h-6 sm:w-6" strokeWidth={1.5} aria-hidden="true" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => { setQ(e.target.value); setActive(0); }}
                  onKeyDown={onKeyDown}
                  type="search"
                  placeholder="Search products, wattage or category"
                  aria-label="Search products"
                  aria-controls="search-results"
                  aria-activedescendant={results.length ? `sr-${active}` : undefined}
                  className="min-w-0 flex-1 bg-transparent font-display text-xl text-ink placeholder:text-[#b3b7bb] focus:outline-none sm:text-3xl"
                />
                <button type="button" onClick={onClose} className="flex h-10 w-10 shrink-0 items-center justify-center hover:bg-mist" aria-label="Close search">
                  <X className="h-5 w-5" strokeWidth={1.75} />
                </button>
              </div>

              {!q.trim() && (
                <div className="mt-6">
                  <p className="eyebrow">Popular searches</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button key={s} type="button" onClick={() => { setQ(s); inputRef.current?.focus(); }} className="h-9 rounded-sm border border-line px-3.5 text-[13px] text-charcoal transition-colors hover:border-ink">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {q.trim() && (
                <div className="mt-4">
                  {results.length ? (
                    <ul id="search-results" role="listbox" className="divide-y divide-line">
                      {results.map((p, i) => (
                        <li key={p.slug} id={`sr-${i}`} role="option" aria-selected={i === active}>
                          <button
                            type="button"
                            onMouseEnter={() => setActive(i)}
                            onClick={() => go(p.url)}
                            className={cn('flex w-full items-center gap-4 py-3 text-left transition-colors', i === active && 'bg-paper')}
                          >
                            <span className="relative h-14 w-16 shrink-0 overflow-hidden"><ProductRender kind={p.render.kind} size={p.render.size} label={p.name} /></span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[15px] font-medium text-ink">{p.name}</span>
                              <span className="block truncate text-[13px] text-muted">{p.categoryName} · {p.division === 'lighting' ? 'Crista Lights' : 'Crista Gym Equipment'}</span>
                            </span>
                            {i === active && <CornerDownLeft className="mr-3 hidden h-4 w-4 text-muted sm:block" aria-hidden="true" />}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="py-6 text-[15px] text-muted">No products match &ldquo;{q}&rdquo;. Try a wattage (e.g. &ldquo;200W&rdquo;) or a category.</p>
                  )}
                  <button type="button" onClick={() => go(`/products?q=${encodeURIComponent(q.trim())}`)} className="mt-4 inline-flex items-center gap-2 text-[14px] font-medium text-ink hover:text-accent-ink">
                    See all results in the catalogue <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
