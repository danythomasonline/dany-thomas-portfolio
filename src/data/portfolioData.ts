import type {
  Certification,
  ContactInfo,
  EducationItem,
  ExperienceItem,
  LeadershipItem,
  NavLink,
  Project,
  SkillCategory,
  Statistic,
} from '../types/portfolio';

export const siteMeta = {
  name: 'Dany Thomas',
  role: 'Full-Stack Developer',
  title: 'Dany Thomas | Full-Stack Developer',
  description:
    'Portfolio of Dany Thomas, a UAE-based Full-Stack Developer building scalable enterprise applications, workflow platforms and AI-assisted digital products.',
  // Exact on-disk filename in `public/` (double `.pdf` extension and all) — the `download`
  // attribute below controls what the browser names the saved file, independent of this.
  resumePath: `${import.meta.env.BASE_URL}Dany-Thomas-Resume.pdf.pdf`,
  resumeFileName: 'Dany-Thomas-Resume.pdf',
};

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export const hero = {
  eyebrow: 'FULL-STACK DEVELOPER · UAE',
  heading: ['I build scalable products', 'for complex real-world workflows.'],
  description:
    'Full-Stack Developer with 4+ years of experience building enterprise applications, data-driven interfaces and intelligent digital products using React, Node.js and modern web technologies.',
};

export const heroStats: Statistic[] = [
  { value: '4+', label: 'Years Experience' },
  { value: '12K+', label: 'LinkedIn Connections' },
  { value: 'UAE', label: 'Based' },
  { value: 'Full-Stack', label: 'Development' },
];

export const about = {
  title: 'Engineering thoughtful digital experiences.',
  paragraphs: [
    "I'm Dany Thomas, a Full-Stack Developer based in the UAE with more than four years of experience designing, developing and maintaining scalable web applications. My work spans enterprise platforms, workflow automation, dashboards, scheduling systems, REST API integration and AI-assisted products.",
    'I enjoy turning complex business requirements into maintainable, user-friendly software. Alongside development, I participate in requirement discussions, product demonstrations, code reviews and technical mentoring.',
  ],
  keywords: [
    'Enterprise Applications',
    'Product Development',
    'Workflow Automation',
    'API Integration',
    'AI-Assisted Development',
    'Performance Optimization',
  ],
};

