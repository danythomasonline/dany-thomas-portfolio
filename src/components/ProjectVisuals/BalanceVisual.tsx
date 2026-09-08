import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const aiNodes = [
  { cx: 228, cy: 140, r: 4 },
  { cx: 270, cy: 96, r: 3 },
  { cx: 278, cy: 150, r: 3 },
  { cx: 330, cy: 72, r: 5 },
  { cx: 322, cy: 176, r: 3 },
];

export function BalanceVisual() {
  const prefersReduced = useReducedMotion();

  return (
    <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="balance-bg" x1="0" y1="0" x2="400" y2="260" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14181D" />
          <stop offset="1" stopColor="#0B0E11" />
        </linearGradient>
        <radialGradient id="balance-glow" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#4C6E5D" stopOpacity="0.35" />
          <stop offset="1" stopColor="#4C6E5D" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="260" fill="url(#balance-bg)" />
      <circle cx="300" cy="80" r="90" fill="url(#balance-glow)" />

      {/* calendar grid — selected dates pulse subtly */}
      <g>
        <rect x="46" y="52" width="164" height="150" rx="12" fill="#14181D" stroke="#8B9198" strokeOpacity="0.3" />
        <line x1="46" y1="84" x2="210" y2="84" stroke="#8B9198" strokeOpacity="0.3" />
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3, 4].map((col) => {
            const x = 62 + col * 30;
            const y = 100 + row * 26;
            const highlighted = (row === 1 && col === 2) || (row === 2 && col === 3);
            const key = `${row}-${col}`;

            if (highlighted && !prefersReduced) {
              return (
                <motion.rect
                  key={key}
                  x={x}
                  y={y}
                  width="20"
                  height="16"
                  rx="4"
                  fill="#D4A657"
                  className="pv-hover-fx pv-hover-fx--glow"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                />
              );
            }

            return (
              <rect
                key={key}
                x={x}
                y={y}
                width="20"
                height="16"
                rx="4"
                fill={highlighted ? '#D4A657' : '#F2F0EA'}
                fillOpacity={highlighted ? 0.85 : 0.08}
                className={highlighted ? 'pv-hover-fx pv-hover-fx--glow' : undefined}
              />
            );
          }),
        )}
      </g>

      {/* AI nodes / neural links — pulse subtly */}
      <g stroke="#4C6E5D" strokeOpacity="0.5">
        <line x1="228" y1="140" x2="270" y2="96" />
        <line x1="228" y1="140" x2="278" y2="150" />
        <line x1="270" y1="96" x2="330" y2="72" />
        <line x1="278" y1="150" x2="330" y2="72" />
        <line x1="278" y1="150" x2="322" y2="176" />
      </g>
      <g fill="#4C6E5D" className="pv-hover-fx pv-hover-fx--shift-sm">
        {aiNodes.map((node, index) =>
          prefersReduced ? (
            <circle key={index} cx={node.cx} cy={node.cy} r={node.r} />
          ) : (
            <motion.circle
              key={index}
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
            />
          ),
        )}
      </g>
    </svg>
  );
}
