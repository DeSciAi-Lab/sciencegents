-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON public.trades;
DROP POLICY IF EXISTS "Allow read operations for anonymous users" ON public.trades;
DROP POLICY IF EXISTS "Allow insert operations for anonymous users" ON public.trades;
DROP POLICY IF EXISTS "Allow public read access" ON public.trades;
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.trades;

-- Create trades table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.trades (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  token_id TEXT NOT NULL,
  price_in_usd DECIMAL NOT NULL,
  volume DECIMAL NOT NULL,
  time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for authenticated users
CREATE POLICY "Allow all operations for authenticated users"
ON public.trades
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create policy to allow read operations for anonymous users
CREATE POLICY "Allow read operations for anonymous users"
ON public.trades
FOR SELECT
TO anon
USING (true);

-- Create policy to allow insert operations for anonymous users
CREATE POLICY "Allow insert operations for anonymous users"
ON public.trades
FOR INSERT
TO anon
WITH CHECK (true);

-- Create indexes for better query performance (drop if they exist first)
DROP INDEX IF EXISTS idx_trades_token_id;
DROP INDEX IF EXISTS idx_trades_time;
CREATE INDEX idx_trades_token_id ON trades(token_id);
CREATE INDEX idx_trades_time ON trades(time);
