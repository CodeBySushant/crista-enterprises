import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import SmartImage from '../Common/SmartImage';
import Button from '../Buttons/Button';
import { useQuote } from '../../context/QuoteContext';

const ease = [0.2, 0.7, 0.2, 1];

const divisions = [
  { n: '01', title: 'Crista Lights', text: 'Street, flood, solar & industrial LED', to: '/products/lighting' },
  { n: '02', title: 'Crista Gym Equipment', text: 'Strength, cardio & commercial fitness', to: '/products/gym-equipment' },
];

export default function Hero() {
  const { openQuote } = useQuote();
  return (
    <section className="relative isolate bg-ink text-white" aria-labelledby="hero-title">
      <SmartImage image="heroNight" eager sizes="100vw" className="absolute inset-0 -z-10" imgClassName="object-[center_60%]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/10" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/30" aria-hidden="true" />

      <div className="wrap flex min-h-[calc(100svh-var(--header-h))] flex-col justify-end pb-0 pt-24 lg:min-h-[min(860px,calc(100svh-var(--header-h)-36px))] lg:pt-32">
        <div className="grid gap-10 pb-12 lg:grid-cols-12 lg:items-end lg:pb-16">
          <div className="lg:col-span-8">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease }} className="flex items-center gap-3 text-eyebrow font-medium uppercase text-white/60">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              Commercial lighting · Fitness equipment · B2B supply
            </motion.p>
            <h1 id="hero-title" className="display-xl mt-6 text-white">
              <motion.span className="block" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.05 }}>
                Powering Spaces.
              </motion.span>
              <motion.span className="block text-white/55" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.15 }}>
                Equipping Businesses.
              </motion.span>
            </h1>
          </div>
          <motion.div className="lg:col-span-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.3 }}>
            <p className="max-w-md text-[17px] leading-relaxed text-white/75">
              Reliable lighting solutions and commercial fitness equipment for businesses, institutions and infrastructure projects.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/products" variant="accent" size="lg" icon={ArrowRight}>Explore Products</Button>
              <Button variant="outline-light" size="lg" onClick={() => openQuote()}>Request a Quote</Button>
            </div>
          </motion.div>
        </div>

        {/* Division index — attached to the hero's base */}
        <motion.nav
          aria-label="Product divisions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.45 }}
          className="grid grid-cols-1 border-t border-white/15 sm:grid-cols-2"
        >
          {divisions.map((d, i) => (
            <Link
              key={d.n}
              to={d.to}
              className={`group flex items-center justify-between gap-6 py-5 transition-colors sm:py-7 ${i === 1 ? 'border-t border-white/15 sm:border-l sm:border-t-0 sm:pl-8' : 'sm:pr-8'}`}
            >
              <span className="flex items-baseline gap-5">
                <span className="tabular text-[12px] text-accent">{d.n}</span>
                <span>
                  <span className="block font-display text-lg font-medium sm:text-xl">{d.title}</span>
                  <span className="mt-0.5 block text-[13px] text-white/55">{d.text}</span>
                </span>
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 transition-colors duration-200 group-hover:border-white group-hover:bg-white group-hover:text-ink">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </motion.nav>
      </div>
    </section>
  );
}
