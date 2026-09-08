import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectVisual } from '../ProjectVisuals';
import { TechTag } from '../TechTag/TechTag';
import { MagneticButton } from '../MagneticButton/MagneticButton';
import { useCardPointerEffects } from '../../hooks/useCardPointerEffects';
import type { Project } from '../../types/portfolio';
import './ProjectCard.scss';

export function ProjectCard({ project }: { project: Project }) {
  const { ref: cardRef, spotlightEnabled } = useCardPointerEffects<HTMLElement>({ tilt: true });

  return (
    <article className="project-card" ref={cardRef}>
      {spotlightEnabled && <div className="project-card__spotlight" aria-hidden="true" />}

      <div className="project-card__visual">
        <ProjectVisual id={project.visual} />
      </div>

      <div className="project-card__body">
        <span className="project-card__category mono">{project.category}</span>
        <h3 className="project-card__name">
          {project.name}
          {project.fullName && <span className="project-card__fullname">{project.fullName}</span>}
        </h3>
        <p className="project-card__description">{project.description}</p>

        <ul className="project-card__tags">
          {project.technologies.map((tech) => (
            <li key={tech}>
              <TechTag label={tech} />
            </li>
          ))}
        </ul>

        <p className="project-card__contribution">
          <strong>Key contribution — </strong>
          {project.contribution}
        </p>

        <MagneticButton as={Link} to={`/projects/${project.slug}`} className="project-card__link">
          View Case Study
          <ArrowUpRight size={16} aria-hidden="true" className="project-card__link-icon magnetic-btn__icon" />
        </MagneticButton>
      </div>
    </article>
  );
}
