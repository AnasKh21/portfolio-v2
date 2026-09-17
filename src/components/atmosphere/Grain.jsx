import React from 'react';

export default function Grain() {
  return (
    <svg className="atm-grain" aria-hidden="true">
      <filter id="atm-grain-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#atm-grain-filter)" opacity="0.5" />
    </svg>
  );
}
