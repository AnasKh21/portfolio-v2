# Portfolio v2 — refonte complète

Date: 2026-09-18
Statut: validé visuellement, en attente de relecture

## 1. Objectif

Refonte du portfolio autour d'une organisation par catégories, avec l'ajout de
deux projets finance. Chaque catégorie apporte sa propre atmosphère animée,
qui simule ce que le projet fait réellement plutôt que d'en dessiner un symbole.

Deux contraintes posées par Anas, valables partout dans le document:

- Les textes sont courts et littéraux. Un projet est décrit pour ce qu'il est.
  Pas de narration, pas de thème transversal, pas de formulation générique.
- Pas de tiret cadratin dans les textes du site.

## 2. Système visuel

Thème unique, clair, sur tout le site. Pas de variante sombre, pas de bascule.
Une page claire suivie d'une page sombre a été explicitement écartée.

### Couleurs

| Token | Valeur | Rôle |
|---|---|---|
| `--bg-color` | `#fdfbf7` | fond, partout |
| `--text-primary` | `#2b2330` | texte principal |
| `--text-secondary` | `#6b6470` | texte secondaire |
| `--accent` | `#fb6f92` | rose décoratif: nappes, barres de profondeur, remplissages |
| `--accent-text` | `#d6336c` | rose lisible: marqueurs, valeurs, liens (AA sur le fond) |
| `--accent-text-hover` | `#b02a5b` | survol |
| `--accent-2` | `#7c3aed` | violet: seconde série de données (ventes, humidité, second dépouillement) |
| `--bloom-1` | `#fce4ec` | nappe rose |
| `--bloom-2` | `#f3e9dd` | nappe sable |

Le violet existait déjà dans la palette sans usage clair. Il devient la seconde
série partout où il y a deux séries, ce qui lui donne une fonction au lieu d'une
présence.

### Typographie

- **Outfit** (200, 300, 400, 500, 600, 800): interface, texte courant, chiffres.
  Les chiffres sont toujours en `font-variant-numeric: tabular-nums`.
- **Gloock**: titres de projets et titres de section. Remplace Playfair Display.

Playfair Display est retiré de l'import Google Fonts.

### Mouvement

Tout le mouvement s'arrête sous `prefers-reduced-motion: reduce`. Les
simulations passent alors sur une image fixe représentative, pas sur un écran
vide.

## 3. Architecture de l'information

Cinq catégories, présentées comme des pairs, sans hiérarchie éditoriale.

| Catégorie | Projets |
|---|---|
| Finance | Low latency order book, Pricing engine |
| Blockchain | Vote décentralisé |
| IA | Agent IA personnel, Comptage de jonglages, MCP Permission Client |
| Embarqué | Station météo Pico 2W |
| Autres | OSV CVE Explorer |

### Routes

Existantes, conservées:

- `/` Home
- `/parcours/pro` Expérience
- `/parcours/academique` Académique
- `/projets` Index des projets
- `/projets/blockchain` Étude de cas vote décentralisé
- `/projets/juggle` Étude de cas comptage de jonglages

Nouvelles:

- `/projets/orderbook` Étude de cas order book
- `/projets/pricing` Étude de cas pricing engine

## 4. Page projets

Colonne de gauche fixe: les cinq catégories, avec le nombre de projets à droite
de chaque libellé. La catégorie active est marquée par un trait rose qui
s'allonge et se rétracte lentement.

Colonne de droite: la liste des projets de la catégorie active. Chaque entrée
est un titre en Gloock, une ligne de description, et rien d'autre. Au survol la
ligne se soulève, une nappe rose apparaît derrière, le titre et la description
glissent de 7px.

Changer de catégorie remplace la liste et fait un fondu enchaîné entre les
atmosphères, environ 600ms.

## 5. Atmosphères

Une par catégorie, derrière le contenu, décorative (`aria-hidden`). Chacune
fait tourner une simulation de ce que le projet fait.

### Finance — le carnet d'ordres

Un vrai carnet de profondeur de marché. Six niveaux de chaque côté, colonnes
achat / prix / vente, barres de profondeur cumulée partant de la colonne des
prix vers l'extérieur, meilleure limite encadrée de chaque côté, écart et prix
moyen entre les deux.

La simulation, toutes les 260 à 620ms:

- ordre passif ajouté ou annulé sur un niveau, la taille clignote
- ordre agressif qui frappe la meilleure limite, la ligne passe en rose plein
- niveau entièrement consommé: le carnet se décale et un nouveau niveau
  apparaît à l'extrémité
