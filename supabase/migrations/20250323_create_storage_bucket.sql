
-- Create storage bucket for sciencegents profile images
INSERT INTO storage.buckets (id, name, public)
VALUES ('sciencegents', 'sciencegents', true);

-- Set up access policies for the bucket
-- Anyone can read profile images
CREATE POLICY "Public Access" ON storage.objects
    FOR SELECT
    USING (bucket_id = 'sciencegents');

-- RLS for inserting/updating files - authenticated users only
CREATE POLICY "User can upload their files"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'sciencegents');

CREATE POLICY "User can update their files"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'sciencegents');
