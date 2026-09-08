import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteMeta } from '../data/portfolioData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './NotFound.scss';

export function NotFound() {
  useDocumentTitle(`404 — Page Not Found | ${siteMeta.name}`);

  return (
    <section className="not-found">
      <div className="not-found__inner">
        <span className="not-found__code mono">404</span>
        <h1>Page not found.</h1>
        <p>The page you're looking for doesn't exist or may have moved.</p>
        <Link to="/" className="btn btn--primary">
          <ArrowLeft size={18} aria-hidden="true" />
          Back to Home
        </Link>
      </div>
    </section>
  );
}
