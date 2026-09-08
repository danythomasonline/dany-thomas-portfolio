import { Briefcase, Code, Download, Mail, MessageCircle, Milestone, Sun } from 'lucide-react';
import { LinkedInIcon } from '../components/icons/LinkedInIcon';
import { contact, resumeFileName, resumeUrl } from './portfolioData';
import type { CommandDefinition } from '../types/commandPalette';

/**
 * Static command config. Two entries have render-time-only fields that can't live
 * here: Toggle Theme's description/icon depend on the current theme, and Download
 * Résumé's disabled state depends on an async availability check — both are resolved
 * in useCommandPalette before these definitions reach the UI.
 */
export const commandDefinitions: CommandDefinition[] = [
  {
    id: 'explore-projects',
    title: 'Explore Projects',
    description: 'View selected professional work',
    group: 'navigation',
    keywords: ['work', 'portfolio', 'case studies'],
    icon: Briefcase,
    action: { type: 'scroll', target: '#work' },
  },
  {
    id: 'view-experience',
    title: 'View Experience',
    description: 'Explore my professional journey',
    group: 'navigation',
    keywords: ['job', 'career', 'history'],
    icon: Milestone,
    action: { type: 'scroll', target: '#experience' },
  },
  {
    id: 'view-skills',
    title: 'View Skills',
    description: 'Browse technologies and capabilities',
    group: 'navigation',
    keywords: ['tech', 'stack', 'capabilities'],
    icon: Code,
    action: { type: 'scroll', target: '#skills' },
  },
  {
    id: 'contact-me',
    title: 'Contact Me',
    description: 'Discuss an opportunity or project',
    group: 'navigation',
    keywords: ['job', 'hire', 'opportunity', 'reach out'],
    icon: MessageCircle,
    action: { type: 'scroll', target: '#contact' },
  },
  {
    id: 'download-resume',
    title: 'Download Résumé',
    description: 'Download my latest professional résumé',
    group: 'actions',
    keywords: ['cv', 'resume', 'pdf'],
    icon: Download,
    action: { type: 'download', href: resumeUrl, fileName: resumeFileName },
  },
  {
    id: 'connect-linkedin',
    title: 'Connect on LinkedIn',
    description: 'Open my LinkedIn profile',
    group: 'actions',
    keywords: ['social', 'profile', 'network'],
    icon: LinkedInIcon,
    action: { type: 'external', href: contact.linkedin },
  },
  {
    id: 'send-email',
    title: 'Send Email',
    description: 'Email me directly',
    group: 'actions',
    keywords: ['mail', 'contact', 'reach out'],
    icon: Mail,
    action: { type: 'mailto', email: contact.email },
  },
  {
    id: 'toggle-theme',
    title: 'Toggle Theme',
    description: 'Switch to light mode',
    group: 'actions',
    keywords: ['dark', 'light', 'appearance'],
    icon: Sun,
    action: { type: 'theme-toggle' },
  },
];
