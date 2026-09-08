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

export function BalanceWorkflowVisual({ activeIndex, reducedMotion }: WorkflowVisualProps) {
  const routeD = `M${NODES.map((n) => `${n.x} ${n.y}`).join(' L')}`;
  const marker = NODES[activeIndex];
  const duration = reducedMotion ? 0.01 : 0.6;

  return (
    <svg viewBox="0 0 400 400" role="img" aria-hidden="true" className="workflow-visual__svg">
      <defs>
        <linearGradient id="balance-wf-bg" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14181D" />
          <stop offset="1" stopColor="#0B0E11" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" rx="20" fill="url(#balance-wf-bg)" />

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
      <motion.circle initial={{ cx: marker.x, cy: marker.y }} r={7} fill={BRASS} animate={{ cx: marker.x, cy: marker.y }} transition={{ duration, ease: EASE }} />

      {/* 01 — planning request: input card + date + planning nodes */}
      <StageLayer active={activeIndex === 0} reducedMotion={reducedMotion}>
        <rect x="24" y="328" width="90" height="52" rx="8" stroke={TEXT_MUTED} strokeOpacity="0.35" fill="none" />
        <rect x="34" y="338" width="34" height="7" rx="2" fill={TEXT_PRIMARY} fillOpacity="0.5" />
        <rect x="34" y="352" width="70" height="5" rx="2" fill={TEXT_PRIMARY} fillOpacity="0.16" />
        <rect x="34" y="362" width="50" height="5" rx="2" fill={TEXT_PRIMARY} fillOpacity="0.16" />
        <circle cx="94" cy="341" r="4" fill={PINE} />
      </StageLayer>

      {/* 02 — AI assistance: central node + connected fragments */}
      <StageLayer active={activeIndex === 1} reducedMotion={reducedMotion}>
        <circle cx="158" cy="246" r="18" fill="#1B2026" stroke={BRASS} strokeOpacity="0.7" />
        <motion.circle
          cx={158}
          cy={246}
          fill="none"
          stroke={BRASS}
          strokeOpacity="0.3"
          initial={{ r: 18, opacity: 0.3 }}
          animate={{ r: activeIndex === 1 ? 28 : 18, opacity: activeIndex === 1 ? 0 : 0.3 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.9, ease: 'easeOut' }}
        />
        <path d="M150 246 h16 M158 238 v16" stroke={BRASS} strokeWidth="1.5" strokeLinecap="round" />
        {[
          { x: 116, y: 214 },
          { x: 122, y: 272 },
          { x: 196, y: 224 },
        ].map((p, i) => (
          <g key={i}>
            <path d={`M${p.x} ${p.y} L158 246`} stroke={TEXT_MUTED} strokeOpacity="0.3" strokeWidth="1" strokeDasharray="2 4" />
            <circle cx={p.x} cy={p.y} r="4" fill={TEXT_PRIMARY} fillOpacity="0.4" />
          </g>
        ))}
      </StageLayer>

      {/* 03 — calendar scheduling: grid + selected dates + time block */}
      <StageLayer active={activeIndex === 2} reducedMotion={reducedMotion}>
        <rect x="212" y="140" width="88" height="64" rx="8" stroke={TEXT_MUTED} strokeOpacity="0.3" fill="none" />
        <path d="M212 156 H300" stroke={TEXT_MUTED} strokeOpacity="0.3" strokeWidth="1" />
        {Array.from({ length: 4 }).map((_, col) =>
          Array.from({ length: 2 }).map((__, row) => {
            const isSelected = col === 2 && row === 0;
            return (
              <rect
                key={`${col}-${row}`}
                x={220 + col * 18}
                y={164 + row * 20}
                width="14"
                height="14"
                rx="3"
                fill={isSelected ? BRASS : TEXT_PRIMARY}
                fillOpacity={isSelected ? 0.8 : 0.1}
              />
            );
          }),
        )}
        <path d="M300 172 H320" stroke={PINE} strokeWidth="2" strokeLinecap="round" />
      </StageLayer>

      {/* 04 — schedule management: completed calendar + summary */}
      <StageLayer active={activeIndex === 3} reducedMotion={reducedMotion}>
        <rect x="298" y="78" width="70" height="52" rx="8" stroke={BRASS} strokeOpacity="0.6" fill="none" />
        <circle cx="316" cy="94" r="4" fill={PINE} />
        <circle cx="332" cy="94" r="4" fill={BRASS} />
        <circle cx="348" cy="94" r="4" fill={TEXT_PRIMARY} fillOpacity="0.3" />
        <rect x="308" y="108" width="50" height="4" rx="2" fill={TEXT_PRIMARY} fillOpacity="0.2" />
        <rect x="308" y="116" width="36" height="4" rx="2" fill={TEXT_PRIMARY} fillOpacity="0.2" />
      </StageLayer>
    </svg>
  );
}
