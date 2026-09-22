CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  phone text UNIQUE,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'citizen' CHECK (role IN ('citizen', 'moderator', 'admin')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS jurisdictions (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  boundary geometry(MultiPolygon, 4326),
  is_synthetic boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS wards (
  id bigserial PRIMARY KEY,
  jurisdiction_id bigint NOT NULL REFERENCES jurisdictions(id) ON DELETE CASCADE,
  ward_code text NOT NULL,
  name text NOT NULL,
  boundary geometry(MultiPolygon, 4326),
  is_synthetic boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (jurisdiction_id, ward_code)
);

CREATE TABLE IF NOT EXISTS categories (
  id bigserial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  description text,
  is_lost_property boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS issues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_user_id uuid NOT NULL REFERENCES users(id),
  category_id bigint NOT NULL REFERENCES categories(id),
  ward_id bigint REFERENCES wards(id),
  title text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  location geometry(Point, 4326),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_jurisdictions_boundary ON jurisdictions USING GIST (boundary);
CREATE INDEX IF NOT EXISTS idx_wards_boundary ON wards USING GIST (boundary);
CREATE INDEX IF NOT EXISTS idx_issues_location ON issues USING GIST (location);
CREATE INDEX IF NOT EXISTS idx_issues_status ON issues (status);
