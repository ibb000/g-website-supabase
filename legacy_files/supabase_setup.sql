-- ═══════════════════════════════════════════════════════════
--  GENIE STUDIO — SUPABASE DATABASE SETUP
--  Run this entire file in: Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════


-- ── 1. STATS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS stats (
  id          SERIAL PRIMARY KEY,
  value       INTEGER NOT NULL,
  label       TEXT    NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

-- ── 2. SERVICES ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id          SERIAL PRIMARY KEY,
  number      TEXT    NOT NULL,         -- '01', '02' …
  name        TEXT    NOT NULL,
  description TEXT    NOT NULL,
  tags        TEXT[]  NOT NULL DEFAULT '{}',
  sort_order  INTEGER NOT NULL DEFAULT 0
);

-- ── 3. PROJECTS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id           SERIAL  PRIMARY KEY,
  title        TEXT    NOT NULL,
  category     TEXT    NOT NULL,
  cover_url    TEXT,                    -- image URL (can be null → use gradient)
  gradient     TEXT,                    -- CSS gradient fallback
  external_url TEXT,                    -- link when card arrow is clicked
  is_active    BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order   INTEGER NOT NULL DEFAULT 0
);

-- ── 4. TEAM ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS team (
  id         SERIAL PRIMARY KEY,
  name       TEXT   NOT NULL,
  role       TEXT   NOT NULL,
  photo_url  TEXT   NOT NULL,
  bio        TEXT   NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- ── 5. TESTIMONIALS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id           SERIAL PRIMARY KEY,
  quote        TEXT   NOT NULL,
  client_name  TEXT   NOT NULL,
  client_title TEXT   NOT NULL,
  sort_order   INTEGER NOT NULL DEFAULT 0
);


-- ═══════════════════════════════════════════════════════════
--  SEED DATA  (safe to delete after you fill the real rows)
-- ═══════════════════════════════════════════════════════════

INSERT INTO stats (value, label, sort_order) VALUES
  (50,  'Projects Delivered', 1),
  (20,  'Brands Shaped',      2),
  (3,   'Years of Excellence',3),
  (6,   'Service Verticals',  4);

INSERT INTO services (number, name, description, tags, sort_order) VALUES
  ('01','Brand Identity & Strategy',
   'Full visual identity systems — logo, guidelines, brand voice, and everything in between.',
   ARRAY['Logo','Guidelines','Brand Voice'], 1),
  ('02','Web Design & Development',
   'Pixel-perfect websites, landing pages, and full-stack web applications built to perform.',
   ARRAY['UI/UX','Landing Pages','Full-Stack'], 2),
  ('03','3D Design & Visualization',
   'Product renders, architectural visualizations, motion & 3D animation that stop the scroll.',
   ARRAY['3D Renders','Motion','Architecture'], 3),
  ('04','AI Automation',
   'Smart workflows and AI-powered tools that save time and unlock new creative possibilities.',
   ARRAY['Workflows','AI Tools','Automation'], 4),
  ('05','Marketing & Social Media',
   'Campaigns, content systems, and scroll-stopping visuals for every platform and audience.',
   ARRAY['Campaigns','Content','Social'], 5),
  ('06','Event Planning & Identity',
   'Full event branding, production support, and on-site visual direction from concept to curtain.',
   ARRAY['Branding','Production','Direction'], 6);

INSERT INTO projects (title, category, cover_url, gradient, external_url, is_active, sort_order) VALUES
  ('Project Alpha',   'Brand Identity',  NULL, 'linear-gradient(135deg,#00ABED,#004362)', 'https://example.com', TRUE, 1),
  ('Project Beta',    'Web Design',      NULL, 'linear-gradient(135deg,#004362,#002D43)', 'https://example.com', TRUE, 2),
  ('Project Gamma',   '3D & Motion',     NULL, 'linear-gradient(135deg,#009AD4,#1F1F1F)', 'https://example.com', TRUE, 3),
  ('Project Delta',   'AI Automation',   NULL, 'linear-gradient(135deg,#002D43,#00ABED)', 'https://example.com', TRUE, 4),
  ('Project Epsilon', 'Marketing',       NULL, 'linear-gradient(135deg,#1F1F1F,#004362)', 'https://example.com', TRUE, 5),
  ('Project Zeta',    'Event Identity',  NULL, 'linear-gradient(135deg,#004362,#009AD4)', 'https://example.com', TRUE, 6);

INSERT INTO team (name, role, photo_url, bio, sort_order) VALUES
  ('Name Here', 'Creative Director',
   'https://placehold.co/320x320/1a1a1a/00ABED?text=CD',
   'Brief bio about this team member and what they bring to the studio.', 1),
  ('Name Here', 'Lead Designer',
   'https://placehold.co/320x320/1a1a1a/00ABED?text=LD',
   'Brief bio about this team member and what they bring to the studio.', 2),
  ('Name Here', 'Tech Director',
   'https://placehold.co/320x320/1a1a1a/00ABED?text=TD',
   'Brief bio about this team member and what they bring to the studio.', 3);

INSERT INTO testimonials (quote, client_name, client_title, sort_order) VALUES
  ('Genie Studio transformed our brand completely. The results exceeded every expectation.',
   'Client Name', 'CEO, Company Name', 1),
  ('Working with this team was a pleasure from day one. Truly world-class creative work.',
   'Client Name', 'Founder, Company Name', 2),
  ('The attention to detail and strategic thinking set them apart from anyone else we have worked with.',
   'Client Name', 'Marketing Director, Company Name', 3);


-- ═══════════════════════════════════════════════════════════
--  ROW-LEVEL SECURITY (RLS)
--  Public read-only. Writes require auth (your dashboard).
-- ═══════════════════════════════════════════════════════════

ALTER TABLE stats         ENABLE ROW LEVEL SECURITY;
ALTER TABLE services      ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects      ENABLE ROW LEVEL SECURITY;
ALTER TABLE team          ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials  ENABLE ROW LEVEL SECURITY;

-- allow anyone to SELECT (public website)
CREATE POLICY "public read stats"        ON stats        FOR SELECT USING (TRUE);
CREATE POLICY "public read services"     ON services     FOR SELECT USING (TRUE);
CREATE POLICY "public read projects"     ON projects     FOR SELECT USING (TRUE);
CREATE POLICY "public read team"         ON team         FOR SELECT USING (TRUE);
CREATE POLICY "public read testimonials" ON testimonials FOR SELECT USING (TRUE);
