'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Nav() {
  useEffect(() => {
    const nav = document.getElementById('mainNav');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav id="mainNav">
      <Link className="nav-logo" href="#" aria-label="Genie Studio home">
        <Image
          src="/COLORD_HORIZENTAL.png"
          alt="Genie Studio"
          width={140}
          height={25}
          style={{ height: '25px', width: 'auto', objectFit: 'contain' }}
          priority
        />
      </Link>

      <div className="nav-links">
        <a href="#services">Services</a>
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>

      <a className="nav-cta" href="#contact">Let&apos;s Talk →</a>
    </nav>
  );
}
