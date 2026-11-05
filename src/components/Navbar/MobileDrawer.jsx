import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Search, X, ArrowRight } from 'lucide-react';
import Logo from '../Common/Logo';
import Button from '../Buttons/Button';
import { mainNav, productMenu } from '../../data/navigation';
import useLockBody from '../../hooks/useLockBody';
import useEscape from '../../hooks/useEscape';
import cn from '../../utils/cn';
import GiftingLink from './GiftingLink';

export default function MobileDrawer({ open, onClose, onQuote, onSearch }) {
  const [expanded, setExpanded] = useState(null);
  const panel = useRef(null);
  useLockBody(open);
  useEscape(open, onClose);

  useEffect(() => {
    if (open) setTimeout(() => panel.current?.querySelector('button')?.focus(), 60);
  }, [open]);

  const linkCls = ({ isActive }) =>
    cn('flex items-center justify-between py-4 font-display text-[22px] font-medium tracking-[-0.02em]', isActive ? 'text-ink' : 'text-ink/80');

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Site menu" id="mobile-drawer">
          <motion.div className="absolute inset-0 bg-ink/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={panel}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: [0.2, 0.7, 0.2, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col bg-white"
          >
            <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-line px-4 sm:px-6">
              <Logo onClick={onClose} />
              <button type="button" onClick={onClose} className="-mr-2 flex h-11 w-11 items-center justify-center" aria-label="Close menu">
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6">
              <button type="button" onClick={onSearch} className="mt-5 flex h-12 w-full items-center gap-3 rounded-sm border border-line px-4 text-left text-[15px] text-muted">
                <Search className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" /> Search products
              </button>

              <nav aria-label="Mobile" className="mt-2">
                <ul className="divide-y divide-line">
                  {mainNav.map((item) =>
                    item.mega ? (
                      <li key={item.label}>
                        <button
                          type="button"
                          aria-expanded={expanded === 'products'}
                          onClick={() => setExpanded((e) => (e === 'products' ? null : 'products'))}
                          className="flex w-full items-center justify-between py-4 font-display text-[22px] font-medium tracking-[-0.02em] text-ink/80"
                        >
                          Products
                          <ChevronDown className={cn('h-5 w-5 transition-transform', expanded === 'products' && 'rotate-180')} strokeWidth={1.5} aria-hidden="true" />
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded === 'products' && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24 }} className="overflow-hidden">
                              <div className="space-y-6 pb-6">
                                {productMenu.map((div) => (
                                  <div key={div.id} className="border-l-2 border-accent pl-4">
                                    <NavLink to={div.to} onClick={onClose} className="flex items-center justify-between text-[15px] font-semibold text-ink">
                                      {div.title} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                    </NavLink>
                                    <ul className="mt-2">
                                      {div.links.map((l) => (
                                        <li key={l.label}>
                                          <NavLink to={l.to} onClick={onClose} className="flex items-center justify-between py-2 text-[15px] text-charcoal/80">
                                            {l.label}<span className="text-[12px] text-muted">{l.note}</span>
                                          </NavLink>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    ) : (
                      <li key={item.label}>
                        <NavLink to={item.to} end={item.to === '/'} onClick={onClose} className={linkCls}>
                          {({ isActive }) => (<>{item.label}{isActive && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />}</>)}
                        </NavLink>
                      </li>
                    ),
                  )}
                </ul>
                <div className="border-t border-line pb-6 pt-5">
                  <GiftingLink variant="drawer" onClick={onClose} />
                </div>
              </nav>
            </div>

            <div className="shrink-0 border-t border-line bg-paper p-4 sm:p-6">
              <Button onClick={onQuote} size="lg" className="w-full" icon={ArrowRight}>Request a Quote</Button>
              <div className="mt-4 flex justify-between text-[13px] text-muted">
                <NavLink to="/contact?type=bulk" onClick={onClose} className="hover:text-ink">Bulk orders</NavLink>
                <NavLink to="/contact?type=dealer" onClick={onClose} className="hover:text-ink">Become a dealer</NavLink>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