export const projects: Project[] = [
  {
    slug: 'sedres',
    name: 'Sedres',
    category: 'Enterprise Maritime Operations',
    description:
      'An enterprise maritime and port operations platform supporting vessel movements, operational workflows, task coordination and logistics management.',
    keyFeatures: [
      'Kanban boards',
      'KPI dashboards',
      'Task and checklist management',
      'Role-based workflows',
      'Crew and vendor operations',
      'Document management',
      'Sales orders, purchase orders and work orders',
      'REST API integration',
    ],
    contribution:
      'Developed data-driven interfaces, reusable components, role-based operational screens, application state management and REST API integrations for complex maritime workflows.',
    technologies: ['React.js', 'TypeScript', 'Zustand', 'SCSS', 'REST APIs', 'PHP backend'],
    visual: 'sedres',
    caseStudy: {
      overview:
        'Sedres is an enterprise maritime and port operations platform supporting vessel movements, operational workflows, task coordination and logistics management.',
      challenge:
        'Maritime and port operations involve coordinating vessel movements, crew, vendors and documentation across many interdependent workflows. The platform needed data-driven interfaces that could keep complex, role-based operations organised and easy to act on.',
      contribution:
        'Developed data-driven interfaces, reusable components, role-based operational screens, application state management and REST API integrations for complex maritime workflows.',
      coreFunctionality: [
        'Kanban boards',
        'KPI dashboards',
        'Task and checklist management',
        'Role-based workflows',
        'Crew and vendor operations',
        'Document management',
        'Sales orders, purchase orders and work orders',
        'REST API integration',
      ],
      technicalApproach:
        'Built with React.js and TypeScript on the frontend, using Zustand for application state management and SCSS for styling. The interface layer integrates with a PHP backend through REST APIs to power operational screens, dashboards and role-based workflows.',
      keyLearning:
        'Working on Sedres reinforced how important predictable state management and reusable components are when a platform has many interconnected, role-based workflows running at once.',
    },
  },
  {
    slug: 'sgivs',
    name: 'SGIVS',
    fullName: 'Smart Government Integrated Visa Services',
    category: 'Government-Integrated Visa Management',
    description:
      'A visa management platform created to simplify application processing through dynamic forms, automated workflows and structured document management.',
    keyFeatures: [
      'Dynamic application forms',
      'Visa workflow automation',
      'Document management',
      'Status tracking',
      'Administrative controls',
      'REST API integration',
      'End-to-end deployment',
    ],
    contribution: 'Independently developed and successfully deployed end-to-end frontend and backend modules.',
    technologies: ['React.js', 'Node.js', 'REST APIs'],
    visual: 'sgivs',
    caseStudy: {
      overview:
        'SGIVS (Smart Government Integrated Visa Services) is a visa management platform created to simplify application processing through dynamic forms, automated workflows and structured document management.',
      challenge:
        'Visa processing involves multiple stages of form submission, document verification and status tracking. The platform needed to be built and deployed independently, end to end, while keeping application workflows clear for both applicants and administrators.',
      contribution: 'Independently developed and successfully deployed end-to-end frontend and backend modules.',
      coreFunctionality: [
        'Dynamic application forms',
        'Visa workflow automation',
        'Document management',
        'Status tracking',
        'Administrative controls',
        'REST API integration',
        'End-to-end deployment',
      ],
      technicalApproach:
        'Built the frontend with React.js and the backend with Node.js, connected through REST APIs. Handled the full development lifecycle independently, from dynamic form logic and workflow automation to administrative controls and deployment.',
      keyLearning:
        'Owning SGIVS end to end sharpened my ability to plan and deliver a complete platform independently, from architecture decisions through to production deployment.',
    },
  },
  {
    slug: 'proposal-management',
    name: 'Project Proposal Management System',
    category: 'Business Workflow Platform',
    description:
      'A full-stack platform for creating and managing structured project proposals from initial business justification through evaluation.',
    keyFeatures: [
      'Executive summary',
      'Problem statement',
      'Proposed solution',
      'Project scope',
      'Timeline and milestones',
      'Budget estimation',
      'Evaluation metrics',
    ],
    contribution:
      'Built the full-stack platform for creating and managing structured project proposals, from initial business justification through evaluation.',
    technologies: ['React.js', 'Node.js'],
    visual: 'proposal',
    caseStudy: {
      overview:
        'A full-stack platform for creating and managing structured project proposals, from initial business justification through evaluation.',
      challenge:
        'Project proposals typically live across scattered documents and spreadsheets, making it hard to track scope, timeline and budget together. The platform needed a structured way to capture a proposal from justification through evaluation.',
      contribution:
        'Built the full-stack platform for creating and managing structured project proposals, from initial business justification through evaluation.',
      coreFunctionality: [
        'Executive summary',
        'Problem statement',
        'Proposed solution',
        'Project scope',
        'Timeline and milestones',
        'Budget estimation',
        'Evaluation metrics',
      ],
      technicalApproach:
        'Built as a full-stack application using React.js on the frontend and Node.js on the backend, structuring proposal data into consistent sections spanning summary, scope, timeline, budget and evaluation.',
      keyLearning:
        'This project highlighted the value of structuring business documents as consistent, reusable data models rather than free-form text.',
    },
  },
  {
    slug: 'balance-life-calendar',
    name: 'Balance Life Calendar',
    category: 'AI-Powered Scheduling',
    description:
      'An intelligent scheduling platform combining calendar management, event planning and OpenAI-powered assistance to help users organise their time.',
    keyFeatures: [
      'Calendar management',
      'Event scheduling',
      'AI-powered assistance',
      'Intelligent planning',
      'Structured event data',
      'Modern responsive interface',
    ],
    contribution:
      'Built the intelligent scheduling platform, combining calendar management, event planning and OpenAI-powered assistance.',
    technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'OpenAI'],
    visual: 'balance',
    caseStudy: {
      overview:
        'Balance Life Calendar is an intelligent scheduling platform combining calendar management, event planning and OpenAI-powered assistance to help users organise their time.',
      challenge:
        'Traditional calendar tools require users to manually structure every event. The platform needed to combine reliable calendar management with AI-powered assistance to make planning faster and more intuitive.',
      contribution:
        'Built the intelligent scheduling platform, combining calendar management, event planning and OpenAI-powered assistance.',
      coreFunctionality: [
        'Calendar management',
        'Event scheduling',
        'AI-powered assistance',
        'Intelligent planning',
        'Structured event data',
        'Modern responsive interface',
      ],
      technicalApproach:
        'Built with Next.js on the frontend and NestJS on the backend, backed by PostgreSQL for structured event data, with OpenAI integrated to power intelligent planning assistance.',
      keyLearning:
        'Integrating OpenAI into a scheduling workflow showed how AI assistance works best when it stays grounded in clear, structured data rather than free-form generation.',
    },
  },
];

