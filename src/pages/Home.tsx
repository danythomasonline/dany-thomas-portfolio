import { lazy, Suspense } from 'react';
import { Hero } from '../sections/Hero/Hero';
import { About } from '../sections/About/About';
import { Projects } from '../sections/Projects/Projects';
import { Experience } from '../sections/Experience/Experience';
import { Skills } from '../sections/Skills/Skills';
import { Credentials } from '../sections/Credentials/Credentials';
import { Contact } from '../sections/Contact/Contact';
import { siteMeta } from '../data/portfolioData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const ProjectCore = lazy(() =>
  import('../sections/ProjectCore/ProjectCore').then((m) => ({ default: m.ProjectCore })),
);

export function Home() {
  useDocumentTitle(siteMeta.title);

  return (
    <>
      <Hero />
      <About />
      <Suspense fallback={<div className="project-core-placeholder" aria-hidden="true" />}>
        <ProjectCore />
      </Suspense>
      <Projects />
      <Experience />
      <Skills />
      <Credentials />
      <Contact />
    </>
  );
}
