import { Reveal } from '../Reveal/Reveal';
import { SectionHeading } from '../SectionHeading/SectionHeading';
import { TechTag } from '../TechTag/TechTag';

export function TechnologyStack({ technologies }: { technologies: string[] }) {
  return (
    <section className="case-study__section-block" aria-labelledby="tech-stack-heading">
      <SectionHeading eyebrow="TECH STACK" title="Technologies used." />
      <h3 id="tech-stack-heading" className="visually-hidden">
        Technologies used
      </h3>
      <Reveal>
        <ul className="case-study__tags case-study__tags--stack">
          {technologies.map((tech) => (
            <li key={tech}>
              <TechTag label={tech} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
