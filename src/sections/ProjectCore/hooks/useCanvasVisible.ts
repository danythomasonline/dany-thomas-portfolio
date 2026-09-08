import { useEffect, useState, type RefObject } from 'react';

/**
 * Tracks whether the section is anywhere near the viewport, so the Canvas'
 * frameloop can be fully paused when scrolled away instead of rendering unseen.
 */
export function useCanvasVisible(ref: RefObject<HTMLElement | null>): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: '20% 0px 20% 0px',
      threshold: 0,
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return visible;
}
