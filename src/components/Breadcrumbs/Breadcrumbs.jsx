import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import cn from '../../utils/cn';

export default function Breadcrumbs({ items, tone = 'dark', className }) {
  const light = tone === 'light';
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className={cn('flex flex-wrap items-center gap-1.5 text-[13px]', light ? 'text-white/55' : 'text-muted')}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.to && !last ? (
                <Link to={item.to} className={cn('transition-colors', light ? 'hover:text-white' : 'hover:text-ink')}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={cn(last && (light ? 'text-white' : 'text-ink'))}>
                  {item.label}
                </span>
              )}
              {!last && <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
