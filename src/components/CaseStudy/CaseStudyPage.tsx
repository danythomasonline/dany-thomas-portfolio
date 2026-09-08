import { projects } from '../../data/portfolioData';
import type { Project } from '../../types/portfolio';
import type { CaseStudyContent } from '../../types/caseStudy';
import { CaseStudyHero } from './CaseStudyHero';
import { ProjectOverview } from './ProjectOverview';
import { ScrollytellingWorkflow } from './ScrollytellingWorkflow';
import { TechnicalApproach } from './TechnicalApproach';
import { TechnologyStack } from './TechnologyStack';
import { ProjectLearning } from './ProjectLearning';
import { NextProject } from './NextProject';
import { BackToProjects } from './BackToProjects';

interface CaseStudyPageProps {
  project: Project;
  content: CaseStudyContent;
}

export function CaseStudyPage({ project, content }: CaseStudyPageProps) {
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <article className="case-study">
      <CaseStudyHero project={project} content={content} workflowId={`${project.slug}-workflow`} />

      <div className="case-study__body">
        <ProjectOverview challenge={content.challenge} />
        <ScrollytellingWorkflow visual={content.visual} stages={content.stages} idPrefix={`${project.slug}-workflow`} />
        <TechnicalApproach capabilities={content.capabilities} />
        <TechnologyStack technologies={project.technologies} />
        <ProjectLearning keyLearning={content.keyLearning} />
        <NextProject project={nextProject} />

        <div className="case-study__cta">
          <BackToProjects variant="button" />
        </div>
      </div>
    </article>
  );
}
