import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PARCOURS, TIMELINE_FROM, TIMELINE_SPAN } from '../data/parcours';

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

function Node({ entry, index, open, onToggle, t, lang }) {
  const [broken, setBroken] = useState(false);
  const mid = (entry.from + entry.to) / 2;
  const company = lang === 'FR' ? entry.company : entry.companyEn || entry.company;
  const role = lang === 'FR' ? entry.role : entry.roleEn || entry.role;
  const label = lang === 'FR' ? entry.label : entry.labelEn || entry.label;

  return (
    <div
      className={`tlx-node is-${entry.kind}${open ? ' is-open' : ''}`}
      style={{ top: `calc(${pct(mid)}% - 23px)`, '--i': index }}
    >
      <button
        type="button"
        className="tlx-dot"
        aria-expanded={open}
        aria-label={`${company}, ${role}, ${label}`}
        onClick={onToggle}
      >
        {broken ? (
          <span className="tlx-fallback" aria-hidden="true">{company.charAt(0)}</span>
        ) : (
          <img src={entry.logo} alt="" onError={() => setBroken(true)} />
        )}
      </button>

      <span className="tlx-band">
        <span className="tlx-band-in">
          <span className="tlx-text">
            <span className="tlx-co">{company}</span>
            <span className="tlx-ro">{role}</span>
            {entry.links && (
              <span className="tlx-links">
                {entry.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.kind === 'site' ? <GlobeIcon /> : <PinIcon />}
                    {t(l.fr, l.en)}
                  </a>
                ))}
              </span>
            )}
          </span>
          <span className="tlx-yr">{label}</span>
        </span>
      </span>
    </div>
  );
}

function Lane({ kind, entries, openId, setOpenId, t, lang }) {
  return (
    <div className={`tlx-lane is-${kind}`}>
      {entries.map((e) => (
        <span
          key={`${e.id}-dur`}
          className="tlx-dur"
          aria-hidden="true"
          style={{ top: `${pct(e.from)}%`, height: `${pct(e.to) - pct(e.from)}%` }}
        />
      ))}
      {entries.map((e) => (
        <Node
          key={e.id}
          entry={e}
          index={PARCOURS.indexOf(e)}
          open={openId === e.id}
          onToggle={() => setOpenId(openId === e.id ? null : e.id)}
          t={t}
          lang={lang}
        />
      ))}
    </div>
  );
}

export default function ParcoursTimeline() {
  const { t, lang } = useLanguage();
  const [openId, setOpenId] = useState(null);

  const years = [];
  for (let y = 2021; y <= 2026; y += 1) years.push(y);

  const lane = (kind) => PARCOURS.filter((e) => e.kind === kind);

  return (
    <div className="tlx">
      <div className="tlx-head">
        <span>{t('Études', 'Education')}</span>
        <span>{t('Professionnel', 'Professional')}</span>
      </div>

      <div className="tlx-grid">
        <Lane kind="edu" entries={lane('edu')} openId={openId} setOpenId={setOpenId} t={t} lang={lang} />

        <div className="tlx-axis" aria-hidden="true">
          {years.map((y) => (
            <b key={y} style={{ top: `${pct(y)}%` }}>{y}</b>
          ))}
        </div>

        <Lane kind="pro" entries={lane('pro')} openId={openId} setOpenId={setOpenId} t={t} lang={lang} />

        <div className="tlx-now" aria-hidden="true" style={{ top: '97%' }}>
          <i />
          <b>{t("aujourd'hui", 'today')}</b>
        </div>
      </div>
    </div>
  );
}
