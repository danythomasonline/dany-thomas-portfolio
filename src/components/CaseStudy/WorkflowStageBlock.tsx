import { motion } from 'framer-motion';
import type { WorkflowStage } from '../../types/caseStudy';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface WorkflowStageBlockProps {
  stage: WorkflowStage;
  active: boolean;
  registerRef: (el: HTMLElement | null) => void;
  id: string;
}

export function WorkflowStageBlock({ stage, active, registerRef, id }: WorkflowStageBlockProps) {
  const prefersReduced = useReducedMotion();
  const Icon = stage.icon;

  return (
    <motion.div
      id={id}
      ref={registerRef}
      className={`workflow-stage ${active ? 'workflow-stage--active' : ''}`}
      initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="workflow-stage__marker">
        <span className="workflow-stage__number">{stage.number}</span>
        <span className="workflow-stage__icon" aria-hidden="true">
          <Icon size={18} />
        </span>
      </div>

      <div className="workflow-stage__content">
        <h3>{stage.title}</h3>
        <p>{stage.description}</p>

        {stage.labels && stage.labels.length > 0 && (
          <ul className="workflow-stage__labels">
            {stage.labels.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
