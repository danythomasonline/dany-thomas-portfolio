import { useMemo, useRef, type MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils, type BufferAttribute, type Points } from 'three';

interface ParticleFieldProps {
  progressRef: MutableRefObject<{ progress: number }>;
  count: number;
  color: string;
}

// A single Points object with a mutated position buffer — cheaper than per-particle
// meshes, and avoids allocating new geometry every frame.
export function ParticleField({ progressRef, count, color }: ParticleFieldProps) {
  const pointsRef = useRef<Points>(null);

  const { positions, starts, targets } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const starts: number[][] = [];
    const targets: number[][] = [];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const dir = [Math.sin(phi) * Math.cos(theta), Math.sin(phi) * Math.sin(theta), Math.cos(phi)];
      const startRadius = 0.25 + Math.random() * 0.3;
      const targetRadius = 1.7 + Math.random() * 1.7;

      starts.push(dir.map((v) => v * startRadius));
      targets.push(dir.map((v) => v * targetRadius));
      positions[i * 3] = starts[i][0];
      positions[i * 3 + 1] = starts[i][1];
      positions[i * 3 + 2] = starts[i][2];
    }

    return { positions, starts, targets };
  }, [count]);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;

    const progress = progressRef.current.progress;
    const t = Math.min(progress / 0.85, 1);
    const eased = 1 - Math.pow(1 - t, 2);

    const positionAttr = points.geometry.attributes.position as BufferAttribute;
    const array = positionAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const wobble = Math.sin(state.clock.elapsedTime * 0.6 + i) * 0.02 * eased;
      array[i * 3] = MathUtils.lerp(starts[i][0], targets[i][0], eased) + wobble;
      array[i * 3 + 1] = MathUtils.lerp(starts[i][1], targets[i][1], eased);
      array[i * 3 + 2] = MathUtils.lerp(starts[i][2], targets[i][2], eased) + wobble;
    }

    positionAttr.needsUpdate = true;
    points.rotation.y += 0.0006;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.035} sizeAttenuation transparent opacity={0.65} depthWrite={false} />
    </points>
  );
}
