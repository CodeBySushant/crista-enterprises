import { SearchX } from 'lucide-react';
import ProductCard from '../ProductCard/ProductCard';
import GymProductCard from '../ProductCard/GymProductCard';
import Button from '../Buttons/Button';
import cn from '../../utils/cn';

export default function ProductGrid({ products, onReset, cols = 'sm:grid-cols-2 xl:grid-cols-3', className }) {
  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center border border-dashed border-line bg-white px-6 py-20 text-center">
        <SearchX className="h-8 w-8 text-muted" strokeWidth={1.25} aria-hidden="true" />
        <h3 className="mt-5 font-display text-xl font-medium">No products match these filters</h3>
        <p className="mt-2 max-w-sm text-[14px] text-muted">Try removing a filter, or tell us what you need and our team will help you find the right product.</p>
        {onReset && <Button variant="outline" className="mt-6" onClick={onReset}>Clear all filters</Button>}
      </div>
    );
  }
  return (
    <ul className={cn('grid grid-cols-1 gap-4 lg:gap-5', cols, className)}>
      {products.map((p) => (
        <li key={p.slug}>{p.division === 'gym' ? <GymProductCard product={p} /> : <ProductCard product={p} />}</li>
      ))}
    </ul>
  );
}
