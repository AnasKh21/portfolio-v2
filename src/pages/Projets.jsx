import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
  Solidity: '#AA6746',
};

const PROJECTS = [
  {
    title: 'Agent IA Personnel',
    lang: 'Python',
    image: '/projects/agent-ia.png',
    link: 'https://agent-portfolio-446682453018.europe-west1.run.app',
    fr: "Un recruteur a une question à 23h et je ne suis pas là pour répondre. J'ai créé un assistant qui parle à ma place. Il connaît mon parcours et mes projets, et répond en temps réel, jour et nuit.",
    en: "A recruiter has a question at 11pm and I'm not around to answer. So I built an assistant that speaks for me. It knows my background and projects, and replies in real time, day and night.",
    tags: ['Python', 'LangGraph', 'RAG', 'ChromaDB', 'Cloud Run'],
    featured: true,
  },
  {
    to: '/projets/blockchain',
    title: 'Système de vote décentralisé basé sur blockchain',
    titleEn: 'Decentralized voting system on blockchain',
    lang: 'Solidity',
    image: '/projects/blockchain-vote.png',
    fr: "Un smart contract Solidity qui gère une élection sur Ethereum. Vote direct ou par délégation. Une fois inscrit, un vote ne peut plus être modifié. Le décompte est public et vérifiable par tous.",
    en: "A Solidity smart contract running an election on Ethereum. Direct or delegated vote. Once recorded, a vote cannot be changed. The tally is public and verifiable by anyone.",
    tags: ['Solidity', 'Ethereum', 'Smart Contract', 'EVM'],
  },
  {
    slug: 'mcp-agent-gui-for-managing-tools-permissions',
    title: 'MCP Permission Client',
    lang: 'Python',
    image: '/projects/mcp-agent-gui.png',
    fr: "Laisser une IA toucher à vos fichiers, c'est un peu stressant. Et si elle supprime le mauvais dossier ? J'ai construit une interface qui garde la main. Chaque action est classée (autorisée, à confirmer, interdite), et l'IA doit demander la permission avant tout ce qui est sensible.",
    en: "Letting an AI touch your files is a little scary. What if it deletes the wrong folder? I built an interface that stays in control. Every action is labelled (allowed, ask first, blocked), and the AI must ask before anything sensitive.",
    tags: ['Python', 'MCP', 'GUI', 'Security'],
  },
  {
    slug: 'CVE-EXPLORER',
    title: 'OSV CVE Explorer',
    lang: 'JavaScript',
    image: '/projects/CVE-EXPLORER.png',
    fr: "Vous utilisez une librairie dans votre application. Est-elle piratable ? Difficile à savoir sans creuser. Ici vous tapez son nom et sa version, et vous voyez tout de suite les failles connues et leur gravité. De quoi éviter les mauvaises surprises.",
    en: "You use a library in your app. Could it be hacked? Hard to know without digging. Here you type its name and version, and instantly see the known flaws and how serious they are. No more nasty surprises.",
    tags: ['React', 'Spring Boot', 'Java', 'Security'],
  },
  {
    slug: 'raspberry-pico2W-weather-station',
    title: 'Pico 2W Weather Station',
    lang: 'Python',
    image: '/projects/weather-station.jpeg',
    fr: "Quelle température fait-il vraiment dans cette pièce ? Plutôt que d'acheter un objet connecté hors de prix, j'ai transformé une petite puce à quelques euros en station météo. Elle affiche température et humidité en direct.",
    en: "What's the real temperature in this room? Instead of buying a pricey smart gadget, I turned a tiny chip worth a few euros into a weather station. It shows temperature and humidity live.",
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

const DocIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="13" y2="17" />
  </svg>
);

function ProjectRow({ p, index, lang, t }) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const ghostY = useTransform(scrollYProgress, [0, 1], ['16%', '-16%']);
  const mediaY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  const internal = !!p.to;
  const kind = p.kind || (internal ? 'case' : p.link ? 'app' : 'repo');
  const url = p.to || p.link || `${GH}/${p.slug}`;
  const title = t(p.title, p.titleEn || p.title);

  const cta = {
    repo: { icon: <GithubIcon />, label: t('Voir le code', 'View code'), aria: t('voir le code sur GitHub', 'view code on GitHub') },
    app: { icon: <span className="pj-link-spark" aria-hidden="true">✦</span>, label: t("Ouvrir l'agent", 'Open the agent'), aria: t("ouvrir l'agent en ligne", 'open the live agent') },
    doc: { icon: <DocIcon />, label: t('Voir la présentation', 'View the slides'), aria: t('ouvrir la présentation en PDF', 'open the slide deck as PDF') },
    case: { icon: <DocIcon />, label: t('Voir le projet', 'View project'), aria: t("ouvrir l'étude de cas", 'open the case study') },
  }[kind];

  const LinkTag = internal ? Link : 'a';
  const linkProps = internal
    ? { to: url }
    : { href: url, target: '_blank', rel: 'noopener noreferrer' };

  return (
    <article className={`pj-row${index % 2 === 1 ? ' flip' : ''}${p.featured ? ' featured' : ''}`} ref={ref}>
      <div className="pj-media-col">
        <motion.div
          style={prefersReducedMotion ? undefined : { y: mediaY }}
          initial={prefersReducedMotion ? false : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <LinkTag
            className="pj-media-link"
            {...linkProps}
            aria-label={`${title}. ${cta.aria}`}
          >
            <TiltCard className="pj-tilt" max={8}>
              <ProjectMedia src={p.image} title={title} />
            </TiltCard>
          </LinkTag>
        </motion.div>
      </div>

      <div className="pj-text-col">
        <motion.span className="pj-ghost" aria-hidden="true" style={prefersReducedMotion ? undefined : { y: ghostY }}>
          {title.charAt(0)}
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
          {title}
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
          <LinkTag className="pj-link" {...linkProps}>
            {cta.icon}
            {cta.label}
            <span className="pj-link-arrow" aria-hidden="true">{internal ? '→' : '↗'}</span>
          </LinkTag>
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
