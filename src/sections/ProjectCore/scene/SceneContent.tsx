import { useRef, type MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils, type Group } from 'three';
import { CoreMonogram } from './CoreMonogram';
import { ProjectFragment } from './ProjectFragment';
import { ParticleField } from './ParticleField';
import { ConnectionLines } from './ConnectionLines';
import { FRAGMENT_LAYOUT, type ProjectCoreSlug } from './fragmentLayout';
import { CORE_PALETTE } from './palette';
import type { ProjectCoreExperience } from '../hooks/useProjectCoreExperience';

interface SceneContentProps {
  quality: Extract<ProjectCoreExperience, 'full' | 'lite'>;
  theme: 'light' | 'dark';
  enableParallax: boolean;
  progressRef: MutableRefObject<{ progress: number }>;
  hoveredRef: MutableRefObject<ProjectCoreSlug | null>;
}

export function SceneContent({ quality, theme, enableParallax, progressRef, hoveredRef }: SceneContentProps) {
  const parallaxRef = useRef<Group>(null);
  const palette = theme === 'dark' ? CORE_PALETTE.dark : CORE_PALETTE.light;
  const particleCount = quality === 'full' ? 70 : 26;
  const restPositions = FRAGMENT_LAYOUT.map((fragment) => (quality === 'full' ? fragment.desktop : fragment.mobile));

  useFrame((state, delta) => {
    const group = parallaxRef.current;
    if (!group || !enableParallax) return;
    const targetX = state.pointer.y * 0.14;
    const targetY = state.pointer.x * 0.14;
    group.rotation.x = MathUtils.damp(group.rotation.x, targetX, 4, delta);
    group.rotation.y = MathUtils.damp(group.rotation.y, targetY, 4, delta);
  });

  return (
    <group ref={parallaxRef}>
      <ambientLight intensity={0.4} color={palette.particle} />
      <directionalLight position={[3, 4, 5]} intensity={1.15} color={CORE_PALETTE.brass} />
      <pointLight position={[-4, -2, 2]} intensity={0.55} color={CORE_PALETTE.pine} />

      <CoreMonogram progressRef={progressRef} bodyColor={palette.body} />

      {FRAGMENT_LAYOUT.map((layout, index) => (
        <ProjectFragment
          key={layout.slug}
          layout={layout}
          restPosition={restPositions[index]}
          index={index}
          progressRef={progressRef}
          hoveredRef={hoveredRef}
          bodyColor={palette.body}
        />
      ))}

      <ConnectionLines progressRef={progressRef} restPositions={restPositions} color={CORE_PALETTE.brass} />
      <ParticleField progressRef={progressRef} count={particleCount} color={palette.particle} />
    </group>
  );
}
