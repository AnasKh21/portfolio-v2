import { useEffect, useRef } from 'react';

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Drives one atmosphere simulation. Skips work while the tab is hidden and
 * never starts at all under reduced motion, so the frozen first frame stands
 * in for the animation.
 */
export function useSimulationClock(step, { min = 400, max = 800, active = true } = {}) {
  const stepRef = useRef(step);
  stepRef.current = step;

  useEffect(() => {
    if (!active || prefersReduced()) return undefined;

    let timer;
    let stopped = false;

    const run = () => {
      if (stopped) return;
      if (!document.hidden) stepRef.current();
      timer = setTimeout(run, min + Math.random() * (max - min));
    };

    timer = setTimeout(run, min);
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, [active, min, max]);
}

export { prefersReduced };
