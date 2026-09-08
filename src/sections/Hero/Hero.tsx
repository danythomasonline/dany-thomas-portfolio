import { ArrowRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { hero, heroStats, contact } from '../../data/portfolioData';
import { StatCard } from '../../components/StatCard/StatCard';
import { ResumeButton } from '../../components/Navigation/ResumeButton';
import { LinkedInIcon } from '../../components/icons/LinkedInIcon';
import { MagneticButton } from '../../components/MagneticButton/MagneticButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ProfilePortrait } from './ProfilePortrait';
import './Hero.scss';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const actionsVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export function Hero() {
  const prefersReduced = useReducedMotion();
  const orchestrated = prefersReduced ? undefined : ('hidden' as const);
  const orchestratedVisible = prefersReduced ? undefined : ('visible' as const);

  return (
    <section id="home" className="hero">
      <div className="hero__inner">
        <motion.div
          className="hero__content"
          initial={orchestrated}
          animate={orchestratedVisible}
          variants={prefersReduced ? undefined : containerVariants}
        >
          <motion.span className="hero__eyebrow mono" variants={prefersReduced ? undefined : itemVariants}>
            {hero.eyebrow}
          </motion.span>

          <h1 className="hero__heading">
            {hero.heading.map((line, index) => (
              <span className="hero__heading-line-mask" key={index}>
                <motion.span className="hero__heading-line" variants={prefersReduced ? undefined : itemVariants}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p className="hero__description" variants={prefersReduced ? undefined : itemVariants}>
            {hero.description}
          </motion.p>

          <motion.div className="hero__actions" variants={prefersReduced ? undefined : actionsVariants}>
            <MagneticButton
              as={motion.a}
              className="btn btn--primary btn-on-dark"
              href="#work"
              variants={prefersReduced ? undefined : itemVariants}
            >
              Explore My Work
              <ArrowRight size={18} aria-hidden="true" className="magnetic-btn__icon" />
            </MagneticButton>
            <motion.div variants={prefersReduced ? undefined : itemVariants}>
              <ResumeButton className="btn-on-dark" />
            </motion.div>
            <MagneticButton
              as={motion.a}
              className="btn btn--secondary btn-on-dark"
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              variants={prefersReduced ? undefined : itemVariants}
            >
              <LinkedInIcon size={18} aria-hidden="true" />
              LinkedIn
            </MagneticButton>
          </motion.div>

          <div className="hero__stats">
            {heroStats.map((stat, index) => (
              <StatCard key={stat.label} {...stat} index={index} baseDelay={0.85} />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={prefersReduced ? undefined : { opacity: 0, scale: 0.96 }}
          animate={prefersReduced ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <ProfilePortrait />
        </motion.div>
      </div>
    </section>
  );
}
