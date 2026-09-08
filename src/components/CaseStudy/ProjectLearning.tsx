import { Lightbulb } from 'lucide-react';
import { Reveal } from '../Reveal/Reveal';

export function ProjectLearning({ keyLearning }: { keyLearning: string }) {
  return (
    <section className="case-study__section-block" aria-labelledby="key-learning-heading">
      <Reveal className="learning-card">
        <span className="learning-card__icon" aria-hidden="true">
          <Lightbulb size={20} />
        </span>
        <div>
          <h2 id="key-learning-heading">Key Learning</h2>
          <p>{keyLearning}</p>
        </div>
      </Reveal>
    </section>
  );
}
