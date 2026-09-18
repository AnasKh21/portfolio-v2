import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import ParcoursTimeline from '../components/ParcoursTimeline';
import SkillGrid from '../components/SkillGrid';
import { SKILL_GROUPS } from '../data/parcours';

export default function Parcours() {
  const { t } = useLanguage();

  return (
    <motion.main
      className="page-parcours"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <h1 className="pc-title">{t('Parcours', 'Journey')}</h1>

      <ParcoursTimeline />

      <section className="pc-skills">
        <h2>{t('Compétences techniques', 'Technical skills')}</h2>
        <SkillGrid groups={SKILL_GROUPS} t={t} />
      </section>
    </motion.main>
  );
}
