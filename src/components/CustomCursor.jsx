import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  // Motion values drive the DOM directly — no React re-render on mouse move.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 28, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 500, damping: 28, mass: 0.5 });

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const updateMousePosition = (e) => {
      x.set(e.clientX - 10);
      y.set(e.clientY - 10);
      setIsVisible((v) => (v ? v : true));
    };

    // Event delegation: fires only when the hovered element changes, not every pixel.
    const handleOver = (e) => {
      const t = e.target;
      setIsHovering(
        !!(t.closest && (t.closest('a') || t.closest('button') || t.closest('.magnetic')))
      );
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [x, y]);

  return (
    <motion.div
      className="custom-cursor"
      style={{ x: springX, y: springY }}
      animate={{
        scale: isHovering ? 1.6 : 1,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    />
  );
}
