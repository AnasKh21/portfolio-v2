import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import LogoBadge from '../components/LogoBadge';
import TechChips from '../components/TechChips';

const EXPERIENCES = [
  {
    company: 'OpMobility',
    logo: '/logos/opmobility.png',
    year: '2024 — 2025',
    roleFr: 'Développeur logiciel en alternance',
    roleEn: 'Software Developer Apprentice',
    tags: ['C/C++', 'Python', 'UDS'],
  },
  {
    company: 'Nexaglobe',
    logo: '/logos/nexaglobe.png',
    year: '2024',
    roleFr: 'Cloud security & genAI intern',
    roleEn: 'Cloud security & genAI intern',
  },
  {
    company: 'Soremed',
    logo: '/logos/soremed.png',
    year: '2023',
    roleFr: 'Stagiaire développement logiciel IA',
    roleEn: 'AI Software Development Intern',
    tags: ['Java', 'RAG', 'PostgreSQL'],
  },
];

const reveal = (reduce) => ({
  initial: reduce ? false : { opacity: 0, y: 28, clipPath: 'inset(0 0 100% 0)' },
  whileInView: { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' },
  viewport: { once: true, margin: '-12% 0px' },
});

function XpRow({ exp, lang }) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], ['18%', '-18%']);

  return (
    <article className="xp-row" ref={ref}>
      <div className="xp-meta">
        <LogoBadge src={exp.logo} name={exp.company} />
        <span className="xp-period">{exp.year}</span>
      </div>

      <div className="xp-body">
        <motion.span
          className="xp-ghost"
          aria-hidden="true"
          style={prefersReducedMotion ? undefined : { y: ghostY }}
        >
          {exp.company.charAt(0)}
        </motion.span>

        <motion.h2
          className="xp-company"
          {...reveal(prefersReducedMotion)}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {exp.company}
        </motion.h2>

        <motion.h3
          className="xp-role"
          {...reveal(prefersReducedMotion)}
          transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          {lang === 'FR' ? exp.roleFr : exp.roleEn}
        </motion.h3>

        {(exp.fr || exp.en) && (
          <motion.p
            className="xp-desc"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12% 0px' }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {lang === 'FR' ? exp.fr : exp.en}
          </motion.p>
        )}

        {exp.tags && <TechChips tags={exp.tags} />}
      </div>
    </article>
  );
}

export default function Pro() {
  const { t, lang } = useLanguage();
  const listRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 70%', 'end 70%'],
  });
  const railFill = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <motion.main
      className="page-pro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <header className="xp-header">
        <h1 className="section-title">{t('Expérience', 'Experience')}</h1>
      </header>

      <div className="xp-list" ref={listRef}>
        <span className="xp-rail" aria-hidden="true">
          <motion.span
            className="xp-rail-fill"
            style={prefersReducedMotion ? { scaleY: 1 } : { scaleY: railFill }}
          />
        </span>

        {EXPERIENCES.map((exp) => (
          <XpRow key={exp.company} exp={exp} lang={lang} />
        ))}
      </div>
    </motion.main>
  );
}
