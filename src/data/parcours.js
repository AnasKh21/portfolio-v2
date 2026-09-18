// Positions on the timeline are decimal years, so a bar can start mid year.
export const TIMELINE_FROM = 2020.4;
export const TIMELINE_SPAN = 6.6;

export const PARCOURS = [
  {
    id: 'prepa',
    kind: 'edu',
    company: 'Classes préparatoires',
    companyEn: 'Preparatory classes',
    role: 'MP étoile',
    roleEn: 'Mathematics and Physics, MP star',
    logo: '/logos/gsr.png',
    from: 2020.75,
    to: 2022.5,
    label: '2020 à 2022',
    labelEn: '2020 to 2022',
  },
  {
    id: 'ensiie',
    kind: 'edu',
    company: 'ENSIIE',
    role: "Diplôme d'ingénieur",
    roleEn: 'Master of Engineering',
    logo: '/logos/ensiie.png',
    from: 2022.75,
    to: 2026.5,
    label: '2022 à 2026',
    labelEn: '2022 to 2026',
    links: [
      { kind: 'site', href: 'https://www.ensiie.fr', fr: 'Voir le site', en: 'Visit website' },
      {
        kind: 'map',
        href: 'https://www.google.com/maps/search/?api=1&query=ENSIIE+Évry-Courcouronnes',
        fr: 'Évry, France',
        en: 'Évry, France',
      },
    ],
  },
  {
    id: 'soremed',
    kind: 'pro',
    company: 'Soremed',
    role: 'AI software engineering intern',
    logo: '/logos/soremed.jpg',
    from: 2023.4,
    to: 2023.8,
    label: '2023',
    labelEn: '2023',
  },
  {
    id: 'nexaglobe',
    kind: 'pro',
    company: 'Nexaglobe',
    role: 'Cloud security & genAI intern',
    logo: '/logos/nexaglobe.png',
    from: 2024.15,
    to: 2024.6,
    label: '2024',
    labelEn: '2024',
  },
  {
    id: 'opmobility',
    kind: 'pro',
    company: 'OpMobility',
    role: 'Apprenti ingénieur logiciel',
    roleEn: 'Software engineering apprentice',
    logo: '/logos/opmobility.png',
    from: 2024.8,
    to: 2025.8,
    label: '2024 à 2025',
    labelEn: '2024 to 2025',
  },
];

export const SKILL_GROUPS = [
  { fr: 'Programmation objet', en: 'Object oriented programming', items: ['C/C++', 'Java', 'Python'] },
  { fr: 'Systèmes et conteneurs', en: 'Systems and containers', items: ['Linux', 'Docker', 'Kubernetes', 'Git'] },
  { fr: 'Intelligence artificielle', en: 'Artificial intelligence', items: ['genAI', 'LangGraph', 'RAG'] },
  { fr: 'Services et interfaces', en: 'Services and interfaces', items: ['API REST', 'Django', 'React'] },
];
