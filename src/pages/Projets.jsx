import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Magnetic from '../components/Magnetic';
import ProjectMedia from '../components/ProjectMedia';
import TiltCard from '../components/TiltCard';
import TechChips from '../components/TechChips';

const GH = 'https://github.com/AnasKh21';

const LANG_COLOR = {
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  HTML: '#e34c26',
};

const PROJECTS = [
  {
    title: 'Agent IA Personnel',
    lang: 'Python',
    image: '/projects/agent-ia.png',
    link: 'https://agent-portfolio-446682453018.europe-west1.run.app',
    fr: "Agent conversationnel autonome (LangGraph, RAG/ChromaDB, LLM open-weight) déployé sur Google Cloud Run — il répond en direct sur mon parcours et mes projets.",
    en: 'Autonomous conversational agent (LangGraph, RAG/ChromaDB, open-weight LLM) deployed on Google Cloud Run — it answers live about my background and projects.',
    tags: ['Python', 'LangGraph', 'RAG', 'ChromaDB', 'Cloud Run'],
    featured: true,
  },
  {
    slug: 'mcp-agent-gui-for-managing-tools-permissions',
    title: 'MCP Permission Client',
    lang: 'Python',
    image: '/projects/mcp-agent-gui.png',
    fr: "Interface graphique pour un agent MCP : lister/appeler les outils, visualiser les logs d'audit et gérer finement les permissions (ALLOW / ASK / DENY).",
    en: 'Desktop GUI for an MCP agent: list/call tools, view audit logs and manage fine-grained permissions (ALLOW / ASK / DENY).',
    tags: ['Python', 'MCP', 'GUI', 'Security'],
  },
  {
    slug: 'CVE-EXPLORER',
    title: 'OSV CVE Explorer',
    lang: 'JavaScript',
    image: '/projects/CVE-EXPLORER.png',
    fr: "Application full-stack React + Spring Boot qui interroge l'API OSV.dev de Google : recherche de vulnérabilités par package/version ou par identifiant CVE, avec badges de sévérité.",
    en: 'Full-stack React + Spring Boot app querying Google\'s OSV.dev API: search vulnerabilities by package/version or CVE id, with severity badges.',
    tags: ['React', 'Spring Boot', 'Java', 'Security'],
  },
  {
    slug: 'raspberry-pico2W-weather-station',
    title: 'Pico 2W Weather Station',
    lang: 'Python',
    image: '/projects/weather-station.jpeg',
    fr: "Station météo temps réel sur Raspberry Pi Pico 2W : capteurs BME280, mesures et affichage en direct.",
    en: 'Real-time weather station on a Raspberry Pi Pico 2W: BME280 sensors, readings and live display.',
    tags: ['Python', 'Raspberry Pi', 'IoT'],
  },
];

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

function ProjectRow({ p, index, lang, t }) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const ghostY = useTransform(scrollYProgress, [0, 1], ['16%', '-16%']);
  const mediaY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  const isRepo = !p.link;
  const url = p.link || `${GH}/${p.slug}`;

  return (
    <article className={`pj-row${index % 2 === 1 ? ' flip' : ''}${p.featured ? ' featured' : ''}`} ref={ref}>
      <div className="pj-media-col">
        <motion.div
          style={prefersReducedMotion ? undefined : { y: mediaY }}
          initial={prefersReducedMotion ? false : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            className="pj-media-link"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${p.title} — ${isRepo ? t('voir le code sur GitHub', 'view code on GitHub') : t("ouvrir l'agent en ligne", 'open the live agent')}`}
          >
            <TiltCard className="pj-tilt" max={8}>
              <ProjectMedia src={p.image} title={p.title} />
            </TiltCard>
          </a>
        </motion.div>
      </div>

      <div className="pj-text-col">
        <motion.span className="pj-ghost" aria-hidden="true" style={prefersReducedMotion ? undefined : { y: ghostY }}>
          {p.title.charAt(0)}
        </motion.span>

        {p.featured && <span className="pj-featured">★ {t('Projet phare', 'Featured')}</span>}

        <div className="pj-meta">
          <span className="repo-lang">
            <span className="repo-dot" style={{ background: LANG_COLOR[p.lang] || '#9ca3af' }} />
            {p.lang}
          </span>
        </div>

        <motion.h2
          className="pj-title"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 26, clipPath: 'inset(0 0 100% 0)' }}
          animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {p.title}
        </motion.h2>

        <motion.p
          className="pj-desc"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {lang === 'FR' ? p.fr : p.en}
        </motion.p>

        <TechChips tags={p.tags} />

        <Magnetic>
          <a className="pj-link" href={url} target="_blank" rel="noopener noreferrer">
            {isRepo ? <GithubIcon /> : <span className="pj-link-spark" aria-hidden="true">✦</span>}
            {isRepo ? t('Voir le code', 'View code') : t("Ouvrir l'agent", 'Open the agent')}
            <span className="pj-link-arrow" aria-hidden="true">↗</span>
          </a>
        </Magnetic>
      </div>
    </article>
  );
}

export default function Projets() {
  const { t, lang } = useLanguage();

  return (
    <motion.main
      className="page-projets"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <header className="xp-header">
        <span className="section-eyebrow">{t('Sélection', 'Selected work')}</span>
        <h1 className="section-title">{t('Projets', 'Projects')}</h1>
        <p className="xp-intro">
          {t(
            "Des projets qui me représentent — des agents IA / MCP à la sécurité et à l'IoT.",
            'Projects that represent me — from AI / MCP agents to security and IoT.'
          )}
        </p>
        <Magnetic>
          <a className="repo-profile-link" href={GH} target="_blank" rel="noopener noreferrer">
            <GithubIcon size={18} />
            {t('Tout voir sur GitHub', 'See all on GitHub')}
            <span aria-hidden="true">↗</span>
          </a>
        </Magnetic>
      </header>

      <div className="pj-list">
        {PROJECTS.map((p, i) => (
          <ProjectRow key={p.title} p={p} index={i} lang={lang} t={t} />
        ))}
      </div>
    </motion.main>
  );
}
