import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import type { CaseStudyContent } from '../../types/caseStudy';
import { ProjectVisual } from '../ProjectVisuals';
import { TechTag } from '../TechTag/TechTag';
import { BackToProjects } from './BackToProjects';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useDecorParallax } from '../../hooks/useDecorParallax';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

interface CaseStudyHeroProps {
  project: Project;
  content: CaseStudyContent;
  workflowId: string;
}

export function CaseStudyHero({ project, content, workflowId }: CaseStudyHeroProps) {
  const prefersReduced = useReducedMotion();
  const decorRef = useDecorParallax<HTMLDivElement>(5);

  return (
    <header className="case-study__hero">
      <div className="case-study__hero-lines" ref={decorRef} aria-hidden="true">
        <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
          <path d="M-20 60 L120 60 L160 140" stroke="#D4A657" strokeOpacity="0.16" fill="none" />
          <path d="M420 320 L280 320 L240 220" stroke="#4C6E5D" strokeOpacity="0.18" fill="none" />
          <circle cx="120" cy="60" r="2.5" fill="#D4A657" fillOpacity="0.5" />
          <circle cx="280" cy="320" r="2.5" fill="#4C6E5D" fillOpacity="0.5" />
          <circle cx="200" cy="200" r="220" stroke="#8B9198" strokeOpacity="0.08" fill="none" />
        </svg>
      </div>

      <motion.div
        className="case-study__hero-inner"
        initial={prefersReduced ? undefined : 'hidden'}
        animate={prefersReduced ? undefined : 'visible'}
        variants={prefersReduced ? undefined : container}
      >
        <motion.div variants={prefersReduced ? undefined : item}>
          <BackToProjects tone="brand" />
        </motion.div>

        <motion.span className="case-study__category mono" variants={prefersReduced ? undefined : item}>
          {project.category}
        </motion.span>

        <motion.h1 className="case-study__title" variants={prefersReduced ? undefined : item}>
          {project.name}
        </motion.h1>

        <motion.p className="case-study__subtitle" variants={prefersReduced ? undefined : item}>
          {content.subtitle}
        </motion.p>

        <motion.p className="case-study__summary" variants={prefersReduced ? undefined : item}>
          {project.description}
        </motion.p>

        <motion.p className="case-study__role" variants={prefersReduced ? undefined : item}>
          <span className="mono">MY ROLE</span> {content.role}
        </motion.p>

        <motion.ul className="case-study__tags" variants={prefersReduced ? undefined : item}>
          {project.technologies.map((tech) => (
            <li key={tech}>
              <TechTag label={tech} />
            </li>
          ))}
        </motion.ul>

        <motion.a href={`#${workflowId}`} className="case-study__scroll-cue" variants={prefersReduced ? undefined : item}>
          See how it works
          <ChevronDown size={16} aria-hidden="true" />
        </motion.a>
      </motion.div>

      <div className="case-study__visual">
        <ProjectVisual id={project.visual} />
      </div>
    </header>
  );
}
