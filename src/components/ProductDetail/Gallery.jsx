import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductRender from '../ProductRender/ProductRender';
import SmartImage from '../Common/SmartImage';
import cn from '../../utils/cn';

/** Product image gallery with thumbnails, arrows and keyboard support. */
export default function Gallery({ product }) {
  const slides = [
    { id: 'studio', label: 'Product view', node: <ProductRender kind={product.render.kind} size={product.render.size} label={product.name} /> },
    { id: 'technical', label: 'Technical view', node: <ProductRender kind={product.render.kind} size={product.render.size} view="technical" label={`${product.name} technical`} /> },
    { id: 'detail', label: 'Detail', node: <ProductRender kind={product.render.kind} size={product.render.size} view="detail" label={`${product.name} detail`} /> },
    { id: 'application', label: 'Application', node: <SmartImage image={product.photo} className="h-full w-full" /> },
  ];
  const [i, setI] = useState(0);
  const go = (n) => setI((n + slides.length) % slides.length);

  return (
    <div
      className="lg:sticky lg:top-[calc(var(--header-h)+24px)]"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(i + 1);
        if (e.key === 'ArrowLeft') go(i - 1);
      }}
    >
      <div className="group relative aspect-[4/3] overflow-hidden border border-line bg-mist" aria-roledescription="carousel" aria-label={`${product.name} images`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={slides[i].id} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {slides[i].node}
          </motion.div>
        </AnimatePresence>
        <span className="absolute left-4 top-4 bg-white/90 px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-charcoal">{slides[i].label}</span>
        <span className="tabular absolute bottom-4 left-4 text-[12px] text-ink/60">{String(i + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
        <div className="absolute bottom-3 right-3 flex gap-1">
          <button type="button" onClick={() => go(i - 1)} className="flex h-10 w-10 items-center justify-center bg-white text-ink transition-colors hover:bg-ink hover:text-white" aria-label="Previous image"><ChevronLeft className="h-5 w-5" strokeWidth={1.5} /></button>
          <button type="button" onClick={() => go(i + 1)} className="flex h-10 w-10 items-center justify-center bg-white text-ink transition-colors hover:bg-ink hover:text-white" aria-label="Next image"><ChevronRight className="h-5 w-5" strokeWidth={1.5} /></button>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3" role="tablist" aria-label="Choose image">
        {slides.map((s, n) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === n}
            aria-label={s.label}
            onClick={() => setI(n)}
            className={cn('relative aspect-[4/3] overflow-hidden border transition-[border-color,opacity] duration-200', i === n ? 'border-ink' : 'border-line opacity-70 hover:opacity-100')}
          >
            <span className="pointer-events-none absolute inset-0">{s.node}</span>
          </button>
        ))}
      </div>
      <p className="mt-3 text-[12px] text-muted">Renders are representative. Actual product photography to be supplied.</p>
    </div>
  );
}
