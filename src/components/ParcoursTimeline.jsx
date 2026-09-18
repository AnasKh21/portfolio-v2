import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PARCOURS, TIMELINE_FROM, TIMELINE_SPAN } from '../data/parcours';

const TODAY = 2026.72;
const pct = (year) => ((year - TIMELINE_FROM) / TIMELINE_SPAN) * 100;

const GlobeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const PinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

/** A small figure that runs along the axis to whatever you are looking at. */
function Runner({ at, running }) {
  return (
    <span className={`rnr${running ? ' is-running' : ''}`} style={{ left: `${at}%` }} aria-hidden="true">
      <svg width="34" height="42" viewBox="-14 -34 28 36">
        <circle className="rnr-head" cx="1" cy="-27" r="4.4" />
        <path className="rnr-torso" d="M1,-22.5 L-0.5,-11" />
        <path className="rnr-arm rnr-arm-a" d="M0.5,-20 L-6.5,-14.5" />
        <path className="rnr-arm rnr-arm-b" d="M0.5,-20 L7,-16" />
        <path className="rnr-leg rnr-leg-a" d="M-0.5,-11 L-6.5,-0.5" />
        <path className="rnr-leg rnr-leg-b" d="M-0.5,-11 L6,-0.5" />
      </svg>
    </span>
  );
}

function Milestone({ entry, active, onEnter, onLeave, t, lang }) {
  const [broken, setBroken] = useState(false);
  const mid = (entry.from + entry.to) / 2;

  const company = lang === 'FR' ? entry.company : entry.companyEn || entry.company;
  const role = lang === 'FR' ? entry.role : entry.roleEn || entry.role;
  const label = lang === 'FR' ? entry.label : entry.labelEn || entry.label;

  return (
    <div
      className={`ms is-${entry.kind}${active ? ' is-active' : ''}`}
      style={{ left: `${pct(mid)}%` }}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      onMouseLeave={onLeave}
      onBlur={onLeave}
    >
      <button type="button" className="ms-dot" aria-label={`${company}, ${role}, ${label}`}>
        {broken ? (
          <span className="ms-fallback" aria-hidden="true">{company.charAt(0)}</span>
        ) : (
          <img src={entry.logo} alt="" onError={() => setBroken(true)} />
        )}
      </button>

      <span className="ms-stem" aria-hidden="true" />

      <span className="ms-label">
        <span className="ms-co">{company}</span>
        <span className="ms-card">
          <span className="ms-ro">{role}</span>
          <span className="ms-yr">{label}</span>
          {entry.links && (
            <span className="ms-links">
              {entry.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.kind === 'site' ? <GlobeIcon /> : <PinIcon />}
                  {t(l.fr, l.en)}
                </a>
              ))}
            </span>
          )}
        </span>
      </span>
    </div>
  );
}

export default function ParcoursTimeline() {
  const { t, lang } = useLanguage();
  const [hovered, setHovered] = useState(null);
  // He rests on today, so his position never depends on an effect having run.
  const [runnerAt, setRunnerAt] = useState(pct(TODAY));
  const [running, setRunning] = useState(false);
  const stopTimer = useRef(0);

  const moveTo = (year) => {
    setRunnerAt(pct(year));
    setRunning(true);
    clearTimeout(stopTimer.current);
    stopTimer.current = setTimeout(() => setRunning(false), 1250);
  };

  useEffect(() => () => clearTimeout(stopTimer.current), []);

  const years = [];
  for (let y = 2021; y <= 2026; y += 1) years.push(y);

  return (
    <div className="hz">
      <div className="hz-scroll">
        <div className="hz-stage">
          <div className="hz-lane is-edu">
            {PARCOURS.filter((e) => e.kind === 'edu').map((e) => (
              <Milestone
                key={e.id}
                entry={e}
                active={hovered === e.id}
                onEnter={() => { setHovered(e.id); moveTo((e.from + e.to) / 2); }}
                onLeave={() => { setHovered(null); moveTo(TODAY); }}
                t={t}
                lang={lang}
              />
            ))}
          </div>

          <div className="hz-axis">
            {PARCOURS.map((e) => (
              <span
                key={`${e.id}-dur`}
                className={`hz-dur is-${e.kind}`}
                aria-hidden="true"
                style={{ left: `${pct(e.from)}%`, width: `${pct(e.to) - pct(e.from)}%` }}
              />
            ))}
            <span className="hz-line" aria-hidden="true" />
            <Runner at={runnerAt} running={running} />
            {years.map((y) => (
              <span key={y} className="hz-tick" style={{ left: `${pct(y)}%` }} aria-hidden="true">
                <i />
                <b>{y}</b>
              </span>
            ))}
            <span className="hz-now" style={{ left: `${pct(TODAY)}%` }} aria-hidden="true">
              <i />
              <b>{t("aujourd'hui", 'today')}</b>
            </span>
          </div>

          <div className="hz-lane is-pro">
            {PARCOURS.filter((e) => e.kind === 'pro').map((e) => (
              <Milestone
                key={e.id}
                entry={e}
                active={hovered === e.id}
                onEnter={() => { setHovered(e.id); moveTo((e.from + e.to) / 2); }}
                onLeave={() => { setHovered(null); moveTo(TODAY); }}
                t={t}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
