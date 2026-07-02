import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Animated company/school logo. Falls back to a styled monogram if the
 * image is missing or fails to load.
 */
export default function LogoBadge({ src, name }) {
  const [err, setErr] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const initials = name
    .replace(/[^A-Za-zÀ-ÿ ]/g, ' ')
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      className="logo-badge"
      initial={prefersReducedMotion ? false : { scale: 0.6, opacity: 0, rotate: -8 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08, rotate: 3 }}
    >
      {err || !src ? (
        <span className="logo-mono">{initials}</span>
      ) : (
        <img src={src} alt={name} loading="lazy" onError={() => setErr(true)} />
      )}
    </motion.div>
  );
}
