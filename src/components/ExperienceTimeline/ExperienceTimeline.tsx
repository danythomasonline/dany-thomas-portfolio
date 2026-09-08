import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { ExperienceItem } from '../../types/portfolio';
import './ExperienceTimeline.scss';

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="experience-timeline__wrap">
      <motion.div
        className="experience-timeline__line"
        aria-hidden="true"
        initial={prefersReduced ? undefined : { scaleY: 0 }}
        whileInView={prefersReduced ? undefined : { scaleY: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />

      <ol className="experience-timeline">
        {items.map((item, index) => (
          <motion.li
            key={item.company}
            className="experience-timeline__item"
            initial={prefersReduced ? undefined : { opacity: 0, x: -20 }}
            whileInView={prefersReduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="experience-timeline__marker" aria-hidden="true">
              <motion.span
                className="experience-timeline__dot"
                initial={prefersReduced ? undefined : { scale: 0 }}
                whileInView={prefersReduced ? undefined : { scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: index * 0.15 + 0.15, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <div className="experience-timeline__content">
              <div className="experience-timeline__heading">
                <h3 className="experience-timeline__role">{item.role}</h3>
                <span className="experience-timeline__period mono">{item.period}</span>
              </div>
              <p className="experience-timeline__meta">
                {item.company} · {item.location}
              </p>
              <ul className="experience-timeline__highlights">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
