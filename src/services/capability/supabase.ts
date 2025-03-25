
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client'; 
import { Capability, CapabilitySocialLink } from '@/types/capability';

// Add the missing export functions for fetchCapabilitiesFromSupabase and fetchCapabilityById
export const fetchCapabilitiesFromSupabase = async () => {
  try {
    const { data, error } = await supabase
      .from('capabilities')
      .select('*');
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching capabilities from Supabase:', error);
    throw error;
  }
};

export const fetchCapabilityById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('capabilities')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned, not an error for our purposes
        return null;
      }
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching capability ${id} from Supabase:`, error);
    throw error;
  }
};

export const uploadFileToStorage = async (file: File, bucketName: string, folderName: string) => {
  try {
    const fileExt = file.name.split('.').pop();
    const filePath = `${folderName}/${uuidv4()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading file to Supabase storage:', error);
      throw error;
    }

    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${filePath}`;
    return { data, url };
  } catch (error) {
    console.error('Error in uploadFileToStorage:', error);
    throw error;
  }
};

// Helper function to convert complex objects to JSON strings if needed
const prepareForDatabase = (value: any) => {
  if (Array.isArray(value) || (value !== null && typeof value === 'object')) {
    return JSON.stringify(value);
  }
  return value;
};

// Update the upsertCapabilityToSupabase function to include detailed_description field
export const upsertCapabilityToSupabase = async (capability: Capability, isNew = false) => {
  try {
    // Prepare social links for database (ensure it's a string)
    const social_links = prepareForDatabase(capability.social_links || []);
    
    // Prepare additional files for database
    const additional_files = prepareForDatabase(capability.files?.additionalFiles || []);
    
    // Upsert to Supabase (without returning parameter)
    const { error } = await supabase
      .from('capabilities')
      .upsert({
        id: capability.id,
        name: capability.name,
        domain: capability.domain,
        description: capability.description,
        detailed_description: capability.detailed_description, 
        price: capability.price,
        creator: capability.creator,
        display_image: capability.display_image,
        developer_profile_pic: capability.developer_profile_pic,
        social_links: social_links,
        additional_files: additional_files,
        docs: capability.files?.documentation || capability.files?.integrationGuide, // Backward compatibility
        features: capability.features || [],
        // Stats fields have defaults in the database
        created_at: isNew ? new Date().toISOString() : undefined,
        last_synced_at: new Date().toISOString()
      });
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error upserting capability to Supabase:', error);
    throw error;
  }
};
