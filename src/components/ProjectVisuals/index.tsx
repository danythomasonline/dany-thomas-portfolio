import type { ReactElement } from 'react';
import type { ProjectVisualId } from '../../types/portfolio';
import { BalanceVisual } from './BalanceVisual';
import { ProposalVisual } from './ProposalVisual';
import { SedresVisual } from './SedresVisual';
import { SgivsVisual } from './SgivsVisual';

const visualMap: Record<ProjectVisualId, () => ReactElement> = {
  sedres: SedresVisual,
  sgivs: SgivsVisual,
  proposal: ProposalVisual,
  balance: BalanceVisual,
};

export function ProjectVisual({ id }: { id: ProjectVisualId }) {
  const Visual = visualMap[id];
  return <Visual />;
}
