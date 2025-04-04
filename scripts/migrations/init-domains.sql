-- Initialize domains table with default values
-- This script populates the domains table with predefined scientific domains

-- Insert domains with ON CONFLICT to avoid duplicates
INSERT INTO public.domains (id, name, custom, created_at)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'General Science', false, now()),
  ('22222222-2222-2222-2222-222222222222', 'Chemistry', false, now()),
  ('33333333-3333-3333-3333-333333333333', 'Physics', false, now()),
  ('44444444-4444-4444-4444-444444444444', 'Biology', false, now()),
  ('55555555-5555-5555-5555-555555555555', 'Biochemistry', false, now()),
  ('66666666-6666-6666-6666-666666666666', 'Materials Science', false, now()),
  ('77777777-7777-7777-7777-777777777777', 'Protein Analysis', false, now()),
  ('88888888-8888-8888-8888-888888888888', 'Drug Discovery', false, now()),
  ('99999999-9999-9999-9999-999999999999', 'Genomics', false, now()),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Quantum Simulations', false, now())
ON CONFLICT (name) 
DO UPDATE SET 
  custom = false,
  id = EXCLUDED.id;

-- Log completion
DO $$
BEGIN
  RAISE NOTICE 'Default domains initialized successfully';
END $$; 