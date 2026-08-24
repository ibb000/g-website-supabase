// ═══════════════════════════════════════════════════════════
//  GENIE STUDIO — main.js
// ═══════════════════════════════════════════════════════════

// ── SUPABASE CONFIG ───────────────────────────────────────
// Replace these two values with your real Supabase credentials.
// Find them in: Supabase Dashboard → Project Settings → API
const SUPABASE_URL    = 'https://wotbzeztyxeoxafkunpx.supabase.co';
const SUPABASE_ANON   = 'sb_publishable_I3SoY57YpfuyHWQTCv-fVw_Gs_UUs0W';

// Supabase REST helper — no SDK needed, plain fetch
async function sbFetch(table, params = '') {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?order=sort_order.asc${params}`, {
    headers: {
      'apikey': SUPABASE_ANON,
      'Authorization': `Bearer ${SUPABASE_ANON}`,
    }
  });
  if (!res.ok) throw new Error(`Supabase error on "${table}": ${res.status}`);
  return res.json();
}

// ── STATIC FALLBACK ───────────────────────────────────────
// Shown if Supabase is unreachable (e.g. during local dev
// before the DB is set up, or a network failure).
const FALLBACK = {
  stats: [
    { value: 50, label: 'Projects Delivered', sort_order: 1 },
    { value: 20, label: 'Brands Shaped',       sort_order: 2 },
    { value: 3,  label: 'Years of Excellence', sort_order: 3 },
    { value: 6,  label: 'Service Verticals',   sort_order: 4 },
  ],
  services: [
    { number:'01', name:'Brand Identity & Strategy',  description:'Full visual identity systems — logo, guidelines, brand voice, and everything in between.', tags:['Logo','Guidelines','Brand Voice'], sort_order:1 },
    { number:'02', name:'Web Design & Development',   description:'Pixel-perfect websites, landing pages, and full-stack web applications built to perform.',   tags:['UI/UX','Landing Pages','Full-Stack'], sort_order:2 },
    { number:'03', name:'3D Design & Visualization',  description:'Product renders, architectural visualizations, motion & 3D animation that stop the scroll.',  tags:['3D Renders','Motion','Architecture'], sort_order:3 },
    { number:'04', name:'AI Automation',              description:'Smart workflows and AI-powered tools that save time and unlock new creative possibilities.',   tags:['Workflows','AI Tools','Automation'], sort_order:4 },
    { number:'05', name:'Marketing & Social Media',   description:'Campaigns, content systems, and scroll-stopping visuals for every platform and audience.',    tags:['Campaigns','Content','Social'], sort_order:5 },
    { number:'06', name:'Event Planning & Identity',  description:'Full event branding, production support, and on-site visual direction from concept to curtain.',tags:['Branding','Production','Direction'], sort_order:6 },
  ],
  projects: [],
  team: [],
  testimonials: [],
};

// ═══════════════════════════════════════════════════════════
//  DATA LAYER — fetch all tables in parallel
// ═══════════════════════════════════════════════════════════
async function loadAllData() {
  try {
    const [stats, services, projects, team, testimonials] = await Promise.all([
      sbFetch('stats'),
      sbFetch('services'),
      sbFetch('projects', '&is_active=eq.true'),
      sbFetch('team'),
      sbFetch('testimonials'),
    ]);
    console.log('[Genie] Data loaded from Supabase ✓');
    return { stats, services, projects, team, testimonials };
  } catch (err) {
    console.warn('[Genie] Supabase unavailable — using static fallback.', err);
    return FALLBACK;
  }
}

// ═══════════════════════════════════════════════════════════
//  RENDER FUNCTIONS
// ═══════════════════════════════════════════════════════════

function renderStats(stats) {
  const band = document.getElementById('statsBand');
  if (!band) return;
  band.innerHTML = stats.map((s, i) => `
    <div class="stat-cell" style="transition-delay:${i * 0.1}s">
      <div class="stat-num" data-target="${s.value}">0</div>
      <div class="stat-label">${s.label}</div>
    </div>`).join('');
  band.querySelectorAll('[data-target]').forEach(el => countObserver.observe(el));
}

function renderServices(services) {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;
  grid.innerHTML = services.map((s, i) => `
    <div class="service-card reveal" style="transition-delay:${(i * 0.08).toFixed(2)}s">
      <span class="service-num">${s.number}</span>
      <div class="service-name">${s.name}</div>
      <div class="service-desc">${s.description}</div>
      <div class="service-tags">
        ${s.tags.map(t => `<span class="service-tag">${t}</span>`).join('')}
      </div>
    </div>`).join('');
  observeReveals(grid);
}

function renderProjects(projects) {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.innerHTML = projects.map((p, i) => {
    const bgStyle = p.cover_url
      ? `background-image:url('${p.cover_url}')`
      : (p.gradient ? `background:${p.gradient}` : 'background:#004362');
    const delay = i === 0 ? '' : `style="transition-delay:${(i * 0.08).toFixed(2)}s"`;
    const url = p.external_url || '#';
    return `
      <div class="project-card reveal" ${delay}>
        <div class="project-cover" style="${bgStyle}">
          <div class="project-overlay"></div>
          <div class="project-info">
            <div class="project-cat">${p.category}</div>
            <div class="project-name">${p.title}</div>
          </div>
          <a class="project-link-btn" href="${url}" target="_blank" rel="noopener">→</a>
        </div>
        <div class="project-meta">
          <div class="project-cat">${p.category}</div>
          <div class="project-name">${p.title}</div>
        </div>
      </div>`;
  }).join('');
  observeReveals(grid);
  initShowMore();
}

function renderTeam(team) {
  const grid = document.getElementById('boardGrid');
  if (!grid) return;
  grid.innerHTML = team.map((m, i) => `
    <div class="board-card reveal" style="transition-delay:${(i * 0.12).toFixed(2)}s">
      <div class="board-photo">
        <img src="${m.photo_url}" alt="${m.name}" loading="lazy">
      </div>
      <div class="board-role">${m.role}</div>
      <div class="board-name">${m.name}</div>
      <p class="board-bio">${m.bio}</p>
    </div>`).join('');
  observeReveals(grid);
}

function renderTestimonials(testimonials) {
  const track = document.getElementById('tTrack');
  const dotsEl = document.getElementById('tDots');
  if (!track || !dotsEl || testimonials.length === 0) return;
  track.innerHTML = testimonials.map(t => `
    <div class="testimonial-slide">
      <span class="testimonial-quote-mark">"</span>
      <blockquote class="testimonial-quote">${t.quote}</blockquote>
      <div class="testimonial-author">
        <strong>${t.client_name}</strong> · ${t.client_title}
      </div>
    </div>`).join('');
  dotsEl.innerHTML = testimonials.map((_,i) =>
    `<div class="t-dot${i===0?' active':''}" data-idx="${i}"></div>`).join('');
  initCarousel(testimonials.length);
}

// ═══════════════════════════════════════════════════════════
//  CONTACT FORM — posts to Supabase via backend endpoint
//  (backend dev: expose POST /contact that inserts into a
//   contact_submissions table, or wire a Resend/email action)
// ═══════════════════════════════════════════════════════════
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = this.querySelector('.form-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    const body = Object.fromEntries(new FormData(this));

    try {
      // ── Option A: Supabase Edge Function (preferred) ──────
      // const res = await fetch(`${SUPABASE_URL}/functions/v1/contact`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON },
      //   body: JSON.stringify(body),
      // });

      // ── Option B: direct insert into contact_submissions ──
      // (no email notification — backend dev can add a DB trigger)
      const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON,
          'Authorization': `Bearer ${SUPABASE_ANON}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      contactForm.reset();
      document.getElementById('formSuccess').style.display = 'block';
      btn.style.display = 'none';
    } catch (err) {
      console.error('[Genie] Contact form error:', err);
      btn.textContent = 'Something went wrong. Try again.';
      btn.disabled = false;
    }
  });
}

