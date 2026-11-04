import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { productMenu } from '../../data/navigation';
import SmartImage from '../Common/SmartImage';

/** Products mega menu — the two divisions as distinct, image-led columns. */
export default function MegaMenu({ id, onNavigate, onQuote }) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18, ease: [0.2, 0.7, 0.2, 1] }}
      className="absolute inset-x-0 top-full border-b border-t border-line bg-white shadow-[0_24px_48px_-24px_rgba(23,25,28,0.25)]"
    >
      <div className="wrap">
      <div className="grid grid-cols-2 gap-px bg-line">
        {productMenu.map((div) => (
          <div key={div.id} className="grid grid-cols-[minmax(0,220px)_1fr] gap-8 bg-white py-8 pr-8 first:pl-0 [&:not(:first-child)]:pl-8">
            <Link to={div.to} onClick={onNavigate} className="group/tile relative block aspect-[4/5] overflow-hidden">
              <SmartImage image={div.image} className="absolute inset-0" imgClassName="transition-transform duration-700 ease-brand group-hover/tile:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className="text-[11px] uppercase tracking-[0.16em] text-white/60">{div.kicker}</p>
                <p className="mt-1 font-display text-lg font-medium leading-snug">{div.title}</p>
              </div>
            </Link>
            <div className="flex flex-col">
              <p className="max-w-xs text-[14px] leading-relaxed text-muted">{div.description}</p>
              <ul className="mt-5 border-t border-line">
                {div.links.map((l) => (
                  <li key={l.label} className="border-b border-line">
                    <Link
                      to={l.to}
                      onClick={onNavigate}
                      className="group/link flex items-center justify-between gap-4 py-3 text-[15px] text-ink outline-offset-[-2px] transition-colors hover:text-accent-ink"
                    >
                      <span>{l.label}</span>
                      <span className="flex items-center gap-3 text-[12px] text-muted">
                        {l.note}
                        <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-100" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to={div.to} onClick={onNavigate} className="mt-auto inline-flex items-center gap-2 pt-5 text-[13px] font-medium text-ink hover:text-accent-ink">
                {div.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      </div>
      <div className="border-t border-line bg-paper">
        <div className="wrap flex items-center justify-between py-3.5 text-[13px]">
          <Link to="/products" onClick={onNavigate} className="link-underline text-ink">View the complete product range</Link>
          <span className="text-muted">
            Need bulk or project pricing?{' '}
            <button type="button" onClick={onQuote} className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink">Request a quote</button>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
