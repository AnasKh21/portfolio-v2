import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

const getInitialLang = () => {
  if (typeof window === 'undefined') return 'FR';
  const stored = window.localStorage.getItem('lang');
  if (stored === 'FR' || stored === 'EN') return stored;
  return navigator.language?.toLowerCase().startsWith('fr') ? 'FR' : 'EN';
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang.toLowerCase();
    window.localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'FR' ? 'EN' : 'FR'));
  };

  const t = (frText, enText) => {
    return lang === 'FR' ? frText : enText;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
