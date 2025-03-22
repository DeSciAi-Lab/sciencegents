
-- Drop the existing function if it exists
DROP FUNCTION IF EXISTS public.increment(TEXT, INTEGER);

-- Create a more versatile increment function with column parameter
CREATE OR REPLACE FUNCTION increment(row_id TEXT, amount INTEGER, column TEXT DEFAULT NULL)
RETURNS INTEGER AS $$
BEGIN
  RETURN amount;
END;
$$ LANGUAGE plpgsql;

-- Update the increment_chat_count function to use direct SQL update
CREATE OR REPLACE FUNCTION increment_chat_count(address TEXT)
RETURNS void AS $$
BEGIN
  -- Try to update first
  UPDATE sciencegent_stats 
  SET chat_count = COALESCE(chat_count, 0) + 1,
      updated_at = now()
  WHERE sciencegent_address = address;
  
  -- If no row exists, insert one
  IF NOT FOUND THEN
    INSERT INTO sciencegent_stats(sciencegent_address, chat_count) 
    VALUES (address, 1);
  END IF;
END;
$$ LANGUAGE plpgsql;
