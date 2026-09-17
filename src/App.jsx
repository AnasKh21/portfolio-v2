import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import AtmosphereStage, { AtmosphereProvider } from './components/atmosphere/AtmosphereStage';
import Home from './pages/Home';
import Pro from './pages/Pro';
import Projets from './pages/Projets';
import ProjetBlockchain from './pages/ProjetBlockchain';
import ProjetJuggle from './pages/ProjetJuggle';
import ProjetOrderBook from './pages/ProjetOrderBook';
import ProjetPricing from './pages/ProjetPricing';
import Academique from './pages/Academique';

export default function App() {
  const location = useLocation();

  return (
    <AtmosphereProvider>
      <AtmosphereStage />
      <Navigation />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/parcours/pro" element={<Pro />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="/projets/orderbook" element={<ProjetOrderBook />} />
          <Route path="/projets/pricing" element={<ProjetPricing />} />
          <Route path="/projets/blockchain" element={<ProjetBlockchain />} />
          <Route path="/projets/juggle" element={<ProjetJuggle />} />
          <Route path="/parcours/academique" element={<Academique />} />
        </Routes>
      </AnimatePresence>
    </AtmosphereProvider>
  );
}
