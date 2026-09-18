import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import LogoBadge from '../components/LogoBadge';

gsap.registerPlugin(ScrollTrigger);

const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const SKILL_GROUPS = [
  {
    fr: 'Programmation objet',
    en: 'Object oriented programming',
    items: ['C/C++', 'Java', 'Python'],
  },
  {
    fr: 'Systèmes et conteneurs',
    en: 'Systems and containers',
    items: ['Linux', 'Docker', 'Kubernetes', 'Git'],
  },
  {
    fr: 'Intelligence artificielle',
    en: 'Artificial intelligence',
    items: ['genAI', 'LangGraph', 'RAG'],
  },
  {
    fr: 'Services et interfaces',
    en: 'Services and interfaces',
    items: ['API REST', 'Django', 'React'],
  },
];

const SKILL_COUNT = SKILL_GROUPS.reduce((n, g) => n + g.items.length, 0);

export default function Academique() {
  const containerRef = useRef();
  const { t } = useLanguage();

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.utils.toArray('.edu-item').forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 44 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: { trigger: item, start: 'top 82%', toggleActions: 'play none none reverse' },
            }
          );
        });
      }

      // The rail fills as you read down it.
      gsap.fromTo(
        '.edu-line-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.edu-timeline',
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: 0.6,
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <motion.main
      className="page-academique"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      ref={containerRef}
    >
      <div className="edu-container">
        <h1 className="edu-title">{t('Formation', 'Education')}</h1>

        <div className="edu-timeline">
          <span className="edu-line" aria-hidden="true">
            <span className="edu-line-fill" />
          </span>

          <article className="edu-item">
            <span className="edu-marker" aria-hidden="true" />
            <div className="edu-when">
              <b>2026</b>
              <i>{t('depuis 2022', 'since 2022')}</i>
            </div>
            <div className="edu-body">
              <div className="edu-head">
                <LogoBadge src="/logos/ensiie.png" name="ENSIIE" />
                <h2>ENSIIE</h2>
              </div>
              <h3>{t("Diplôme d'ingénieur en informatique", 'Master of Engineering in Computer Science')}</h3>
              <p>
                {t(
                  "École nationale supérieure d'informatique pour l'industrie et l'entreprise",
                  'National School of Computer Science for Industry and Enterprise'
                )}
              </p>
              <div className="edu-links">
                <a className="edu-link" href="https://www.ensiie.fr" target="_blank" rel="noopener noreferrer">
                  <GlobeIcon /> {t('Voir le site', 'Visit website')}
                </a>
                <a
                  className="edu-link"
                  href="https://www.google.com/maps/search/?api=1&query=ENSIIE+Évry-Courcouronnes"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PinIcon /> Évry, France
                </a>
              </div>
            </div>
          </article>

          <article className="edu-item">
            <span className="edu-marker" aria-hidden="true" />
            <div className="edu-when">
              <b>2022</b>
              <i>{t('depuis 2020', 'since 2020')}</i>
            </div>
            <div className="edu-body">
              <div className="edu-head">
                <LogoBadge src="/logos/gsr.png" name="Groupe Scolaire La Résidence" />
                <h2>{t('Classes préparatoires', 'Preparatory classes')}</h2>
              </div>
              <h3>{t('Filière scientifique MP étoile', 'Mathematics and Physics, MP star')}</h3>
              <p>Groupe Scolaire La Résidence, Casablanca</p>
            </div>
          </article>

          <article className="edu-item edu-item-skills">
            <span className="edu-marker" aria-hidden="true" />
            <div className="edu-when">
              <b>{SKILL_COUNT}</b>
              <i>{t('outils', 'tools')}</i>
            </div>
            <div className="edu-body">
              <h2>{t('Compétences techniques', 'Technical skills')}</h2>
              <div className="sk-groups">
                {SKILL_GROUPS.map((g, gi) => (
                  <section className="sk-group" key={g.en} style={{ '--gi': gi }}>
                    <h4 className="sk-group-name">{t(g.fr, g.en)}</h4>
                    <ul className="sk-list">
                      {g.items.map((item, ii) => (
                        <li key={item} style={{ '--ii': ii }}>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </motion.main>
  );
}
