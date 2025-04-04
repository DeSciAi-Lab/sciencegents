-- Add array columns to developer_profiles table
ALTER TABLE developer_profiles
ADD COLUMN created_sciencegents TEXT[] DEFAULT '{}',
ADD COLUMN created_capabilities TEXT[] DEFAULT '{}';

-- Add indexes for better query performance
CREATE INDEX idx_developer_profiles_created_sciencegents ON developer_profiles USING GIN (created_sciencegents);
CREATE INDEX idx_developer_profiles_created_capabilities ON developer_profiles USING GIN (created_capabilities); 