-- Create domains table in Supabase
CREATE TABLE IF NOT EXISTS public.domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  creator_address TEXT,
  custom BOOLEAN DEFAULT TRUE
);

-- Add RLS (Row Level Security) Policies
ALTER TABLE public.domains ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access to domains
CREATE POLICY "Allow anonymous read access" 
  ON public.domains 
  FOR SELECT 
  USING (true);

-- Allow authenticated users to insert domains
CREATE POLICY "Allow authenticated insert" 
  ON public.domains 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Allow domain creators to update their own domains
CREATE POLICY "Allow creator update" 
  ON public.domains 
  FOR UPDATE 
  TO authenticated 
  USING (auth.uid()::text = creator_address OR custom = false)
  WITH CHECK (auth.uid()::text = creator_address OR custom = false);

-- Add comment to describe the table
COMMENT ON TABLE public.domains IS 'Table to store scientific domains for ScienceGents and capabilities';

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS domains_name_idx ON public.domains (name);

-- Grant necessary privileges
GRANT SELECT ON public.domains TO anon, authenticated;
GRANT INSERT, UPDATE ON public.domains TO authenticated; 