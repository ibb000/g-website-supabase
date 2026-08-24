'use client';

import { useEffect, useRef, useState } from 'react';
import type { Testimonial } from '@/types';

interface Props {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: Props) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = testimonials.length;

  const goTo = (idx: number) => {
    setCurrent(((idx % total) + total) % total);
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 4500);
  };

  useEffect(() => {
    if (total < 1) return;
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  if (total === 0) return null;

  return (
    <section className="testimonial-section">
      <div className="section-label">What Clients Say</div>

      <div className="testimonial-track-wrap reveal">
        <div
          className="testimonial-track"
          id="tTrack"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-slide">
              <span className="testimonial-quote-mark">&ldquo;</span>
              <blockquote className="testimonial-quote">{t.quote}</blockquote>
              <div className="testimonial-author">
                <strong>{t.client_name}</strong> · {t.client_title}
              </div>
            </div>
          ))}
        </div>

        <div className="testimonial-dots" id="tDots">
          {testimonials.map((_, i) => (
            <div
              key={i}
              className={`t-dot${i === current ? ' active' : ''}`}
              data-idx={i}
              onClick={() => {
                goTo(i);
                startTimer();
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
