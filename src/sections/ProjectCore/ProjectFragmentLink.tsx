import { Link } from 'react-router-dom';
import type { Project } from '../../types/portfolio';
import type { FragmentLayout } from './scene/fragmentLayout';

interface ProjectFragmentLinkProps {
  project: Project;
  quadrant: FragmentLayout['quadrant'];
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export function ProjectFragmentLink({ project, quadrant, onHoverStart, onHoverEnd }: ProjectFragmentLinkProps) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`project-core__link project-core__link--${quadrant}`}
      onPointerEnter={onHoverStart}
      onPointerLeave={onHoverEnd}
    >
      <span className="project-core__link-node" aria-hidden="true" />
      <span className="project-core__link-name">{project.name}</span>
    </Link>
  );
}
