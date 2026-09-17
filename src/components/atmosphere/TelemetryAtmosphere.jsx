import React, { useCallback, useRef, useState } from 'react';
import { useSimulationClock } from '../../hooks/useSimulationClock';

const N = 44;
const W = 352;
const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const map = (v, lo, hi) => 104 - ((v - lo) / (hi - lo)) * 84;
const points = (arr, lo, hi) =>
  arr.map((v, i) => `${((i / (N - 1)) * W).toFixed(1)},${map(v, lo, hi).toFixed(1)}`).join(' ');

export default function TelemetryAtmosphere({ lang = 'FR' }) {
  const s = useRef({
    t: 21.4,
    h: 48,
    p: 1013,
    temps: Array(N).fill(21.4),
    hums: Array(N).fill(48),
    sec: 0,
  });
  const [view, setView] = useState({ ...s.current, lines: [] });

  const step = useCallback(() => {
    const c = s.current;
    c.t = clamp(c.t + rand(-0.34, 0.34), 18.6, 25.4);
    c.h = clamp(c.h + rand(-1.1, 1.1), 37, 61);
    c.p = clamp(c.p + rand(-0.7, 0.7), 1002, 1026);
    c.temps = [...c.temps.slice(1), c.t];
    c.hums = [...c.hums.slice(1), c.h];
    c.sec += 2;

    const stamp = new Date().toTimeString().slice(0, 8);
    const line = `[${stamp}] T=${c.t.toFixed(1)}C H=${Math.round(c.h)}% P=${Math.round(c.p)}hPa`;

    setView((v) => ({
      t: c.t,
      h: c.h,
      p: c.p,
      temps: c.temps,
      hums: c.hums,
      sec: c.sec,
      lines: [line, ...v.lines].slice(0, 5),
    }));
  }, []);

  useSimulationClock(step, { min: 760, max: 1200 });

  const mm = String(Math.floor(view.sec / 60)).padStart(2, '0');
  const ss = String(view.sec % 60).padStart(2, '0');

  return (
    <div className="atm-panel atm-panel-telemetry" aria-hidden="true">
      <div className="atm-panel-h atm-panel-h-row">
        <span>Pico 2W · {lang === 'FR' ? 'capteur' : 'sensor'}</span>
        <span>
          uptime {mm}:{ss}
        </span>
      </div>

      <div className="atm-gauges">
        <div>
          <b>{view.t.toFixed(1)}</b>
          <span>°C</span>
        </div>
        <div>
          <b>{Math.round(view.h)}</b>
          <span>% {lang === 'FR' ? 'humidité' : 'humidity'}</span>
        </div>
        <div>
          <b>{Math.round(view.p)}</b>
          <span>hPa</span>
        </div>
      </div>

      <svg className="atm-chart" width={W} height="112" viewBox={`0 0 ${W} 112`}>
        <g className="atm-chart-grid">
          <line x1="0" y1="28" x2={W} y2="28" />
          <line x1="0" y1="56" x2={W} y2="56" />
          <line x1="0" y1="84" x2={W} y2="84" />
        </g>
        <polyline className="atm-line is-hum" points={points(view.hums, 36, 62)} />
        <polyline className="atm-line is-temp" points={points(view.temps, 18, 26)} />
        <circle className="atm-live-dot" cx={W} cy={map(view.t, 18, 26)} r="3.5" />
      </svg>

      <div className="atm-term">
        {view.lines.map((l) => (
          <div key={l}>{l}</div>
        ))}
      </div>
    </div>
  );
}
