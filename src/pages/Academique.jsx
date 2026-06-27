import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Academique() {
  const containerRef = useRef();
  const { t } = useLanguage();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.edu-item');
      items.forEach((item, i) => {
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
      transition={{ duration: 0.8 }}
      ref={containerRef}
    >
      <div className="edu-container">
        <h1 className="edu-title">{t('Formation.', 'Education.')}</h1>
        
        <div className="edu-timeline">
          <div className="edu-path-line"></div>
          
          <div className="edu-item">
            <div className="edu-marker"></div>
            <div className="edu-content">
              <h2>ENSIIE</h2>
              <h3>{t('Diplôme d’ingénieur en informatique', 'Master of Engineering in Computer Science')}</h3>
              <span className="edu-date">2022 — 2026</span>
              <p>{t('École nationale supérieure d’informatique pour l’industrie et l’entreprise', 'National School of Computer Science for Industry and Enterprise')}</p>
            </div>
          </div>

          <div className="edu-item">
            <div className="edu-marker"></div>
            <div className="edu-content">
              <h2>{t('Classes préparatoires', 'Preparatory Classes')}</h2>
              <h3>{t('Filière scientifique MP*', 'Mathematics and Physics (MP*)')}</h3>
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
