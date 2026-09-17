import React, { useCallback, useRef, useState } from 'react';
import { useSimulationClock } from '../../hooks/useSimulationClock';

const MEMPOOL_SIZE = 8;
const rand = (a, b) => a + Math.random() * (b - a);
const hex = (n) =>
  Array.from({ length: n }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');

const CANDIDATES = [
  { id: 'a', fr: 'Proposition A', en: 'Proposal A' },
  { id: 'b', fr: 'Proposition B', en: 'Proposal B' },
  { id: 'c', fr: 'Abstention', en: 'Abstain' },
];

export default function LedgerAtmosphere({ lang = 'FR' }) {
  const state = useRef({ height: 0, prev: '0000', pending: 0 });
  const [view, setView] = useState({ pending: 0, blocks: [], tally: { a: 0, b: 0, c: 0 }, height: 0 });

  const step = useCallback(() => {
    const s = state.current;

    if (Math.random() < 0.72 && s.pending < MEMPOOL_SIZE) {
      s.pending += 1;
      setView((v) => ({ ...v, pending: s.pending }));
      return;
    }
    if (s.pending < 3) return;

    // Mine: every hash carries the previous one, so the chain is really chained.
    s.height += 1;
    const hash = hex(4) + s.prev.slice(0, 4) + hex(8);
    s.prev = hash;

    const confirmed = s.pending;
    s.pending = 0;

    setView((v) => {
      const tally = { ...v.tally };
      for (let i = 0; i < confirmed; i += 1) {
        tally[CANDIDATES[Math.floor(rand(0, 3))].id] += 1;
      }
      const block = { h: s.height, hash, tx: confirmed, gas: Math.round(rand(21, 64)) };
      return { pending: 0, blocks: [block, ...v.blocks].slice(0, 3), tally, height: s.height };
    });
  }, []);

  useSimulationClock(step, { min: 520, max: 1100 });

  const total = view.tally.a + view.tally.b + view.tally.c || 1;

  return (
    <div className="atm-panel atm-panel-ledger" aria-hidden="true">
      <div className="atm-panel-h atm-panel-h-row">
        <span>{lang === 'FR' ? 'Chaîne locale' : 'Local chain'}</span>
        <span>
          {lang === 'FR' ? 'bloc' : 'block'} {view.height}
        </span>
      </div>

      <div className="atm-mem">
        <span>
          {view.pending} {lang === 'FR' ? 'en attente' : 'pending'}
        </span>
        <span className="atm-pips">
          {Array.from({ length: MEMPOOL_SIZE }, (_, i) => (
            <i key={i} className={i < view.pending ? 'is-full' : ''} />
          ))}
        </span>
      </div>

      {view.blocks.map((b) => (
        <div key={b.h} className="atm-blk">
          <div className="atm-blk-h">
            <b>
              {lang === 'FR' ? 'bloc' : 'block'} {b.h}
            </b>
            <span>
              {b.tx} tx · {b.gas}k gas
            </span>
          </div>
          <div className="atm-blk-hash">0x{b.hash}</div>
        </div>
      ))}

      <div className="atm-tally">
        {CANDIDATES.map((c) => (
          <div key={c.id} className="atm-tl">
            <span className="atm-tl-n">{lang === 'FR' ? c.fr : c.en}</span>
            <span className="atm-tl-bar">
              <i
                className={`is-${c.id}`}
                style={{ width: `${Math.round((view.tally[c.id] / total) * 100)}%` }}
              />
            </span>
            <span className="atm-tl-v">{view.tally[c.id]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
