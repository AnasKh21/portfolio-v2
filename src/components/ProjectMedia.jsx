import React, { useState } from 'react';

/**
 * Browser-mockup frame for a project screenshot. Falls back to an elegant
 * gradient placeholder (with the project initial) until a real image is added
 * at the given `src` path.
 */
export default function ProjectMedia({ src, title }) {
  const [err, setErr] = useState(false);
  const initial = title.charAt(0).toUpperCase();

  return (
    <div className="pj-media">
      <div className="pj-window">
        <div className="pj-window-bar" aria-hidden="true">
          <span /><span /><span />
        </div>
        <div className="pj-window-body">
          {src && !err ? (
            <img
              src={src}
              alt={`Aperçu — ${title}`}
              loading="lazy"
              onError={() => setErr(true)}
            />
          ) : (
            <div className="pj-placeholder">
              <span className="pj-placeholder-initial">{initial}</span>
              <span className="pj-placeholder-cap">Aperçu à venir</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
