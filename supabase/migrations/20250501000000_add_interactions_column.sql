-- Add interactions_count column to sciencegents table
ALTER TABLE public.sciencegents ADD COLUMN IF NOT EXISTS interactions_count INTEGER DEFAULT 0;

-- Create a function to increment the interactions_count
CREATE OR REPLACE FUNCTION increment_sciencegent_interaction(sciencegent_address TEXT)
RETURNS void AS $$
BEGIN
  UPDATE public.sciencegents
  SET interactions_count = interactions_count + 1
  WHERE address = sciencegent_address;
END;
$$ LANGUAGE plpgsql;

-- Comment on the column
COMMENT ON COLUMN public.sciencegents.interactions_count IS 'Number of chat interactions with this ScienceGent'; 