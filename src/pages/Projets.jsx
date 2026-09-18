import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES } from '../data/categories';
import { PROJECTS, countByCategory } from '../data/projects';
import { useAtmosphere } from '../components/atmosphere/AtmosphereStage';
import Vitrine from '../components/Vitrine';

export default function Projets() {
  const { t, lang } = useLanguage();
  const { setCategory } = useAtmosphere();
  const [active, setActive] = useState('finance');

  // The simulations now live inside the vitrine, so the page keeps only its
  // ambient wash behind them.
  useEffect(() => {
    setCategory(null);
    return () => setCategory(null);
  }, [setCategory]);

  const shown = PROJECTS.filter((p) => p.category === active);
  const category = CATEGORIES.find((c) => c.id === active);
  const categoryLabel = category ? (lang === 'FR' ? category.fr : category.en) : '';

  return (
    <motion.main
      className="page-projets-idx"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <h1 className="idx-title">{t('Projets', 'Projects')}</h1>

      <div className="idx-body">
        <nav className="idx-rail" aria-label={t('Catégories', 'Categories')}>
          <ul>
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  className={c.id === active ? 'is-active' : ''}
                  aria-current={c.id === active ? 'true' : undefined}
                  onClick={() => setActive(c.id)}
                >
                  <span className="idx-rail-name">{lang === 'FR' ? c.fr : c.en}</span>
                  <span className="idx-rail-count">{countByCategory(c.id)}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <Vitrine key={active} projects={shown} categoryLabel={categoryLabel} />
      </div>
    </motion.main>
  );
}
