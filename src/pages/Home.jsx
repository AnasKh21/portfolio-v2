import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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

  // Animation variants
  const revealVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.main 
      className="page-home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="home-container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Photo Added */}
          <motion.div variants={revealVariants} style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="hero-photo-wrapper">
              <img src="/anas_photo.jpeg" alt="Anas KHAYAR" />
            </div>
          </motion.div>

          <div className="reveal-mask">
            <motion.h1 variants={revealVariants} className="hero-title-big">
              Ingénieur Logiciel
            </motion.h1>
          </div>
          <div className="reveal-mask">
            <motion.h1 variants={revealVariants} className="hero-title-big indent">
              & Architecte IA.
            </motion.h1>
          </div>

          <motion.div variants={revealVariants} className="hero-socials" style={{ justifyContent: 'center' }}>
            <motion.a 
              href="https://github.com/AnasKh21" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              whileHover={{ scale: 1.1, rotate: 5, backgroundColor: 'var(--accent)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={24} />
            </motion.a>
            <motion.a 
              href="https://linkedin.com/in/anas-khayar-7004ab2bb/fr/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BI8iyn%2FriSFmNTiyZRS03TQ%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              whileHover={{ scale: 1.1, rotate: -5, backgroundColor: 'var(--accent)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={24} />
            </motion.a>
          </motion.div>

          <motion.div variants={revealVariants} className="hero-actions">
            <button 
              onClick={() => navigate('/parcours/pro')} 
              className="btn-primary magnetic"
            >
              Explorer le parcours
            </button>
            <a 
              href="https://agent-portfolio-446682453018.europe-west1.run.app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary magnetic"
            >
              Discuter avec l'Agent
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.main>
  );
}
