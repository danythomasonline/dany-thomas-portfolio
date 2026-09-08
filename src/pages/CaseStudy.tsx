import { Navigate, useParams } from 'react-router-dom';
import { projects, siteMeta } from '../data/portfolioData';
import { caseStudyContent } from '../data/caseStudyContent';
import { CaseStudyPage } from '../components/CaseStudy/CaseStudyPage';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './CaseStudy.scss';

export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const content = slug ? caseStudyContent[slug] : undefined;

  useDocumentTitle(project ? `${project.name} — Case Study | ${siteMeta.name}` : siteMeta.title);

  if (!project || !content) {
    return <Navigate to="/404" replace />;
  }

  return <CaseStudyPage project={project} content={content} />;
}
