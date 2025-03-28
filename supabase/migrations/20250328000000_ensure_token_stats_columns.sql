-- Ensure all token stats columns exist in the sciencegents table
DO $$
BEGIN
    -- Check and add columns if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'total_supply') THEN
        ALTER TABLE sciencegents ADD COLUMN total_supply NUMERIC;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'token_reserves') THEN
        ALTER TABLE sciencegents ADD COLUMN token_reserves NUMERIC;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'eth_reserves') THEN
        ALTER TABLE sciencegents ADD COLUMN eth_reserves NUMERIC;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'virtual_eth') THEN
        ALTER TABLE sciencegents ADD COLUMN virtual_eth NUMERIC;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'collected_fees') THEN
        ALTER TABLE sciencegents ADD COLUMN collected_fees NUMERIC;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'capability_fees') THEN
        ALTER TABLE sciencegents ADD COLUMN capability_fees NUMERIC;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'token_price') THEN
        ALTER TABLE sciencegents ADD COLUMN token_price NUMERIC;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'token_price_usd') THEN
        ALTER TABLE sciencegents ADD COLUMN token_price_usd NUMERIC;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'market_cap') THEN
        ALTER TABLE sciencegents ADD COLUMN market_cap NUMERIC;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'market_cap_usd') THEN
        ALTER TABLE sciencegents ADD COLUMN market_cap_usd NUMERIC;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'total_liquidity') THEN
        ALTER TABLE sciencegents ADD COLUMN total_liquidity NUMERIC;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'total_liquidity_usd') THEN
        ALTER TABLE sciencegents ADD COLUMN total_liquidity_usd NUMERIC;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'maturity_progress') THEN
        ALTER TABLE sciencegents ADD COLUMN maturity_progress NUMERIC;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'remaining_maturity_time') THEN
        ALTER TABLE sciencegents ADD COLUMN remaining_maturity_time NUMERIC;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'migration_condition') THEN
        ALTER TABLE sciencegents ADD COLUMN migration_condition NUMERIC;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'is_migrated') THEN
        ALTER TABLE sciencegents ADD COLUMN is_migrated BOOLEAN DEFAULT FALSE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'migration_eligible') THEN
        ALTER TABLE sciencegents ADD COLUMN migration_eligible BOOLEAN DEFAULT FALSE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'trading_enabled') THEN
        ALTER TABLE sciencegents ADD COLUMN trading_enabled BOOLEAN DEFAULT FALSE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'maturity_deadline') THEN
        ALTER TABLE sciencegents ADD COLUMN maturity_deadline NUMERIC;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'last_synced_at') THEN
        ALTER TABLE sciencegents ADD COLUMN last_synced_at TIMESTAMP WITH TIME ZONE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'last_price_update') THEN
        ALTER TABLE sciencegents ADD COLUMN last_price_update TIMESTAMP WITH TIME ZONE;
    END IF;

    RAISE NOTICE 'Token stats columns check completed';
END $$;

-- Since we have all the fields in the sciencegents table,
-- sciencegent_stats can be considered redundant for token statistics
-- In a future migration, we could consider removing the redundant table
-- or repurposing it for specialized statistics that don't fit in the main table

-- Add comment to explain our findings
COMMENT ON TABLE sciencegents IS 'Primary table for ScienceGent tokens with all statistics and properties';
