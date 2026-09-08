import { experience } from '../../data/portfolioData';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { ExperienceTimeline } from '../../components/ExperienceTimeline/ExperienceTimeline';
import './Experience.scss';

export function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="experience__inner">
        <SectionHeading
          eyebrow="EXPERIENCE"
          title="4+ years building production-ready software."
          description="From enterprise maritime platforms to government-integrated services — a track record of shipping, owning and maintaining real systems."
        />
        <ExperienceTimeline items={experience} />
      </div>
    </section>
  );
}
