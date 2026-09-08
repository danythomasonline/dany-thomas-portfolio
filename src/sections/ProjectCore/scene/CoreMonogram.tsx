import { useRef, type MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils, type Group } from 'three';
import { CORE_PALETTE } from './palette';

interface CoreMonogramProps {
  progressRef: MutableRefObject<{ progress: number }>;
  bodyColor: string;
}

// An abstract faceted core with two crossing blades (brass / pine) through its center —
// a "D/T" suggested in negative space rather than literal extruded letterforms, which
// would need font loading and read as generic 3D text.
export function CoreMonogram({ progressRef, bodyColor }: CoreMonogramProps) {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const progress = progressRef.current.progress;
    group.rotation.y += delta * 0.12 * (1 - progress * 0.4);
    const scale = MathUtils.lerp(1, 0.8, Math.min(progress / 0.5, 1));
    group.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshStandardMaterial color={bodyColor} flatShading roughness={0.45} metalness={0.55} />
      </mesh>
      <mesh scale={1.004}>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshBasicMaterial color={CORE_PALETTE.brass} wireframe transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.1, 1.6, 0.1]} />
        <meshStandardMaterial color={CORE_PALETTE.brass} flatShading roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.1, 1.6, 0.1]} />
        <meshStandardMaterial color={CORE_PALETTE.pine} flatShading roughness={0.3} metalness={0.6} />
      </mesh>
    </group>
  );
}
