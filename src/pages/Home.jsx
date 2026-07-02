import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Magnetic from '../components/Magnetic';
import TiltCard from '../components/TiltCard';

const Github = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-github"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-linkedin"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } }
  };

  const revealVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.main
      className="page-home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.section
        className="hero-centered"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Circular portrait with orbiting ring + 3D tilt */}
        <motion.div className="hero-center" variants={revealVariants}>
          <span className="hero-orbit" aria-hidden="true">
            <span className="hero-orbit-dot" />
          </span>
          <TiltCard className="photo-tilt">
            <div className="hero-cutout">
              <img
                src="/anas_photo.png"
                onError={(e) => { e.currentTarget.src = '/anas_photo.jpeg'; }}
                alt="Anas KHAYAR"
              />
            </div>
          </TiltCard>
        </motion.div>

        <motion.h1 className="hero-name-c" variants={revealVariants}>
          Anas KHAYAR<span className="accent-dot">.</span>
        </motion.h1>
        <motion.p className="hero-role-c" variants={revealVariants}>
          {t('Ingénieur Logiciel Junior', 'Junior Software Engineer')}
        </motion.p>
        <motion.p className="hero-about-c" variants={revealVariants}>
          {t(
            "Fraîchement diplômé de l'une des meilleures écoles d'ingénieurs en informatique.",
            'Freshly graduated from one of the top computer-science engineering schools.'
          )}
        </motion.p>

        <motion.p className="hero-prompt" variants={revealVariants}>
          {t(
            "Envie d'en savoir plus ou de réserver un créneau ?",
            'Want to know more or book a slot?'
          )}
        </motion.p>

        <motion.div className="hero-socials hero-socials-c" variants={revealVariants}>
          <motion.a
            href="https://github.com/AnasKh21"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="GitHub (ouvre dans un nouvel onglet)"
            whileHover={{ scale: 1.1, rotate: 5, backgroundColor: 'var(--accent)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={22} aria-hidden="true" />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/anas-khayar-7004ab2bb/fr/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BI8iyn%2FriSFmNTiyZRS03TQ%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="LinkedIn (ouvre dans un nouvel onglet)"
            whileHover={{ scale: 1.1, rotate: -5, backgroundColor: 'var(--accent)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin size={22} aria-hidden="true" />
          </motion.a>
        </motion.div>

        <motion.div className="hero-actions hero-actions-c" variants={revealVariants}>
          <Magnetic>
            <button onClick={() => navigate('/parcours/pro')} className="btn-primary">
              {t('Explorer le parcours', 'Explore Experience')}
            </button>
          </Magnetic>
          <Magnetic>
            <a
              href="https://agent-portfolio-446682453018.europe-west1.run.app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-agent"
            >
              <span className="agent-spark" aria-hidden="true">✦</span>
              {t("Discuter avec l'Agent IA", 'Chat with my AI Agent')}
            </a>
          </Magnetic>
        </motion.div>
      </motion.section>

    </motion.main>
  );
}
