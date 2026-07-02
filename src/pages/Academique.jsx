import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import LogoBadge from '../components/LogoBadge';

gsap.registerPlugin(ScrollTrigger);

const GlobeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const PinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default function Academique() {
  const containerRef = useRef();
  const { t } = useLanguage();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.edu-item');
      items.forEach((item) => {
        gsap.fromTo(item, 
          { opacity: 0, y: 50 },
          {
            opacity: 1, 
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
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
        <h1 className="edu-title">{t('Formation.', 'Education.')}</h1>
        
        <div className="edu-timeline">
          <div className="edu-path-line"></div>
          
          <div className="edu-item">
            <div className="edu-marker"></div>
            <div className="edu-content">
              <div className="edu-head">
                <LogoBadge src="/logos/ensiie.png" name="ENSIIE" />
                <h2>ENSIIE</h2>
              </div>
              <h3>{t('Diplôme d’ingénieur en informatique', 'Master of Engineering in Computer Science')}</h3>
              <span className="edu-date">2022 — 2026</span>
              <p>{t('École nationale supérieure d’informatique pour l’industrie et l’entreprise', 'National School of Computer Science for Industry and Enterprise')}</p>
              <div className="edu-links">
                <a className="edu-link" href="https://www.ensiie.fr" target="_blank" rel="noopener noreferrer">
                  <GlobeIcon /> {t('Voir le site', 'Visit website')}
                </a>
                <a className="edu-link" href="https://www.google.com/maps/search/?api=1&query=ENSIIE+Évry-Courcouronnes" target="_blank" rel="noopener noreferrer">
                  <PinIcon /> Évry, France
                </a>
              </div>
            </div>
          </div>

          <div className="edu-item">
            <div className="edu-marker"></div>
            <div className="edu-content">
              <div className="edu-head">
                <LogoBadge src="/logos/gsr.png" name="Groupe Scolaire La Residence" />
                <h2>{t('Classes préparatoires', 'Preparatory Classes')}</h2>
              </div>
              <h3>{t('Filière scientifique MP* — Groupe Scolaire La Résidence, Casablanca', 'Mathematics and Physics (MP*) — Groupe Scolaire La Résidence, Casablanca')}</h3>
              <span className="edu-date">2020 — 2022</span>
            </div>
          </div>
          
          <div className="edu-item skills-section">
            <div className="edu-marker"></div>
            <div className="edu-content">
              <h2>{t('Compétences Techniques', 'Technical Skills')}</h2>
              <div className="skills-grid">
                {['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'Rust', 'C/C++', 'React', 'fastAPI', 'LangGraph', 'Docker', 'PostgreSQL'].map(skill => (
                  <div key={skill} className="skill-pill">{skill}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
