-- Add is_curated and rating columns to the sciencegents table
DO $$
BEGIN
    -- Add is_curated column (boolean) if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'is_curated') THEN
        ALTER TABLE sciencegents ADD COLUMN is_curated BOOLEAN DEFAULT false;
        RAISE NOTICE 'Added is_curated column to sciencegents table';
    END IF;

    -- Add rating column (numeric with 2 decimal places) if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'rating') THEN
        ALTER TABLE sciencegents ADD COLUMN rating NUMERIC(3,2) DEFAULT 0.00;
        RAISE NOTICE 'Added rating column to sciencegents table';
    END IF;
END $$;

-- Add comments to explain the new columns
COMMENT ON COLUMN sciencegents.is_curated IS 'Flag indicating whether the ScienceGent is curated';
COMMENT ON COLUMN sciencegents.rating IS 'Rating of the ScienceGent on a scale of 0 to 5 with up to 2 decimal places'; 