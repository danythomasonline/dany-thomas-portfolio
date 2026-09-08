import { Award } from 'lucide-react';
import type { Certification } from '../../types/portfolio';
import './CertificationCard.scss';

export function CertificationCard({ name, issuer, year }: Certification) {
  return (
    <div className="certification-card">
      <div className="certification-card__icon" aria-hidden="true">
        <Award size={20} />
      </div>
      <div className="certification-card__body">
        <h3 className="certification-card__name">{name}</h3>
        {issuer && <p className="certification-card__issuer">{issuer}</p>}
      </div>
      <span className="certification-card__year mono">{year}</span>
    </div>
  );
}
