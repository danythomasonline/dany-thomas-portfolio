import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MagneticButton } from '../MagneticButton/MagneticButton';

interface BackToProjectsProps {
  tone?: 'brand' | 'default';
  variant?: 'link' | 'button';
}

export function BackToProjects({ tone = 'default', variant = 'link' }: BackToProjectsProps) {
  if (variant === 'button') {
    return (
      <MagneticButton as={Link} to="/#work" className="btn btn--secondary" aria-label="Back to Projects list">
        <ArrowLeft size={18} aria-hidden="true" className="magnetic-btn__icon" />
        Back to Projects
      </MagneticButton>
    );
  }

  return (
    <MagneticButton
      as={Link}
      to="/#work"
      className={`case-study__back-top ${tone === 'brand' ? 'case-study__back-top--brand' : ''}`}
      aria-label="Back to Projects list"
    >
      <ArrowLeft size={16} aria-hidden="true" className="magnetic-btn__icon" />
      Back to Projects
    </MagneticButton>
  );
}
