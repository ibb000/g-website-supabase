import type { Service } from '@/types';

interface Props {
  services: Service[];
}

export default function ServicesGrid({ services }: Props) {
  return (
    <section className="services-section" id="services">
      <div className="section-label reveal">What We Do</div>
      <h2 className="section-headline reveal">
        Six ways we make <em>magic happen</em>
      </h2>
      <p className="section-sub reveal">
        From the first spark to the final pixel — we cover every creative
        discipline your brand needs to grow.
      </p>

      <div className="services-grid" id="servicesGrid">
        {services.map((s, i) => (
          <div
            key={s.id}
            className="service-card reveal"
            style={{ transitionDelay: `${(i * 0.08).toFixed(2)}s` }}
          >
            <span className="service-num">{s.number}</span>
            <div className="service-name">{s.name}</div>
            <div className="service-desc">{s.description}</div>
            <div className="service-tags">
              {s.tags.map((tag) => (
                <span key={tag} className="service-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
