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

export function ProposalWorkflowVisual({ activeIndex, reducedMotion }: WorkflowVisualProps) {
  const routeD = `M${NODES.map((n) => `${n.x} ${n.y}`).join(' L')}`;
  const marker = NODES[activeIndex];
  const duration = reducedMotion ? 0.01 : 0.6;

  return (
    <svg viewBox="0 0 400 400" role="img" aria-hidden="true" className="workflow-visual__svg">
      <defs>
        <linearGradient id="proposal-wf-bg" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14181D" />
          <stop offset="1" stopColor="#0B0E11" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" rx="20" fill="url(#proposal-wf-bg)" />

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
      <motion.circle
        initial={{ cx: marker.x, cy: marker.y }}
        r={6}
        fill="none"
        stroke={BRASS}
        strokeWidth="2"
        animate={{ cx: marker.x, cy: marker.y }}
        transition={{ duration, ease: EASE }}
      />

      {/* 01 — proposal draft: outline + editable blocks + draft badge */}
      <StageLayer active={activeIndex === 0} reducedMotion={reducedMotion}>
        <rect x="24" y="326" width="98" height="60" rx="8" stroke={TEXT_MUTED} strokeOpacity="0.35" fill="none" />
        <rect x="34" y="336" width="46" height="7" rx="2" fill={TEXT_PRIMARY} fillOpacity="0.5" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x="34" y={352 + i * 10} width={78 - i * 14} height="5" rx="2" fill={TEXT_PRIMARY} fillOpacity="0.16" />
        ))}
        <rect x="88" y="332" width="26" height="12" rx="6" fill={BRASS} fillOpacity="0.18" stroke={BRASS} strokeOpacity="0.6" />
      </StageLayer>

      {/* 02 — scope and timeline: container + milestones */}
      <StageLayer active={activeIndex === 1} reducedMotion={reducedMotion}>
        <rect x="112" y="220" width="90" height="44" rx="8" stroke={TEXT_MUTED} strokeOpacity="0.3" fill="none" />
        <path d="M124 242 H190" stroke={TEXT_MUTED} strokeOpacity="0.3" strokeWidth="1" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={124 + i * 33} cy="242" r={i === 2 ? 5 : 3.5} fill={i === 2 ? BRASS : PINE} />
        ))}
      </StageLayer>

      {/* 03 — budget and metrics: bar chart + metric cards */}
      <StageLayer active={activeIndex === 2} reducedMotion={reducedMotion}>
        {[18, 30, 24, 38].map((h, i) => (
          <rect key={i} x={206 + i * 12} y={168 - h} width="8" height={h} rx="2" fill={i === 3 ? BRASS : TEXT_MUTED} fillOpacity={i === 3 ? 0.85 : 0.35} />
        ))}
        <rect x="266" y="130" width="46" height="28" rx="6" stroke={TEXT_MUTED} strokeOpacity="0.3" fill="none" />
        <rect x="274" y="140" width="20" height="5" rx="2" fill={PINE} />
        <rect x="274" y="149" width="30" height="4" rx="2" fill={TEXT_PRIMARY} fillOpacity="0.2" />
      </StageLayer>

      {/* 04 — review and finalisation: review path + completion + final card */}
      <StageLayer active={activeIndex === 3} reducedMotion={reducedMotion}>
        <rect x="292" y="96" width="70" height="50" rx="8" stroke={BRASS} strokeOpacity="0.6" fill="none" />
        <rect x="302" y="106" width="40" height="6" rx="2" fill={TEXT_PRIMARY} fillOpacity="0.6" />
        <rect x="302" y="118" width="50" height="4" rx="2" fill={TEXT_PRIMARY} fillOpacity="0.16" />
        <rect x="302" y="126" width="34" height="4" rx="2" fill={TEXT_PRIMARY} fillOpacity="0.16" />
        <circle cx="356" cy="102" r="8" fill="#0B0E11" stroke={BRASS} strokeWidth="1.5" />
        <path d="M352 102 l3 3 l6 -7" stroke={BRASS} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </StageLayer>
    </svg>
  );
}
