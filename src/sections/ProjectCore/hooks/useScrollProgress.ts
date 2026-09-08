import { useEffect, type MutableRefObject, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const REVEAL_THRESHOLD = 0.55;

interface UseScrollProgressArgs {
  sectionRef: RefObject<HTMLElement | null>;
  pinned: boolean;
  endDistance: string;
  progressRef: MutableRefObject<{ progress: number }>;
  onRevealChange: (revealed: boolean) => void;
  onBeginInteracting: (value: boolean) => void;
}

/**
 * Drives the whole scroll sequence via a single bounded, scrubbed ScrollTrigger.
 * Writes progress into a ref every tick (read by the R3F scene in useFrame) instead of
 * React state, and only calls back into React on the rare discrete transitions
 * (crossing the reveal threshold, first movement) rather than every frame.
 */
export function useScrollProgress({
  sectionRef,
  pinned,
  endDistance,
  progressRef,
  onRevealChange,
  onBeginInteracting,
}: UseScrollProgressArgs): void {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let revealed = false;
    let hasBegun = false;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: endDistance,
        scrub: true,
        pin: pinned,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progressRef.current.progress = self.progress;

          if (!hasBegun && self.progress > 0.02) {
            hasBegun = true;
            onBeginInteracting(true);
          }

          const shouldReveal = self.progress > REVEAL_THRESHOLD;
          if (shouldReveal !== revealed) {
            revealed = shouldReveal;
            onRevealChange(shouldReveal);
          }
        },
      });
    }, section);

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [sectionRef, pinned, endDistance, progressRef, onRevealChange, onBeginInteracting]);
}
