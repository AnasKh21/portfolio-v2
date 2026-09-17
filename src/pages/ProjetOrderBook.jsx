import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import TechChips from '../components/TechChips';

const REPO = 'https://github.com/AnasKh21/designing-an-orderbook';

const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

const Section = ({ n, title, children }) => (
  <section className="bc-section">
    <Reveal className="bc-section-head">
      <span className="bc-index">{n}</span>
      <h2 className="bc-h2">{title}</h2>
    </Reveal>
    {children}
  </section>
);

const SWEEP = [
  { spread: 5, rate: '1 533 248', trades: '167 021', resting: '31 204', p50: '150', p99: '10 650' },
  { spread: 10, rate: '2 551 628', trades: '164 234', resting: '34 059', p50: '130', p99: '4 168' },
  { spread: 50, rate: '3 935 089', trades: '161 806', resting: '36 429', p50: '130', p99: '1 392' },
  { spread: 200, rate: '3 133 469', trades: '160 572', resting: '37 706', p50: '210', p99: '982' },
  { spread: 1000, rate: '1 633 735', trades: '161 323', resting: '36 991', p50: '460', p99: '1 674' },
];

const SPLIT = `// OrderBook : le stockage. Range les ordres, ne decide rien.
book.addOrder(std::move(order));

// MatchingEngine : la politique. Regarde la meilleure limite
// opposee, execute ce qui peut l'etre, ne repose que le reste.
engine.processOrder(std::move(order));`;

export default function ProjetOrderBook() {
  const { t } = useLanguage();

  return (
    <motion.main
      className="bc-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link className="bc-back" to="/projets">← {t('Projets', 'Projects')}</Link>

      <header className="bc-hero">
        <Reveal delay={0.05}>
          <h1 className="bc-title">Low latency order book</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="bc-lede">
            {t(
              "Un carnet d'ordres et son moteur d'appariement, écrits en C++, mesurés honnêtement.",
              'A limit order book and its matching engine, written in C++, measured honestly.'
            )}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <TechChips tags={['C++17', 'CMake', 'GoogleTest']} />
        </Reveal>
      </header>

      <Section n="01" title={t('Deux responsabilités séparées', 'Two separate jobs')}>
        <Reveal>
          <p className="bc-p">
            {t(
              "Le carnet range les ordres à leur prix et les classe. Il n'a aucun avis sur le fait que deux d'entre eux devraient s'échanger. Le moteur d'appariement, lui, regarde la meilleure limite opposée et ne repose dans le carnet que ce qui n'a pas pu être exécuté.",
              'The book files orders at their price and ranks them. It has no opinion about whether two of them should trade. The matching engine looks at the opposite touch, and only rests in the book what could not be executed.'
            )}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="bc-code">
            <pre><code>{SPLIT}</code></pre>
          </div>
        </Reveal>
      </Section>

      <Section n="02" title={t('La propriété des ordres', 'Who owns an order')}>
        <Reveal>
          <p className="bc-p">
            {t(
              "Chaque ordre est un unique_ptr. Il n'existe qu'à un seul endroit à la fois, et le passer au moteur transfère la propriété. Un ordre exécuté est détruit, pas oublié quelque part.",
              'Every order is a unique_ptr. It exists in exactly one place at a time, and handing it to the engine transfers ownership. A filled order is destroyed, not left behind somewhere.'
            )}
          </p>
        </Reveal>
      </Section>

      <Section n="03" title={t('Les tests', 'The tests')}>
        <Reveal>
          <p className="bc-p">
            {t(
              "Sept fichiers de tests, dont un sur les invariants du carnet et un sur la propriété. Les invariants vérifient ce qui doit rester vrai après n'importe quelle séquence : les meilleures limites ne se croisent jamais, et un niveau vide disparaît.",
              'Seven test files, including one on the book invariants and one on ownership. The invariants check what must hold after any sequence: the touches never cross, and an empty level disappears.'
            )}
          </p>
        </Reveal>
      </Section>

      <Section n="04" title={t('Le banc de mesure', 'The benchmark')}>
        <Reveal>
          <p className="bc-p">
            {t(
              "200 000 messages, graine fixe, build Release. Les ordres sont construits avant le démarrage du chronomètre. L'appel à l'horloge coûte 22 ns et chaque message en utilise deux, donc 44 ns de chaque latence ci-dessous est la mesure elle-même.",
              '200,000 messages, fixed seed, Release build. Orders are built before the clock starts. One clock call costs 22 ns and each message uses two, so 44 ns of every latency below is the measurement itself.'
            )}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="cs-table-wrap">
            <table className="cs-table">
              <thead>
                <tr>
                  <th>{t('Écart', 'Spread')}</th>
                  <th>{t('Messages / sec', 'Messages / sec')}</th>
                  <th>{t('Transactions', 'Trades')}</th>
                  <th>{t('En carnet', 'Resting')}</th>
                  <th>p50</th>
                  <th>p99</th>
                </tr>
              </thead>
              <tbody>
                {SWEEP.map((r) => (
                  <tr key={r.spread} className={r.spread === 50 ? 'is-peak' : undefined}>
                    <td>{r.spread}</td>
                    <td>{r.rate}</td>
                    <td>{r.trades}</td>
                    <td>{r.resting}</td>
                    <td>{r.p50} ns</td>
                    <td>{r.p99} ns</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="bc-p">
            {t(
              "L'écart change tout. Serré, les ordres se rencontrent et s'exécutent. Large, ils s'empilent et le carnet grossit. Ce sont deux chemins de code différents, donc deux séries de chiffres.",
              'The spread changes everything. Narrow, and orders meet and trade. Wide, and they pile up while the book grows. Those are two different code paths, so they get two sets of numbers.'
            )}
          </p>
        </Reveal>
      </Section>

      <Section n="05" title={t('La queue de distribution', 'The tail')}>
        <Reveal>
          <p className="bc-p">
            {t(
              "La médiane est à 120 ns en appariement intense. Le p99 est à 3 887 ns, le p99.9 à 12 374 ns, et le maximum à 2,2 ms. Cet écart entre la médiane et le pire cas vient d'une réallocation ponctuelle des conteneurs.",
              'The median is 120 ns under heavy matching. p99 is 3,887 ns, p99.9 is 12,374 ns, and the maximum is 2.2 ms. That gap between the median and the worst case comes from a one-off container reallocation.'
            )}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="bc-p">
            {t(
              "C'est le chiffre qui compte. Une moyenne de 333 ns ne dit rien du message qui prend deux millisecondes, et sur un carnet réel c'est celui-là qui pose problème.",
              'That is the number that matters. A 333 ns mean says nothing about the message that takes two milliseconds, and on a real book that is the one that hurts.'
            )}
          </p>
        </Reveal>
      </Section>

      <div className="bc-links">
        <a className="pj-link" href={REPO} target="_blank" rel="noopener noreferrer">
          {t('Voir le code', 'View code')}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </motion.main>
  );
}
