export default function AboutSection() {
  const tags = [
    'Brand Identity',
    'Art Direction',
    'UI / UX',
    'Web Dev',
    '3D & Motion',
    'AI Systems',
    'Events',
    'Marketing',
  ];

  return (
    <section className="about-section">
      <div className="about-visual reveal">
        <div className="about-visual-inner">
          <div className="about-icon-lg">
            <img
              src="/ICON_VERSION.png"
              alt="Genie"
              width="140"
              height="140"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="about-visual-text">Est. 2022 · Cairo, Egypt</div>
        </div>
      </div>

      <div>
        <div
          className="section-label reveal"
          style={{ transitionDelay: '.1s' }}
        >
          About Genie Studio
        </div>
        <h2
          className="section-headline reveal"
          style={{ transitionDelay: '.2s' }}
        >
          Built on clarity, <em>craft</em>, and imagination
        </h2>
        <p
          className="section-sub reveal"
          style={{ transitionDelay: '.3s' }}
        >
          Genie Studio is a creative powerhouse that partners with ambitious
          brands to deliver identities, digital experiences, and campaigns that
          leave a lasting mark.
        </p>
        <p
          className="reveal"
          style={{
            fontSize: '.9rem',
            color: 'var(--lgray)',
            lineHeight: '1.8',
            maxWidth: '520px',
            marginBottom: '2rem',
            transitionDelay: '.4s',
          }}
        >
          From brand strategy and visual identity to web development, 3D
          production, AI automation, and event planning — we bring every idea
          to life with precision and purpose.
        </p>
        <div className="about-tags reveal">
          {tags.map((tag) => (
            <span key={tag} className="about-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
