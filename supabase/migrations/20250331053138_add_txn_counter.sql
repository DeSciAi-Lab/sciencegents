-- Drop old function/trigger if exists from previous attempt
DROP FUNCTION IF EXISTS public.increment_science_gent_txns() CASCADE;

-- 1. Add the total_txns column to the correct sciencegents table
ALTER TABLE public.sciencegents
ADD COLUMN IF NOT EXISTS total_txns integer NOT NULL DEFAULT 0;

-- 2. Create the trigger function
CREATE OR REPLACE FUNCTION public.increment_science_gent_txns()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    -- Increment the total_txns count for the corresponding ScienceGent
    -- based on the token_id of the newly inserted trade.
    UPDATE public.sciencegents
    SET total_txns = total_txns + 1
    WHERE address = NEW.token_id; -- Using the correct column 'address' in sciencegents

    RETURN NEW; -- Result is ignored since this is an AFTER trigger
END;
$$;

-- 3. Create the trigger to call the function after each trade insert
-- Drop the trigger first if it already exists to make this idempotent
DROP TRIGGER IF EXISTS on_trade_insert_increment_txns ON public.trades;

CREATE TRIGGER on_trade_insert_increment_txns
AFTER INSERT ON public.trades
FOR EACH ROW
EXECUTE FUNCTION public.increment_science_gent_txns();
