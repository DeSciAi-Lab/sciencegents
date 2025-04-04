-- Comprehensive script to initialize the domains table
-- This can be run directly in the Supabase SQL editor

-- First, ensure the domains table exists
CREATE TABLE IF NOT EXISTS public.domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  creator_address TEXT,
  custom BOOLEAN DEFAULT TRUE
);

-- Add comment to describe the table
COMMENT ON TABLE public.domains IS 'Table to store scientific domains for ScienceGents and capabilities';

-- Enable RLS if not already enabled
ALTER TABLE public.domains ENABLE ROW LEVEL SECURITY;

-- Add RLS policies (will not error if policies already exist)
DO $$
BEGIN
  -- Allow anonymous read access to domains
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'domains' AND policyname = 'Allow anonymous read access'
  ) THEN
    CREATE POLICY "Allow anonymous read access" 
      ON public.domains 
      FOR SELECT 
      USING (true);
  END IF;

  -- Allow authenticated users to insert domains
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'domains' AND policyname = 'Allow authenticated insert'
  ) THEN
    CREATE POLICY "Allow authenticated insert" 
      ON public.domains 
      FOR INSERT 
      TO authenticated 
      WITH CHECK (true);
  END IF;

  -- Allow domain creators to update their own domains
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'domains' AND policyname = 'Allow creator update'
  ) THEN
    CREATE POLICY "Allow creator update" 
      ON public.domains 
      FOR UPDATE 
      TO authenticated 
      USING (auth.uid()::text = creator_address OR custom = false)
      WITH CHECK (auth.uid()::text = creator_address OR custom = false);
  END IF;
END $$;

-- Create index for faster queries if it doesn't exist
CREATE INDEX IF NOT EXISTS domains_name_idx ON public.domains (name);

-- Grant necessary privileges
GRANT SELECT ON public.domains TO anon, authenticated;
GRANT INSERT, UPDATE ON public.domains TO authenticated;

-- Insert the default domains
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

-- Output success message
DO $$
BEGIN
  RAISE NOTICE 'Domains table initialized successfully with default domains';
  RAISE NOTICE 'Number of domains: %', (SELECT COUNT(*) FROM public.domains);
END $$; 