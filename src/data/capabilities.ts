import { Blocks, Boxes, Network, ShieldCheck, Smartphone, Zap } from 'lucide-react';
import type { Capability, CapabilityId } from '../types/caseStudy';

/**
 * Shared catalog of technical-approach capability cards. Each case study lists
 * only the ids that are actually evidenced by its own contribution/tech stack —
 * see caseStudyContent.ts.
 */
export const capabilityCatalog: Record<CapabilityId, Capability> = {
  'component-architecture': {
    id: 'component-architecture',
    title: 'Component Architecture',
    description: 'Reusable, composable UI building blocks that keep complex screens consistent and maintainable.',
    icon: Blocks,
  },
  'state-management': {
    id: 'state-management',
    title: 'State Management',
    description: 'Predictable application state shared cleanly across interconnected, role-based workflows.',
    icon: Boxes,
  },
  'api-integration': {
    id: 'api-integration',
    title: 'API Integration',
    description: 'Frontend interfaces wired to REST services and backend modules for real operational data.',
    icon: Network,
  },
  'role-based-workflows': {
    id: 'role-based-workflows',
    title: 'Role-Based Workflows',
    description: 'Screens and permissions tailored to what each user role needs to see and act on.',
    icon: ShieldCheck,
  },
  'responsive-interfaces': {
    id: 'responsive-interfaces',
    title: 'Responsive Interfaces',
    description: 'Layouts that hold up cleanly from mobile through desktop without losing clarity.',
    icon: Smartphone,
  },
  performance: {
    id: 'performance',
    title: 'Performance Considerations',
    description: 'Attention to load and interaction cost so interfaces stay fast under real workloads.',
    icon: Zap,
  },
};
