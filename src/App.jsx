import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Background from './components/Background';
import Home from './pages/Home';
import Pro from './pages/Pro';
import Projets from './pages/Projets';
import Academique from './pages/Academique';

export default function App() {
  const location = useLocation();

  return (
    <>
      <Background />
      <Navigation />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/parcours/pro" element={<Pro />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="/parcours/academique" element={<Academique />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
