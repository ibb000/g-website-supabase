-- ── 6. CONTACT SUBMISSIONS ──────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_submissions (
  id         SERIAL PRIMARY KEY,
  name       TEXT        NOT NULL,
  email      TEXT        NOT NULL,
  service    TEXT,
  message    TEXT        NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anon inserts from the contact form
CREATE POLICY "public insert contact_submissions" ON contact_submissions FOR INSERT WITH CHECK (TRUE);
