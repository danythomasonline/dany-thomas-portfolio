import { motion } from 'framer-motion';
import { StageLayer, BRASS, PINE, TEXT_MUTED, TEXT_PRIMARY } from './shared';

const EASE = [0.16, 1, 0.3, 1] as const;

interface WorkflowVisualProps {
  activeIndex: number;
  reducedMotion: boolean;
}

const NODES = [
  { x: 66, y: 322 },
  { x: 158, y: 246 },
  { x: 250, y: 168 },
  { x: 336, y: 88 },
];

export function SgivsWorkflowVisual({ activeIndex, reducedMotion }: WorkflowVisualProps) {
  const routeD = `M${NODES.map((n) => `${n.x} ${n.y}`).join(' L')}`;
  const marker = NODES[activeIndex];
  const duration = reducedMotion ? 0.01 : 0.6;

  return (
    <svg viewBox="0 0 400 400" role="img" aria-hidden="true" className="workflow-visual__svg">
      <defs>
        <linearGradient id="sgivs-wf-bg" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14181D" />
          <stop offset="1" stopColor="#0B0E11" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" rx="20" fill="url(#sgivs-wf-bg)" />

      <path d={routeD} stroke={TEXT_MUTED} strokeOpacity="0.2" strokeWidth="1.5" fill="none" strokeDasharray="1 8" strokeLinecap="round" />
      <motion.path
        d={routeD}
        stroke={BRASS}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        animate={{ pathLength: (activeIndex + 1) / NODES.length }}
        transition={{ duration, ease: EASE }}
      />
      <motion.rect
        initial={{ x: marker.x - 7, y: marker.y - 7 }}
        width="14"
        height="14"
        rx="3"
        fill={BRASS}
        animate={{ x: marker.x - 7, y: marker.y - 7 }}
        transition={{ duration, ease: EASE }}
      />

      {/* 01 — application: form fields + application card */}
      <StageLayer active={activeIndex === 0} reducedMotion={reducedMotion}>
        <rect x="24" y="330" width="100" height="56" rx="8" stroke={TEXT_MUTED} strokeOpacity="0.35" fill="none" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="34" y={340 + i * 14} width="24" height="5" rx="2" fill={TEXT_MUTED} fillOpacity="0.5" />
            <rect x="62" y={339 + i * 14} width="52" height="7" rx="2" fill={i === 2 ? BRASS : TEXT_PRIMARY} fillOpacity={i === 2 ? 0.7 : 0.16} />
          </g>
        ))}
      </StageLayer>

      {/* 02 — document collection: layered cards + upload */}
      <StageLayer active={activeIndex === 1} reducedMotion={reducedMotion}>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={116 - i * 5} y={196 + i * 8} width="60" height="40" rx="7" fill="#1B2026" stroke={TEXT_MUTED} strokeOpacity={0.4 - i * 0.08} />
        ))}
        <path d="M146 190 V172" stroke={BRASS} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M138 180 L146 172 L154 180" stroke={BRASS} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </StageLayer>

      {/* 03 — workflow review: review nodes + validation states */}
      <StageLayer active={activeIndex === 2} reducedMotion={reducedMotion}>
        <path d="M210 190 H292" stroke={TEXT_MUTED} strokeOpacity="0.3" strokeWidth="1" strokeDasharray="2 5" />
        <circle cx="210" cy="190" r="6" fill={PINE} />
        <circle cx="252" cy="180" r="6" fill={BRASS} />
        <circle cx="292" cy="192" r="6" fill="none" stroke={TEXT_MUTED} strokeOpacity="0.5" />
        <path d="M248 176 l3 3 l6 -7" stroke="#0B0E11" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </StageLayer>

      {/* 04 — status and completion: timeline + confirmation */}
      <StageLayer active={activeIndex === 3} reducedMotion={reducedMotion}>
        <path d="M280 120 H352" stroke={TEXT_MUTED} strokeOpacity="0.3" strokeWidth="1" />
        <circle cx="290" cy="120" r="3" fill={TEXT_PRIMARY} fillOpacity="0.5" />
        <circle cx="316" cy="120" r="3" fill={PINE} />
        <circle cx="342" cy="120" r="7" fill="none" stroke={BRASS} strokeWidth="2" />
        <path d="M338 120 l3 3 l6 -7" stroke={BRASS} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="296" y="132" width="42" height="30" rx="6" stroke={TEXT_MUTED} strokeOpacity="0.3" fill="none" />
      </StageLayer>
    </svg>
  );
}