export const experience: ExperienceItem[] = [
  {
    company: 'Infobahn Consultancy',
    role: 'Full-Stack Developer',
    period: 'November 2025 – Present',
    location: 'UAE',
    highlights: [
      'Developing and maintaining enterprise web applications.',
      'Contributing to Sedres, a maritime and port operations platform.',
      'Independently developing and deploying SGIVS.',
      'Building dashboards, Kanban boards, admin panels and role-based workflows.',
      'Collaborating in client discussions, demonstrations, code reviews and Agile delivery.',
    ],
  },
  {
    company: 'Spericorn Technologies',
    role: 'Software Developer',
    period: 'July 2022 – November 2025',
    location: 'India',
    highlights: [
      'Developed scalable applications using React, Next.js, Node.js, Python and TypeScript.',
      'Built reusable interfaces, dashboards, booking systems and administration portals.',
      'Integrated REST APIs, third-party services, OAuth 2.0 and JWT authentication.',
      'Used Redux Toolkit, Zustand, React Query and Context API.',
      'Improved performance and supported CI/CD, deployment and production releases.',
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: ['React.js', 'Next.js', 'Angular', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'SCSS/SASS', 'Bootstrap'],
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'NestJS', 'Express.js', 'Python'],
  },
  {
    name: 'Databases',
    skills: ['PostgreSQL', 'MongoDB'],
  },
  {
    name: 'State & Data',
    skills: ['Redux Toolkit', 'Zustand', 'React Query', 'Context API', 'REST APIs'],
  },
  {
    name: 'Tools & Practices',
    skills: ['Git', 'GitHub', 'Postman', 'Jira', 'Asana', 'Figma', 'VS Code', 'Agile/Scrum', 'CI/CD'],
  },
  {
    name: 'AI',
    skills: ['AI-Assisted Development', 'Prompt Engineering', 'Claude Code', 'Cursor AI', 'ChatGPT', 'OpenAI Integration'],
  },
];

export const certifications: Certification[] = [
  { name: 'AWS Certified Developer – Associate (DVA-C02)', issuer: 'Amazon Web Services', year: '2026' },
  { name: 'Claude Code in Action', issuer: 'Anthropic', year: '2026' },
  { name: 'The Ultimate Node.js Course', issuer: 'Udemy', year: '2026' },
  { name: 'The Complete AI Coding Course – Cursor & Claude Code', issuer: 'Udemy', year: '2025' },
  { name: 'Modern React with Redux', issuer: 'Udemy', year: '2024' },
];

export const education: EducationItem[] = [
  {
    degree: 'Bachelor of Technology in Computer Science & Engineering',
    institution: 'APJ Abdul Kalam Technological University, India',
    period: '2018 – 2022',
  },
];

export const leadership: LeadershipItem[] = [
  {
    role: 'Chairman – College Union',
    organization: 'Lourdes Matha College of Science & Technology',
    description: 'Represented more than 3,000 students and led student initiatives.',
  },
];

export const mentoringNote =
  'Mentors junior developers through code reviews, technical guidance and knowledge sharing.';

export const contact: ContactInfo = {
  location: 'UAE',
  email: 'danythomasonline@gmail.com',
  linkedin: 'https://www.linkedin.com/in/danythomas/',
  // GitHub stays hidden until a verified GitHub URL is added here.
};
