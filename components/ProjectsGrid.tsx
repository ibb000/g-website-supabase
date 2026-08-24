'use client';

import { useEffect, useRef, useState } from 'react';
import type { Project } from '@/types';

interface Props {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.12 },
    );

    gridRef.current?.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [projects]);

  return (
    <section className="projects-section" id="work">
      <div className="section-label reveal">Our Work</div>
      <h2 className="section-headline reveal">
        Projects that <em>speak</em> for themselves
      </h2>
      <p className="section-sub reveal" style={{ marginBottom: '3rem' }}>
        A selection of brands and experiences we&apos;ve had the privilege to
        create.
      </p>

      <div className="projects-grid" id="projectsGrid" ref={gridRef}>
        {projects.map((p, i) => {
          const bgStyle = p.cover_url
            ? { backgroundImage: `url('${p.cover_url}')` }
            : { background: p.gradient ?? '#004362' };
          const url = p.external_url ?? '#';

          return (
            <div
              key={p.id}
              className={`project-card reveal${showAll || i < 4 ? ' proj-show' : ''}`}
              style={i > 0 ? { transitionDelay: `${(i * 0.08).toFixed(2)}s` } : undefined}
            >
              <div className="project-cover" style={bgStyle}>
                <div className="project-overlay" />
                <div className="project-info">
                  <div className="project-cat">{p.category}</div>
                  <div className="project-name">{p.title}</div>
                </div>
                <a
                  className="project-link-btn"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${p.title}`}
                >
                  →
                </a>
              </div>
              <div className="project-meta">
                <div className="project-cat">{p.category}</div>
                <div className="project-name">{p.title}</div>
              </div>
            </div>
          );
        })}
      </div>

      {projects.length > 4 && !showAll && (
        <div className="projects-show-more" id="showMoreWrap">
          <button
            className="projects-show-btn"
            id="showMoreBtn"
            onClick={() => setShowAll(true)}
          >
            Show all projects ↓
          </button>
        </div>
      )}
    </section>
  );
}
