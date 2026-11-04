import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import images from '../../data/images';
import cn from '../../utils/cn';

/**
 * Image with lazy loading, fade-in and a branded fallback panel.
 * Accepts either an image key from data/images.js or { src, alt }.
 */
export default function SmartImage({ image, src, alt, className, imgClassName, eager = false, sizes, children }) {
  const entry = typeof image === 'string' ? images[image] : image;
  const url = src ?? entry?.src;
  const label = alt ?? entry?.alt ?? '';
  const tone = entry?.tone ?? 'dark';
  const [state, setState] = useState(url ? 'loading' : 'error');

  return (
    <div className={cn(/\b(absolute|fixed)\b/.test(className ?? '') ? '' : 'relative', 'overflow-hidden', tone === 'dark' ? 'bg-[#23262a]' : 'bg-mist', className)}>
      {state === 'error' ? (
        <div
          role="img"
          aria-label={label}
          className={cn('absolute inset-0 flex items-start p-5', tone === 'dark' ? 'tech-grid-dark text-white/40' : 'tech-grid text-ink/40')}
        >
          <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em]">
            <ImageOff className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            {label}
          </span>
        </div>
      ) : (
        <img
          src={url}
          alt={label}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          // eslint-disable-next-line react/no-unknown-property -- lowercase attr avoids React 18 warning
          fetchpriority={eager ? 'high' : undefined}
          sizes={sizes}
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-brand',
            state === 'loaded' ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
        />
      )}
      {children}
    </div>
  );
}
