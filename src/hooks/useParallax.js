import { useEffect } from 'react';
import { prefersReduced } from './useSimulationClock';

/**
 * Publishes the pointer position as --px / --py on the root element, in the
 * range -0.5 to 0.5. Atmosphere layers multiply those by their own depth.
 */
export function useParallax() {
  useEffect(() => {
    if (prefersReduced()) return undefined;

    const root = document.documentElement;
    let frame = 0;

    const onMove = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        root.style.setProperty('--px', (e.clientX / window.innerWidth - 0.5).toFixed(3));
        root.style.setProperty('--py', (e.clientY / window.innerHeight - 0.5).toFixed(3));
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}
