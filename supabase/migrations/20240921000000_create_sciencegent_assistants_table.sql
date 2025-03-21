
-- Create a table to store OpenAI assistant IDs for ScienceGents
CREATE TABLE IF NOT EXISTS public.sciencegent_assistants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sciencegent_address TEXT NOT NULL UNIQUE,
  assistant_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add a function to automatically update updated_at on row update
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function on update
CREATE TRIGGER update_sciencegent_assistants_updated_at
BEFORE UPDATE ON public.sciencegent_assistants
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Add RLS policies to control access
ALTER TABLE public.sciencegent_assistants ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read assistant data
CREATE POLICY "Anyone can read sciencegent_assistants"
  ON public.sciencegent_assistants
  FOR SELECT
  TO public
  USING (true);

-- Only allow the edge function (via service_role) to insert and update
CREATE POLICY "Only service_role can insert or update sciencegent_assistants"
  ON public.sciencegent_assistants
  FOR ALL
  TO service_role
  USING (true);
