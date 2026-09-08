import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets scroll position on every route change. When the new URL carries a
 * hash (e.g. navigating from a case study back to "/#work"), scrolls smoothly
 * to that section instead — client-side route changes don't get the browser's
 * native hash-jump behaviour, so it's done by hand here.
 */
export function useScrollToTop(): void {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const target = document.getElementById(id);
      if (target) {
        requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }));
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
}
