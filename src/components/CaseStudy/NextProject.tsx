import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../Reveal/Reveal';
import { useCardPointerEffects } from '../../hooks/useCardPointerEffects';
import type { Project } from '../../types/portfolio';

export function NextProject({ project }: { project: Project }) {
  const { ref: cardRef, spotlightEnabled } = useCardPointerEffects<HTMLAnchorElement>();

  return (
    <section className="case-study__section-block" aria-labelledby="next-project-heading">
      <h2 id="next-project-heading" className="visually-hidden">
        Next project
      </h2>
      <Reveal>
        <Link to={`/projects/${project.slug}`} className="next-project" ref={cardRef}>
          {spotlightEnabled && <span className="next-project__spotlight" aria-hidden="true" />}
          <span className="next-project__eyebrow mono">NEXT PROJECT</span>
          <span className="next-project__name">
            {project.name}
            <ArrowRight size={20} aria-hidden="true" />
          </span>
          <span className="next-project__category">{project.category}</span>
        </Link>
      </Reveal>
    </section>
  );
}
