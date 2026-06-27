import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Navigation() {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <motion.header 
      className="nav-header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <NavLink to="/" className="logo">
        Anas KHAYAR<span>.</span>
      </NavLink>
      <nav className="nav-links">
        <NavLink 
          to="/parcours/pro" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          {t('Pro', 'Experience')}
        </NavLink>
        <NavLink 
          to="/parcours/academique" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          {t('Académique', 'Education')}
        </NavLink>
      </nav>
      <div className="nav-socials">
        <div className="lang-switch" onClick={toggleLang}>
          <span className={lang === 'FR' ? 'active' : ''}>FR</span>
          <span>/</span>
          <span className={lang === 'EN' ? 'active' : ''}>EN</span>
        </div>
      </div>
    </motion.header>
  );
}
