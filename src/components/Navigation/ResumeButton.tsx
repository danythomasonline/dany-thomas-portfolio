import { Download } from 'lucide-react';
import { siteMeta } from '../../data/portfolioData';
import { useResumeAvailability } from '../../hooks/useResumeAvailability';
import { MagneticButton } from '../MagneticButton/MagneticButton';

export function ResumeButton({ className = '' }: { className?: string }) {
  const available = useResumeAvailability();

  if (!available) {
    return (
      <button
        type="button"
        className={`btn btn--secondary is-disabled ${className}`}
        disabled
        title="Résumé coming soon"
      >
        <Download size={16} aria-hidden="true" />
        Download Résumé
      </button>
    );
  }

  return (
    <MagneticButton
      as="a"
      className={`btn btn--secondary ${className}`}
      href={siteMeta.resumePath}
      download={siteMeta.resumeFileName}
    >
      <Download size={16} aria-hidden="true" className="magnetic-btn__icon" />
      Download Résumé
    </MagneticButton>
  );
}
