import React, { useCallback, useRef, useState } from 'react';
import { useSimulationClock } from '../../hooks/useSimulationClock';

const N = 60;
const W = 352;
const BASELINE = 104;
const THRESHOLD = 52;

const rand = (a, b) => a + Math.random() * (b - a);

export default function DetectionAtmosphere({ lang = 'FR' }) {
  const s = useRef({
    ys: Array(N).fill(BASELINE),
    phase: 0,
    amp: 38,
    period: 13,
    prevSlope: 1,
    peaks: [],
    count: 0,
    rejected: 0,
  });

  const [view, setView] = useState({
    ys: s.current.ys,
    peaks: [],
    count: 0,
    rejected: 0,
    confidence: 0.94,
    contact: true,
    popped: false,
  });

  const step = useCallback(() => {
    const c = s.current;
    c.phase += 1;

    const y = BASELINE - Math.abs(Math.sin((c.phase / c.period) * Math.PI)) * c.amp * rand(0.88, 1.12);
    c.ys = [...c.ys.slice(1), y];
    c.peaks = c.peaks.map((p) => ({ ...p, x: p.x - 1 })).filter((p) => p.x > 0);

    const slope = c.ys[N - 1] - c.ys[N - 2];
    let popped = false;
    let contact = null;
    let confidence = null;

    // A crest is a local minimum in y, since y is screen space.
    if (c.prevSlope < 0 && slope >= 0 && c.ys[N - 2] < THRESHOLD) {
      contact = Math.random() < 0.82;
      confidence = rand(0.86, 0.99);
      if (contact) {
        c.count += 1;
        c.peaks = [...c.peaks, { x: N - 2, y: c.ys[N - 2], k: c.phase }];
        popped = true;
      } else {
        c.rejected += 1;
      }
      c.amp = rand(30, 44);
      c.period = Math.round(rand(11, 16));
    }
    c.prevSlope = slope;

    setView((v) => ({
      ys: c.ys,
      peaks: c.peaks,
      count: c.count,
      rejected: c.rejected,
      confidence: confidence === null ? v.confidence : confidence,
      contact: contact === null ? v.contact : contact,
      popped,
    }));
  }, []);

  useSimulationClock(step, { min: 66, max: 66 });

  const line = view.ys
    .map((y, i) => `${((i / (N - 1)) * W).toFixed(1)},${y.toFixed(1)}`)
    .join(' ');

  return (
    <div className="atm-panel atm-panel-detect" aria-hidden="true">
      <div className="atm-panel-h atm-panel-h-row">
        <span>{lang === 'FR' ? 'Hauteur du ballon' : 'Ball height'}</span>
        <span>30 {lang === 'FR' ? 'img/s' : 'fps'}</span>
      </div>

      <div className="atm-count">
        <b className={view.popped ? 'is-pop' : ''}>{view.count}</b>
        <span>{lang === 'FR' ? 'jonglages détectés' : 'juggles counted'}</span>
      </div>

      <svg className="atm-chart" width={W} height="132" viewBox={`0 0 ${W} 132`}>
        <line className="atm-chart-grid" x1="0" y1={BASELINE} x2={W} y2={BASELINE} />
        <line className="atm-threshold" x1="0" y1={THRESHOLD} x2={W} y2={THRESHOLD} />
        <polyline className="atm-line is-ball" points={line} />
        {view.peaks.map((p) => (
          <circle
            key={p.k}
            className="atm-peak"
            cx={((p.x / (N - 1)) * W).toFixed(1)}
            cy={p.y.toFixed(1)}
            r="3"
          />
        ))}
        <circle className="atm-live-dot" cx={W} cy={view.ys[N - 1].toFixed(1)} r="5" />
      </svg>

      <div className="atm-conf">
        <span>
          {lang === 'FR' ? 'confiance' : 'confidence'} <b>{view.confidence.toFixed(2)}</b>
        </span>
        <span>
          {lang === 'FR' ? 'contact pied' : 'foot contact'}{' '}
          <b>{view.contact ? (lang === 'FR' ? 'oui' : 'yes') : lang === 'FR' ? 'non' : 'no'}</b>
        </span>
        <span>
          {lang === 'FR' ? 'rejetés' : 'rejected'} <b>{view.rejected}</b>
        </span>
      </div>
    </div>
  );
}
