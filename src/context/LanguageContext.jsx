import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('FR');

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
