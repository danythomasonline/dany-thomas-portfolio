import { useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { skillCategories } from '../../data/portfolioData';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { TechTag } from '../../components/TechTag/TechTag';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './Skills.scss';

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};

const tagVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};

export function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReduced = useReducedMotion();
  const active = skillCategories[activeIndex];

  return (
    <section id="skills" className="skills">
      <div className="skills__inner">
        <SectionHeading
          eyebrow="SKILLS"
          title="A full-stack toolkit, sharpened for production."
          description="Organised by area — select a category to see the tools and practices behind it."
        />

        <div className="skills__categories" role="tablist" aria-label="Skill categories">
          {skillCategories.map((category, index) => (
            <button
              key={category.name}
              type="button"
              role="tab"
              id={`skills-tab-${index}`}
              aria-selected={index === activeIndex}
              aria-controls={`skills-panel-${index}`}
              className={`skills__category ${index === activeIndex ? 'skills__category--active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div
          className="skills__panel"
          role="tabpanel"
          id={`skills-panel-${activeIndex}`}
          aria-labelledby={`skills-tab-${activeIndex}`}
        >
          <AnimatePresence mode="wait">
            <motion.ul
              key={active.name}
              className="skills__tags"
              initial={prefersReduced ? undefined : 'hidden'}
              animate={prefersReduced ? undefined : 'visible'}
              exit={prefersReduced ? undefined : 'hidden'}
              variants={prefersReduced ? undefined : listVariants}
            >
              {active.skills.map((skill) => (
                <motion.li key={skill} variants={prefersReduced ? undefined : tagVariants}>
                  <TechTag label={skill} />
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
