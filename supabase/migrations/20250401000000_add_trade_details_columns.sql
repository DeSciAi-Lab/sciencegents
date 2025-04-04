-- Add detailed columns to the trades table

-- Add trade_type column (TEXT, can be 'buy' or 'sell')
ALTER TABLE public.trades
ADD COLUMN IF NOT EXISTS trade_type TEXT;

-- Add eth_amount column (NUMERIC for precision)
ALTER TABLE public.trades
ADD COLUMN IF NOT EXISTS eth_amount NUMERIC;

-- Add value_in_usd column (NUMERIC for precision)
ALTER TABLE public.trades
ADD COLUMN IF NOT EXISTS value_in_usd NUMERIC;

-- Add maker column (TEXT for wallet address)
ALTER TABLE public.trades
ADD COLUMN IF NOT EXISTS maker TEXT;

-- Add comments to explain the new columns
COMMENT ON COLUMN public.trades.trade_type IS 'Type of trade: BUY or SELL';
COMMENT ON COLUMN public.trades.eth_amount IS 'Amount of ETH exchanged in the trade';
COMMENT ON COLUMN public.trades.value_in_usd IS 'USD value of the ETH amount at the time of the trade';
COMMENT ON COLUMN public.trades.maker IS 'Wallet address of the trade initiator'; 