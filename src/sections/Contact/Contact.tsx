import { motion } from 'framer-motion';
import { contact } from '../../data/portfolioData';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { ContactCTA } from '../../components/ContactCTA/ContactCTA';
import { Reveal } from '../../components/Reveal/Reveal';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './Contact.scss';

export function Contact() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="contact" className="contact">
      <motion.div
        className="contact__glow"
        aria-hidden="true"
        initial={prefersReduced ? undefined : { opacity: 0.15 }}
        whileInView={prefersReduced ? undefined : { opacity: 0.5 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="contact__inner">
        <SectionHeading
          align="center"
          eyebrow="CONTACT"
          title="Let's build something meaningful."
          description="Have an opportunity, project or idea to discuss? Connect with me through email or LinkedIn."
        />

        <Reveal delay={0.1} className="contact__cta-wrap">
          <ContactCTA contact={contact} />
        </Reveal>
      </div>
    </section>
  );
}
