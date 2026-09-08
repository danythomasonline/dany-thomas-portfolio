import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { useWebglSupport } from './useWebglSupport';

export type ProjectCoreExperience = 'static' | 'lite' | 'full';

const MOBILE_BREAKPOINT = 768;

export function useProjectCoreExperience(): ProjectCoreExperience {
  const prefersReduced = useReducedMotion();
  const webglSupported = useWebglSupport();
  const [isNarrow, setIsNarrow] = useState(
    typeof window === 'undefined' ? false : window.innerWidth < MOBILE_BREAKPOINT,
  );

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    setIsNarrow(query.matches);

    const handler = (event: MediaQueryListEvent) => setIsNarrow(event.matches);
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);

  if (prefersReduced || !webglSupported) return 'static';
  if (isNarrow) return 'lite';
  return 'full';
}
