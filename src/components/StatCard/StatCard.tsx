import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Statistic } from '../../types/portfolio';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './StatCard.scss';

interface StatCardProps extends Statistic {
  index?: number;
  baseDelay?: number;
}

// Renders the final value directly — no count-up state. A JS-driven count (setState on
// every animation frame) previously ran here and could get interrupted by a re-render
// mid-count (Strict Mode's double effect invocation, a route change, etc.), leaving the
// number stuck part-way. The entrance is still animated, just via opacity/transform only.
export function StatCard({ value, label, index = 0, baseDelay = 0 }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const prefersReduced = useReducedMotion();
  const delay = baseDelay + index * 0.08;

  return (
    <motion.div
      ref={ref}
      className="stat-card"
      initial={prefersReduced ? undefined : { opacity: 0, y: 12, scale: 0.96 }}
      animate={inView && !prefersReduced ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="stat-card__value">{value}</span>
      <span className="stat-card__label">{label}</span>
    </motion.div>
  );
}
