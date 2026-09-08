import { lazy, Suspense, useRef, useState } from 'react';
import { useProjectCoreExperience } from './hooks/useProjectCoreExperience';
import { ProjectCoreCopy } from './ProjectCoreCopy';
import { ProjectCoreFallback } from './fallback/ProjectCoreFallback';
import './ProjectCore.scss';

// Three.js/@react-three/fiber/gsap only download when a 'full' or 'lite' scene will
// actually mount — reduced-motion and no-WebGL visitors never trigger this import and
// only ever see the lightweight ProjectCoreFallback.
const ProjectCoreScene = lazy(() =>
  import('./scene/ProjectCoreScene').then((module) => ({ default: module.ProjectCoreScene })),
);

export function ProjectCore() {
  const experience = useProjectCoreExperience();
  const sectionRef = useRef<HTMLElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  return (
    <section id="systems" className={`project-core project-core--${experience}`} ref={sectionRef}>
      <div className="project-core__inner">
        <ProjectCoreCopy hasInteracted={hasInteracted} showInstruction={experience !== 'static'} />

        <div className="project-core__stage">
          {experience === 'static' ? (
            <ProjectCoreFallback />
          ) : (
            <Suspense fallback={<ProjectCoreFallback />}>
              <ProjectCoreScene quality={experience} sectionRef={sectionRef} onBeginInteracting={setHasInteracted} />
            </Suspense>
          )}
        </div>
      </div>
    </section>
  );
}
