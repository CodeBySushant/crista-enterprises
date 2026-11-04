import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import EnquiryForm, { productLabel } from './EnquiryForm';
import useLockBody from '../../hooks/useLockBody';
import useEscape from '../../hooks/useEscape';
import { getProduct } from '../../data/products';
import ProductRender from '../ProductRender/ProductRender';

export default function QuoteModal({ open, product, formKey, onClose }) {
  const panelRef = useRef(null);
  const lastFocus = useRef(null);
  useLockBody(open);
  useEscape(open, onClose);
  const p = product ? getProduct(product) : null;

  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement;
      const t = setTimeout(() => panelRef.current?.querySelector('input, select, button')?.focus(), 60);
      return () => clearTimeout(t);
    }
    lastFocus.current?.focus?.();
    return undefined;
  }, [open]);

  // Simple focus trap
  const onKeyDown = (e) => {
    if (e.key !== 'Tab') return;
    const nodes = panelRef.current?.querySelectorAll('a[href], button:not([disabled]), input, select, textarea');
    if (!nodes?.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6" onKeyDown={onKeyDown}>
          <motion.div className="absolute inset-0 bg-ink/60 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-title"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative grid max-h-[94vh] w-full max-w-5xl grid-cols-1 overflow-hidden bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] lg:grid-cols-[340px_1fr]"
          >
            {/* Side panel */}
            <aside className="relative hidden flex-col justify-between bg-ink p-8 text-white lg:flex">
              <div>
                <p className="eyebrow text-white/50">Request a quote</p>
                <p className="mt-4 font-display text-[26px] font-medium leading-tight">Tell us what you need. We&rsquo;ll prepare a quotation for your requirement.</p>
              </div>
              {p ? (
                <div className="mt-8 border-t border-white/10 pt-6">
                  <div className="aspect-[4/3] overflow-hidden"><ProductRender kind={p.render.kind} size={p.render.size} label={p.name} /></div>
                  <p className="mt-4 text-[12px] uppercase tracking-[0.14em] text-white/45">{p.categoryName}</p>
                  <p className="mt-1 font-display text-lg">{p.name}</p>
                </div>
              ) : (
                <ul className="mt-8 space-y-3 border-t border-white/10 pt-6 text-[14px] text-white/70">
                  <li>— Project and bulk quantities</li>
                  <li>— Specification guidance</li>
                  <li>— Dealer & distributor enquiries</li>
                </ul>
              )}
            </aside>

            <div className="overflow-y-auto overscroll-contain">
              <div className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-line bg-white px-5 py-5 sm:px-8">
                <div>
                  <h2 id="quote-title" className="font-display text-xl font-medium sm:text-2xl">Request a Quote</h2>
                  <p className="mt-1 text-[13px] text-muted">{p ? <>For <span className="text-ink">{productLabel(product)}</span> — change below if needed.</> : 'Prices depend on specification and quantity. Share your requirement for an accurate quote.'}</p>
                </div>
                <button type="button" onClick={onClose} className="-mr-2 flex h-10 w-10 shrink-0 items-center justify-center text-ink transition-colors hover:bg-mist" aria-label="Close quote form">
                  <X className="h-5 w-5" strokeWidth={1.75} />
                </button>
              </div>
              <div className="px-5 py-6 sm:px-8 sm:py-8">
                <EnquiryForm key={formKey} variant="quote" compact initial={{ product }} onDone={onClose} />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
