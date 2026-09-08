import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

// Gates every pointer-driven micro-interaction (magnetic buttons, card spotlight/tilt,
// decorative parallax) behind a single check: a mouse-like pointer with room to use it
// precisely, and no reduced-motion preference. Touch devices and narrow viewports never
// attach the underlying listeners.
const QUERY = '(hover: hover) and (pointer: fine) and (min-width: 768px)';

export function usePointerCapability(): boolean {
  const prefersReduced = useReducedMotion();
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  return matches && !prefersReduced;
}
