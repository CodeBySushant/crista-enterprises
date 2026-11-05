import { NavLink } from 'react-router-dom';
import { ArrowRight, Gift } from 'lucide-react';
import { giftingNav } from '../../data/navigation';
import cn from '../../utils/cn';

/**
 * Entry point for the Corporate Gifting vertical.
 * A restrained green → cyan gradient taken from the Crista logo mark.
 *
 * variant "nav"    → compact pill for the desktop header
 * variant "drawer" → full-width row for the mobile drawer
 */
const GRADIENT =
  'bg-[linear-gradient(120deg,#0f8f52_0%,#0c8a78_55%,#0a7f96_100%)]';

export default function GiftingLink({ variant = 'nav', onClick }) {
  if (variant === 'drawer') {
    return (
      <NavLink
        to={giftingNav.to}
        onClick={onClick}
        className={({ isActive }) =>
          cn(
            'group relative flex items-center justify-between overflow-hidden rounded-sm px-4 py-3.5 text-white',
            GRADIENT,
            isActive && 'ring-2 ring-ink/80 ring-offset-2',
          )
        }
      >
        <span className="relative flex items-center gap-3">
          <Gift className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
          <span>
            <span className="block text-[15px] font-medium leading-tight">{giftingNav.label}</span>
            <span className="block text-[12px] leading-tight text-white/70">{giftingNav.description}</span>
          </span>
        </span>
        <ArrowRight className="relative h-4 w-4 opacity-80" aria-hidden="true" />
      </NavLink>
    );
  }

  return (
    <NavLink
      to={giftingNav.to}
      onClick={onClick}
      title={giftingNav.description}
      aria-label={giftingNav.label}
      className={({ isActive }) =>
        cn(
          'group relative inline-flex h-9 items-center gap-2 overflow-hidden rounded-sm px-2.5 text-[13.5px] xl:pl-3 xl:pr-3.5 font-medium tracking-[0.005em] text-white',
          'shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12),0_1px_2px_rgba(23,25,28,0.12)]',
          'transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-px hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18),0_6px_14px_-6px_rgba(10,127,150,0.45)]',
          GRADIENT,
          isActive && 'ring-1 ring-ink/70 ring-offset-2',
        )
      }
    >
      {/* soft sheen that slides across on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/15 opacity-0 transition-all duration-700 ease-brand group-hover:left-[110%] group-hover:opacity-100"
      />
      <Gift className="relative h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
      <span className="relative hidden xl:inline">{giftingNav.label}</span>
    </NavLink>
  );
}
