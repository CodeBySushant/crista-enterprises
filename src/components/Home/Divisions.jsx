import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SmartImage from '../Common/SmartImage';
import Reveal from '../Common/Reveal';
import SectionHeader from '../Common/SectionHeader';
import Button from '../Buttons/Button';

const DIVS = [
  {
    n: 'Division 01',
    title: 'Crista Lights',
    text: 'Commercial and industrial LED lighting for roads, sites, campuses and facilities.',
    image: 'streetNight',
    to: '/products/lighting',
    cta: 'Explore Lighting Solutions',
    links: [
      { label: 'LED Street Lights', to: '/products/lighting?category=street' },
      { label: 'LED Flood Lights', to: '/products/lighting?category=flood' },
      { label: 'Solar Street Lights', to: '/products/lighting?category=solar' },
      { label: 'Industrial Lighting', to: '/products/lighting?category=industrial' },
    ],
  },
  {
    n: 'Division 02',
    title: 'Crista Gym Equipment',
    text: 'Commercial fitness equipment for gyms, hotels, schools and institutional facilities.',
    image: 'gymWide',
    to: '/products/gym-equipment',
    cta: 'Explore Gym Equipment',
    links: [
      { label: 'Strength Equipment', to: '/products/gym-equipment?category=strength' },
      { label: 'Cardio Equipment', to: '/products/gym-equipment?category=cardio' },
      { label: 'Gym Accessories', to: '/products/gym-equipment?category=accessories' },
      { label: 'Commercial Fitness Solutions', to: '/products/gym-equipment' },
    ],
  },
];

export default function Divisions() {
  return (
    <section className="bg-ink py-20 text-white lg:py-28" aria-labelledby="divisions-title">
      <div className="wrap">
        <SectionHeader
          tone="light"
          index="02"
          eyebrow="Our product divisions"
          title={<span id="divisions-title">Two specialised divisions. One dependable supplier.</span>}
        />
        <div className="mt-14 grid gap-4 lg:grid-cols-2 lg:gap-5">
          {DIVS.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.08}>
              <article className="group relative flex min-h-[560px] flex-col justify-end overflow-hidden lg:min-h-[680px]">
                <SmartImage image={d.image} className="absolute inset-0" imgClassName="transition-transform duration-[1200ms] ease-brand group-hover:scale-[1.04]" sizes="(min-width:1024px) 50vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/5" aria-hidden="true" />
                <div className="relative p-6 sm:p-10">
                  <p className="flex items-center gap-3 text-eyebrow font-medium uppercase text-white/60">
                    <span className="h-px w-6 bg-accent" aria-hidden="true" />{d.n}
                  </p>
                  <h3 className="mt-4 font-display text-[34px] font-medium leading-[1.05] tracking-[-0.03em] text-white sm:text-[44px]">{d.title}</h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/70">{d.text}</p>
                  <ul className="mt-8 grid border-t border-white/15 sm:grid-cols-2">
                    {d.links.map((l, j) => (
                      <li key={l.label} className={`border-b border-white/15 ${j % 2 === 1 ? 'sm:border-l sm:pl-5' : 'sm:pr-5'}`}>
                        <Link to={l.to} className="group/l flex items-center justify-between py-3.5 text-[14px] text-white/85 transition-colors hover:text-white">
                          {l.label}
                          <ArrowRight className="h-4 w-4 -translate-x-1 opacity-40 transition-all group-hover/l:translate-x-0 group-hover/l:text-accent group-hover/l:opacity-100" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Button to={d.to} variant="light" size="lg" icon={ArrowRight} className="mt-8">{d.cta}</Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
