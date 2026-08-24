'use client';

import { useEffect } from 'react';

export default function ScrollObserver() {
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    const observeAll = () => {
      document.querySelectorAll('.reveal:not([data-observed])').forEach((el) => {
        (el as HTMLElement).dataset.observed = '1';
        revealObserver.observe(el);
      });
    };

    observeAll();
    const interval = setInterval(observeAll, 500);

    return () => {
      revealObserver.disconnect();
      clearInterval(interval);
    };
  }, []);

  return null;
}
