import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Pro from './pages/Pro';
import Academique from './pages/Academique';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const location = useLocation();

  return (
    <>
      <CustomCursor />
      <Navigation />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/parcours/pro" element={<Pro />} />
          <Route path="/parcours/academique" element={<Academique />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