- chaque exécution s'inscrit dans le fil des transactions à gauche, avec son sens

### Blockchain — le registre

Les votes arrivent et attendent dans le mempool sous forme de pastilles. Quand
il y en a assez, un bloc est miné et se glisse en haut de la pile avec sa
hauteur, son hash, son nombre de transactions et son gas. Les pastilles se
vident.

Le dépouillement en dessous ne bouge qu'au moment où un bloc est confirmé,
jamais avant. Chaque hash est dérivé du précédent.

### IA — la détection

Le compteur de jonglages en fonctionnement. La hauteur du ballon défile en
onde, le ballon suit l'extrémité vive, la ligne pointillée est le seuil de
détection. Chaque sommet qui passe le seuil est marqué et incrémente le
compteur, qui rebondit. Les sommets sans contact pied sont rejetés et comptés
séparément.

### Embarqué — la télémétrie

Température en rose et humidité en violet qui défilent de droite à gauche, un
point sur l'extrémité vive, trois valeurs chiffrées qui suivent, et une console
série en dessous qui imprime chaque relevé horodaté. Marche aléatoire dans des
bornes plausibles.

### Autres — le repos

Les nappes seules, sans simulation. C'est aussi l'atmosphère de toutes les
pages hors projets.

## 6. Pile d'effets commune

Partagée par toutes les atmosphères, de l'arrière vers l'avant:

1. Trois nappes floutées (`blur(38px)`, `mix-blend-mode: multiply`) qui dérivent
   sur 26 à 38 secondes.
2. Un grain fin en `feTurbulence`, opacité 0.34, en multiply.
3. La couche d'artwork arrière, parallaxe faible.
4. La couche d'artwork avant, parallaxe plus forte.
5. Le contenu.

La parallaxe suit la souris, les couches se décalent de 12 à 30px selon leur
profondeur, retour à zéro à la sortie du pointeur.

## 7. Études de cas

### Order book

Chiffres mesurés sur cette machine, build Release, 200 000 messages, graine
fixe, coût de l'horloge (44ns) inclus dans les latences:

| Écart | Messages / sec | Transactions | Ordres en carnet | p50 | p99 |
|---|---|---|---|---|---|
| 5 | 1 533 248 | 167 021 | 31 204 | 150 ns | 10 650 ns |
| 10 | 2 551 628 | 164 234 | 34 059 | 130 ns | 4 168 ns |
| 50 | 3 935 089 | 161 806 | 36 429 | 130 ns | 1 392 ns |
| 200 | 3 133 469 | 160 572 | 37 706 | 210 ns | 982 ns |
| 1000 | 1 633 735 | 161 323 | 36 991 | 460 ns | 1 674 ns |

Deux scénarios en détail:

- Appariement intense (écart 10): 2 800 670 msg/s, p50 120ns, p90 391ns,
  p99 3 887ns, p99.9 12 374ns.
- Carnet qui grossit (écart 1000): 1 679 431 msg/s, p50 451ns, p90 961ns,
  p99 1 663ns, p99.9 11 842ns.

La page montre aussi la queue de distribution sans la maquiller: p99.99 à
105µs et un maximum à 2,2ms. C'est le signe d'une réallocation ponctuelle, et
c'est plus intéressant à montrer qu'à cacher.

Contenu de la page: le découpage stockage / appariement, le modèle de
propriété en `unique_ptr`, la suite de tests (7 fichiers, dont invariants et
propriété), et le tableau ci-dessus. Un carnet animé en haut de page, réutilisé
depuis l'atmosphère Finance mais à taille réelle.

### Pricing engine

Options européennes. Arbres CRR en somme directe et en induction rétrograde,
stratégie de réplication, Monte-Carlo, formule fermée de Black-Scholes, et trois
schémas de différences finies pour l'EDP.

Visuels: la convergence Monte-Carlo vers la formule fermée, et la convergence
CRR vers Black-Scholes. Les deux sont exportés depuis le notebook en SVG.

Un arbre CRR interactif en haut de page: cliquer un nœud affiche le prix et la
couverture à ce nœud.

### Études de cas existantes

`ProjetBlockchain.jsx` et `ProjetJuggle.jsx` sont repris pour suivre le nouveau
système visuel. Leur contenu est conservé, les textes sont raccourcis.

## 8. Découpage technique

### Nouveaux fichiers

