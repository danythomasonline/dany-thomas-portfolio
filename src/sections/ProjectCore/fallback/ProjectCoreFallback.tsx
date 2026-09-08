import { Link } from 'react-router-dom';
import { projects } from '../../../data/portfolioData';
import { FRAGMENT_LAYOUT } from '../scene/fragmentLayout';
import './ProjectCoreFallback.scss';

const projectsBySlug = new Map(projects.map((project) => [project.slug, project]));

// Shared by both the no-WebGL and prefers-reduced-motion paths: a stable, fully
// accessible composition — same abstract visual language as the core, no animation.
export function ProjectCoreFallback() {
  return (
    <div className="project-core-fallback">
      <svg className="project-core-fallback__art" viewBox="0 0 200 200" role="img" aria-hidden="true">
        <circle cx="100" cy="100" r="72" stroke="#8B9198" strokeOpacity="0.22" fill="none" />
        <polygon points="100,52 140,76 140,124 100,148 60,124 60,76" fill="#D4A657" fillOpacity="0.05" stroke="#D4A657" strokeWidth="1.4" />
        <line x1="78" y1="70" x2="122" y2="130" stroke="#D4A657" strokeWidth="1.4" />
        <line x1="122" y1="70" x2="78" y2="130" stroke="#4C6E5D" strokeWidth="1.4" />
        <line x1="100" y1="100" x2="28" y2="28" stroke="#8B9198" strokeOpacity="0.35" />
        <line x1="100" y1="100" x2="172" y2="28" stroke="#8B9198" strokeOpacity="0.35" />
        <line x1="100" y1="100" x2="28" y2="172" stroke="#8B9198" strokeOpacity="0.35" />
        <line x1="100" y1="100" x2="172" y2="172" stroke="#8B9198" strokeOpacity="0.35" />
        <circle cx="28" cy="28" r="5" fill="#D4A657" />
        <circle cx="172" cy="28" r="5" fill="#4C6E5D" />
        <circle cx="28" cy="172" r="5" fill="#4C6E5D" />
        <circle cx="172" cy="172" r="5" fill="#D4A657" />
      </svg>

      <ul className="project-core-fallback__links">
        {FRAGMENT_LAYOUT.map((layout) => {
          const project = projectsBySlug.get(layout.slug);
          if (!project) return null;
          return (
            <li
              key={layout.slug}
              className={`project-core-fallback__item project-core-fallback__item--${layout.quadrant}`}
            >
              <Link to={`/projects/${project.slug}`} className="project-core-fallback__link">
                <span className="project-core-fallback__node" aria-hidden="true" />
                <span className="project-core-fallback__name">{project.name}</span>
                <span className="project-core-fallback__category">{project.category}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
