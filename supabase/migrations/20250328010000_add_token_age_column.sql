-- Add token age column to the sciencegents table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sciencegents' AND column_name = 'age') THEN
        ALTER TABLE sciencegents ADD COLUMN age NUMERIC;
        RAISE NOTICE 'Added age column to sciencegents table';
    END IF;
END $$; 