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

const CodeBlock = ({ cap, code }) => (
  <div className="bc-code">
    {cap && <div className="bc-code-cap">{cap}</div>}
    <pre><code>{code}</code></pre>
  </div>
);

const WikiLink = ({ href, children }) => (
  <a className="bc-wiki" href={href} target="_blank" rel="noopener noreferrer">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
    {children}
  </a>
);

const DELEGATE = `function delegate(address to) external {
    Voter storage sender = voters[msg.sender];
    require(sender.weight != 0, "No right to vote.");
    require(!sender.voted, "Already voted.");
    require(to != msg.sender, "Self-delegation disallowed.");

    // remonte la chaine de delegation, boucle interdite
    while (voters[to].delegate != address(0)) {
        to = voters[to].delegate;
        require(to != msg.sender, "Loop in delegation.");
    }

    Voter storage delegate_ = voters[to];
    require(delegate_.weight >= 1);
    sender.voted = true;
    sender.delegate = to;

    if (delegate_.voted) {
        proposals[delegate_.vote].voteCount += sender.weight;
    } else {
        delegate_.weight += sender.weight;
    }
}`;

const WINNING = `function winningProposal() public view returns (uint256 winner) {
    uint256 winningVoteCount = 0;
    bool isTie = false;

    for (uint256 p = 0; p < proposals.length; p++) {
        if (proposals[p].voteCount > winningVoteCount) {
            winningVoteCount = proposals[p].voteCount;
            winner = p;
            isTie = false;
        } else if (proposals[p].voteCount == winningVoteCount) {
            isTie = true;
        }
    }
    // index reserve renvoye en cas d'egalite
    if (isTie) winner = type(uint256).max;
}`;

