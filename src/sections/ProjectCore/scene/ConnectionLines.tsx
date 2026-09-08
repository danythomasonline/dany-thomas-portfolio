import { useRef, type MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils, type BufferAttribute, type Line, type LineBasicMaterial } from 'three';

interface ConnectionLinesProps {
  progressRef: MutableRefObject<{ progress: number }>;
  restPositions: [number, number, number][];
  color: string;
}

// One thin line per fragment, from the core center to that fragment's current position.
// Fades in once fragments are mostly settled (phase 6 of the scroll sequence).
export function ConnectionLines({ progressRef, restPositions, color }: ConnectionLinesProps) {
  const lineRefs = useRef<(Line | null)[]>([]);
  const materialRefs = useRef<(LineBasicMaterial | null)[]>([]);

  useFrame(() => {
    const progress = progressRef.current.progress;
    const t = Math.min(progress / 0.7, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const opacity = MathUtils.clamp((progress - 0.5) / 0.25, 0, 1) * 0.55;

    restPositions.forEach((rest, index) => {
      const line = lineRefs.current[index];
      const material = materialRefs.current[index];
      if (!line || !material) return;

      const positionAttr = line.geometry.attributes.position as BufferAttribute;
      const array = positionAttr.array as Float32Array;
      array[3] = rest[0] * eased;
      array[4] = rest[1] * eased;
      array[5] = rest[2] * eased;
      positionAttr.needsUpdate = true;
      material.opacity = opacity;
    });
  });

  return (
    <>
      {restPositions.map((_, index) => (
        <line
          key={index}
          ref={(el) => {
            // TS resolves the bare `line` JSX tag against the DOM SVGLineElement type
            // (an ambiguity between React DOM's and R3F's JSX namespaces) even though,
            // rendered inside <Canvas>, R3F always constructs a real THREE.Line here.
            lineRefs.current[index] = el as unknown as Line | null;
          }}
        >
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[new Float32Array(6), 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            ref={(el) => {
              materialRefs.current[index] = el;
            }}
            color={color}
            transparent
            opacity={0}
          />
        </line>
      ))}
    </>
  );
}
