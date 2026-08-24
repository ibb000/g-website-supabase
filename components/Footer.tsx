import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">
        <Image
          src="/MONOCHROMA_HORIZENTAL_VERISON.png"
          alt="Genie Studio"
          width={140}
          height={22}
          style={{ height: '22px', width: 'auto', objectFit: 'contain', opacity: 0.8 }}
        />
      </div>
      <span className="footer-copy">© 2025 Genie Studio. All rights reserved.</span>
      <div className="footer-links">
        <a href="#services">Services</a>
        <a href="#work">Work</a>
        <a href="mailto:hello@genies.studio">Email</a>
      </div>
    </footer>
  );
}
