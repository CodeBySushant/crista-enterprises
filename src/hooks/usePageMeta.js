import { useEffect } from 'react';
import { site } from '../data/site';

/** Sets document title + meta description per route (SEO-friendly SPA). */
export default function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.name}` : `${site.name} — Commercial Lighting & Gym Equipment Supplier`;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'description');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', description || site.description);
  }, [title, description]);
}
