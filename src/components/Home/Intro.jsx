import SmartImage from '../Common/SmartImage';
import Reveal from '../Common/Reveal';
import Button from '../Buttons/Button';
import { ArrowRight } from 'lucide-react';

const points = [
  { t: 'Two focused divisions', d: 'Commercial LED lighting and commercial gym equipment under one supplier.' },
  { t: 'Built for business buyers', d: 'Quotations shaped around specification, quantity and project timelines.' },
  { t: 'Single-unit to bulk', d: 'From individual requirements to project and distributor volumes.' },
  { t: 'One point of contact', d: 'A dedicated enquiry process from first question to delivery planning.' },
];

export default function Intro() {
  return (
    <section className="py-20 lg:py-32" aria-labelledby="intro-title">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="relative lg:col-span-5">
          <SmartImage image="warehouseStock" className="aspect-[4/5] w-full" sizes="(min-width:1024px) 40vw, 100vw" />
          <SmartImage image="construction" className="absolute -bottom-10 right-[-6%] hidden aspect-square w-[46%] border-[6px] border-paper sm:block" sizes="20vw" />
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          <Reveal>
            <div className="flex items-center gap-4 border-t border-line pt-4">
              <span className="tabular text-eyebrow font-medium text-accent-ink">01</span>
              <span className="eyebrow">About Crista Enterprises</span>
            </div>
            <h2 id="intro-title" className="display-lg mt-8">Products That Power Progress.</h2>
            <p className="mt-6 text-[17px] leading-relaxed text-charcoal/80">
              Crista Enterprises is a business-to-business supplier of commercial and industrial lighting and commercial gym
              equipment. We work with contractors, facility owners, institutions and dealers who need dependable products,
              clear specifications and a supplier that can respond to project-scale requirements.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="mt-12 grid gap-px bg-line sm:grid-cols-2">
              {points.map((p) => (
                <div key={p.t} className="bg-paper py-6 sm:pr-6 [&:nth-child(even)]:sm:pl-6">
                  <dt className="font-display text-[17px] font-medium text-ink">{p.t}</dt>
                  <dd className="mt-2 text-[14px] leading-relaxed text-muted">{p.d}</dd>
                </div>
              ))}
            </dl>
            <Button to="/about" variant="link" icon={ArrowRight} className="mt-10 text-[14px]">More about our approach</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
