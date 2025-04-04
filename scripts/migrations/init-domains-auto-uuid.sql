-- Initialize domains table with default values
-- This script populates the domains table with predefined scientific domains
-- using auto-generated UUIDs (no need to specify them)

-- Insert domains with ON CONFLICT to avoid duplicates
INSERT INTO public.domains (name, custom, created_at)
VALUES
  ('General Science', false, now()),
  ('Chemistry', false, now()),
  ('Physics', false, now()),
  ('Biology', false, now()),
  ('Biochemistry', false, now()),
  ('Materials Science', false, now()),
  ('Protein Analysis', false, now()),
  ('Drug Discovery', false, now()),
  ('Genomics', false, now()),
  ('Quantum Simulations', false, now())
ON CONFLICT (name) 
DO UPDATE SET 
  custom = false;

-- Log completion
DO $$
BEGIN
  RAISE NOTICE 'Default domains initialized successfully';
  RAISE NOTICE 'Number of domains: %', (SELECT COUNT(*) FROM public.domains);
END $$; 