import { useCallback, useEffect, useState } from 'react';

/** Shortlist of ids, remembered per browser (fails silently if storage is blocked). */
export default function useShortlist(key) {
  const [ids, setIds] = useState(() => {
    try {
      const v = JSON.parse(window.localStorage.getItem(key) ?? '[]');
      return Array.isArray(v) ? v : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(ids));
    } catch {
      /* storage unavailable — keep in memory only */
    }
  }, [key, ids]);

  const toggle = useCallback((id) => setIds((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id])), []);
  const remove = useCallback((id) => setIds((s) => s.filter((x) => x !== id)), []);
  const clear = useCallback(() => setIds([]), []);

  return { ids, toggle, remove, clear, has: (id) => ids.includes(id) };
}