export default function ProjetBlockchain() {
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

      {/* Hero */}
      <header className="bc-hero">
        <Reveal delay={0.05}>
          <h1 className="bc-title">
            {t('Système de vote décentralisé', 'Decentralized voting system')}
            <span className="bc-title-accent"> {t('basé sur blockchain', 'on blockchain')}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="bc-pitch">
            {t(
              "Smart contract Solidity déployé sur Ethereum. Vote direct ou par délégation. Résultats publics, immuables, vérifiables.",
              'Solidity smart contract deployed on Ethereum. Direct or delegated vote. Public, immutable, verifiable results.'
            )}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <TechChips tags={['Solidity', 'Ethereum', 'EVM', 'Smart Contract']} className="bc-hero-chips" />
        </Reveal>
        <Reveal delay={0.2}>
          <div className="bc-links">
            <a className="pj-link" href="/presentation_blockchain.pdf" target="_blank" rel="noopener noreferrer">
              {t('Présentation', 'Slides')}<span className="pj-link-arrow">↗</span>
            </a>
            <a className="pj-link" href="/Rapport_blockchain.pdf" target="_blank" rel="noopener noreferrer">
              {t('Rapport', 'Report')}<span className="pj-link-arrow">↗</span>
            </a>
          </div>
        </Reveal>
      </header>

      {/* Stats */}
      <Reveal>
        <div className="bc-stats">
          <div className="bc-stat"><b>66,6%</b><span>{t('participation mondiale (IDEA)', 'global turnout (IDEA)')}</span></div>
          <div className="bc-stat"><b>~10%</b><span>{t('fraude estimée (BBC)', 'estimated fraud (BBC)')}</span></div>
          <div className="bc-stat"><b>100%</b><span>{t('résultats vérifiables on-chain', 'results verifiable on-chain')}</span></div>
        </div>
      </Reveal>

      <div className="bc-body">
        <Section n="01" title={t('Problème', 'Problem')}>
          <Reveal>
            <p className="bc-lead">
              {t(
                "Le vote traditionnel dépend d'une autorité centrale. Résultats opaques, recomptage lourd, fraude possible. La confiance repose sur un tiers.",
                'Traditional voting depends on a central authority. Opaque results, heavy recount, possible fraud. Trust rests on a third party.'
              )}
            </p>
          </Reveal>
          <div className="bc-two">
            <Reveal className="bc-case">
              <div className="bc-case-img">
                <img src="/projects/blockchain-baxter.jpg" alt={t('Mairie de Baxter Springs, Kansas', 'Baxter Springs city hall, Kansas')} loading="lazy" />
              </div>
              <div className="bc-case-body">
                <h4>Baxter Springs, 2006</h4>
                <p>{t(
                  'Égalité parfaite entre deux candidats. Le vainqueur désigné par tirage au sort.',
                  'Perfect tie between two candidates. The winner picked by drawing lots.'
                )}</p>
                <WikiLink href="https://en.wikipedia.org/wiki/Baxter_Springs,_Kansas">{t('En savoir plus', 'Learn more')}</WikiLink>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="bc-case">
              <div className="bc-case-img bc-case-img-contain">
                <img src="/projects/blockchain-congo.png" alt={t('Carte de la République démocratique du Congo', 'Map of the Democratic Republic of the Congo')} loading="lazy" />
              </div>
              <div className="bc-case-body">
                <h4>{t('RD Congo, 2011 et 2018', 'DR Congo, 2011 and 2018')}</h4>
                <p>{t(
                  'Législatives aux résultats contestés. Soupçons de manipulation.',
                  'Legislative elections with disputed results. Suspicions of manipulation.'
                )}</p>
                <WikiLink href="https://en.wikipedia.org/wiki/2018_Democratic_Republic_of_the_Congo_general_election">{t('En savoir plus', 'Learn more')}</WikiLink>
                <span className="bc-credit">{t('Carte', 'Map')} : Connormah, CC BY-SA 3.0</span>
              </div>
            </Reveal>
          </div>
        </Section>

        <Section n="02" title={t('Solution', 'Solution')}>
          <Reveal>
            <p className="bc-lead">
              {t(
                "Porter le scrutin sur un registre distribué. Un vote inscrit devient immuable. Le décompte s'exécute dans le contrat. Chacun peut le vérifier.",
                'Move the ballot onto a distributed ledger. A recorded vote becomes immutable. The tally runs inside the contract. Anyone can verify it.'
              )}
            </p>
          </Reveal>
          <div className="bc-three">
            {[
              { k: t('Transparence', 'Transparency'), v: t('Contrat et transactions publics et auditables.', 'Public, auditable contract and transactions.') },
              { k: t('Sécurité', 'Security'), v: t('Règles exécutées sans tiers de confiance.', 'Rules executed with no trusted third party.') },
              { k: t('Égalité', 'Equality'), v: t('Un électeur autorisé, un poids de vote.', 'One authorized voter, one voting weight.') },
            ].map((c, i) => (
              <Reveal key={c.k} delay={i * 0.08} className="bc-pill">
                <h3>{c.k}</h3>
                <p>{c.v}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="bc-more">
            <WikiLink href="https://en.wikipedia.org/wiki/Blockchain">Blockchain</WikiLink>
            <WikiLink href="https://en.wikipedia.org/wiki/Ethereum">Ethereum</WikiLink>
          </Reveal>
        </Section>

        <Section n="03" title={t('Fonctionnement', 'How it works')}>
          <Reveal>
            <figure className="bc-fig">
              <img src="/projects/blockchain-vote.png" alt={t('Schéma du système de vote', 'Voting system diagram')} />
            </figure>
          </Reveal>
          <ol className="bc-steps">
            {[
              t("L'owner déploie le contrat et attribue les droits de vote.", 'The owner deploys the contract and grants voting rights.'),
              t('Chaque électeur vote pour une proposition ou délègue sa voix.', 'Each voter votes for a proposal or delegates their vote.'),
              t('Votes et décompte sont enregistrés on-chain.', 'Votes and tally are recorded on-chain.'),
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.08} className="bc-step">
                <span>{i + 1}</span><p>{s}</p>
              </Reveal>
            ))}
          </ol>
        </Section>

        <Section n="04" title={t('Smart contract', 'Smart contract')}>
          <div className="bc-two">
            <Reveal className="bc-struct">
              <h4>struct Voter</h4>
              <ul>
                <li><code>weight</code> {t('poids du vote', 'voting weight')}</li>
                <li><code>voted</code> {t('a déjà voté', 'has voted')}</li>
                <li><code>delegate</code> {t('adresse déléguée', 'delegated address')}</li>
                <li><code>vote</code> {t('proposition choisie', 'chosen proposal')}</li>
              </ul>
            </Reveal>
            <Reveal delay={0.08} className="bc-struct">
              <h4>struct Proposal</h4>
              <ul>
                <li><code>name</code> {t('nom de la proposition', 'proposal name')}</li>
                <li><code>voteCount</code> {t('votes reçus', 'votes received')}</li>
              </ul>
              <p className="bc-struct-note">
                {t("onlyOwner réserve l'attribution des droits à l'administrateur.", 'onlyOwner restricts rights granting to the administrator.')}
              </p>
            </Reveal>
          </div>

          <Reveal className="bc-more">
            <WikiLink href="https://soliditylang.org/">Solidity</WikiLink>
            <WikiLink href="https://docs.soliditylang.org/en/latest/solidity-by-example.html#voting">{t('Exemple Ballot (docs Solidity)', 'Ballot example (Solidity docs)')}</WikiLink>
          </Reveal>

          <Reveal><CodeBlock cap={t('Délégation avec détection de boucle', 'Delegation with loop detection')} code={DELEGATE} /></Reveal>
          <Reveal delay={0.05}><CodeBlock cap={t('Décompte on-chain et gestion des égalités', 'On-chain tally and tie handling')} code={WINNING} /></Reveal>

          <div className="bc-usecase">
            <Reveal className="bc-fig bc-fig-tight">
              <img src="/projects/blockchain-usecase.png" alt={t("Diagramme de cas d'utilisation", 'Use case diagram')} />
            </Reveal>
            <Reveal delay={0.06} className="bc-usecase-txt">
              <h4>{t("Cas d'utilisation", 'Use cases')}</h4>
              <p>{t('Deux acteurs. Owner pour le déploiement et les droits. Électeur pour le vote, la délégation et la consultation.', 'Two actors. Owner for deployment and rights. Voter for voting, delegation and lookups.')}</p>
              <div className="bc-fns">
                <code>giveRightToVote</code><code>vote</code><code>delegate</code><code>getResults</code><code>getWinnersName</code>
              </div>
            </Reveal>
          </div>
        </Section>

        <Section n="05" title={t('Invariants', 'Invariants')}>
          <div className="bc-inv-grid">
            {[
              { k: t('Intégrité des droits', 'Rights integrity'), v: t('Droit accordé une seule fois. Poids initial nul.', 'Right granted once. Initial weight is zero.') },
              { k: t('Unicité', 'Uniqueness'), v: t('Un électeur vote une seule fois.', 'A voter votes only once.') },
              { k: t('Délégation', 'Delegation'), v: t('Pas de délégation à soi. Pas de boucle.', 'No self-delegation. No loop.') },
              { k: t('Validité', 'Validity'), v: t('Vote uniquement sur une proposition existante.', 'Vote only on an existing proposal.') },
            ].map((c, i) => (
              <Reveal key={c.k} delay={i * 0.06} className="bc-inv">
                <h4>{c.k}</h4><p>{c.v}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section n="06" title={t('Limite', 'Limitation')}>
          <Reveal>
            <p className="bc-lead">
              {t(
                "Un owner unique contrôle les droits de vote. Ce point central contredit l'esprit décentralisé.",
                'A single owner controls voting rights. This central point contradicts the decentralized model.'
              )}
            </p>
          </Reveal>
          <div className="bc-three">
            {[
              t('Gouvernance par vote des participants.', 'Governance by participant vote.'),
              t('Attribution des droits automatisée.', 'Automated rights granting.'),
              t('Consensus PoS ou PoA pour les décisions sensibles.', 'PoS or PoA consensus for sensitive decisions.'),
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.06} className="bc-pill"><p>{s}</p></Reveal>
            ))}
          </div>
        </Section>
      </div>
    </motion.main>
  );
}
