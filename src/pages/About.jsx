import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import usePageMeta from '../hooks/usePageMeta';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import SmartImage from '../components/Common/SmartImage';
import Reveal from '../components/Common/Reveal';
import SectionHeader from '../components/Common/SectionHeader';
import IndustriesShowcase from '../components/Home/IndustriesShowcase';
import EnquiryCTA from '../components/Home/EnquiryCTA';
import { REASONS } from '../components/Home/WhyCrista';
import { productMenu } from '../data/navigation';

const APPROACH = [
  { t: 'Understand the requirement', d: 'We start with your application — site, environment, usage, quantity and timeline — rather than a product list.' },
  { t: 'Recommend the right products', d: 'We match wattage, optics, equipment mix and specifications to what the project actually needs.' },
  { t: 'Quote clearly', d: 'You receive a quotation built around your specification and volume, with the details needed to compare and approve.' },
  { t: 'Coordinate supply', d: 'We stay your single point of contact through order confirmation and delivery planning.' },
];

export default function About() {
  usePageMeta('About Us', 'Crista Enterprises is a B2B supplier of commercial LED lighting and commercial gym equipment. Learn about our approach, divisions and the industries we serve.');
  return (
    <>
      <section className="border-b border-line">
        <div className="wrap pt-10 lg:pt-14">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About Us' }]} />
          <div className="grid gap-12 py-14 lg:grid-cols-12 lg:py-20">
            <div className="lg:col-span-7">
              <p className="eyebrow">About Crista Enterprises</p>
              <h1 className="display-xl mt-6 !text-[2.5rem] sm:!text-6xl lg:!text-[4.5rem]">Supplying the products businesses depend on.</h1>
            </div>
            <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
              <p className="text-[17px] leading-relaxed text-charcoal/80">
                Crista Enterprises is a business-to-business supplier with two focused divisions: <strong className="font-medium text-ink">Crista Lights</strong>,
                for commercial and industrial LED lighting, and <strong className="font-medium text-ink">Crista Gym Equipment</strong>, for commercial fitness equipment.
              </p>
            </div>
          </div>
        </div>
        <div className="wrap pb-16 lg:pb-24">
          <div className="grid grid-cols-12 gap-3 lg:gap-4">
            <SmartImage image="warehouse" eager className="col-span-12 aspect-[16/9] md:col-span-8 md:aspect-auto md:h-[520px]" sizes="66vw" />
            <div className="col-span-12 grid grid-cols-2 gap-3 md:col-span-4 md:grid-cols-1 lg:gap-4">
              <SmartImage image="streetNight" className="aspect-square md:aspect-auto md:h-[253px]" sizes="33vw" />
              <SmartImage image="gymStrength" className="aspect-square md:aspect-auto md:h-[253px]" sizes="33vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 lg:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="flex items-center gap-4 border-t border-line pt-4">
              <span className="tabular text-eyebrow font-medium text-accent-ink">01</span>
              <span className="eyebrow">Who we are</span>
            </div>
          </Reveal>
          <Reveal className="space-y-6 text-[18px] leading-relaxed text-charcoal/85 lg:col-span-7 lg:col-start-6" delay={0.05}>
            <p className="font-display text-[26px] font-medium leading-snug tracking-[-0.02em] text-ink sm:text-[30px]">
              We help contractors, facilities, institutions and dealers source dependable lighting and fitness equipment —
              specified properly and quoted for the scale of their requirement.
            </p>
            <p>
              Our customers range from construction and infrastructure contractors to factories, hotels, schools, gyms and
              distributors. What they share is a need for products that perform in demanding, everyday commercial use, and a
              supplier who responds clearly to their specifications and quantities.
            </p>
            <p>
              We are not a retail store. Every enquiry is handled as a business requirement, and every quotation is prepared
              against the specification, quantity and timeline you share with us.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-ink py-20 text-white lg:py-28">
        <div className="wrap">
          <SectionHeader tone="light" index="02" eyebrow="Our business approach" title="A clear, requirement-led process." />
          <ol className="mt-14 grid border-t border-white/15 md:grid-cols-2 lg:grid-cols-4">
            {APPROACH.map((a, i) => (
              <Reveal as="li" key={a.t} delay={i * 0.06} className={`border-b border-white/15 py-8 md:pr-8 lg:border-b-0 ${i ? 'lg:border-l lg:pl-8' : ''} ${i % 2 ? 'md:border-l md:pl-8 lg:pl-8' : ''}`}>
                <span className="tabular font-display text-[44px] font-medium leading-none text-white/20">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-8 font-display text-xl font-medium text-white">{a.t}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/60">{a.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Divisions */}
      <section className="py-20 lg:py-28">
        <div className="wrap">
          <SectionHeader index="03" eyebrow="Product divisions" title="Two divisions, one standard of service." />
          <div className="mt-14 space-y-4">
            {productMenu.map((d, i) => (
              <Reveal key={d.id} className="grid overflow-hidden border border-line bg-white md:grid-cols-12">
                <SmartImage image={d.image} className={`aspect-[16/9] md:col-span-5 md:aspect-auto md:min-h-[320px] ${i % 2 ? 'md:order-2' : ''}`} sizes="40vw" />
                <div className="flex flex-col justify-between p-7 sm:p-10 md:col-span-7">
                  <div>
                    <p className="text-eyebrow font-medium uppercase text-accent-ink">{d.kicker}</p>
                    <h3 className="mt-3 font-display text-[30px] font-medium tracking-[-0.025em]">{d.title}</h3>
                    <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted">{d.description}</p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {d.links.map((l) => (
                      <Link key={l.label} to={l.to} className="rounded-sm border border-line px-3 py-2 text-[13px] text-charcoal transition-colors hover:border-ink hover:text-ink">{l.label}</Link>
                    ))}
                  </div>
                  <Link to={d.to} className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-ink hover:text-accent-ink">{d.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-line bg-white">
        <IndustriesShowcase index="04" />
      </div>

      {/* Why work with Crista */}
      <section className="border-t border-line py-20 lg:py-28">
        <div className="wrap">
          <SectionHeader index="05" eyebrow="Working with Crista" title="Why businesses can work with us." size="md" />
          <ul className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {REASONS.map((r) => (
              <li key={r.title} className="flex gap-4 border-t border-line py-6">
                <r.icon className="mt-0.5 h-5 w-5 shrink-0 text-accent-ink" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <h3 className="font-sans text-[15px] font-medium text-ink">{r.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{r.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="mt-10 inline-flex items-center gap-2 text-[14px] font-medium text-ink hover:text-accent-ink">Talk to our team <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </section>

      <EnquiryCTA image="industrial" />
    </>
  );
}
