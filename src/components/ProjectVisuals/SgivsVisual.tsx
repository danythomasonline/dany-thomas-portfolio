import { motion, type Variants } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const layerVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

export function SgivsVisual() {
  const prefersReduced = useReducedMotion();

  return (
    <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="sgivs-bg" x1="0" y1="0" x2="400" y2="260" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14181D" />
          <stop offset="1" stopColor="#0B0E11" />
        </linearGradient>
        <linearGradient id="sgivs-doc" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#D4A657" />
          <stop offset="1" stopColor="#4C6E5D" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#sgivs-bg)" />

      {/* document layers — reveal gently, back to front */}
      <motion.g
        initial={prefersReduced ? undefined : 'hidden'}
        whileInView={prefersReduced ? undefined : 'visible'}
        viewport={{ once: true, margin: '-40px' }}
        variants={prefersReduced ? undefined : { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
      >
        <motion.rect x="52" y="86" width="112" height="140" rx="8" fill="#14181D" stroke="#8B9198" strokeOpacity="0.3" variants={layerVariants} className="pv-hover-fx pv-hover-fx--separate-back" />
        <motion.rect x="68" y="66" width="112" height="140" rx="8" fill="#14181D" stroke="#8B9198" strokeOpacity="0.4" variants={layerVariants} className="pv-hover-fx pv-hover-fx--separate-mid" />
        <motion.rect x="84" y="46" width="112" height="140" rx="8" fill="url(#sgivs-doc)" fillOpacity="0.12" stroke="url(#sgivs-doc)" variants={layerVariants} className="pv-hover-fx pv-hover-fx--separate-front" />
        <rect x="100" y="66" width="60" height="8" rx="3" fill="#F2F0EA" fillOpacity="0.5" />
        <rect x="100" y="82" width="80" height="6" rx="3" fill="#F2F0EA" fillOpacity="0.25" />
        <rect x="100" y="96" width="80" height="6" rx="3" fill="#F2F0EA" fillOpacity="0.25" />
        <rect x="100" y="110" width="50" height="6" rx="3" fill="#F2F0EA" fillOpacity="0.25" />
      </motion.g>

      {/* approval stepper — stages reveal gently, one after another */}
      <motion.g
        strokeLinecap="round"
        initial={prefersReduced ? undefined : 'hidden'}
        whileInView={prefersReduced ? undefined : 'visible'}
        viewport={{ once: true, margin: '-40px' }}
        variants={prefersReduced ? undefined : { hidden: {}, visible: { transition: { staggerChildren: 0.18, delayChildren: 0.5 } } }}
      >
        <line x1="228" y1="200" x2="356" y2="200" stroke="#8B9198" strokeOpacity="0.3" strokeWidth="1.5" />
        <motion.g variants={stepVariants} className="pv-hover-fx pv-hover-fx--glow pv-hover-fx--seq-1">
          <line x1="228" y1="200" x2="292" y2="200" stroke="#4C6E5D" strokeWidth="1.5" />
          <circle cx="228" cy="200" r="8" fill="#0B0E11" stroke="#4C6E5D" strokeWidth="2" />
          <path d="M224 200l3 3 6-6" stroke="#4C6E5D" strokeWidth="1.6" fill="none" />
        </motion.g>
        <motion.g variants={stepVariants} className="pv-hover-fx pv-hover-fx--glow pv-hover-fx--seq-2">
          <circle cx="292" cy="200" r="8" fill="#0B0E11" stroke="#D4A657" strokeWidth="2" />
          <path d="M288 200l3 3 6-6" stroke="#D4A657" strokeWidth="1.6" fill="none" />
        </motion.g>
        <motion.g variants={stepVariants} className="pv-hover-fx pv-hover-fx--glow pv-hover-fx--seq-3">
          <circle cx="356" cy="200" r="8" fill="#0B0E11" stroke="#8B9198" strokeWidth="2" strokeOpacity="0.5" />
        </motion.g>
      </motion.g>

      {/* connected workflow nodes */}
      <g stroke="#8B9198" strokeOpacity="0.35">
        <line x1="228" y1="200" x2="248" y2="120" />
        <line x1="292" y1="200" x2="270" y2="70" />
      </g>
      <g fill="#F2F0EA" fillOpacity="0.6">
        <circle cx="248" cy="120" r="3" />
        <circle cx="270" cy="70" r="3" />
      </g>
    </svg>
  );
}
