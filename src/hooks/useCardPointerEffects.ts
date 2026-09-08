import { useEffect, useRef } from 'react';
import { usePointerCapability } from './usePointerCapability';

const MAX_TILT_DEG = 0.8;

// Shared pointer-tracking for the Featured Work cards and the case-study "Next Project"
// card: writes --spotlight-x/y (pixels, for the radial-gradient glow), --pointer-nx/ny
// (-1..1, for a light magnetic-style nudge on small elements like the card's arrow icon)
// and, optionally, --tilt-x/--tilt-y (degrees, for a near-imperceptible perspective tilt)
// directly on the card element via ref. No React state, so hovering never re-renders.
export function useCardPointerEffects<T extends HTMLElement>(options: { tilt?: boolean } = {}) {
  const { tilt = false } = options;
  const ref = useRef<T | null>(null);
  const enabled = usePointerCapability();

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    let frame = 0;
    let rect = el.getBoundingClientRect();

    const handleEnter = () => {
      rect = el.getBoundingClientRect();
    };

    const handleMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        el.style.setProperty('--spotlight-x', `${x.toFixed(1)}px`);
        el.style.setProperty('--spotlight-y', `${y.toFixed(1)}px`);

        if (rect.width && rect.height) {
          const nx = Math.max(-1, Math.min(1, (x / rect.width) * 2 - 1));
          const ny = Math.max(-1, Math.min(1, (y / rect.height) * 2 - 1));
          el.style.setProperty('--pointer-nx', nx.toFixed(3));
          el.style.setProperty('--pointer-ny', ny.toFixed(3));

          if (tilt) {
            el.style.setProperty('--tilt-x', `${(-ny * MAX_TILT_DEG).toFixed(2)}deg`);
            el.style.setProperty('--tilt-y', `${(nx * MAX_TILT_DEG).toFixed(2)}deg`);
          }
        }
      });
    };

    const reset = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      el.style.setProperty('--pointer-nx', '0');
      el.style.setProperty('--pointer-ny', '0');
      if (tilt) {
        el.style.setProperty('--tilt-x', '0deg');
        el.style.setProperty('--tilt-y', '0deg');
      }
    };

    el.addEventListener('pointerenter', handleEnter);
    el.addEventListener('pointermove', handleMove);
    el.addEventListener('pointerleave', reset);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      el.removeEventListener('pointerenter', handleEnter);
      el.removeEventListener('pointermove', handleMove);
      el.removeEventListener('pointerleave', reset);
      reset();
    };
  }, [enabled, tilt]);

  return { ref, spotlightEnabled: enabled } as const;
}
