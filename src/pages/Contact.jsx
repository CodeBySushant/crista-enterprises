import { useSearchParams } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import usePageMeta from '../hooks/usePageMeta';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import EnquiryForm from '../components/EnquiryForm/EnquiryForm';
import { site, ENQUIRY_TYPES } from '../data/site';
import { getProduct } from '../data/products';

const ICONS = { email: Mail, phone: Phone, address: MapPin, hours: Clock };
const LABELS = { email: 'Email', phone: 'Phone', address: 'Office', hours: 'Hours' };

export default function Contact() {
  usePageMeta('Contact Us', 'Contact Crista Enterprises for quotations, bulk orders, dealer enquiries and product information on commercial lighting and gym equipment.');
  const [params] = useSearchParams();
  const typeParam = params.get('type');
  const productParam = params.get('product');
  const enquiryType = ENQUIRY_TYPES.some((t) => t.value === typeParam) ? typeParam : '';
  const product = productParam && getProduct(productParam) ? productParam : '';

  return (
    <>
      <section className="border-b border-line">
        <div className="wrap pt-10 lg:pt-14">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]} />
          <div className="grid gap-8 py-14 lg:grid-cols-12 lg:py-20">
            <div className="lg:col-span-7">
              <p className="eyebrow">Contact &amp; business enquiries</p>
              <h1 className="display-lg mt-6">Let&rsquo;s talk about your requirement.</h1>
            </div>
            <p className="lede self-end lg:col-span-4 lg:col-start-9">
              Share your project, product or quantity requirement and our team will get back to you with the right information.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap grid gap-12 py-14 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <aside className="lg:col-span-4">
          <h2 className="text-[12px] font-medium uppercase tracking-[0.14em] text-muted">Contact details</h2>
          <ul className="mt-5 border-t border-line">
            {Object.entries(site.contact).map(([k, v]) => {
              const Icon = ICONS[k];
              return (
                <li key={k} className="flex gap-4 border-b border-line py-5">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-ink" strokeWidth={1.5} aria-hidden="true" />
                  <div>
                    <p className="text-[12px] uppercase tracking-[0.12em] text-muted">{LABELS[k]}</p>
                    <p className="mt-1 text-[15px] text-ink">{v.href ? <a href={v.href} className="hover:text-accent-ink">{v.value}</a> : v.value}</p>
                    {v.placeholder && <p className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-muted/80">Placeholder — to be updated</p>}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 bg-ink p-7 text-white">
            <p className="text-[12px] uppercase tracking-[0.14em] text-white/50">What to include</p>
            <ul className="mt-4 space-y-3 text-[14px] leading-relaxed text-white/80">
              <li>— Product or category of interest</li>
              <li>— Approximate quantity</li>
              <li>— Application or site details</li>
              <li>— Delivery location and timeline</li>
            </ul>
          </div>
        </aside>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="border border-line bg-white p-5 sm:p-10">
            <h2 className="font-display text-2xl font-medium">Business enquiry form</h2>
            <p className="mt-2 text-[14px] text-muted">Fields marked * are required.</p>
            <div className="mt-8">
              <EnquiryForm key={`${enquiryType}-${product}`} variant="contact" initial={{ enquiryType, product }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
