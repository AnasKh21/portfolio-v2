import React from 'react';

// Tech name -> local logo (devicon). Concepts without a logo render as text chips.
const TECH = {
  Python: '/tech/python.svg',
  JavaScript: '/tech/javascript.svg',
  Java: '/tech/java.svg',
  React: '/tech/react.svg',
  'Spring Boot': '/tech/spring.svg',
  'Raspberry Pi': '/tech/raspberrypi.svg',
  'Cloud Run': '/tech/googlecloud.svg',
  Docker: '/tech/docker.svg',
  'C/C++': '/tech/cplusplus.svg',
  PostgreSQL: '/tech/postgresql.svg',
  Ethereum: '/tech/ethereum.svg',
  OpenCV: '/tech/opencv.svg',
  PyTorch: '/tech/pytorch.svg',
  NumPy: '/tech/numpy.svg',
};

export default function TechChips({ tags, className = '' }) {
  return (
    <div className={`tech-row ${className}`.trim()}>
      {tags.map((tag) => (
        <span key={tag} className="tech-chip">
          {TECH[tag] && (
            <img className="tech-ico" src={TECH[tag]} alt="" aria-hidden="true" loading="lazy" />
          )}
          {tag}
        </span>
      ))}
    </div>
  );
}
