import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
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
    fr: "Configurer le diagnostic des véhicules prenait un temps fou, presque tout à la main. J'ai développé un outil qui génère le code tout seul, avec une interface simple à utiliser. Résultat : deux fois moins de temps de paramétrage.",
    en: "Configuring vehicle diagnostics took forever, almost all by hand. I built a tool that generates the code on its own, with a simple interface. The result: half the setup time.",
    tags: ['C/C++', 'Python', 'UDS'],
  },
  {
    company: 'Nexaglobe',
    logo: '/logos/nexaglobe.png',
    year: '2024',
    roleFr: 'Stagiaire support IT',
    roleEn: 'IT Support Intern',
    fr: "Comment repérer un intrus sur le réseau avant qu'il fasse des dégâts ? J'ai maintenu un système qui surveille le trafic et lève l'alerte. J'ai aussi centralisé les journaux pour analyser les menaces plus vite.",
    en: "How do you spot an intruder on the network before they do damage? I maintained a system that watches the traffic and raises the alarm. I also centralised the logs to analyse threats faster.",
    tags: ['Snort', 'SQL', 'Security'],
  },
  {
    company: 'Soremed',
    logo: '/logos/soremed.png',
    year: '2023',
    roleFr: 'Stagiaire développement logiciel IA',
    roleEn: 'AI Software Development Intern',
    fr: "L'équipe support répondait sans cesse aux mêmes questions, avec des infos noyées dans une base de données. J'ai créé un chatbot qui comprend une question posée normalement et va chercher la réponse directement dans la base.",
    en: "The support team kept answering the same questions, with the answers buried in a database. I built a chatbot that understands a question asked in plain language and fetches the answer straight from the database.",
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

        <motion.p
          className="xp-desc"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {lang === 'FR' ? exp.fr : exp.en}
        </motion.p>

        <TechChips tags={exp.tags} />
      </div>
    </article>
  );
}

export default function Pro() {
  const { t, lang } = useLanguage();

  return (
    <motion.main
      className="page-pro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <header className="xp-header">
        <span className="section-eyebrow">{t('Parcours', 'Journey')}</span>
        <h1 className="section-title">{t('Expérience', 'Experience')}</h1>
        <p className="xp-intro">
          {t(
            "De l'alternance industrielle aux systèmes d'IA — un parcours guidé par la fiabilité du code.",
            'From industrial apprenticeship to AI systems — a path driven by reliable engineering.'
          )}
        </p>
      </header>

      <div className="xp-list">
        {EXPERIENCES.map((exp) => (
          <XpRow key={exp.company} exp={exp} lang={lang} />
        ))}
      </div>
    </motion.main>
  );
}
