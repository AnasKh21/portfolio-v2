import React, { useCallback, useRef, useState } from 'react';
import { useSimulationClock } from '../../hooks/useSimulationClock';

const TICK = 0.25;
const LEVELS = 6;

const rand = (a, b) => a + Math.random() * (b - a);
const newSize = () => Math.round(rand(40, 900));

const seed = (mid) => ({
  bids: Array.from({ length: LEVELS }, (_, i) => ({ px: mid - TICK / 2 - i * TICK, sz: newSize() })),
  asks: Array.from({ length: LEVELS }, (_, i) => ({ px: mid + TICK / 2 + i * TICK, sz: newSize() })),
});

const withCumulative = (levels) => {
  let cum = 0;
  return levels.map((l) => {
    cum += l.sz;
    return { ...l, cum };
  });
};

export default function OrderBookAtmosphere() {
  const bookRef = useRef(seed(1000.375));
  const printKey = useRef(2);

  const [book, setBook] = useState(bookRef.current);
  const [prints, setPrints] = useState([
    { px: 1000.5, sz: 120, side: 'buy', k: 0 },
    { px: 1000.25, sz: 64, side: 'sell', k: 1 },
  ]);
  const [pulse, setPulse] = useState(null);

  const step = useCallback(() => {
    const bids = bookRef.current.bids.map((l) => ({ ...l }));
    const asks = bookRef.current.asks.map((l) => ({ ...l }));
    const roll = Math.random();

    if (roll < 0.46) {
      // A resting order is added to, or partly cancelled.
      const side = Math.random() < 0.5 ? 'bids' : 'asks';
      const levels = side === 'bids' ? bids : asks;
      const i = Math.floor(Math.random() * levels.length);
      const delta = Math.round(rand(-180, 260));
      levels[i].sz = Math.max(20, levels[i].sz + delta);
      setPulse(delta > 0 ? { side, i, kind: 'up' } : null);
    } else if (roll < 0.78) {
      // Someone crosses the spread and takes the touch.
      const buy = Math.random() < 0.5;
      const taken = buy ? asks : bids;
      const other = buy ? bids : asks;
      const qty = Math.round(rand(60, 420));

      printKey.current += 1;
      const print = {
        px: taken[0].px,
        sz: Math.round(rand(10, 220)),
        side: buy ? 'buy' : 'sell',
        k: printKey.current,
      };
      setPrints((p) => [print, ...p].slice(0, 8));
      setPulse({ side: buy ? 'asks' : 'bids', i: 0, kind: 'hit' });

      taken[0].sz -= qty;
      if (taken[0].sz <= 0) {
        taken.shift();
        const last = taken[taken.length - 1];
        taken.push({ px: buy ? last.px + TICK : last.px - TICK, sz: newSize() });
        other.unshift({ px: buy ? other[0].px + TICK : other[0].px - TICK, sz: newSize() });
        other.pop();
      }
    } else {
      const side = Math.random() < 0.5 ? 'bids' : 'asks';
      const levels = side === 'bids' ? bids : asks;
      const j = Math.floor(Math.random() * levels.length);
      levels[j].sz = newSize();
      setPulse({ side, i: j, kind: 'up' });
    }

    bookRef.current = { bids, asks };
    setBook(bookRef.current);
  }, []);

  useSimulationClock(step, { min: 260, max: 620 });

  const bids = withCumulative(book.bids);
  const asks = withCumulative(book.asks);
  const max = Math.max(...bids.map((l) => l.cum), ...asks.map((l) => l.cum), 1);

  const cls = (side, i) =>
    `atm-lvl${i === 0 ? ' is-touch' : ''}${
      pulse && pulse.side === side && pulse.i === i ? ` is-${pulse.kind}` : ''
    }`;

  return (
    <div className="atm-panel atm-panel-book" aria-hidden="true">
      <div className="atm-tape">
        <div className="atm-panel-h">Dernières transactions</div>
        {prints.map((p) => (
          <div key={p.k} className={`atm-print is-${p.side}`}>
            <span>{p.px.toFixed(2)}</span>
            <span className="atm-print-q">{p.sz}</span>
          </div>
        ))}
      </div>

      <div className="atm-dom">
        <div className="atm-dom-h">
          <span>Achat</span>
          <span>Prix</span>
          <span>Vente</span>
        </div>

        {asks
          .slice()
          .reverse()
          .map((l, ri) => {
            const i = asks.length - 1 - ri;
            return (
              <div key={`a${l.px.toFixed(2)}`} className={cls('asks', i)}>
                <span className="atm-depth is-ask" style={{ width: `${(l.cum / max) * 100}%` }} />
                <span className="atm-sz" />
                <span className="atm-px">{l.px.toFixed(2)}</span>
                <span className="atm-sz is-ask">{l.sz}</span>
              </div>
            );
          })}

        <div className="atm-spread">
          <span>écart</span>
          <b>{(asks[0].px - bids[0].px).toFixed(2)}</b>
          <span>{((asks[0].px + bids[0].px) / 2).toFixed(2)}</span>
        </div>

        {bids.map((l, i) => (
          <div key={`b${l.px.toFixed(2)}`} className={cls('bids', i)}>
            <span className="atm-depth is-bid" style={{ width: `${(l.cum / max) * 100}%` }} />
            <span className="atm-sz is-bid">{l.sz}</span>
            <span className="atm-px">{l.px.toFixed(2)}</span>
            <span className="atm-sz" />
          </div>
        ))}
      </div>
    </div>
  );
}
