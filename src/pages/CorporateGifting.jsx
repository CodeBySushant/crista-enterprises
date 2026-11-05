import { ArrowLeft, Gift } from 'lucide-react';
import usePageMeta from '../hooks/usePageMeta';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Button from '../components/Buttons/Button';

/** Placeholder — the full Corporate Gifting page will be designed separately. */
export default function CorporateGifting() {
  usePageMeta(
    'Corporate Gifting',
    'Customised corporate gifts and festival gifting solutions from Crista Enterprises for businesses, HR teams and organisations.',
  );

  return (
    <section className="wrap py-10 lg:py-14">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Corporate Gifting' }]} />

      <div className="flex min-h-[56vh] flex-col justify-center py-16 lg:py-24">
        <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-[linear-gradient(120deg,#0f8f52_0%,#0c8a78_55%,#0a7f96_100%)] text-white">
          <Gift className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <p className="eyebrow mt-8">A new Crista vertical</p>
        <h1 className="display-lg mt-4 max-w-3xl">Corporate Gifting Solutions</h1>
        <p className="lede mt-6 max-w-2xl">
          Crista Enterprises provides customised corporate gifts and festival gifting solutions for businesses, HR
          departments and organisations. This page is being prepared and will be available soon.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/" variant="outline" iconLeft={ArrowLeft}>Back to home</Button>
        </div>
      </div>
    </section>
  );
}
