import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUp, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube, Clock } from 'lucide-react';
import Logo from '../Common/Logo';
import Button from '../Buttons/Button';
import { footerNav } from '../../data/navigation';
import { site } from '../../data/site';
import { useQuote } from '../../context/QuoteContext';

const SOCIAL_ICONS = { linkedin: Linkedin, instagram: Instagram, facebook: Facebook, youtube: Youtube };

function Column({ title, children }) {
  return (
    <div>
      <h3 className="font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-white/45">{title}</h3>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

const linkCls = 'link-underline text-[14px] text-white/80 transition-colors hover:text-white';

function Placeholder({ children }) {
  return (
    <span className="text-white/80">
      {children}
      <span className="ml-2 align-middle text-[10px] uppercase tracking-[0.14em] text-white/35">placeholder</span>
    </span>
  );
}

export default function Footer() {
  const { openQuote } = useQuote();
  const year = new Date().getFullYear();
  const { contact } = site;

  return (
    <footer className="bg-ink text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      {/* Enquiry band */}
      <div className="border-b border-white/10">
        <div className="wrap grid gap-8 py-14 lg:grid-cols-12 lg:items-end lg:py-20">
          <p className="font-display text-[28px] font-medium leading-[1.12] tracking-[-0.025em] sm:text-4xl lg:col-span-7 lg:text-[44px]">
            Lighting and fitness equipment, <span className="text-white/45">supplied for business.</span>
          </p>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <Button variant="accent" size="lg" icon={ArrowRight} onClick={() => openQuote()}>Request a Quote</Button>
            <Button variant="outline-light" size="lg" to="/contact">Contact our team</Button>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="wrap grid grid-cols-2 gap-x-6 gap-y-12 py-14 md:grid-cols-4 lg:grid-cols-12 lg:py-16">
        <div className="col-span-2 md:col-span-4 lg:col-span-3 lg:pr-6">
          <Logo tone="light" className="h-10" />
          <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-white/60">
            Crista Enterprises is a B2B supplier of commercial and industrial LED lighting and commercial gym equipment for
            contractors, institutions, facilities and dealers.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-[12px] text-white/60">
            <Link to="/products/lighting" className="rounded-sm border border-white/15 px-3 py-1.5 transition-colors hover:border-white/40 hover:text-white">Crista Lights</Link>
            <Link to="/products/gym-equipment" className="rounded-sm border border-white/15 px-3 py-1.5 transition-colors hover:border-white/40 hover:text-white">Crista Gym Equipment</Link>
          </div>
          <ul className="mt-8 flex gap-2" aria-label="Social media">
            {site.social.map((s) => {
              const Icon = SOCIAL_ICONS[s.id];
              return (
                <li key={s.id}>
                  <a href={s.href} onClick={(e) => s.href === '#' && e.preventDefault()} aria-label={`${s.label} (link to be added)`} title={`${s.label} — link to be added`} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white hover:bg-white hover:text-ink">
                    <Icon className="h-[17px] w-[17px]" strokeWidth={1.5} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <Column title="Products">
            {footerNav.products.map((l) => <li key={l.label}><Link to={l.to} className={linkCls}>{l.label}</Link></li>)}
          </Column>
        </div>
        <div className="lg:col-span-2">
          <Column title="Company">
            {footerNav.company.map((l) => <li key={l.label}><Link to={l.to} className={linkCls}>{l.label}</Link></li>)}
          </Column>
        </div>
        <div className="lg:col-span-2">
          <Column title="Business Support">
            {footerNav.support.map((l) => (
              <li key={l.label}>
                {l.quote ? (
                  <button type="button" onClick={() => openQuote()} className={linkCls}>{l.label}</button>
                ) : (
                  <Link to={l.to} className={linkCls}>{l.label}</Link>
                )}
              </li>
            ))}
          </Column>
        </div>
        <div className="col-span-2 md:col-span-1 lg:col-span-3">
          <Column title="Contact">
            <li className="flex gap-3 text-[14px]"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/40" strokeWidth={1.5} aria-hidden="true" /><Placeholder>{contact.email.value}</Placeholder></li>
            <li className="flex gap-3 text-[14px]"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-white/40" strokeWidth={1.5} aria-hidden="true" /><Placeholder>{contact.phone.value}</Placeholder></li>
            <li className="flex gap-3 text-[14px]"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/40" strokeWidth={1.5} aria-hidden="true" /><Placeholder>{contact.address.value}</Placeholder></li>
            <li className="flex gap-3 text-[14px]"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-white/40" strokeWidth={1.5} aria-hidden="true" /><span className="text-white/80">{contact.hours.value}</span></li>
          </Column>
        </div>
      </div>

      {/* Legal */}
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-4 py-6 text-[13px] text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {year} Crista Enterprises. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms &amp; Conditions</Link>
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-2 hover:text-white">
              Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
