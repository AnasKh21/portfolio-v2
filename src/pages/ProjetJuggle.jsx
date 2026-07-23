import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import TechChips from '../components/TechChips';

const REPO = 'https://github.com/AnasKh21/football-juggle-detection';

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

const ExtLink = ({ href, children }) => (
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

const PEAK = `# la hauteur du ballon dessine une onde
# un jonglage = un sommet = la vitesse passe de + a -
velocity = np.diff(height)
peaks, _ = find_peaks(height)`;

export default function ProjetJuggle() {
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
          <h1 className="bc-title">
            {t('Compter les jonglages', 'Counting football juggles')}
            <span className="bc-title-accent"> {t('sans entraîner de modèle', 'without training a model')}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="bc-pitch">
            {t(
              "Une vidéo de foot entre, un nombre de jonglages sort. Le ballon est déjà connu du modèle, donc aucune image à annoter. Tout le travail est dans le traitement du signal.",
              'A football video goes in, a juggle count comes out. The ball is already known to the model, so nothing to label. All the work sits in the signal processing.'
            )}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <TechChips tags={['Python', 'PyTorch', 'OpenCV', 'NumPy', 'YOLOv8']} className="bc-hero-chips" />
        </Reveal>
        <Reveal delay={0.2}>
          <div className="bc-links">
            <a className="pj-link" href={`${REPO}/blob/main/juggle_counter_fusion.ipynb`} target="_blank" rel="noopener noreferrer">
              {t('Regarder le notebook', 'View the notebook')}<span className="pj-link-arrow">↗</span>
            </a>
            <a className="pj-link" href={REPO} target="_blank" rel="noopener noreferrer">
              {t('Voir le code', 'View code')}<span className="pj-link-arrow">↗</span>
            </a>
          </div>
        </Reveal>
      </header>

      <Reveal>
        <div className="bc-stats">
          <div className="bc-stat"><b>25</b><span>{t('jonglages comptés sur 20 s', 'juggles counted over 20 s')}</span></div>
          <div className="bc-stat"><b>0</b><span>{t('image annotée', 'images labelled')}</span></div>
          <div className="bc-stat"><b>2</b><span>{t('modèles fusionnés', 'models fused')}</span></div>
        </div>
      </Reveal>

      <div className="bc-body">
        <Section n="01" title={t('Problème', 'Problem')}>
          <Reveal>
            <p className="bc-lead">
              {t(
                "Compter des jonglages à la main sur une vidéo, c'est long et vite faux. Le réflexe serait d'entraîner un modèle sur mesure, donc de collecter et d'annoter des milliers d'images. Beaucoup d'efforts pour un problème simple.",
                'Counting juggles by hand on a video is slow and error prone. The reflex would be to train a custom model, so collect and label thousands of images. A lot of effort for a simple problem.'
              )}
            </p>
          </Reveal>
        </Section>

        <Section n="02" title={t("L'idée", 'The idea')}>
          <Reveal>
            <p className="bc-lead">
              {t(
                "Le ballon est déjà une classe connue du modèle YOLO, la classe 32 du jeu COCO. Il n'y a donc rien à entraîner. Une fois le ballon repéré sur chaque image, le vrai problème devient mathématique, pas visuel.",
                'The ball is already a class the YOLO model knows, class 32 of the COCO set. So there is nothing to train. Once the ball is located on each frame, the real problem becomes mathematical, not visual.'
              )}
            </p>
          </Reveal>
          <div className="bc-three">
            {[
              { k: t('Zéro dataset', 'Zero dataset'), v: t('Poids pré-entraînés, aucune annotation.', 'Pretrained weights, no labelling.') },
              { k: t('Zéro entraînement', 'Zero training'), v: t('Le modèle sort de la boîte, tel quel.', 'The model works out of the box.') },
              { k: t('Tout est algorithmique', 'All algorithmic'), v: t('Le comptage vient du signal, pas du deep learning.', 'The count comes from the signal, not more deep learning.') },
            ].map((c, i) => (
              <Reveal key={c.k} delay={i * 0.08} className="bc-pill">
                <h3>{c.k}</h3>
                <p>{c.v}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="bc-more">
            <ExtLink href="https://docs.ultralytics.com/">Ultralytics YOLOv8</ExtLink>
            <ExtLink href="https://cocodataset.org/">COCO</ExtLink>
          </Reveal>
        </Section>

        <Section n="03" title={t('La méthode en trois temps', 'The method in three steps')}>
          <ol className="bc-steps">
            {[
              t("Suivre la hauteur du ballon. Sa trajectoire dessine une onde, et chaque sommet correspond à un jonglage.", 'Track the ball height. Its path draws a wave, and each crest is one juggle.'),
              t("Dériver ce signal. Un sommet, c'est la vitesse verticale qui passe du positif au négatif. Robuste, et sans seuil choisi au hasard.", 'Differentiate that signal. A crest is the vertical speed flipping from positive to negative. Robust, with no arbitrary threshold.'),
              t("Fusionner avec la position des pieds, pour ne compter que les vrais contacts.", 'Fuse with foot position, so only real contacts are counted.'),
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.08} className="bc-step">
                <span>{i + 1}</span><p>{s}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal>
            <figure className="bc-fig">
              <img src="/projects/juggle/counting.png" alt={t('Courbe de la hauteur du ballon, chaque pic numéroté est un jonglage', 'Ball height curve, each numbered peak is one juggle')} loading="lazy" />
            </figure>
          </Reveal>
          <Reveal delay={0.05}>
            <figure className="bc-fig">
              <img src="/projects/juggle/derivative.png" alt={t('Hauteur et sa dérivée, un pic correspond au passage de la vitesse par zéro', 'Height and its derivative, a peak matches the speed crossing zero')} loading="lazy" />
            </figure>
          </Reveal>
          <Reveal delay={0.05}>
            <CodeBlock cap={t('Le principe du comptage', 'The counting principle')} code={PEAK} />
          </Reveal>
        </Section>

        <Section n="04" title={t('Distinguer un vrai jonglage', 'Telling a real juggle apart')}>
          <Reveal>
            <p className="bc-lead">
              {t(
                "Un rebond au sol ressemble à un jonglage sur la courbe. Pour lever le doute, un second modèle suit la pose du joueur et garde les chevilles. Un jonglage devient alors un point bas du ballon à proximité d'un pied. Si le ballon touche le bas loin des deux pieds, c'est une rupture, et la série repart de zéro.",
                'A bounce on the ground looks like a juggle on the curve. To remove the doubt, a second model tracks the player pose and keeps the ankles. A juggle becomes a low point of the ball close to a foot. If the ball bottoms out far from both feet, that is a break, and the streak restarts.'
              )}
            </p>
          </Reveal>

          <Reveal>
            <figure className="bc-fig">
              <img src="/projects/juggle/fusion_demo.gif" alt={t('Démonstration animée, compteur et série incrustés sur la vidéo', 'Animated demo, counter and streak overlaid on the video')} loading="lazy" />
            </figure>
          </Reveal>
          <Reveal delay={0.05}>
            <figure className="bc-fig">
              <img src="/projects/juggle/fusion.png" alt={t('Courbe de fusion, une rupture coupe la série en deux', 'Fusion curve, a break splits the streak in two')} loading="lazy" />
            </figure>
          </Reveal>

          <div className="bc-inv-grid">
            {[
              { k: t('Deux modèles', 'Two models'), v: t('Détection du ballon et estimation de pose, sur chaque image.', 'Ball detection and pose estimation, on every frame.') },
              { k: t('17 keypoints', '17 keypoints'), v: t('On ne garde que les chevilles, gauche et droite.', 'Only the ankles are kept, left and right.') },
              { k: t('Notion de série', 'Streak logic'), v: t('Une rupture remet le compteur de série à zéro.', 'A break resets the streak counter.') },
              { k: t('Coût', 'Cost'), v: t('Environ deux fois plus lent, deux modèles par image.', 'Roughly twice as slow, two models per frame.') },
            ].map((c, i) => (
              <Reveal key={c.k} delay={i * 0.06} className="bc-inv">
                <h4>{c.k}</h4><p>{c.v}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section n="05" title={t('Résultat', 'Result')}>
          <Reveal>
            <p className="bc-lead">
              {t(
                "Sur le clip de référence de 20 secondes, 25 jonglages comptés, et une rupture détectée vers 14,6 secondes sur un geste raté. La vidéo annotée sort avec le compteur, la série et les ruptures incrustés.",
                'On the 20 second reference clip, 25 juggles counted, and one break detected around 14.6 seconds on a missed touch. The annotated video is exported with the counter, streak and breaks burned in.'
              )}
            </p>
          </Reveal>
        </Section>

        <Section n="06" title={t('Limites et suite', 'Limits and next steps')}>
          <Reveal>
            <p className="bc-lead">
              {t(
                "La netteté de la vidéo compte beaucoup. Sur un plan flou le ballon devient une tache blanche et le modèle le perd.",
                'Video sharpness matters a lot. On a blurry shot the ball turns into a white blob and the model loses it.'
              )}
            </p>
          </Reveal>
          <div className="bc-three">
            {[
              t('Ajouter un tracker pour garder le ballon pendant les occlusions.', 'Add a tracker to keep the ball through occlusions.'),
              t('Combler les images manquantes par interpolation pour lisser le signal.', 'Fill missing frames by interpolation to smooth the signal.'),
              t("Accélérer en n'analysant qu'une image sur N, ou en exportant le modèle.", 'Speed things up by analysing one frame out of N, or exporting the model.'),
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.06} className="bc-pill"><p>{s}</p></Reveal>
            ))}
          </div>
        </Section>
      </div>
    </motion.main>
  );
}
