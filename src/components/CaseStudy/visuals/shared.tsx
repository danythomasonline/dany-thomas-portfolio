import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface StageLayerProps {
  active: boolean;
  reducedMotion: boolean;
  children: ReactNode;
}

/** One stage's group of shapes — fades/settles in when active, recedes otherwise. */
export function StageLayer({ active, reducedMotion, children }: StageLayerProps) {
  return (
    <motion.g
      animate={{ opacity: active ? 1 : 0.16, scale: active ? 1 : 0.94 }}
      style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
      transition={{ duration: reducedMotion ? 0.01 : 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.g>
  );
}

export const BRASS = '#D4A657';
export const PINE = '#4C6E5D';
export const TEXT_MUTED = '#8B9198';
export const TEXT_PRIMARY = '#F2F0EA';
