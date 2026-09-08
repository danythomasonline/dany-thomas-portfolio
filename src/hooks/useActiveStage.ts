import { useCallback, useEffect, useRef, useState } from 'react';

interface UseActiveStageResult {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  registerStage: (index: number) => (el: HTMLElement | null) => void;
}

/**
 * Tracks which of `count` stage elements sits nearest the viewport centre, using a
 * thin-band IntersectionObserver (mirrors useActiveSection's technique, generalised
 * to arbitrary refs instead of section ids). Firing only on threshold crossings keeps
 * this to a handful of re-renders per scroll pass rather than one per pixel.
 */
export function useActiveStage(count: number): UseActiveStageResult {
  const [activeIndex, setActiveIndex] = useState(0);
  const elementsRef = useRef<Array<HTMLElement | null>>([]);

  const registerStage = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      elementsRef.current[index] = el;
    },
    [],
  );

  useEffect(() => {
    const elements = elementsRef.current.filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const index = elementsRef.current.indexOf(visible[0].target as HTMLElement);
          if (index !== -1) setActiveIndex(index);
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [count]);

  return { activeIndex, setActiveIndex, registerStage };
}
