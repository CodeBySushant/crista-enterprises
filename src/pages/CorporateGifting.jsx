import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Gift, Mail, Phone, SearchX } from 'lucide-react';
import usePageMeta from '../hooks/usePageMeta';
import useShortlist from '../hooks/useShortlist';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Button from '../components/Buttons/Button';
import Reveal from '../components/Common/Reveal';
import HamperRender from '../components/Gifting/HamperRender';
import HamperCard from '../components/Gifting/HamperCard';
import GiftingEnquiryForm from '../components/Gifting/GiftingEnquiryForm';
import { BUDGET_BANDS, CUSTOMISATION, GIFT_COLLECTIONS, getHamper, hampers } from '../data/gifting';
import { site } from '../data/site';
import cn from '../utils/cn';

const GRADIENT = 'bg-[linear-gradient(120deg,#0f8f52_0%,#0c8a78_55%,#0a7f96_100%)]';

const STEPS = [
  { t: 'Share your requirement', d: 'Occasion, number of recipients, budget per gift and delivery date.' },
  { t: 'Receive curated options', d: 'We suggest hampers that fit your budget, with samples on request.' },
  { t: 'Customise & brand', d: 'Finalise contents, packaging, logo placement and message cards.' },
  { t: 'Pack & dispatch', d: 'Hampers are packed and delivered to one or multiple locations.' },
];

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'budget-asc', label: 'Budget (low to high)' },
  { id: 'budget-desc', label: 'Budget (high to low)' },
];

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export default function CorporateGifting() {
  usePageMeta(
    'Corporate Gifting',
    'Corporate Diwali hampers, festival gifts, employee welcome kits and client gifting from Crista Enterprises — customised and branded for HR teams and businesses.',
  );

  const shortlist = useShortlist('crista-gifting-shortlist');
  const [collection, setCollection] = useState('all');
  const [budget, setBudget] = useState('all');
  const [sort, setSort] = useState('featured');
  const [atForm, setAtForm] = useState(false);

  // Hide the floating shortlist bar once the enquiry form is reached
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById('gifting-enquiry');
      if (el) setAtForm(el.getBoundingClientRect().top < window.innerHeight - 80);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const list = useMemo(() => {
    const band = BUDGET_BANDS.find((b) => b.id === budget);
    const out = hampers.filter((hp) => {
      if (collection !== 'all' && hp.collection !== collection) return false;
      if (band && (hp.budget[1] < band.min || hp.budget[0] > band.max)) return false;
      return true;
    });
    const s = {
      featured: (a, b) => (a.featured ?? 99) - (b.featured ?? 99),
      'budget-asc': (a, b) => a.budget[0] - b.budget[0],
      'budget-desc': (a, b) => b.budget[0] - a.budget[0],
    }[sort];
    return [...out].sort(s);
  }, [collection, budget, sort]);

  const countFor = (cid) => hampers.filter((hp) => cid === 'all' || hp.collection === cid).length;
  const reset = () => { setCollection('all'); setBudget('all'); };

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="wrap pt-10 lg:pt-14">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Corporate Gifting' }]} />
        </div>
        <div className="wrap grid gap-12 py-12 lg:grid-cols-12 lg:items-center lg:py-16">
          <div className="lg:col-span-6">
            <p className="flex items-center gap-3 text-eyebrow font-medium uppercase text-muted">
              <span className={cn('flex h-6 w-6 items-center justify-center rounded-sm text-white', GRADIENT)}><Gift className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" /></span>
              Crista Corporate Gifting
            </p>
            <h1 className="display-lg mt-6">Corporate Gifting Solutions</h1>
            <p className="lede mt-6 max-w-xl">
              Customised festival hampers, employee kits and client gifts for businesses, HR teams and organisations —
              curated to your budget and branded with your logo.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" icon={ArrowDown} onClick={() => scrollTo('hampers')}>Browse hampers</Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo('gifting-enquiry')}>Enquire for bulk gifting</Button>
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-5 text-[13px] text-charcoal sm:grid-cols-4">
              {['Logo branding', 'Custom message cards', 'Budget-matched', 'Bulk dispatch'].map((t) => (
                <li key={t} className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-5 grid-rows-2 gap-3 lg:col-span-6">
            <div className="col-span-3 row-span-2 aspect-[3/4] overflow-hidden sm:aspect-auto"><HamperRender hamper={getHamper('diya-dry-fruit-box')} /></div>
            <div className="col-span-2 aspect-square overflow-hidden"><HamperRender hamper={getHamper('new-joiner-kit')} /></div>
            <div className="col-span-2 aspect-square overflow-hidden"><HamperRender hamper={getHamper('executive-client-hamper')} /></div>
          </div>
        </div>
      </section>

      {/* Collections + catalogue */}
      <section id="hampers" className="scroll-mt-24 py-14 lg:py-20" aria-labelledby="hampers-title">
        <div className="wrap">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">Sample hampers</p>
              <h2 id="hampers-title" className="display-md mt-3">Festive & corporate collections</h2>
            </div>
            <p className="max-w-md text-[14px] text-muted">Add hampers to your enquiry to shortlist them. Contents and budgets are indicative and can be tailored.</p>
          </div>

          {/* Collection tabs */}
          <div role="tablist" aria-label="Gift collections" className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {[{ id: 'all', name: 'All collections' }, ...GIFT_COLLECTIONS].map((c) => {
              const active = collection === c.id;
              return (
                <button key={c.id} type="button" role="tab" aria-selected={active} onClick={() => setCollection(c.id)}
                  className={cn('inline-flex h-10 shrink-0 items-center gap-2 rounded-sm border px-4 text-[14px] transition-colors', active ? 'border-ink bg-ink text-white' : 'border-line bg-white text-charcoal hover:border-ink/40')}>
                  {c.name}<span className={cn('tabular text-[12px]', active ? 'text-white/60' : 'text-muted')}>{countFor(c.id)}</span>
                </button>
              );
            })}
          </div>

          {/* Toolbar */}
          <div className="mt-6 flex flex-col gap-3 border-b border-line pb-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] text-muted" aria-live="polite"><span className="tabular font-medium text-ink">{list.length}</span> {list.length === 1 ? 'hamper' : 'hampers'}{collection !== 'all' && <> · {GIFT_COLLECTIONS.find((c) => c.id === collection)?.note}</>}</p>
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-[13px] text-muted">Budget
                <select value={budget} onChange={(e) => setBudget(e.target.value)} className="h-10 rounded-sm border border-line bg-white px-3 pr-8 text-[13px] text-ink focus:border-ink focus:outline-none">
                  <option value="all">Any budget</option>
                  {BUDGET_BANDS.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
                </select>
              </label>
              <label className="flex items-center gap-2 text-[13px] text-muted">Sort
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-10 rounded-sm border border-line bg-white px-3 pr-8 text-[13px] text-ink focus:border-ink focus:outline-none">
                  {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </label>
            </div>
          </div>

          {list.length ? (
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
              {list.map((hp) => (
                <li key={hp.id}><HamperCard hamper={hp} selected={shortlist.has(hp.id)} onToggle={shortlist.toggle} /></li>
              ))}
            </ul>
          ) : (
            <div className="mt-8 flex flex-col items-center border border-dashed border-line bg-white px-6 py-16 text-center">
              <SearchX className="h-8 w-8 text-muted" strokeWidth={1.25} aria-hidden="true" />
              <p className="mt-4 font-display text-lg font-semibold">No sample hampers in this budget</p>
              <p className="mt-2 max-w-sm text-[14px] text-muted">We can still curate one for you — tell us your budget in the enquiry form.</p>
              <Button variant="outline" className="mt-6" onClick={reset}>Show all hampers</Button>
            </div>
          )}
          <p className="mt-6 text-[12px] text-muted">Hamper visuals are illustrative and budgets are indicative sample ranges. Final contents and pricing depend on quantity, branding and delivery.</p>
        </div>
      </section>

      {/* Customisation + process */}
      <section className="border-y border-line bg-white py-16 lg:py-24">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Customisation</p>
            <h2 className="display-md mt-3">Made to carry your company&rsquo;s name.</h2>
            <dl className="mt-8 border-t border-line">
              {CUSTOMISATION.map((c) => (
                <div key={c.title} className="border-b border-line py-5">
                  <dt className="text-[15px] font-semibold text-ink">{c.title}</dt>
                  <dd className="mt-1.5 text-[14px] leading-relaxed text-muted">{c.text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.06}>
            <p className="eyebrow">How it works</p>
            <h2 className="display-md mt-3">From brief to doorstep.</h2>
            <ol className="mt-8">
              {STEPS.map((s, i) => (
                <li key={s.t} className="relative flex gap-5 pb-8 last:pb-0">
                  {i < STEPS.length - 1 && <span className="absolute left-[15px] top-9 h-[calc(100%-36px)] w-px bg-line" aria-hidden="true" />}
                  <span className={cn('relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-white tabular', GRADIENT)}>{i + 1}</span>
                  <div className="pt-1">
                    <h3 className="font-sans text-[15px] font-semibold text-ink">{s.t}</h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-muted">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Enquiry */}
      <section id="gifting-enquiry" className="scroll-mt-24 py-16 lg:py-24" aria-labelledby="gifting-enquiry-title">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow">Gifting enquiry</p>
            <h2 id="gifting-enquiry-title" className="display-md mt-3">Plan your festive gifting.</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              Tell us the occasion, number of recipients and budget. We&rsquo;ll come back with curated hamper options and a quotation.
            </p>
            <ul className="mt-8 space-y-4 border-t border-line pt-6 text-[14px]">
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-muted" strokeWidth={1.5} aria-hidden="true" /><a href={site.contact.email.href} className="text-ink hover:text-accent-ink">{site.contact.email.value}</a></li>
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-muted" strokeWidth={1.5} aria-hidden="true" /><a href={site.contact.phone.href} className="text-ink hover:text-accent-ink">{site.contact.phone.value}</a></li>
            </ul>
            <p className="mt-8 border-l-2 border-accent pl-4 text-[13px] leading-relaxed text-muted">
              Planning for Diwali? Enquiring a few weeks ahead leaves time for samples, branding approval and dispatch.
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="border border-line bg-white p-5 sm:p-10">
              <GiftingEnquiryForm shortlist={shortlist.ids} onRemove={shortlist.remove} onClearShortlist={shortlist.clear} />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky shortlist bar */}
      <AnimatePresence>
        {shortlist.ids.length > 0 && !atForm && (
          <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink text-white">
            <div className="wrap flex items-center justify-between gap-4 py-3">
              <p className="flex items-center gap-3 text-[14px]">
                <span className={cn('flex h-8 w-8 items-center justify-center rounded-sm', GRADIENT)}><Gift className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" /></span>
                <span><span className="tabular font-semibold">{shortlist.ids.length}</span> {shortlist.ids.length === 1 ? 'hamper' : 'hampers'} in your enquiry</span>
              </p>
              <div className="flex items-center gap-2">
                <button type="button" onClick={shortlist.clear} className="hidden h-10 px-3 text-[13px] text-white/60 hover:text-white sm:block">Clear</button>
                <Button variant="accent" icon={ArrowRight} onClick={() => scrollTo('gifting-enquiry')}>Enquire now</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
