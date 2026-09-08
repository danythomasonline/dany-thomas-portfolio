import { Reveal } from '../Reveal/Reveal';

export function ProjectOverview({ challenge }: { challenge: string }) {
  return (
    <section className="case-study__section-block" aria-labelledby="business-challenge-heading">
      <Reveal className="case-study__prose">
        <h2 id="business-challenge-heading">Business Challenge</h2>
        <p>{challenge}</p>
      </Reveal>
    </section>
  );
}
