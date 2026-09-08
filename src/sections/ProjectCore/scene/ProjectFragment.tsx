import { useRef, type MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils, type Mesh, type MeshStandardMaterial } from 'three';
import type { FragmentLayout, ProjectCoreSlug } from './fragmentLayout';
import { CORE_PALETTE } from './palette';

interface ProjectFragmentProps {
  layout: FragmentLayout;
  restPosition: [number, number, number];
  index: number;
  progressRef: MutableRefObject<{ progress: number }>;
  hoveredRef: MutableRefObject<ProjectCoreSlug | null>;
  bodyColor: string;
}

const PLATE_ARGS: [number, number, number, number] = [0.42, 0.42, 0.16, 6];
const NODE_OFFSET: [number, number, number] = [0.34, 0.3, 0.18];

// Fragments travel from the packed core center out to their resting position, easing
// out over the first ~70% of scroll progress so the last stretch of the sequence is
// free to focus on the connection lines and label reveal instead of continued motion.
export function ProjectFragment({ layout, restPosition, index, progressRef, hoveredRef, bodyColor }: ProjectFragmentProps) {
  const meshRef = useRef<Mesh>(null);
  const nodeRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshStandardMaterial>(null);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    const node = nodeRef.current;
    if (!mesh || !node) return;

    // Each fragment starts easing out a little later than the last, so the four
    // settle as a staggered cascade rather than moving in perfect lockstep.
    const staggerStart = index * 0.06;
    const t = Math.max(0, Math.min((progressRef.current.progress - staggerStart) / 0.64, 1));
    const eased = 1 - Math.pow(1 - t, 3);

    mesh.position.set(restPosition[0] * eased, restPosition[1] * eased, restPosition[2] * eased);
    node.position.set(
      mesh.position.x + NODE_OFFSET[0] * eased,
      mesh.position.y + NODE_OFFSET[1] * eased,
      mesh.position.z + NODE_OFFSET[2] * eased,
    );

    const settleSpin = (1 - eased) * state.clock.elapsedTime * 0.35;
    mesh.rotation.x = layout.rotation[0] * eased + settleSpin;
    mesh.rotation.y = layout.rotation[1] * eased + settleSpin * 0.7;
    mesh.rotation.z = layout.rotation[2] * eased;

    const isHovered = hoveredRef.current === layout.slug;
    const material = materialRef.current;
    if (material) {
      material.emissiveIntensity = MathUtils.damp(material.emissiveIntensity, isHovered ? 0.9 : 0.22, 6, delta);
    }
    const targetScale = isHovered ? 1.08 : 1;
    mesh.scale.setScalar(MathUtils.damp(mesh.scale.x, targetScale, 8, delta));
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <cylinderGeometry args={PLATE_ARGS} />
        <meshStandardMaterial
          ref={materialRef}
          color={bodyColor}
          emissive={CORE_PALETTE.brass}
          emissiveIntensity={0.22}
          flatShading
          roughness={0.4}
          metalness={0.5}
        />
      </mesh>
      <mesh ref={nodeRef}>
        <sphereGeometry args={[0.055, 8, 8]} />
        <meshStandardMaterial color={CORE_PALETTE.pine} flatShading />
      </mesh>
    </group>
  );
}
