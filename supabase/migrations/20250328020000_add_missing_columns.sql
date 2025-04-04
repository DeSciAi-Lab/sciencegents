-- Add missing detailed_description column to sciencegents table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'detailed_description') THEN
        ALTER TABLE sciencegents ADD COLUMN detailed_description TEXT;
        RAISE NOTICE 'Added detailed_description column to sciencegents table';
    END IF;
END $$; 