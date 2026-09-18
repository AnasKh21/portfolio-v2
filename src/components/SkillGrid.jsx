import React from 'react';

const LOGO = {
  'C/C++': '/tech/cplusplus.svg',
  Java: '/tech/java.svg',
  Python: '/tech/python.svg',
  Linux: '/tech/linux.svg',
  Docker: '/tech/docker.svg',
  Kubernetes: '/tech/kubernetes.svg',
  Git: '/tech/git.svg',
  Django: '/tech/django.svg',
  React: '/tech/react.svg',
};

/* Concepts have no vendor logo, so they get a drawn mark in the same box. */
const GLYPH = {
  genAI: (
    <path d="M64 18 L73 55 L110 64 L73 73 L64 110 L55 73 L18 64 L55 55 Z" />
  ),
  LangGraph: (
    <g>
      <circle cx="30" cy="40" r="11" />
      <circle cx="98" cy="34" r="11" />
      <circle cx="64" cy="98" r="11" />
      <path d="M41 40 L87 35 M34 50 L58 88 M92 44 L72 88" />
    </g>
  ),
  RAG: (
    <g>
      <path d="M26 22 h50 l22 22 v62 h-72 Z" />
      <path d="M76 22 v22 h22" />
      <path d="M40 64 h44 M40 82 h30" />
    </g>
  ),
  'API REST': (
    <g>
      <path d="M46 34 L22 64 L46 94" />
      <path d="M82 34 L106 64 L82 94" />
      <path d="M70 28 L58 100" />
    </g>
  ),
};

function Mark({ name }) {
  const src = LOGO[name];
  if (src) return <img src={src} alt="" loading="lazy" />;

  const glyph = GLYPH[name];
  if (!glyph) return <span className="sk-initial" aria-hidden="true">{name.charAt(0)}</span>;

  return (
    <svg className="sk-glyph" viewBox="0 0 128 128" aria-hidden="true">
      {glyph}
    </svg>
  );
}

export default function SkillGrid({ groups, t }) {
  return (
    <div className="sk-groups">
      {groups.map((g, gi) => (
        <section className="sk-group" key={g.en} style={{ '--gi': gi }}>
          <h4 className="sk-group-name">{t(g.fr, g.en)}</h4>
          <ul className="sk-logos">
            {g.items.map((item, ii) => (
              <li key={item} style={{ '--ii': ii }}>
                <span className="sk-tile">
                  <Mark name={item} />
                </span>
                <span className="sk-name">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
