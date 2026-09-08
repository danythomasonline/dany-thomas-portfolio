import { projects } from '../../data/portfolioData';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { Reveal } from '../../components/Reveal/Reveal';
import './Projects.scss';

export function Projects() {
  return (
    <section id="work" className="projects">
      <div className="projects__inner">
        <SectionHeading
          eyebrow="FEATURED WORK"
          title="Case studies from real production platforms."
          description="A selection of enterprise and product work spanning maritime operations, government-integrated services, business workflows and AI-assisted scheduling."
        />

        <div className="projects__grid">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
