# Crista Enterprises — B2B Corporate Website (Frontend)

React 18 · Vite 5 · Tailwind CSS 3 · React Router 6 · Lucide · Framer Motion (used sparingly; respects reduced motion).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Routes
| Route | Page |
|---|---|
| `/` | Home — hero, intro, divisions, featured lighting, why Crista, industries, enquiry CTA |
| `/products` | All products (search + filters across both divisions) |
| `/products/lighting` | Crista Lights catalogue — category tabs, category / wattage / type filters, sorting |
| `/products/gym-equipment` | Crista Gym Equipment catalogue — category / type / usage filters, sorting |
| `/products/:slug` | Product detail — gallery, key specs, spec table, applications, related |
| `/about`, `/industries`, `/contact` | Company pages (`/contact?type=dealer|bulk|product&product=<slug>` prefill the form) |
| `/privacy-policy`, `/terms` | Legal page shells (text to be supplied) |

Filters, sort and search are synced to the URL, so filtered views can be shared and linked (the mega menu uses this).

## Where things live
- `src/data/products.js` — catalogue data, shaped like a future API response. **All specs are sample data** and labelled as such in the UI.
- `src/data/images.js` — every photograph in one place (currently Unsplash). Swap in real Crista photography here.
- `src/data/site.js` — contact details (**placeholders**), social links, enquiry types.
- `src/data/navigation.js`, `src/data/industries.js` — menus and industry content.
- `src/context/QuoteContext.jsx` — global Request-a-Quote modal: `openQuote({ product: slug })` from anywhere.
- `src/utils/validate.js` — form validation and `submitEnquiry()` (simulated; replace with your API call).
- `src/components/ProductRender` — SVG studio renders used as product imagery until real product photos exist.

## Before launch
1. Replace placeholder contact details and social URLs in `site.js`.
2. Replace sample specifications with verified manufacturer data.
3. Add real product photographs (replace `ProductRender` in `ProductCard` / `Gallery`) and site photography in `images.js`.
4. Connect `submitEnquiry()` to a backend, CRM or form service.
5. Supply Privacy Policy and Terms text.
6. For SPA hosting, configure a fallback rewrite to `index.html`.
