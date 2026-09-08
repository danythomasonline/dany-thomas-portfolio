import { Reveal } from '../Reveal/Reveal';
import { SectionHeading } from '../SectionHeading/SectionHeading';
import { capabilityCatalog } from '../../data/capabilities';
import type { CapabilityId } from '../../types/caseStudy';

export function TechnicalApproach({ capabilities }: { capabilities: CapabilityId[] }) {
  return (
    <section className="case-study__section-block" aria-labelledby="technical-approach-heading">
      <SectionHeading eyebrow="TECHNICAL APPROACH" title="How it was built." />
      <h3 id="technical-approach-heading" className="visually-hidden">
        Technical capabilities
      </h3>
      <div className="capability-grid">
        {capabilities.map((id, index) => {
          const capability = capabilityCatalog[id];
          const Icon = capability.icon;
          return (
            <Reveal key={id} delay={index * 0.06} className="capability-card">
              <span className="capability-card__icon" aria-hidden="true">
                <Icon size={20} />
              </span>
              <h4>{capability.title}</h4>
              <p>{capability.description}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
