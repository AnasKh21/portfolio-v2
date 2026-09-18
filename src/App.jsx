import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import AtmosphereStage, { AtmosphereProvider } from './components/atmosphere/AtmosphereStage';
import Home from './pages/Home';
import Parcours from './pages/Parcours';
import Projets from './pages/Projets';
import ProjetBlockchain from './pages/ProjetBlockchain';
import ProjetJuggle from './pages/ProjetJuggle';
import ProjetOrderBook from './pages/ProjetOrderBook';
import ProjetPricing from './pages/ProjetPricing';

export default function App() {
  const location = useLocation();

  return (
    <AtmosphereProvider>
      <AtmosphereStage />
      <Navigation />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/parcours" element={<Parcours />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="/projets/orderbook" element={<ProjetOrderBook />} />
          <Route path="/projets/pricing" element={<ProjetPricing />} />
          <Route path="/projets/blockchain" element={<ProjetBlockchain />} />
          <Route path="/projets/juggle" element={<ProjetJuggle />} />
          <Route path="/parcours/pro" element={<Navigate to="/parcours" replace />} />
          <Route path="/parcours/academique" element={<Navigate to="/parcours" replace />} />
        </Routes>
      </AnimatePresence>
    </AtmosphereProvider>
  );
}
