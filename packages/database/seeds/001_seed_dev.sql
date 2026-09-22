-- SYNTHETIC DEVELOPMENT DATA ONLY: Pune civic boundaries and sample categories/users.

INSERT INTO jurisdictions (name, city, state, boundary, is_synthetic)
VALUES (
  'Pune Municipal Corporation - Synthetic',
  'Pune',
  'Maharashtra',
  ST_GeomFromText('MULTIPOLYGON(((73.75 18.45, 73.98 18.45, 73.98 18.62, 73.75 18.62, 73.75 18.45)))', 4326),
  true
)
ON CONFLICT DO NOTHING;

WITH j AS (
  SELECT id FROM jurisdictions WHERE name = 'Pune Municipal Corporation - Synthetic' LIMIT 1
)
INSERT INTO wards (jurisdiction_id, ward_code, name, boundary, is_synthetic)
SELECT
  j.id,
  'AUNDH-001',
  'Aundh Synthetic Ward',
  ST_GeomFromText('MULTIPOLYGON(((73.79 18.53, 73.85 18.53, 73.85 18.57, 73.79 18.57, 73.79 18.53)))', 4326),
  true
FROM j
ON CONFLICT (jurisdiction_id, ward_code) DO NOTHING;

INSERT INTO categories (name, description, is_lost_property)
VALUES
  ('Road Damage', 'Potholes and damaged road surface', false),
  ('Streetlight Outage', 'Broken or non-functional streetlights', false),
  ('Water Leakage', 'Public water leakage and pipeline issues', false),
  ('Lost Wallet', 'Lost wallet and identity cards', true)
ON CONFLICT (name) DO NOTHING;

INSERT INTO users (email, phone, full_name, role)
VALUES
  ('citizen.test@nagriksetu.local', '+919000000001', 'Synthetic Citizen Account', 'citizen'),
  ('moderator.test@nagriksetu.local', '+919000000002', 'Synthetic Moderator Account', 'moderator')
ON CONFLICT (email) DO NOTHING;
