import { motion, type Variants } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const dotVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

export function SedresVisual() {
  const prefersReduced = useReducedMotion();

  return (
    <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="sedres-bg" x1="0" y1="0" x2="400" y2="260" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14181D" />
          <stop offset="1" stopColor="#0B0E11" />
        </linearGradient>
        <linearGradient id="sedres-route" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D4A657" />
          <stop offset="1" stopColor="#4C6E5D" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#sedres-bg)" />

      {/* workflow columns (kanban) — nudges a few px on card hover, see ProjectCard.scss */}
      <g opacity="0.5" className="pv-hover-fx pv-hover-fx--shift-sm">
        <rect x="28" y="34" width="62" height="192" rx="10" stroke="#8B9198" strokeOpacity="0.35" />
        <rect x="106" y="34" width="62" height="192" rx="10" stroke="#8B9198" strokeOpacity="0.35" />
        <rect x="184" y="34" width="62" height="192" rx="10" stroke="#8B9198" strokeOpacity="0.35" />
        <rect x="40" y="52" width="38" height="10" rx="3" fill="#4C6E5D" fillOpacity="0.5" />
        <rect x="40" y="70" width="38" height="10" rx="3" fill="#F2F0EA" fillOpacity="0.15" />
        <rect x="118" y="52" width="38" height="10" rx="3" fill="#F2F0EA" fillOpacity="0.15" />
        <rect x="118" y="70" width="38" height="10" rx="3" fill="#D4A657" fillOpacity="0.6" />
        <rect x="196" y="52" width="38" height="10" rx="3" fill="#F2F0EA" fillOpacity="0.15" />
      </g>

      {/* vessel route — receives a brass highlight on card hover */}
      <path
        d="M262 210C300 210 296 150 322 130C348 110 340 60 372 46"
        stroke="url(#sedres-route)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1 10"
        className="pv-hover-fx pv-hover-fx--bright"
      />
      <motion.path
        d="M262 210C300 210 296 150 322 130C348 110 340 60 372 46"
        stroke="url(#sedres-route)"
        strokeWidth="1"
        strokeOpacity="0.5"
        initial={prefersReduced ? undefined : { pathLength: 0 }}
        whileInView={prefersReduced ? undefined : { pathLength: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* vessel indicators — reveal sequentially on load, shift gently on card hover */}
      <motion.g
        className="pv-hover-fx pv-hover-fx--shift-sm"
        initial={prefersReduced ? undefined : 'hidden'}
        whileInView={prefersReduced ? undefined : 'visible'}
        viewport={{ once: true, margin: '-40px' }}
        variants={prefersReduced ? undefined : { hidden: {}, visible: { transition: { staggerChildren: 0.25, delayChildren: 0.3 } } }}
      >
        <motion.circle cx="262" cy="210" r="5" fill="#4C6E5D" variants={dotVariants} />
        <motion.circle cx="322" cy="130" r="4" fill="#F2F0EA" fillOpacity="0.8" variants={dotVariants} />
        <motion.circle cx="372" cy="46" r="6" fill="#D4A657" variants={dotVariants} />
        <circle cx="372" cy="46" r="11" stroke="#D4A657" strokeOpacity="0.4" className="pv-hover-fx pv-hover-fx--glow" />
      </motion.g>

      {/* data points */}
      <g fill="#F2F0EA" fillOpacity="0.4">
        <circle cx="300" cy="180" r="2" />
        <circle cx="340" cy="90" r="2" />
        <circle cx="356" cy="70" r="2" />
      </g>
    </svg>
  );
}
