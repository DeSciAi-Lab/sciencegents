-- Add number_of_ratings column and update rating column precision in the sciencegents table
DO $$
BEGIN
    -- Add number_of_ratings column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'number_of_ratings') THEN
        ALTER TABLE sciencegents ADD COLUMN number_of_ratings INTEGER DEFAULT 0;
        RAISE NOTICE 'Added number_of_ratings column to sciencegents table';
    END IF;

    -- Update rating column to have higher precision (4 decimal places) if it exists
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'rating') THEN
        ALTER TABLE sciencegents ALTER COLUMN rating TYPE NUMERIC(5,4);
        RAISE NOTICE 'Updated rating column precision to 4 decimal places';
    END IF;
END $$;

-- Add comments to explain the new column
COMMENT ON COLUMN sciencegents.number_of_ratings IS 'Number of user ratings for this ScienceGent';
COMMENT ON COLUMN sciencegents.rating IS 'Average rating of the ScienceGent on a scale of 0 to 5 with up to 4 decimal places'; 