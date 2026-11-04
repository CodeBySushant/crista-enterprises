import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import { QuoteProvider } from './context/QuoteContext';
import Home from './pages/Home';

const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Industries = lazy(() => import('./pages/Industries'));
const Lighting = lazy(() => import('./pages/Products/Lighting'));
const GymEquipment = lazy(() => import('./pages/Products/GymEquipment'));
const AllProducts = lazy(() => import('./pages/Products/AllProducts'));
const ProductDetails = lazy(() => import('./pages/Products/ProductDetails'));
const Legal = lazy(() => import('./pages/Legal'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageLoader() {
  return (
    <div className="wrap flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading page">
      <span className="h-[2px] w-24 overflow-hidden bg-line">
        <span className="block h-full w-1/2 animate-pulse bg-ink" />
      </span>
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <QuoteProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="industries" element={<Industries />} />
              <Route path="products" element={<AllProducts />} />
              <Route path="products/lighting" element={<Lighting />} />
              <Route path="products/gym-equipment" element={<GymEquipment />} />
              <Route path="products/:slug" element={<ProductDetails />} />
              <Route path="privacy-policy" element={<Legal kind="privacy" />} />
              <Route path="terms" element={<Legal kind="terms" />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </QuoteProvider>
    </MotionConfig>
  );
}
