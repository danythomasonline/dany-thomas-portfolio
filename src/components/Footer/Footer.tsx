import { Mail } from 'lucide-react';
import { navLinks, contact, siteMeta } from '../../data/portfolioData';
import { useSectionHref } from '../../hooks/useSectionHref';
import { LinkedInIcon } from '../icons/LinkedInIcon';
import './Footer.scss';

export function Footer() {
  const year = new Date().getFullYear();
  const sectionHref = useSectionHref();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <span className="site-footer__wordmark">{siteMeta.name}</span>
          <p className="site-footer__tagline">{siteMeta.role} · {contact.location}</p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={sectionHref(link.href)}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__socials">
          <a href={`mailto:${contact.email}`} aria-label="Email Dany Thomas">
            <Mail size={18} aria-hidden="true" />
          </a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer noopener" aria-label="Dany Thomas on LinkedIn">
            <LinkedInIcon size={18} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>© {year} {siteMeta.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
