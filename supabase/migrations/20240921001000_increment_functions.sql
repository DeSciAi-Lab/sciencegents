
-- Create a function to increment a numeric field
CREATE OR REPLACE FUNCTION increment(row_id TEXT, amount INTEGER)
RETURNS INTEGER AS $$
BEGIN
  RETURN amount;
END;
$$ LANGUAGE plpgsql;

-- Create a function to increment the chat count for a ScienceGent
CREATE OR REPLACE FUNCTION increment_chat_count(address TEXT)
RETURNS void AS $$
BEGIN
  UPDATE sciencegent_stats 
  SET chat_count = COALESCE(chat_count, 0) + 1
  WHERE sciencegent_address = address;
  
  -- If no row exists, insert one
  IF NOT FOUND THEN
    INSERT INTO sciencegent_stats(sciencegent_address, chat_count) 
    VALUES (address, 1);
  END IF;
END;
$$ LANGUAGE plpgsql;
