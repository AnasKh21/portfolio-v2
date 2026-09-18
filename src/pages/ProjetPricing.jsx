import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import TechChips from '../components/TechChips';

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

const CRR = `def price2(N, rN, hN, bN, s, f):
    """Prix binomial par induction retrograde."""
    qN = (rN - bN) / (hN - bN)
    V = [f(s * (1 + hN)**k * (1 + bN)**(N - k)) for k in range(N + 1)]
    for k in range(N - 1, -1, -1):
        for i in range(k + 1):
            V[i] = (qN * V[i + 1] + (1 - qN) * V[i]) / (1 + rN)
    return V`;

const MC = `def price3(n, s, r, sigma, T, f):
    """Prix Monte-Carlo d'une option payant f(S_T)."""
    xi = np.random.randn(n)
    ST = s * np.exp((r - sigma**2 / 2) * T + sigma * np.sqrt(T) * xi)
    return np.exp(-r * T) * np.mean([f(v) for v in ST])`;

export default function ProjetPricing() {
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
          <h1 className="bc-title">Pricing engine</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="bc-pitch">
            {t(
              'Options européennes, valorisées quatre fois par quatre méthodes différentes, pour voir si elles tombent sur le même prix.',
              'European options, priced four ways by four different methods, to see whether they land on the same number.'
            )}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <TechChips tags={['Python', 'NumPy', 'SciPy', 'Matplotlib']} className="bc-hero-chips" />
        </Reveal>
      </header>

      <Section n="01" title={t("L'arbre binomial", 'The binomial tree')}>
        <Reveal>
          <p className="bc-lead">
            {t(
              "Le prix se construit en remontant l'arbre depuis l'échéance. À chaque nœud, la valeur est l'espérance actualisée des deux valeurs suivantes sous la probabilité risque neutre.",
              'The price is built by walking back up the tree from maturity. At each node the value is the discounted expectation of the two values above it, under the risk neutral probability.'
            )}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="bc-code">
            <pre><code>{CRR}</code></pre>
          </div>
        </Reveal>
      </Section>

      <Section n="02" title={t('La couverture', 'The hedge')}>
        <Reveal>
          <p className="bc-lead">
            {t(
              "À chaque nœud, la stratégie de réplication donne combien d'actif et combien de sans risque détenir pour retrouver la valeur de l'option dans les deux états suivants. C'est ce qui rend le prix autre chose qu'une moyenne.",
              'At each node the replicating strategy gives how much of the asset and how much of the riskless bond to hold in order to match the option value in both next states. That is what makes the price more than an average.'
            )}
          </p>
        </Reveal>
      </Section>

      <Section n="03" title={t('Monte-Carlo', 'Monte-Carlo')}>
        <Reveal>
          <p className="bc-lead">
            {t(
              "On tire des trajectoires, on actualise le payoff, on fait la moyenne. La loi des grands nombres fait le reste.",
              'Draw paths, discount the payoff, take the mean. The law of large numbers does the rest.'
            )}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="bc-code">
            <pre><code>{MC}</code></pre>
          </div>
        </Reveal>
      </Section>

      <Section n="04" title={t('Est-ce que tout concorde', 'Does it all agree')}>
        <Reveal>
          <p className="bc-lead">
            {t(
              "Monte-Carlo converge vers la formule fermée de Black-Scholes quand le nombre de tirages augmente. L'arbre converge vers la même valeur quand le nombre de pas augmente. Trois chemins indépendants qui arrivent au même prix, c'est la seule vérification qui vaille.",
              'Monte-Carlo converges to the closed form Black-Scholes value as the number of draws grows. The tree converges to the same value as the number of steps grows. Three independent routes landing on one price is the only check worth having.'
            )}
          </p>
        </Reveal>
      </Section>

      <Section n="05" title={t("L'EDP par différences finies", 'The PDE by finite differences')}>
        <Reveal>
          <p className="bc-lead">
            {t(
              "La même option, résolue cette fois comme une équation aux dérivées partielles, avec trois schémas : explicite, implicite, et Crank-Nicolson. Le schéma explicite est le plus simple et le seul à exploser si le pas de temps est trop grand.",
              'The same option, solved this time as a partial differential equation, with three schemes: explicit, implicit, and Crank-Nicolson. The explicit scheme is the simplest and the only one that blows up if the time step is too large.'
            )}
          </p>
        </Reveal>
      </Section>
    </motion.main>
  );
}
