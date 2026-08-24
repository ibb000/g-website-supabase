import Link from 'next/link';

export default function Hero() {
  const sloganItems = [
    'A BRAND OF MAGIC THAT NEVER FAILS',
    'BRAND IDENTITY',
    'WEB & DIGITAL',
    '3D DESIGN',
    'AI AUTOMATION',
    'EVENT PLANNING',
  ];

  const repeated = [...sloganItems, ...sloganItems, ...sloganItems];

  return (
    <section className="hero">
      <div className="hero-grid" />
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />
      <div className="hero-blob hero-blob-3" />

      <div className="hero-inner">
        <div className="hero-icon">
          <img src="/ICON_VERSION.png" alt="Genie" />
        </div>

        <div className="hero-eyebrow">Cairo, Egypt · Est. 2022</div>

        <h1 className="hero-headline">
          <span className="word">Bold</span>&nbsp;
          <span className="word">Ideas,</span>&nbsp;
          <span className="word">Real</span>&nbsp;
          <span className="word">Results</span>
        </h1>

        <p className="hero-sub">
          A full-service creative studio building brands, digital experiences,
          3D visuals, AI systems, and unforgettable events — for teams that
          refuse to be ordinary.
        </p>

        <div className="hero-actions">
          <Link className="btn-primary" href="#work">See Our Work</Link>
          <Link className="btn-ghost" href="#contact">Start a Project</Link>
        </div>
      </div>

      <div className="slogan-strip">
        <div className="slogan-track">
          {repeated.map((item, i) => (
            <span key={i}>
              <span className="slogan-item">{item}</span>
              <span className="slogan-dot">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
