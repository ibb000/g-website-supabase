import Image from 'next/image';
import type { TeamMember } from '@/types';

interface Props {
  team: TeamMember[];
}

export default function TeamSection({ team }: Props) {
  return (
    <section className="board-section">
      <div className="section-label reveal">The Team</div>
      <h2 className="section-headline reveal">
        Meet the <em>board</em>
      </h2>
      <p className="section-sub reveal">
        The minds behind every idea, strategy, and pixel.
      </p>

      <div className="board-grid" id="boardGrid">
        {team.map((m, i) => (
          <div
            key={m.id}
            className="board-card reveal"
            style={{ transitionDelay: `${(i * 0.12).toFixed(2)}s` }}
          >
            <div className="board-photo">
              <Image
                src={m.photo_url}
                alt={m.name}
                width={160}
                height={160}
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                loading="lazy"
              />
            </div>
            <div className="board-role">{m.role}</div>
            <div className="board-name">{m.name}</div>
            <p className="board-bio">{m.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
