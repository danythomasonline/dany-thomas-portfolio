import { about } from '../../data/portfolioData';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { Reveal } from '../../components/Reveal/Reveal';
import './About.scss';

export function About() {
  return (
    <section id="about" className="about">
      <div className="about__inner">
        <SectionHeading eyebrow="ABOUT" title={about.title} />

        <div className="about__grid">
          <Reveal className="about__copy">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="about__keywords" as="div">
            <ul>
              {about.keywords.map((keyword) => (
                <li key={keyword}>{keyword}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
