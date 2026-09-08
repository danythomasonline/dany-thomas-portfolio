import { GraduationCap, Users } from 'lucide-react';
import { certifications, education, leadership, mentoringNote } from '../../data/portfolioData';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { CertificationCard } from '../../components/CertificationCard/CertificationCard';
import { Reveal } from '../../components/Reveal/Reveal';
import './Credentials.scss';

export function Credentials() {
  return (
    <section id="credentials" className="credentials">
      <div className="credentials__inner">
        <SectionHeading eyebrow="CERTIFICATIONS" title="Continuous learning, applied on the job." />

        <div className="credentials__grid">
          {certifications.map((cert, index) => (
            <Reveal key={cert.name} delay={index * 0.05}>
              <CertificationCard {...cert} />
            </Reveal>
          ))}
        </div>

        <div className="credentials__secondary">
          <Reveal className="credentials__block">
            <div className="credentials__block-icon" aria-hidden="true">
              <GraduationCap size={20} />
            </div>
            <div>
              <h3>Education</h3>
              {education.map((item) => (
                <div key={item.degree} className="credentials__edu-item">
                  <p className="credentials__edu-degree">{item.degree}</p>
                  <p className="credentials__edu-meta">
                    {item.institution} · {item.period}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="credentials__block">
            <div className="credentials__block-icon" aria-hidden="true">
              <Users size={20} />
            </div>
            <div>
              <h3>Leadership</h3>
              {leadership.map((item) => (
                <div key={item.role} className="credentials__edu-item">
                  <p className="credentials__edu-degree">
                    {item.role} — {item.organization}
                  </p>
                  <p className="credentials__edu-meta">{item.description}</p>
                </div>
              ))}
              <p className="credentials__mentoring">{mentoringNote}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
