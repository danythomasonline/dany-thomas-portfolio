import type { ProjectVisualId } from '../../types/portfolio';
import type { WorkflowStage } from '../../types/caseStudy';
import { SectionHeading } from '../SectionHeading/SectionHeading';
import { WorkflowVisual } from './WorkflowVisual';
import { WorkflowProgress } from './WorkflowProgress';
import { WorkflowStageBlock } from './WorkflowStageBlock';
import { useActiveStage } from '../../hooks/useActiveStage';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const noop = () => {};

interface ScrollytellingWorkflowProps {
  visual: ProjectVisualId;
  stages: WorkflowStage[];
  idPrefix: string;
}

export function ScrollytellingWorkflow({ visual, stages, idPrefix }: ScrollytellingWorkflowProps) {
  const { activeIndex, setActiveIndex, registerStage } = useActiveStage(stages.length);
  const prefersReduced = useReducedMotion();
  const headingId = `${idPrefix}-workflow-heading`;

  const goToStage = (index: number) => {
    setActiveIndex(index);
    document.getElementById(`${idPrefix}-stage-${index}`)?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'center',
    });
  };

  return (
    <section id={idPrefix} className="workflow" aria-labelledby={headingId}>
      <div className="workflow__container">
        <SectionHeading eyebrow="HOW IT WORKS" title="Inside the workflow." />
        <h3 id={headingId} className="visually-hidden">
          Workflow stages
        </h3>

        <WorkflowProgress stages={stages} activeIndex={activeIndex} onSelect={goToStage} idPrefix={idPrefix} />

        <div className="workflow-desktop">
          <div className="workflow-desktop__visual-col">
            <div className="workflow-desktop__visual-sticky">
              <WorkflowVisual visual={visual} stage={stages[activeIndex]} activeIndex={activeIndex} reducedMotion={prefersReduced} />
            </div>
          </div>
          <div className="workflow-desktop__stages">
            {stages.map((stage, index) => (
              <WorkflowStageBlock
                key={stage.number}
                stage={stage}
                active={index === activeIndex}
                registerRef={registerStage(index)}
                id={`${idPrefix}-stage-${index}`}
              />
            ))}
          </div>
        </div>

        <div className="workflow-mobile">
          {stages.map((stage, index) => (
            <div className="workflow-mobile__row" key={stage.number}>
              <div className="workflow-mobile__visual">
                <WorkflowVisual visual={visual} stage={stage} activeIndex={index} reducedMotion />
              </div>
              <WorkflowStageBlock stage={stage} active registerRef={noop} id={`${idPrefix}-mobile-stage-${index}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
