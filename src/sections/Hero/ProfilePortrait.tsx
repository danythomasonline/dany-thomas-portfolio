import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './ProfilePortrait.scss';

// Resolves at build time — if the photo hasn't been added yet, the glob
// simply matches nothing and the component falls back to a placeholder
// instead of failing the build with a missing-module error.
const profileImages = import.meta.glob('../../assets/dany-thomas-profile.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const profileImageSrc = Object.values(profileImages)[0];

export function ProfilePortrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [parallaxEnabled, setParallaxEnabled] = useState(false);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    setParallaxEnabled(!isCoarsePointer && !prefersReduced);
  }, [prefersReduced]);

  useEffect(() => {
    if (!parallaxEnabled) return;
    const node = containerRef.current;
    if (!node) return;

    const handleMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      setOffset({ x: relX * 14, y: relY * 14 });
    };
    const handleLeave = () => setOffset({ x: 0, y: 0 });

    node.addEventListener('pointermove', handleMove);
    node.addEventListener('pointerleave', handleLeave);
    return () => {
      node.removeEventListener('pointermove', handleMove);
      node.removeEventListener('pointerleave', handleLeave);
    };
  }, [parallaxEnabled]);

  return (
    <div className="profile-portrait" ref={containerRef}>
      <motion.div
        className="profile-portrait__glow"
        aria-hidden="true"
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: 'spring', stiffness: 60, damping: 20 }}
      />
      <motion.svg
        className="profile-portrait__geo"
        viewBox="0 0 400 400"
        aria-hidden="true"
        animate={{ x: offset.x * 0.6, y: offset.y * 0.6 }}
        transition={{ type: 'spring', stiffness: 60, damping: 20 }}
      >
        <circle cx="340" cy="60" r="2.5" fill="#4C6E5D" fillOpacity="0.7" />
        <circle cx="30" cy="340" r="2.5" fill="#D4A657" fillOpacity="0.7" />
        <path d="M20 60 L60 60 L60 100" stroke="#8B9198" strokeOpacity="0.35" fill="none" />
        <path d="M340 340 L380 340 L380 300" stroke="#8B9198" strokeOpacity="0.35" fill="none" />
        <circle cx="200" cy="200" r="176" stroke="#8B9198" strokeOpacity="0.18" fill="none" />
      </motion.svg>

      <div className="profile-portrait__frame">
        {profileImageSrc ? (
          <img
            src={profileImageSrc}
            alt="Portrait of Dany Thomas, Full-Stack Developer"
            className="profile-portrait__image"
          />
        ) : (
          <div className="profile-portrait__placeholder" role="img" aria-label="Portrait of Dany Thomas">
            <User size={72} strokeWidth={1.25} aria-hidden="true" />
            <span className="mono">DT</span>
          </div>
        )}
      </div>
    </div>
  );
}
