import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Academique() {
  const containerRef = useRef();

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
        <h1 className="edu-title">Formation.</h1>
        
        <div className="edu-timeline">
          <div className="edu-path-line"></div>
          
          <div className="edu-item">
            <div className="edu-marker"></div>
            <div className="edu-content">
              <h2>ENSIIE</h2>
              <h3>Diplôme d’ingénieur en informatique</h3>
              <span className="edu-date">2022 — 2026</span>
              <p>École nationale supérieure d’informatique pour l’industrie et l’entreprise</p>
            </div>
          </div>

          <div className="edu-item">
            <div className="edu-marker"></div>
            <div className="edu-content">
              <h2>Classes préparatoires</h2>
              <h3>Filière scientifique MP*</h3>
              <span className="edu-date">2020 — 2022</span>
            </div>
          </div>
          
          {/* Compétences Section */}
          <div className="edu-item skills-section">
            <div className="edu-marker"></div>
            <div className="edu-content">
              <h2>Compétences Techniques</h2>
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
