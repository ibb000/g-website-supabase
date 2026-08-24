'use client';

import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 901px) and (pointer: fine)').matches;
    if (!isDesktop) return;

    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    if (!cursor || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    };

    const animRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      animId = requestAnimationFrame(animRing);
    };

    document.addEventListener('mousemove', onMove);
    animId = requestAnimationFrame(animRing);

    const bindHover = () => {
      document.querySelectorAll<HTMLElement>(
        'a,button,.service-card,.project-card,.about-tag'
      ).forEach((el) => {
        if (el.dataset.cursor) return;
        el.dataset.cursor = '1';
        el.addEventListener('mouseenter', () => {
          cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
          cursor.style.background = 'var(--navy)';
        });
        el.addEventListener('mouseleave', () => {
          cursor.style.transform = 'translate(-50%,-50%) scale(1)';
          cursor.style.background = 'var(--blue)';
        });
      });
    };

    // Bind immediately and again after a tick (for dynamically rendered content)
    bindHover();
    const t = setInterval(bindHover, 800);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animId);
      clearInterval(t);
    };
  }, []);

  return (
    <>
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />
    </>
  );
}
