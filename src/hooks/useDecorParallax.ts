import { useEffect, useRef } from 'react';
import { usePointerCapability } from './usePointerCapability';

// Tiny pointer parallax for a single decorative layer (e.g. case-study hero line art):
// writes --decor-x/--decor-y (pixels) on the element in `containerSelector`'s bounds,
// scaled by `maxPx`. Resets to 0 on pointer leave so nothing is left drifted.
export function useDecorParallax<T extends HTMLElement>(maxPx = 6) {
  const containerRef = useRef<T | null>(null);
  const enabled = usePointerCapability();

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !enabled) return;

    let frame = 0;

    const handleMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = el.getBoundingClientRect();
        const relX = (event.clientX - rect.left) / rect.width - 0.5;
        const relY = (event.clientY - rect.top) / rect.height - 0.5;
        el.style.setProperty('--decor-x', `${(relX * maxPx * 2).toFixed(2)}px`);
        el.style.setProperty('--decor-y', `${(relY * maxPx * 2).toFixed(2)}px`);
      });
    };

    const reset = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      el.style.setProperty('--decor-x', '0px');
      el.style.setProperty('--decor-y', '0px');
    };

    el.addEventListener('pointermove', handleMove);
    el.addEventListener('pointerleave', reset);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', handleMove);
      el.removeEventListener('pointerleave', reset);
      reset();
    };
  }, [enabled, maxPx]);

  return containerRef;
}
