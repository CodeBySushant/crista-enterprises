import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import QuoteModal from '../components/EnquiryForm/QuoteModal';

const QuoteContext = createContext(null);

/**
 * Global "Request a Quote" controller. Any component can call
 * openQuote({ product }) — product is a slug and will be prefilled.
 */
export function QuoteProvider({ children }) {
  const [state, setState] = useState({ open: false, product: '', key: 0 });

  const openQuote = useCallback((opts = {}) => {
    setState((s) => ({ open: true, product: opts.product ?? '', key: s.key + 1 }));
  }, []);
  const closeQuote = useCallback(() => setState((s) => ({ ...s, open: false })), []);

  const value = useMemo(() => ({ openQuote, closeQuote }), [openQuote, closeQuote]);

  return (
    <QuoteContext.Provider value={value}>
      {children}
      <QuoteModal open={state.open} product={state.product} formKey={state.key} onClose={closeQuote} />
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('useQuote must be used inside <QuoteProvider>');
  return ctx;
}
