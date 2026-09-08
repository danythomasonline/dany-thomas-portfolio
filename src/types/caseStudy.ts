import type { ComponentType, SVGProps } from 'react';
import type { ProjectVisualId } from './portfolio';

export type StageAccent = 'brass' | 'pine';

export interface WorkflowStage {
  number: string;
  title: string;
  description: string;
  visualLabel: string;
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  accent: StageAccent;
  labels?: string[];
}

export type CapabilityId =
  | 'component-architecture'
  | 'state-management'
  | 'api-integration'
  | 'role-based-workflows'
  | 'responsive-interfaces'
  | 'performance';

export interface Capability {
  id: CapabilityId;
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
}

export interface CaseStudyContent {
  slug: string;
  visual: ProjectVisualId;
  subtitle: string;
  challenge: string;
  role: string;
  keyLearning: string;
  capabilities: CapabilityId[];
  stages: WorkflowStage[];
}
