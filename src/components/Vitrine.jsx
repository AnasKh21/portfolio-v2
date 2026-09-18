import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import OrderBookAtmosphere from './atmosphere/OrderBookAtmosphere';
import LedgerAtmosphere from './atmosphere/LedgerAtmosphere';
import DetectionAtmosphere from './atmosphere/DetectionAtmosphere';
import TelemetryAtmosphere from './atmosphere/TelemetryAtmosphere';

const SIMS = {
  'sim:orderbook': OrderBookAtmosphere,
  'sim:ledger': LedgerAtmosphere,
  'sim:detection': DetectionAtmosphere,
  'sim:telemetry': TelemetryAtmosphere,
};

/** The pricing engine has no simulation and no screenshot, so it gets drawn. */
function PricingVisual() {
  return (
    <svg className="viz-draw" viewBox="0 0 420 260" aria-hidden="true">
      <g className="viz-grid">
        <line x1="40" y1="40" x2="400" y2="40" />
        <line x1="40" y1="100" x2="400" y2="100" />
        <line x1="40" y1="160" x2="400" y2="160" />
        <line x1="40" y1="220" x2="400" y2="220" />
      </g>
      <line className="viz-ref" x1="40" y1="78" x2="400" y2="78" />
      <path
        className="viz-curve is-mc"
        d="M40,224 C96,150 128,96 176,88 C224,80 246,102 282,84 C318,66 340,86 400,79"
      />
      <path
        className="viz-curve is-tree"
        d="M40,196 C100,168 132,112 182,98 C232,84 254,70 292,82 C330,94 352,74 400,77"
      />
      <circle className="viz-dot" cx="400" cy="78" r="4" />
    </svg>
  );
}

/** Any aspect ratio, shown whole, on a blurred copy of itself. */
function Shot({ src, alt }) {
  return (
    <div className="viz-shot">
      <div className="viz-shot-bed" style={{ backgroundImage: `url(${src})` }} aria-hidden="true" />
      <img src={src} alt={alt} />
    </div>
  );
}

export default function Vitrine({ projects, categoryLabel }) {
  const { t, lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(0);

  useEffect(() => setIndex(0), [projects]);

  useEffect(() => {
    if (paused || projects.length < 2) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    timer.current = setTimeout(() => setIndex((i) => (i + 1) % projects.length), 6500);
    return () => clearTimeout(timer.current);
  }, [index, paused, projects]);

  if (!projects.length) return null;

  const project = projects[index];
  const title = lang === 'FR' ? project.title : project.titleEn || project.title;
  const internal = Boolean(project.to);
  const Tag = internal ? Link : 'a';
  const linkProps = internal
    ? { to: project.to }
    : { href: project.link, target: '_blank', rel: 'noopener noreferrer' };

  return (
    <section
      className="viz"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label={t('Projets', 'Projects')}
    >
      <div className="viz-frame">
        {projects.map((p, i) => {
          const PSim = SIMS[p.visual];
          return (
            <div className={`viz-slide${i === index ? ' is-on' : ''}`} key={p.id} aria-hidden={i !== index}>
              {PSim ? (
                <div className="viz-sim">
                  <PSim lang={lang} />
                </div>
              ) : p.visual === 'sim:pricing' ? (
                <div className="viz-sim viz-sim-draw">
                  <PricingVisual />
                </div>
              ) : (
                <Shot src={p.visual} alt="" />
              )}
            </div>
          );
        })}

        <div className="viz-wash" aria-hidden="true" />

        <div className="viz-text">
          <span className="viz-cat">{categoryLabel}</span>
          <h2 className="viz-title">{title}</h2>
          <Tag className="viz-cta" {...linkProps}>
            {internal ? t('Voir le projet', 'View project') : t('Ouvrir', 'Open')}
            <span aria-hidden="true">{internal ? '→' : '↗'}</span>
          </Tag>
        </div>

        {projects.length > 1 && (
          <div className="viz-nav">
            {projects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className={i === index ? 'is-on' : ''}
                aria-label={lang === 'FR' ? p.title : p.titleEn || p.title}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
