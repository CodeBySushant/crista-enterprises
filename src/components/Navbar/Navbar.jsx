import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, Search } from 'lucide-react';
import Logo from '../Common/Logo';
import Button from '../Buttons/Button';
import MegaMenu from '../MegaMenu/MegaMenu';
import MobileDrawer from './MobileDrawer';
import SearchOverlay from './SearchOverlay';
import { mainNav } from '../../data/navigation';
import { useQuote } from '../../context/QuoteContext';
import useEscape from '../../hooks/useEscape';
import cn from '../../utils/cn';

const itemBase =
  'relative inline-flex h-full items-center gap-1 px-3.5 text-[14px] font-medium tracking-[-0.005em] transition-colors duration-150 xl:px-4';

function ActiveBar({ show }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'absolute inset-x-3.5 bottom-0 h-[2px] origin-left bg-accent transition-transform duration-300 ease-brand xl:inset-x-4',
        show ? 'scale-x-100' : 'scale-x-0',
      )}
    />
  );
}

export default function Navbar() {
  const { openQuote } = useQuote();
  const { pathname, search } = useLocation();
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef(null);
  const productsBtn = useRef(null);
  const megaWrap = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMegaOpen(false);
    setDrawerOpen(false);
  }, [pathname, search]);

  const openMega = () => { clearTimeout(closeTimer.current); setMegaOpen(true); };
  const scheduleClose = () => { clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setMegaOpen(false), 140); };
  const closeMega = useCallback(() => setMegaOpen(false), []);
  useEscape(megaOpen, closeMega);

  const onProductsKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setMegaOpen(true);
      setTimeout(() => megaWrap.current?.querySelector('#products-menu a')?.focus(), 40);
    }
    if (e.key === 'Escape') { setMegaOpen(false); productsBtn.current?.focus(); }
  };

  const onMegaKey = (e) => {
    if (e.key === 'Escape') { setMegaOpen(false); productsBtn.current?.focus(); }
  };

  const onMegaBlur = (e) => {
    if (!megaWrap.current?.contains(e.relatedTarget)) setMegaOpen(false);
  };

  const productsActive = pathname.startsWith('/products');

  return (
    <>
      {/* Utility bar */}
      <div className="hidden bg-ink text-white/70 lg:block">
        <div className="wrap flex h-9 items-center justify-between text-[12px]">
          <p className="tracking-[0.02em]">B2B supply of commercial lighting &amp; fitness equipment</p>
          <ul className="flex items-center gap-6">
            <li><Link to="/contact?type=bulk" className="transition-colors hover:text-white">Bulk &amp; project orders</Link></li>
            <li><Link to="/contact?type=dealer" className="transition-colors hover:text-white">Become a dealer</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-white">Contact sales</Link></li>
          </ul>
        </div>
      </div>

      <header
        className={cn(
          'sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-[border-color,box-shadow] duration-300',
          scrolled ? 'border-line shadow-[0_6px_24px_-18px_rgba(23,25,28,0.35)]' : 'border-transparent',
        )}
      >
        <div ref={megaWrap} onMouseLeave={scheduleClose} onBlur={onMegaBlur} onKeyDown={onMegaKey}>
          <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
            <Logo />

            <nav aria-label="Primary" className="hidden h-full lg:block">
              <ul className="flex h-full items-stretch">
                {mainNav.map((item) =>
                  item.mega ? (
                    <li key={item.label} className="h-full" onMouseEnter={openMega}>
                      <button
                        ref={productsBtn}
                        type="button"
                        aria-expanded={megaOpen}
                        aria-controls="products-menu"
                        aria-haspopup="true"
                        onClick={() => setMegaOpen((o) => !o)}
                        onKeyDown={onProductsKey}
                        className={cn(itemBase, productsActive || megaOpen ? 'text-ink' : 'text-charcoal/75 hover:text-ink')}
                      >
                        {item.label}
                        <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', megaOpen && 'rotate-180')} strokeWidth={1.75} aria-hidden="true" />
                        <ActiveBar show={productsActive} />
                      </button>
                    </li>
                  ) : (
                    <li key={item.label} className="h-full" onMouseEnter={scheduleClose}>
                      <NavLink to={item.to} end={item.to === '/'} className={({ isActive }) => cn(itemBase, isActive ? 'text-ink' : 'text-charcoal/75 hover:text-ink')}>
                        {({ isActive }) => (<>{item.label}<ActiveBar show={isActive} /></>)}
                      </NavLink>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div className="flex items-center gap-1 sm:gap-2" onMouseEnter={scheduleClose}>
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex h-11 w-11 items-center justify-center text-ink transition-colors hover:bg-mist"
                aria-label="Search products"
              >
                <Search className="h-[19px] w-[19px]" strokeWidth={1.75} />
              </button>
              <Button onClick={() => openQuote()} className="hidden sm:inline-flex" size="md">
                Request a Quote
              </Button>
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="flex h-11 w-11 items-center justify-center text-ink hover:bg-mist lg:hidden"
                aria-label="Open menu"
                aria-expanded={drawerOpen}
                aria-controls="mobile-drawer"
              >
                <Menu className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className="hidden lg:block" onMouseEnter={openMega}>
            <AnimatePresence>
              {megaOpen && <MegaMenu id="products-menu" onNavigate={closeMega} onQuote={() => { closeMega(); openQuote(); }} />}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onQuote={() => { setDrawerOpen(false); openQuote(); }} onSearch={() => { setDrawerOpen(false); setSearchOpen(true); }} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
