import {
  Anchor,
  BadgeCheck,
  BrainCircuit,
  CalendarCheck2,
  CalendarDays,
  CheckCheck,
  ClipboardList,
  Columns3,
  FileStack,
  FileText,
  Flag,
  ListChecks,
  PenLine,
  Route,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import type { CaseStudyContent } from '../types/caseStudy';

/**
 * Workflow-storytelling content for each case study, keyed by project slug
 * (see data/portfolioData.ts for the shared base fields: name, category,
 * technologies, description). Challenge/keyLearning text is carried over
 * verbatim from the original case study copy — nothing here is invented.
 */
export const caseStudyContent: Record<string, CaseStudyContent> = {
  sedres: {
    slug: 'sedres',
    visual: 'sedres',
    subtitle: 'Coordinating complex maritime workflows through one operational platform.',
    challenge:
      'Maritime and port operations involve coordinating vessel movements, crew, vendors and documentation across many interdependent workflows. The platform needed data-driven interfaces that could keep complex, role-based operations organised and easy to act on.',
    role:
      'Developed data-driven interfaces, reusable components, role-based operational screens, state management and REST API integrations for complex maritime workflows.',
    keyLearning:
      'Working on Sedres reinforced how important predictable state management and reusable components are when a platform has many interconnected, role-based workflows running at once.',
    capabilities: ['component-architecture', 'state-management', 'api-integration', 'role-based-workflows'],
    stages: [
      {
        number: '01',
        title: 'Vessel Preparation',
        description:
          'Operational information, requirements and supporting documents are prepared before vessel activities begin.',
        visualLabel: 'A vessel marker approaching a port boundary alongside a preparation checklist and incoming data nodes.',
        icon: Anchor,
        accent: 'brass',
        labels: ['Document management'],
      },
      {
        number: '02',
        title: 'Operations Workspace',
        description:
          'Role-based operational screens organise vessel activities, timelines and responsibilities across teams.',
        visualLabel: 'Workflow columns with role nodes and timeline indicators showing an active operational state.',
        icon: Columns3,
        accent: 'brass',
        labels: ['Role-based workflows', 'Crew & vendor operations'],
      },
      {
        number: '03',
        title: 'Task Coordination',
        description: 'Kanban boards, checklists and task workflows help teams coordinate work and monitor progress.',
        visualLabel: 'Animated Kanban cards connected by task lines with progress indicators and a KPI node.',
        icon: ListChecks,
        accent: 'brass',
        labels: ['Kanban boards', 'KPI dashboards'],
      },
      {
        number: '04',
        title: 'Completion and Departure',
        description:
          'Completed activities, documentation and departure information are brought together for operational closure.',
        visualLabel: 'A completed checklist, document node, departure route and final status indicator.',
        icon: Flag,
        accent: 'brass',
        labels: ['Sales, purchase & work orders'],
      },
    ],
  },

  sgivs: {
    slug: 'sgivs',
    visual: 'sgivs',
    subtitle: 'Smart Government Integrated Visa Services',
    challenge:
      'Visa processing involves multiple stages of form submission, document verification and status tracking. The platform needed to be built and deployed independently, end to end, while keeping application workflows clear for both applicants and administrators.',
    role: 'Independently developed and successfully deployed end-to-end frontend and backend modules.',
    keyLearning:
      'Owning SGIVS end to end sharpened my ability to plan and deliver a complete platform independently, from architecture decisions through to production deployment.',
    capabilities: ['component-architecture', 'api-integration', 'role-based-workflows'],
    stages: [
      {
        number: '01',
        title: 'Application',
        description: 'Dynamic forms capture the information required for each visa-service workflow.',
        visualLabel: 'Form fields feeding into an application card with data-entry indicators.',
        icon: FileText,
        accent: 'brass',
        labels: ['Dynamic application forms'],
      },
      {
        number: '02',
        title: 'Document Collection',
        description: 'Supporting documents are organised and connected to the relevant application.',
        visualLabel: 'Layered document cards with an upload indicator and connections back to the application.',
        icon: FileStack,
        accent: 'brass',
        labels: ['Document management'],
      },
      {
        number: '03',
        title: 'Workflow Review',
        description:
          'Structured workflow stages help authorised users review information and track application progress.',
        visualLabel: 'Review nodes with role indicators and validation states along a connected workflow line.',
        icon: ShieldCheck,
        accent: 'brass',
        labels: ['Administrative controls'],
      },
      {
        number: '04',
        title: 'Status and Completion',
        description:
          'Application status and completed processing stages are presented through a clear administrative workflow.',
        visualLabel: 'A status timeline ending in a completed marker, final document and confirmation indicator.',
        icon: BadgeCheck,
        accent: 'brass',
        labels: ['Status tracking'],
      },
    ],
  },

  'proposal-management': {
    slug: 'proposal-management',
    visual: 'proposal',
    subtitle: 'Structuring business ideas from initial justification through evaluation.',
    challenge:
      'Project proposals typically live across scattered documents and spreadsheets, making it hard to track scope, timeline and budget together. The platform needed a structured way to capture a proposal from justification through evaluation.',
    role:
      'Built the full-stack platform for creating and managing structured project proposals from initial business justification through evaluation.',
    keyLearning:
      'This project highlighted the value of structuring business documents as consistent, reusable data models rather than free-form text.',
    capabilities: ['component-architecture', 'api-integration'],
    stages: [
      {
        number: '01',
        title: 'Proposal Draft',
        description: 'The proposal begins with an executive summary, problem statement and proposed solution.',
        visualLabel: 'A document outline made of editable content blocks marked with a draft status.',
        icon: PenLine,
        accent: 'brass',
        labels: ['Executive summary', 'Problem statement'],
      },
      {
        number: '02',
        title: 'Scope and Timeline',
        description: 'Project boundaries, milestones and expected delivery stages are organised into a clear plan.',
        visualLabel: 'A scope container with a milestone timeline connecting each project phase.',
        icon: Route,
        accent: 'brass',
        labels: ['Project scope', 'Timeline & milestones'],
      },
      {
        number: '03',
        title: 'Budget and Metrics',
        description: 'Budget estimates and evaluation metrics provide a structured foundation for assessment.',
        visualLabel: 'Budget indicators and metric cards next to a simple evaluation chart.',
        icon: Wallet,
        accent: 'brass',
        labels: ['Budget estimation', 'Evaluation metrics'],
      },
      {
        number: '04',
        title: 'Review and Finalisation',
        description:
          'The completed proposal brings the business case, implementation plan and success criteria together for evaluation.',
        visualLabel: 'A review path ending in a completion marker and the final proposal card.',
        icon: CheckCheck,
        accent: 'brass',
        labels: ['Evaluation metrics'],
      },
    ],
  },

  'balance-life-calendar': {
    slug: 'balance-life-calendar',
    visual: 'balance',
    subtitle: 'Combining calendar management with intelligent scheduling assistance.',
    challenge:
      'Traditional calendar tools require users to manually structure every event. The platform needed to combine reliable calendar management with AI-powered assistance to make planning faster and more intuitive.',
    role:
      'Built the intelligent scheduling platform by combining calendar management, event planning and OpenAI-powered assistance.',
    keyLearning:
      'Integrating OpenAI into a scheduling workflow showed how AI assistance works best when it stays grounded in clear, structured data rather than free-form generation.',
    capabilities: ['component-architecture', 'api-integration', 'responsive-interfaces'],
    stages: [
      {
        number: '01',
        title: 'Planning Request',
        description: 'Users provide their event, task or scheduling requirements through a clear planning interface.',
        visualLabel: 'An input card with a date indicator and connected planning nodes.',
        icon: ClipboardList,
        accent: 'brass',
        labels: ['Event scheduling'],
      },
      {
        number: '02',
        title: 'AI Assistance',
        description: 'OpenAI-powered assistance helps interpret planning requirements and organise scheduling information.',
        visualLabel: 'A central AI node connected to fragments of planning information with processing indicators.',
        icon: BrainCircuit,
        accent: 'brass',
        labels: ['AI-powered assistance'],
      },
      {
        number: '03',
        title: 'Calendar Scheduling',
        description: 'Structured events are placed into a calendar where users can understand timing and availability.',
        visualLabel: 'A calendar grid with animated selected dates, time blocks and an event connection.',
        icon: CalendarDays,
        accent: 'brass',
        labels: ['Structured event data'],
      },
      {
        number: '04',
        title: 'Schedule Management',
        description: 'Users can review and manage their planned events through a responsive calendar experience.',
        visualLabel: 'A completed calendar with event status markers and a schedule summary.',
        icon: CalendarCheck2,
        accent: 'brass',
        labels: ['Modern responsive interface'],
      },
    ],
  },
};
