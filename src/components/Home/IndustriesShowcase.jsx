import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '../Common/SectionHeader';
import SmartImage from '../Common/SmartImage';
import Button from '../Buttons/Button';
import { industries } from '../../data/industries';
import cn from '../../utils/cn';

/** Interactive index: hover / focus an industry to swap the image panel. Mobile: snap-scroll cards. */
export default function IndustriesShowcase({ index = '05', withHeader = true }) {
  const [active, setActive] = useState(0);
  const current = industries[active];

  return (
    <section className="py-20 lg:py-28" aria-labelledby="industries-title">
      <div className="wrap">
        {withHeader && (
          <SectionHeader
            index={index}
            eyebrow="Industries we serve"
            title={<span id="industries-title">Supplying the sectors that build, run and equip.</span>}
            aside={<Button to="/industries" variant="outline" icon={ArrowRight}>All industries</Button>}
          />
        )}

        {/* Desktop */}
        <div className="mt-14 hidden gap-10 lg:grid lg:grid-cols-12">
          <ul className="lg:col-span-5" role="tablist" aria-orientation="vertical" aria-label="Industries">
            {industries.map((ind, i) => (
              <li key={ind.id} className="border-b border-line first:border-t">
                <button
                  type="button"
                  role="tab"
                  id={`ind-tab-${ind.id}`}
                  aria-selected={active === i}
                  aria-controls="industry-panel"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group flex w-full items-center gap-6 py-5 text-left"
                >
                  <span className={cn('tabular w-6 text-[12px] transition-colors', active === i ? 'text-accent-ink' : 'text-muted')}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={cn('flex-1 font-display text-[26px] font-medium tracking-[-0.025em] transition-colors duration-200', active === i ? 'text-ink' : 'text-ink/35 group-hover:text-ink/70')}>
                    {ind.name}
                  </span>
                  <ArrowRight className={cn('h-5 w-5 transition-all duration-300', active === i ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0')} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
          <div id="industry-panel" role="tabpanel" aria-labelledby={`ind-tab-${current.id}`} className="relative lg:col-span-7">
            <div className="relative aspect-[5/4] overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div key={current.id} className="absolute inset-0" initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}>
                  <SmartImage image={current.image} className="absolute inset-0" sizes="55vw" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-8 pt-24 text-white">
                <p className="max-w-md text-[16px] leading-relaxed text-white/85">{current.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {current.products.map((p) => (
                    <li key={p} className="rounded-sm border border-white/25 px-2.5 py-1 text-[12px] text-white/80">{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / tablet */}
        <ul className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:hidden">
          {industries.map((ind, i) => (
            <li key={ind.id} className="w-[78%] shrink-0 snap-start sm:w-[44%]">
              <SmartImage image={ind.image} className="aspect-[4/5]">
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="tabular text-[12px] text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-1 font-display text-[22px] font-medium text-white">{ind.name}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/75">{ind.summary}</p>
                </div>
              </SmartImage>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
