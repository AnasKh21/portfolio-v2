import React, { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const lenis = useLenis(ScrollTrigger.update);

  useEffect(() => {
    if (!lenis) return;
    
    const updateGsap = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateGsap);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateGsap);
    };
  }, [lenis]);

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothTouch: false }}>
      {children}
    </ReactLenis>
  );
}
