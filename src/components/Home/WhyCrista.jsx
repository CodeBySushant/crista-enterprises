import { Boxes, BadgeCheck, ClipboardList, Headset, Layers, Scale } from 'lucide-react';
import Reveal from '../Common/Reveal';

export const REASONS = [
  { icon: Layers, title: 'Business-focused product solutions', text: 'A range selected for commercial, industrial and institutional use rather than retail consumers.' },
  { icon: Boxes, title: 'Bulk order capabilities', text: 'Enquiries for project quantities, phased deliveries and repeat supply are welcome.' },
  { icon: Scale, title: 'Competitive business pricing', text: 'Quotations are prepared against your specification and volume, not a fixed retail price list.' },
  { icon: BadgeCheck, title: 'Product quality and reliability', text: 'Products chosen for durability in demanding environments — outdoor, industrial and high-traffic.' },
  { icon: ClipboardList, title: 'Support for project requirements', text: 'Help matching wattage, optics, equipment mix and quantities to the needs of your project.' },
  { icon: Headset, title: 'Dedicated enquiry assistance', text: 'A single point of contact to answer product questions and coordinate your quotation.' },
];

export default function WhyCrista() {
  return (
    <section className="border-y border-line bg-white py-20 lg:py-28" aria-labelledby="why-title">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-[calc(var(--header-h)+40px)]">
            <div className="flex items-center gap-4 border-t border-line pt-4">
              <span className="tabular text-eyebrow font-medium text-accent-ink">04</span>
              <span className="eyebrow">Why choose Crista</span>
            </div>
            <h2 id="why-title" className="display-md mt-8">Your Trusted Partner for Business Supplies.</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              We keep the process simple for business buyers: clear product information, honest quotations and responsive
              support from enquiry to supply.
            </p>
          </Reveal>
        </div>
        <ol className="grid border-l border-t border-line sm:grid-cols-2 lg:col-span-8">
          {REASONS.map((r, i) => (
            <Reveal as="li" key={r.title} delay={(i % 2) * 0.06} className="group relative border-b border-r border-line p-7 transition-colors duration-300 hover:bg-paper sm:p-9">
              <div className="flex items-start justify-between">
                <r.icon className="h-6 w-6 text-ink" strokeWidth={1.25} aria-hidden="true" />
                <span className="tabular text-[12px] text-muted">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="mt-10 font-display text-[19px] font-medium leading-snug tracking-[-0.015em]">{r.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">{r.text}</p>
              <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 ease-brand group-hover:scale-x-100" aria-hidden="true" />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
