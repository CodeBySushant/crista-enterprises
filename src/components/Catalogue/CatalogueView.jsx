import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import FilterPanel from './FilterPanel';
import ProductGrid from '../ProductGrid/ProductGrid';
import Button from '../Buttons/Button';
import { applyCatalogue, SORTS, WATTAGE_RANGES, unique } from '../../utils/catalogue';
import useLockBody from '../../hooks/useLockBody';
import useEscape from '../../hooks/useEscape';
import cn from '../../utils/cn';

const PARAM = { category: 'categories', watt: 'wattages', type: 'types', usage: 'usages' };

/**
 * Catalogue with URL-synced category tabs, filters, search and sort.
 * Props:
 *  - products: list to browse
 *  - categories: [{ slug, name }]
 *  - allLabel: label of the "all" tab
 *  - filters: which filter groups to show ('category' | 'watt' | 'type' | 'usage')
 *  - sorts: sort option list
 */
export default function CatalogueView({ products, categories, allLabel = 'All products', filters = ['category', 'type'], sorts = SORTS.gym }) {
  const [params, setParams] = useSearchParams();
  const [drawer, setDrawer] = useState(false);
  useLockBody(drawer);
  useEscape(drawer, () => setDrawer(false));

  const read = (k) => (params.get(k) ? params.get(k).split(',').filter(Boolean) : []);
  const state = {
    categories: read('category'),
    wattages: read('watt'),
    types: read('type'),
    usages: read('usage'),
    q: params.get('q') ?? '',
    sort: params.get('sort') ?? 'featured',
  };

  const update = (mutate) => {
    const next = new URLSearchParams(params);
    mutate(next);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const toggle = (group, value) =>
    update((n) => {
      const cur = read(group);
      const nextVals = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
      if (nextVals.length) n.set(group, nextVals.join(','));
      else n.delete(group);
    });

  const setCategoryTab = (slug) => update((n) => (slug ? n.set('category', slug) : n.delete('category')));
  const clearAll = () => update((n) => ['category', 'watt', 'type', 'usage', 'q'].forEach((k) => n.delete(k)));

  const results = useMemo(() => applyCatalogue(products, state), [products, params]); // eslint-disable-line react-hooks/exhaustive-deps

  // Facet counts (count against the list with every *other* filter applied)
  const countFor = (group, value) => {
    const s = { ...state, [PARAM[group]]: [value] };
    return applyCatalogue(products, s).length;
  };

  const groups = filters.map((g) => {
    if (g === 'category') return { id: 'category', title: 'Product category', options: categories.map((c) => ({ value: c.slug, label: c.name, count: countFor('category', c.slug) })) };
    if (g === 'watt') return { id: 'watt', title: 'Wattage', options: WATTAGE_RANGES.map((r) => ({ value: r.id, label: r.label, count: countFor('watt', r.id) })) };
    if (g === 'type') return { id: 'type', title: 'Product type', options: unique(products, 'type').sort().map((t) => ({ value: t, label: t, count: countFor('type', t) })) };
    return { id: 'usage', title: 'Usage category', options: unique(products, 'usage').sort().map((t) => ({ value: t, label: t, count: countFor('usage', t) })) };
  });

  const selected = { category: state.categories, watt: state.wattages, type: state.types, usage: state.usages };
  const chips = groups.flatMap((g) => (selected[g.id] ?? []).map((v) => ({ group: g.id, value: v, label: g.options.find((o) => o.value === v)?.label ?? v })));
  const activeCount = chips.length + (state.q ? 1 : 0);
  const singleCat = state.categories.length === 1 ? state.categories[0] : state.categories.length === 0 ? '' : null;

  return (
    <div>
      {/* Category tabs */}
      <div className="sticky top-[var(--header-h)] z-30 border-b border-line bg-paper/95 backdrop-blur">
        <div className="wrap">
          <div role="tablist" aria-label="Product categories" className="no-scrollbar -mx-4 flex overflow-x-auto px-4 sm:mx-0 sm:px-0">
            {[{ slug: '', name: allLabel }, ...categories].map((c, i) => {
              const active = singleCat === c.slug;
              return (
                <button
                  key={c.slug || 'all'}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setCategoryTab(c.slug)}
                  className={cn(
                    'relative h-14 shrink-0 whitespace-nowrap px-4 text-[14px] transition-colors first:pl-0',
                    active ? 'font-medium text-ink' : 'text-muted hover:text-ink',
                  )}
                >
                  {c.name}
                  <span className={cn('absolute bottom-0 right-4 h-[2px] bg-ink transition-opacity', i === 0 ? 'left-0' : 'left-4', active ? 'opacity-100' : 'opacity-0')} aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="wrap grid gap-10 py-10 lg:grid-cols-[248px_1fr] lg:py-14">
        {/* Sidebar */}
        <aside className="hidden lg:block" aria-label="Product filters">
          <div className="sticky top-[calc(var(--header-h)+80px)]">
            <FilterPanel groups={groups} selected={selected} onToggle={toggle} onClear={clearAll} activeCount={activeCount} />
          </div>
        </aside>

        <section aria-label="Products">
          {/* Toolbar */}
          <div className="flex flex-col gap-4 border-b border-line pb-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <label className="relative flex h-11 w-full items-center md:w-72">
                <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-muted" aria-hidden="true" />
                <span className="sr-only">Search within catalogue</span>
                <input
                  type="search"
                  value={state.q}
                  onChange={(e) => update((n) => (e.target.value ? n.set('q', e.target.value) : n.delete('q')))}
                  placeholder="Search this catalogue"
                  className="field h-11 py-0 pl-10"
                />
              </label>
              <button type="button" onClick={() => setDrawer(true)} className="inline-flex h-11 shrink-0 items-center gap-2 rounded-sm border border-line bg-white px-4 text-[14px] text-ink lg:hidden">
                <SlidersHorizontal className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                Filters{activeCount ? ` (${activeCount})` : ''}
              </button>
            </div>
            <div className="flex items-center justify-between gap-4 md:justify-end">
              <p className="text-[13px] text-muted" aria-live="polite"><span className="tabular font-medium text-ink">{results.length}</span> {results.length === 1 ? 'product' : 'products'}</p>
              <label className="flex items-center gap-2 text-[13px] text-muted">
                Sort by
                <select value={state.sort} onChange={(e) => update((n) => (e.target.value === 'featured' ? n.delete('sort') : n.set('sort', e.target.value)))} className="h-10 rounded-sm border border-line bg-white px-3 pr-8 text-[13px] text-ink focus:border-ink focus:outline-none">
                  {sorts.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </label>
            </div>
          </div>

          {/* Active chips */}
          {activeCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-4">
              {state.q && (
                <button type="button" onClick={() => update((n) => n.delete('q'))} className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-ink px-3 text-[12px] text-white">
                  &ldquo;{state.q}&rdquo; <X className="h-3.5 w-3.5" aria-hidden="true" /><span className="sr-only">Remove search</span>
                </button>
              )}
              {chips.map((c) => (
                <button key={`${c.group}-${c.value}`} type="button" onClick={() => toggle(c.group, c.value)} className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-ink/15 bg-white px-3 text-[12px] text-ink hover:border-ink">
                  {c.label} <X className="h-3.5 w-3.5" aria-hidden="true" /><span className="sr-only">Remove filter</span>
                </button>
              ))}
              <button type="button" onClick={clearAll} className="ml-1 text-[12px] text-muted underline underline-offset-4 hover:text-ink">Clear filters</button>
            </div>
          )}

          <div className="pt-6">
            <ProductGrid products={results} onReset={clearAll} />
          </div>
        </section>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {drawer && (
          <div className="fixed inset-0 z-[65] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
            <motion.div className="absolute inset-0 bg-ink/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)} aria-hidden="true" />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }} className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col bg-white">
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <p className="font-display text-lg font-medium">Filter products</p>
                <button type="button" onClick={() => setDrawer(false)} className="flex h-11 w-11 items-center justify-center" aria-label="Close filters"><X className="h-5 w-5" /></button>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <FilterPanel groups={groups} selected={selected} onToggle={toggle} onClear={clearAll} activeCount={activeCount} />
              </div>
              <div className="border-t border-line p-4">
                <Button size="lg" className="w-full" onClick={() => setDrawer(false)}>Show {results.length} {results.length === 1 ? 'product' : 'products'}</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
