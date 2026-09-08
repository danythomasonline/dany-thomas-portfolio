export interface NavLink {
  label: string;
  href: string;
}

export interface Statistic {
  value: string;
  label: string;
}

export interface AboutKeyword {
  label: string;
}

export type ProjectVisualId = 'sedres' | 'sgivs' | 'proposal' | 'balance';

export interface CaseStudy {
  overview: string;
  challenge: string;
  contribution: string;
  coreFunctionality: string[];
  technicalApproach: string;
  keyLearning: string;
}

export interface Project {
  slug: string;
  name: string;
  fullName?: string;
  category: string;
  description: string;
  keyFeatures: string[];
  contribution: string;
  technologies: string[];
  visual: ProjectVisualId;
  caseStudy: CaseStudy;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Certification {
  name: string;
  issuer?: string;
  year: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

export interface LeadershipItem {
  role: string;
  organization: string;
  description: string;
}

export interface ContactInfo {
  location: string;
  email: string;
  linkedin: string;
  github?: string;
}
