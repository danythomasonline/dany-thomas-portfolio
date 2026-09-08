import { motion, type Variants } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const lineVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const nodeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export function ProposalVisual() {
  const prefersReduced = useReducedMotion();

  return (
    <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="proposal-bg" x1="0" y1="0" x2="400" y2="260" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14181D" />
          <stop offset="1" stopColor="#0B0E11" />
        </linearGradient>
        <linearGradient id="proposal-accent" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#D4A657" />
          <stop offset="1" stopColor="#4C6E5D" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#proposal-bg)" />

      {/* central document */}
      <rect x="70" y="44" width="130" height="172" rx="10" fill="#14181D" stroke="url(#proposal-accent)" />
      <rect x="90" y="68" width="70" height="9" rx="3" fill="#F2F0EA" fillOpacity="0.55" />
      <rect x="90" y="88" width="90" height="6" rx="3" fill="#F2F0EA" fillOpacity="0.22" />
      <rect x="90" y="102" width="90" height="6" rx="3" fill="#F2F0EA" fillOpacity="0.22" />
      <rect x="90" y="116" width="60" height="6" rx="3" fill="#F2F0EA" fillOpacity="0.22" />
      <rect x="90" y="140" width="90" height="6" rx="3" fill="#F2F0EA" fillOpacity="0.22" />
      <rect x="90" y="154" width="70" height="6" rx="3" fill="#F2F0EA" fillOpacity="0.22" />

      {/* milestone connections — animate in as drawn lines */}
      <motion.g
        stroke="#8B9198"
        strokeOpacity="0.4"
        className="pv-hover-fx pv-hover-fx--bright"
        initial={prefersReduced ? undefined : 'hidden'}
        whileInView={prefersReduced ? undefined : 'visible'}
        viewport={{ once: true, margin: '-40px' }}
        variants={prefersReduced ? undefined : { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.line x1="200" y1="80" x2="268" y2="56" variants={lineVariants} />
        <motion.line x1="200" y1="130" x2="278" y2="130" variants={lineVariants} />
        <motion.line x1="200" y1="180" x2="264" y2="200" variants={lineVariants} />
      </motion.g>

      {/* milestone / budget / review nodes */}
      <motion.g
        initial={prefersReduced ? undefined : 'hidden'}
        whileInView={prefersReduced ? undefined : 'visible'}
        viewport={{ once: true, margin: '-40px' }}
        variants={prefersReduced ? undefined : { hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } } }}
      >
        <g transform="translate(268 40)">
          <motion.g variants={nodeVariants} className="pv-hover-fx pv-hover-fx--shift-sm">
            <circle cx="16" cy="16" r="16" fill="#14181D" stroke="#4C6E5D" strokeWidth="1.5" />
            <path d="M11 9v14M11 9l9 3-9 3" stroke="#4C6E5D" strokeWidth="1.5" strokeLinejoin="round" />
          </motion.g>
        </g>

        <g transform="translate(278 112)">
          <motion.g variants={nodeVariants} className="pv-hover-fx pv-hover-fx--shift-sm">
            <circle cx="16" cy="16" r="16" fill="#14181D" stroke="#D4A657" strokeWidth="1.5" />
            <rect x="9" y="16" width="4" height="9" rx="1" fill="#D4A657" />
            <rect x="15" y="11" width="4" height="14" rx="1" fill="#D4A657" />
            <rect x="21" y="7" width="4" height="18" rx="1" fill="#4C6E5D" />
          </motion.g>
        </g>

        <g transform="translate(248 184)">
          <motion.g variants={nodeVariants} className="pv-hover-fx pv-hover-fx--shift-sm">
            <circle cx="16" cy="16" r="16" fill="#14181D" stroke="#8B9198" strokeWidth="1.5" strokeOpacity="0.6" />
            <path d="M9 16l5 5 10-11" stroke="#F2F0EA" strokeOpacity="0.8" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
        </g>
      </motion.g>
    </svg>
  );
}
