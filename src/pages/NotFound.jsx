import { ArrowRight } from 'lucide-react';
import usePageMeta from '../hooks/usePageMeta';
import Button from '../components/Buttons/Button';

export default function NotFound() {
  usePageMeta('Page not found');
  return (
    <section className="wrap flex min-h-[60vh] flex-col justify-center py-20">
      <p className="tabular text-eyebrow font-medium uppercase text-accent-ink">Error 404</p>
      <h1 className="display-lg mt-5 max-w-2xl">We couldn&rsquo;t find that page.</h1>
      <p className="lede mt-5 max-w-lg">The page or product may have moved. Browse the catalogue or get in touch and we&rsquo;ll help.</p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Button to="/products" icon={ArrowRight}>Browse products</Button>
        <Button to="/" variant="outline">Back to home</Button>
      </div>
    </section>
  );
}
