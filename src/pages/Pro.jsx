import React, { Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { PerformanceMonitor } from '@react-three/drei';

const Experience3D = React.lazy(() => import('../components/Experience3D'));

export default function Pro() {
  const shouldReduceMotion = useReducedMotion();
  const [dpr, setDpr] = React.useState(1.5);

  const fallbackContent = (
    <div className={shouldReduceMotion ? "timeline-container" : "sr-only"}>
      <h1 className="timeline-header">Parcours Professionnel</h1>
      
      <div className="timeline-item">
        <div className="timeline-dot"></div>
        <div className="timeline-content">
          <h2>OpMobility</h2>
          <h3>Développeur logiciel en alternance (2024 - 2025)</h3>
          <p>Contribution à la réduction de 50% du temps de paramétrage UDS. Développement de services en C/C++ et d'un outil de génération de code avec interface graphique en Python.</p>
        </div>
      </div>

      <div className="timeline-item">
        <div className="timeline-dot"></div>
        <div className="timeline-content">
          <h2>Nexaglobe</h2>
          <h3>Stagiaire en support IT (2024)</h3>
          <p>Support et maintien d’une solution de détection d’intrusions basée sur Snort. Centralisation et requêtage des logs en SQL.</p>
        </div>
      </div>

      <div className="timeline-item">
        <div className="timeline-dot"></div>
        <div className="timeline-content">
          <h2>Soremed</h2>
          <h3>Stagiaire en développement logiciel IA (2023)</h3>
          <p>Développement d'une base de données en Java (Hibernate/JPA) et d'un chatbot de support RAG + text-to-SQL interrogeant une base PostgreSQL.</p>
        </div>
      </div>

      <div className="timeline-item">
        <div className="timeline-dot"></div>
        <div className="timeline-content">
          <h2>Agent IA Personnel</h2>
          <h3>Interface Conversationnelle (2024)</h3>
          <p>Conception et déploiement d'un agent autonome avec LangGraph, RAG (ChromaDB), et un modèle LLM open-weight. Conteneurisé sur Google Cloud Run.</p>
        </div>
      </div>
    </div>
  );

  return (
    <motion.main 
      className="page-pro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ height: shouldReduceMotion ? 'auto' : '500vh' }}
    >
      {!shouldReduceMotion && (
        <div className="canvas-container" aria-hidden="true">
          <Suspense fallback={<div className="loading-state" style={{ padding: '5rem', textAlign: 'center', fontWeight: 'bold' }}>Chargement de l'expérience...</div>}>
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={dpr}>
              <color attach="background" args={['#fafafa']} />
              <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)}>
                <Experience3D />
                <EffectComposer disableNormalPass>
                  <Bloom luminanceThreshold={0.8} luminanceSmoothing={0.9} intensity={0.5} mipmapBlur />
                  <Noise opacity={0.03} />
                  <Vignette eskil={false} offset={0.1} darkness={0.8} />
                </EffectComposer>
              </PerformanceMonitor>
            </Canvas>
          </Suspense>
          
          <div className="scroll-indicator">
            <p>Scroll pour avancer</p>
            <div className="mouse-icon"></div>
          </div>
        </div>
      )}

      {/* 2D Fallback Timeline / Semantic HTML */}
      {fallbackContent}
    </motion.main>
  );
}
