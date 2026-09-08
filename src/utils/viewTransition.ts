const MOBILE_BREAKPOINT = 768;

let transitionInFlight = false;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isViewTransitionSupported(): boolean {
  return typeof document.startViewTransition === 'function';
}

function farthestCornerRadius(x: number, y: number): number {
  const { innerWidth, innerHeight } = window;
  const dx = Math.max(x, innerWidth - x);
  const dy = Math.max(y, innerHeight - y);
  return Math.hypot(dx, dy);
}

/**
 * Runs `applyTheme` as a radial "expanding circle" reveal from `origin` (viewport-relative,
 * e.g. a clicked button's centre) when the View Transitions API is available and the visitor
 * hasn't asked for reduced motion. Falls back to calling `applyTheme` directly otherwise —
 * theme switching must never depend on the animation succeeding.
 */
export function runThemeTransition(origin: { x: number; y: number } | undefined, applyTheme: () => void): void {
  if (transitionInFlight) return;

  if (!isViewTransitionSupported() || prefersReducedMotion()) {
    applyTheme();
    return;
  }

  const { x, y } = origin ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const radius = farthestCornerRadius(x, y);
  const duration = window.innerWidth < MOBILE_BREAKPOINT ? 420 : 600;

  transitionInFlight = true;
  const release = () => {
    transitionInFlight = false;
  };

  try {
    const transition = document.startViewTransition(() => {
      applyTheme();
    });

    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' },
        );
      })
      .catch(() => {
        // The transition was skipped (e.g. the document became hidden) — the theme
        // itself was already applied inside startViewTransition's callback above.
      });

    transition.finished.finally(release);
  } catch {
    release();
    applyTheme();
  }
}
