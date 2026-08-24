'use client';

import { useEffect, useRef } from 'react';
import type { Stat } from '@/types';

function countUp(el: HTMLElement, target: number) {
  let v = 0;
  const step = target / 50;
  const t = setInterval(() => {
    v = Math.min(v + step, target);
    el.textContent = Math.floor(v) + '+';
    if (v >= target) clearInterval(t);
  }, 28);
}

interface Props {
  stats: Stat[];
}

export default function StatsBand({ stats }: Props) {
  const bandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bandRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const target = parseInt((e.target as HTMLElement).dataset.target ?? '0');
            countUp(e.target as HTMLElement, target);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    bandRef.current.querySelectorAll<HTMLElement>('[data-target]').forEach((el) =>
      observer.observe(el),
    );

    return () => observer.disconnect();
  }, [stats]);

  return (
    <>
      <div id="about" />
      <div className="stats-band" id="statsBand" ref={bandRef}>
        {stats.map((s, i) => (
          <div
            key={s.id}
            className="stat-cell"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="stat-num" data-target={s.value}>0+</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </>
  );
}
