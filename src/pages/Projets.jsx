import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES } from '../data/categories';
import { PROJECTS, countByCategory } from '../data/projects';
import { useAtmosphere } from '../components/atmosphere/AtmosphereStage';

function ProjectRow({ project, lang, t, index }) {
  const internal = Boolean(project.to);
  const Tag = internal ? Link : 'a';
  const props = internal
    ? { to: project.to }
    : { href: project.link, target: '_blank', rel: 'noopener noreferrer' };

  return (
    <motion.article
      className="idx-row"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Tag className="idx-row-link" {...props}>
        <h2 className="idx-row-title">
          {lang === 'FR' ? project.title : project.titleEn || project.title}
        </h2>
        <p className="idx-row-desc">{lang === 'FR' ? project.fr : project.en}</p>
        <span className="idx-row-go" aria-hidden="true">
          {internal ? t('Voir le projet', 'View project') : t('Ouvrir', 'Open')}
        </span>
      </Tag>
    </motion.article>
  );
}

export default function Projets() {
  const { t, lang } = useLanguage();
  const { setCategory } = useAtmosphere();
  const [active, setActive] = useState('finance');

  useEffect(() => {
    setCategory(active);
    return () => setCategory(null);
  }, [active, setCategory]);

  const shown = PROJECTS.filter((p) => p.category === active);

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

        <div className="idx-list" key={active}>
          {shown.map((p, i) => (
            <ProjectRow key={p.id} project={p} lang={lang} t={t} index={i} />
          ))}
        </div>
      </div>
    </motion.main>
  );
}