```
src/data/projects.js              source unique: catégorie, titre, fr, en, tags, lien
src/data/categories.js            les cinq catégories et leur atmosphère

src/components/atmosphere/
  AtmosphereStage.jsx             fondu entre atmosphères, porte nappes/grain/parallaxe
  MeshBackdrop.jsx                les trois nappes
  Grain.jsx                       le grain feTurbulence
  OrderBookAtmosphere.jsx         carnet + fil des transactions
  LedgerAtmosphere.jsx            mempool + blocs + dépouillement
  DetectionAtmosphere.jsx         onde + sommets + compteur
  TelemetryAtmosphere.jsx         courbes + jauges + console
  QuietAtmosphere.jsx             nappes seules

src/hooks/useSimulationClock.js   un seul rAF, en pause si onglet caché ou hors écran
src/hooks/useParallax.js          décalage souris par profondeur

src/pages/ProjetOrderBook.jsx
src/pages/ProjetPricing.jsx
```

### Fichiers modifiés

- `src/index.css` — tokens, import de police, styles du rail et de la liste.
  Le fichier fait 1730 lignes et mélange déjà tout. Il est découpé en
  `src/styles/tokens.css`, `base.css`, `projects.css`, `case-study.css`,
  importés depuis `index.css`. Pas de refonte au-delà de ce que la refonte
  touche.
- `src/pages/Projets.jsx` — rail plus liste, lit `projects.js`.
- `src/pages/Home.jsx`, `Pro.jsx`, `Academique.jsx` — nouveaux tokens et
  atmosphère au repos.
- `src/App.jsx` — les deux nouvelles routes, `Background` remplacé par
  `AtmosphereStage`.

### Fichiers supprimés

- `src/components/Background.jsx` — remplacé.
- `src/components/Experience3D.jsx` — déjà référencé nulle part.
- `src/components/CustomCursor.jsx` — déjà référencé nulle part.

`Experience3D.jsx` est le seul fichier qui importe `three` et `@react-three/*`
dans tout `src/`. Son retrait permet donc de retirer `@react-three/fiber`,
`@react-three/drei`, `@react-three/postprocessing`, `three` et `maath` des
dépendances, soit cinq paquets.

Mesuré après coup: le bundle ne bouge pas (568 ko avant comme après). Vite
écartait déjà ces paquets puisque rien ne les importait. Le gain est sur la
taille de `node_modules` et la durée d'installation, pas sur le poids du site.

`gsap` et `lenis` restent: ils servent dans `Academique.jsx` et
`SmoothScroll.jsx`.

### Une seule horloge

Chaque atmosphère est pilotée par `useSimulationClock`, pas par ses propres
`setTimeout`. L'horloge s'arrête quand l'onglet passe en arrière-plan
(`visibilitychange`) et quand l'atmosphère sort du viewport
(`IntersectionObserver`). Une seule atmosphère tourne à la fois.

## 9. Accessibilité

- Les atmosphères sont `aria-hidden="true"` et sans interaction.
- Le rail est une vraie liste de boutons, navigable au clavier, la catégorie
  active portant `aria-current`.
- Focus visible conservé sur le rose lisible.
- Contrastes: `#2b2330` et `#6b6470` sur `#fdfbf7` passent AA. Le rose des
  textes est `#d6336c`, jamais `#fb6f92`.
- Sous `prefers-reduced-motion`, nappes, parallaxe et simulations sont figées.

## 10. Vérification

Le projet n'a aucune infrastructure de test et il n'est pas prévu d'en
introduire une pour une refonte visuelle. La vérification est donc:

- `npm run build` passe.
- `npm run lint` passe.
- Contrôle au navigateur sur `npm run dev`: les cinq atmosphères tournent, le
  changement de catégorie enchaîne proprement, la parallaxe et les survols
  répondent, le rail se pilote au clavier.
- Contrôle à 400px de large: le rail passe au-dessus de la liste, aucune
  atmosphère ne provoque de défilement horizontal.
- Contrôle avec `prefers-reduced-motion` forcé: plus aucun mouvement.
- Contrôle onglet en arrière-plan: les simulations s'arrêtent.

## 11. Hors périmètre

- Pas de mode sombre.
- Pas de CMS ni de source de données externe, les projets restent en dur.
- Pas de retouche des pages Expérience et Académique au-delà du nouveau
  système visuel.
- Le bilingue FR / EN existant est conservé tel quel, sans extension.
