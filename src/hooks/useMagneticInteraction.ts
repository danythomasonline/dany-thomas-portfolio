import { useEffect, useRef } from 'react';
import { usePointerCapability } from './usePointerCapability';

// Outer element never moves — it only exposes --magnetic-x/y/scale as CSS custom
// properties, which the inner .magnetic-btn__inner / __icon wrapper(s) consume via
// `transform`. That keeps the real clickable box (and its focus outline) perfectly
// stable while the visual content drifts toward the pointer.
const MAX_OFFSET_PX = 7;
const HOVER_SCALE = 1.02;
const PRESS_SCALE = 0.97;

export function useMagneticInteraction<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const enabled = usePointerCapability();

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    let frame = 0;
    let rect = el.getBoundingClientRect();

    const setVars = (x: number, y: number, scale: number) => {
      el.style.setProperty('--magnetic-x', `${x.toFixed(2)}px`);
      el.style.setProperty('--magnetic-y', `${y.toFixed(2)}px`);
      el.style.setProperty('--magnetic-scale', scale.toFixed(3));
    };

    const currentOffset = () => ({
      x: parseFloat(el.style.getPropertyValue('--magnetic-x')) || 0,
      y: parseFloat(el.style.getPropertyValue('--magnetic-y')) || 0,
    });

    const handleEnter = () => {
      rect = el.getBoundingClientRect();
      setVars(0, 0, HOVER_SCALE);
    };

    const handleMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const relX = Math.max(-1, Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)));
        const relY = Math.max(-1, Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)));
        setVars(relX * MAX_OFFSET_PX, relY * MAX_OFFSET_PX, HOVER_SCALE);
      });
    };

    const handleDown = () => {
      const { x, y } = currentOffset();
      setVars(x, y, PRESS_SCALE);
    };

    const handleUp = () => {
      const { x, y } = currentOffset();
      setVars(x, y, HOVER_SCALE);
    };

    const reset = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      setVars(0, 0, 1);
    };

    el.addEventListener('pointerenter', handleEnter);
    el.addEventListener('pointermove', handleMove);
    el.addEventListener('pointerdown', handleDown);
    el.addEventListener('pointerup', handleUp);
    el.addEventListener('pointerleave', reset);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      el.removeEventListener('pointerenter', handleEnter);
      el.removeEventListener('pointermove', handleMove);
      el.removeEventListener('pointerdown', handleDown);
      el.removeEventListener('pointerup', handleUp);
      el.removeEventListener('pointerleave', reset);
      reset();
    };
  }, [enabled]);

  return ref;
}
