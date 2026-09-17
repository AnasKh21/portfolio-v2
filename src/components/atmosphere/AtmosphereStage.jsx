import React, { createContext, useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useParallax } from '../../hooks/useParallax';
import MeshBackdrop from './MeshBackdrop';
import Grain from './Grain';
import OrderBookAtmosphere from './OrderBookAtmosphere';
import LedgerAtmosphere from './LedgerAtmosphere';
import DetectionAtmosphere from './DetectionAtmosphere';
import TelemetryAtmosphere from './TelemetryAtmosphere';

const AtmosphereContext = createContext({ setCategory: () => {} });

export const useAtmosphere = () => useContext(AtmosphereContext);

const SIMULATIONS = {
  finance: OrderBookAtmosphere,
  blockchain: LedgerAtmosphere,
  ia: DetectionAtmosphere,
  embarque: TelemetryAtmosphere,
};

export function AtmosphereProvider({ children }) {
  const [category, setCategory] = useState(null);
  const value = useMemo(() => ({ category, setCategory }), [category]);
  return <AtmosphereContext.Provider value={value}>{children}</AtmosphereContext.Provider>;
}

export default function AtmosphereStage() {
  const { category } = useAtmosphere();
  const { lang } = useLanguage();
  useParallax();

  const Simulation = category ? SIMULATIONS[category] : null;

  return (
    <div className="atm-stage" aria-hidden="true">
      <MeshBackdrop />
      <AnimatePresence>
        {Simulation && (
          <motion.div
            key={category}
            className="atm-slot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Simulation lang={lang} />
          </motion.div>
        )}
      </AnimatePresence>
      <Grain />
    </div>
  );
}
