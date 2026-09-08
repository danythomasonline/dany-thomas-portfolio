import { Mail, MapPin } from 'lucide-react';
import { LinkedInIcon } from '../icons/LinkedInIcon';
import { MagneticButton } from '../MagneticButton/MagneticButton';
import { siteMeta } from '../../data/portfolioData';
import type { ContactInfo } from '../../types/portfolio';
import './ContactCTA.scss';

export function ContactCTA({ contact }: { contact: ContactInfo }) {
  return (
    <div className="contact-cta">
      <div className="contact-cta__details">
        <div className="contact-cta__detail">
          <span className="contact-cta__detail-icon">
            <MapPin size={18} aria-hidden="true" />
          </span>
          <span>{contact.location}</span>
        </div>
        <div className="contact-cta__detail">
          <span className="contact-cta__detail-icon">
            <Mail size={18} aria-hidden="true" />
          </span>
          <a
            className="contact-cta__email-link"
            href={`mailto:${contact.email}`}
            aria-label={`Send an email to ${siteMeta.name}`}
          >
            {contact.email}
          </a>
        </div>
      </div>

      <div className="contact-cta__actions">
        <MagneticButton as="a" className="btn btn--primary" href={`mailto:${contact.email}`}>
          <Mail size={18} aria-hidden="true" />
          Email Me
        </MagneticButton>
        <MagneticButton
          as="a"
          className="btn btn--secondary"
          href={contact.linkedin}
          target="_blank"
          rel="noreferrer noopener"
        >
          <LinkedInIcon size={18} aria-hidden="true" />
          Connect on LinkedIn
        </MagneticButton>
      </div>
    </div>
  );
}
