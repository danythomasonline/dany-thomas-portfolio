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

export function SedresWorkflowVisual({ activeIndex, reducedMotion }: WorkflowVisualProps) {
  const routeD = `M${NODES.map((n) => `${n.x} ${n.y}`).join(' L')}`;
  const vessel = NODES[activeIndex];
  const duration = reducedMotion ? 0.01 : 0.6;

  return (
    <svg viewBox="0 0 400 400" role="img" aria-hidden="true" className="workflow-visual__svg">
      <defs>
        <linearGradient id="sedres-wf-bg" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14181D" />
          <stop offset="1" stopColor="#0B0E11" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" rx="20" fill="url(#sedres-wf-bg)" />

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
        initial={{ cx: vessel.x, cy: vessel.y }}
        r="14"
        fill="none"
        stroke={BRASS}
        strokeOpacity="0.3"
        animate={{ cx: vessel.x, cy: vessel.y }}
        transition={{ duration, ease: EASE }}
      />
      <motion.circle
        initial={{ cx: vessel.x, cy: vessel.y }}
        r="7"
        fill={BRASS}
        animate={{ cx: vessel.x, cy: vessel.y }}
        transition={{ duration, ease: EASE }}
      />

      {/* 01 — vessel preparation: port boundary, checklist, incoming data */}
      <StageLayer active={activeIndex === 0} reducedMotion={reducedMotion}>
        <rect x="26" y="332" width="96" height="54" rx="8" stroke={TEXT_MUTED} strokeOpacity="0.4" strokeDasharray="3 5" fill="none" />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x="38"
            y={344 + i * 13}
            width={i === 1 ? 42 : 60}
            height="6"
            rx="2"
            fill={i === 2 ? BRASS : TEXT_PRIMARY}
            fillOpacity={i === 2 ? 0.7 : 0.18}
          />
        ))}
        <circle cx="18" cy="300" r="3" fill={TEXT_PRIMARY} fillOpacity="0.5" />
        <circle cx="10" cy="266" r="3" fill={TEXT_PRIMARY} fillOpacity="0.5" />
        <path d="M18 300 L58 322" stroke={TEXT_MUTED} strokeOpacity="0.3" strokeWidth="1" />
        <path d="M10 266 L58 322" stroke={TEXT_MUTED} strokeOpacity="0.3" strokeWidth="1" />
      </StageLayer>

      {/* 02 — operations workspace: role columns + timeline */}
      <StageLayer active={activeIndex === 1} reducedMotion={reducedMotion}>
        {[0, 1, 2].map((col) => (
          <rect key={col} x={112 + col * 27} y="192" width="21" height="72" rx="5" stroke={TEXT_MUTED} strokeOpacity="0.35" fill="none" />
        ))}
        <circle cx="122" cy="206" r="3" fill={PINE} />
        <circle cx="149" cy="216" r="3" fill={BRASS} />
        <circle cx="176" cy="206" r="3" fill={TEXT_PRIMARY} fillOpacity="0.6" />
        <path d="M112 244 H197" stroke={TEXT_MUTED} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 4" />
      </StageLayer>

      {/* 03 — task coordination: kanban cards + KPI ring */}
      <StageLayer active={activeIndex === 2} reducedMotion={reducedMotion}>
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={198 - i * 4}
            y={140 - i * 16}
            width="48"
            height="30"
            rx="6"
            fill="#1B2026"
            stroke={i === 2 ? BRASS : TEXT_MUTED}
            strokeOpacity={i === 2 ? 0.8 : 0.3}
          />
        ))}
        <rect x="206" y="88" width="30" height="4" rx="2" fill={BRASS} fillOpacity="0.8" />
        <circle cx="282" cy="150" r="16" fill="none" stroke={TEXT_MUTED} strokeOpacity="0.25" strokeWidth="3" />
        <g transform="rotate(-90 282 150)">
          <motion.circle
            cx={282}
            cy={150}
            r={16}
            fill="none"
            stroke={PINE}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ strokeDashoffset: 100.5 }}
            strokeDasharray="100.5"
            animate={{ strokeDashoffset: activeIndex === 2 ? 28 : 100.5 }}
            transition={{ duration, ease: EASE }}
          />
        </g>
      </StageLayer>

      {/* 04 — completion and departure: checklist, document, departure route */}
      <StageLayer active={activeIndex === 3} reducedMotion={reducedMotion}>
        <rect x="266" y="106" width="70" height="46" rx="7" stroke={TEXT_MUTED} strokeOpacity="0.35" fill="none" />
        {[0, 1].map((i) => (
          <path
            key={i}
            d={`M276 ${120 + i * 14} l4 4 l8 -8`}
            stroke={BRASS}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ))}
        <path d="M336 90 L364 62" stroke={BRASS} strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M354 62 L364 62 L364 72" stroke={BRASS} strokeOpacity="0.6" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </StageLayer>
    </svg>
  );
}
