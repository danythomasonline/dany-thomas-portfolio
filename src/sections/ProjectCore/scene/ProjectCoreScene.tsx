import { Suspense, useEffect, useRef, useState, type RefObject } from 'react';
import { Canvas } from '@react-three/fiber';
import { projects } from '../../../data/portfolioData';
import { useTheme } from '../../../context/ThemeContext';
import { useCanvasVisible } from '../hooks/useCanvasVisible';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { ProjectFragmentLink } from '../ProjectFragmentLink';
import { SceneContent } from './SceneContent';
import { FRAGMENT_LAYOUT, type ProjectCoreSlug } from './fragmentLayout';
import type { ProjectCoreExperience } from '../hooks/useProjectCoreExperience';

interface ProjectCoreSceneProps {
  quality: Extract<ProjectCoreExperience, 'full' | 'lite'>;
  sectionRef: RefObject<HTMLElement | null>;
  onBeginInteracting: (value: boolean) => void;
}

const projectsBySlug = new Map(projects.map((project) => [project.slug, project]));

export function ProjectCoreScene({ quality, sectionRef, onBeginInteracting }: ProjectCoreSceneProps) {
  const { theme } = useTheme();
  const visible = useCanvasVisible(sectionRef);
  const progressRef = useRef({ progress: 0 });
  const hoveredRef = useRef<ProjectCoreSlug | null>(null);
  const [enableParallax, setEnableParallax] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (quality !== 'full') return;
    setEnableParallax(window.matchMedia('(pointer: fine)').matches);
  }, [quality]);

  useScrollProgress({
    sectionRef,
    pinned: quality === 'full',
    endDistance: quality === 'full' ? '+=160%' : '+=70%',
    progressRef,
    onRevealChange: setRevealed,
    onBeginInteracting,
  });

  return (
    <div className="project-core__scene">
      <Canvas
        className="project-core__canvas"
        aria-hidden="true"
        dpr={[1, 1.5]}
        frameloop={visible ? 'always' : 'never'}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 7.5], fov: 42 }}
      >
        <Suspense fallback={null}>
          <SceneContent
            quality={quality}
            theme={theme}
            enableParallax={enableParallax}
            progressRef={progressRef}
            hoveredRef={hoveredRef}
          />
        </Suspense>
      </Canvas>

      <div className={`project-core__links ${revealed ? 'is-revealed' : ''}`}>
        {FRAGMENT_LAYOUT.map((layout) => {
          const project = projectsBySlug.get(layout.slug);
          if (!project) return null;
          return (
            <ProjectFragmentLink
              key={layout.slug}
              project={project}
              quadrant={layout.quadrant}
              onHoverStart={() => {
                hoveredRef.current = layout.slug;
              }}
              onHoverEnd={() => {
                hoveredRef.current = null;
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