// ═══════════════════════════════════════════════════════════
//  UTILITIES
// ═══════════════════════════════════════════════════════════

// ── CUSTOM CURSOR — desktop only ─────────────────────────
const cursor    = document.getElementById('cursor');
const ring      = document.getElementById('cursorRing');
const isDesktop = window.matchMedia('(min-width: 901px) and (pointer: fine)').matches;
let mx = 0, my = 0, rx = 0, ry = 0;

if (isDesktop) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });
  (function animRing() {
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();
}

function bindCursor(scope = document) {
  if (!isDesktop) return;
  scope.querySelectorAll('a,button,.service-card,.project-card,.about-tag').forEach(el => {
    if (el.dataset.cursor) return;
    el.dataset.cursor = '1';
    el.addEventListener('mouseenter', () => {
      cursor.style.transform  = 'translate(-50%,-50%) scale(2.5)';
      cursor.style.background = 'var(--navy)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform  = 'translate(-50%,-50%) scale(1)';
      cursor.style.background = 'var(--blue)';
    });
  });
}

// ── NAV SCROLL ────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 20);
});

// ── SCROLL REVEAL ─────────────────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach(el => {
  el.dataset.observed = '1';
  revealObserver.observe(el);
});

function observeReveals(root = document) {
  root.querySelectorAll('.reveal:not([data-observed])').forEach(el => {
    el.dataset.observed = '1';
    revealObserver.observe(el);
  });
}

// ── COUNT UP ──────────────────────────────────────────────
function countUp(el, target) {
  let v = 0;
  const step = target / 50;
  const t = setInterval(() => {
    v = Math.min(v + step, target);
    el.textContent = Math.floor(v) + '+';
    if (v >= target) clearInterval(t);
  }, 28);
}

const countObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      countUp(e.target, parseInt(e.target.dataset.target));
      countObserver.unobserve(e.target);
    }
  });
}, { threshold: .2 });

// ── CAROUSEL ──────────────────────────────────────────────
function initCarousel(total) {
  const track = document.getElementById('tTrack');
  const dotsEl = document.getElementById('tDots');
  if (!track || total < 1) return;
  let current = 0, timer;
  const dots = dotsEl.querySelectorAll('.t-dot');

  function goTo(idx) {
    current = (idx + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }
  function next() { goTo(current + 1); }
  timer = setInterval(next, 4500);
  dots.forEach(d => d.addEventListener('click', () => {
    clearInterval(timer);
    goTo(parseInt(d.dataset.idx));
    timer = setInterval(next, 4500);
  }));
}

// ── SHOW MORE (mobile projects) ───────────────────────────
function initShowMore() {
  const btn  = document.getElementById('showMoreBtn');
  const wrap = document.getElementById('showMoreWrap');
  if (!btn || !wrap) return;
  btn.addEventListener('click', () => {
    document.querySelectorAll('.project-card:nth-child(n+5)').forEach(c => c.classList.add('proj-show'));
    wrap.classList.add('hidden');
  });
}

// ═══════════════════════════════════════════════════════════
//  BOOT
// ═══════════════════════════════════════════════════════════
(async function boot() {
  const data = await loadAllData();

  renderStats(data.stats);
  renderServices(data.services);
  renderProjects(data.projects);
  renderTeam(data.team);
  renderTestimonials(data.testimonials);

  bindCursor();
})();
