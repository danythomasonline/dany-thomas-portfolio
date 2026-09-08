import type { ReactElement } from 'react';
import type { ProjectVisualId } from '../../types/portfolio';
import type { WorkflowStage } from '../../types/caseStudy';
import { SedresWorkflowVisual } from './visuals/SedresWorkflowVisual';
import { SgivsWorkflowVisual } from './visuals/SgivsWorkflowVisual';
import { ProposalWorkflowVisual } from './visuals/ProposalWorkflowVisual';
import { BalanceWorkflowVisual } from './visuals/BalanceWorkflowVisual';

interface WorkflowVisualInnerProps {
  activeIndex: number;
  reducedMotion: boolean;
}

const visualMap: Record<ProjectVisualId, (props: WorkflowVisualInnerProps) => ReactElement> = {
  sedres: SedresWorkflowVisual,
  sgivs: SgivsWorkflowVisual,
  proposal: ProposalWorkflowVisual,
  balance: BalanceWorkflowVisual,
};

interface WorkflowVisualProps extends WorkflowVisualInnerProps {
  visual: ProjectVisualId;
  stage: WorkflowStage;
}

export function WorkflowVisual({ visual, stage, activeIndex, reducedMotion }: WorkflowVisualProps) {
  const Visual = visualMap[visual];

  return (
    <div className="workflow-visual">
      <Visual activeIndex={activeIndex} reducedMotion={reducedMotion} />
      <span className="visually-hidden">{stage.visualLabel}</span>
    </div>
  );
}
