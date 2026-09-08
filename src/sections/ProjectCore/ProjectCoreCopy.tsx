import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ProjectCoreCopyProps {
  hasInteracted: boolean;
  showInstruction: boolean;
}

export function ProjectCoreCopy({ hasInteracted, showInstruction }: ProjectCoreCopyProps) {
  const prefersReduced = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  return (
    <div className="project-core__copy">
      <SectionHeading
        eyebrow="SELECTED SYSTEMS"
        title="The systems behind my work."
        description="Four platforms. Different industries. One approach: turning complex workflows into clear, scalable digital products."
      />

      {showInstruction && (
        <motion.p
          className="project-core__instruction mono"
          animate={prefersReduced ? undefined : { opacity: hasInteracted ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          aria-hidden={hasInteracted}
        >
          {isTouch ? 'Swipe to explore' : 'Scroll to separate the system'}
        </motion.p>
      )}
    </div>
  );
}
