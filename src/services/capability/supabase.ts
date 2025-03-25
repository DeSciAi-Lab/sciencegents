
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client'; 
import { Capability, CapabilitySocialLink, SupabaseCapability, mapSupabaseToCapability } from '@/types/capability';

// Add the missing export functions for fetchCapabilitiesFromSupabase and fetchCapabilityById
export const fetchCapabilitiesFromSupabase = async () => {
  try {
    const { data, error } = await supabase
      .from('capabilities')
      .select('*');
    
    if (error) throw error;
    
    // Use type assertion to fix the compatibility issue
    return (data as unknown as SupabaseCapability[]).map(mapSupabaseToCapability) || [];
  } catch (error) {
    console.error('Error fetching capabilities from Supabase:', error);
    throw error;
  }
};

export const fetchCapabilityById = async (id: string): Promise<Capability | null> => {
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
    
    // Transform the Supabase record to a Capability object with type assertion
    return data ? mapSupabaseToCapability(data as unknown as SupabaseCapability) : null;
  } catch (error) {
    console.error(`Error fetching capability ${id} from Supabase:`, error);
    throw error;
  }
};

export const uploadFileToStorage = async (file: File, folderName: string) => {
  try {
    // Validate file size (1MB max)
    if (file.size > 1 * 1024 * 1024) {
      throw new Error('File size exceeds the 1MB limit');
    }
    
    // Validate file type
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const allowedTypes = ['pdf', 'txt', 'md'];
    
    if (!fileExt || !allowedTypes.includes(fileExt)) {
      throw new Error('File type not allowed. Only PDF, TXT, and MD files are permitted.');
    }
    
    const fileName = `${folderName}/${uuidv4()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from('capability_documents')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading file to Supabase storage:', error);
      throw error;
    }

    // Get the public URL for the uploaded file
    const { data: urlData } = supabase.storage
      .from('capability_documents')
      .getPublicUrl(fileName);

    return { 
      name: file.name,
      url: urlData.publicUrl,
      size: file.size,
      type: fileExt
    };
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

// Update the upsertCapabilityToSupabase function to handle file uploads
export const upsertCapabilityToSupabase = async (capability: Capability, isNew = false) => {
  try {
    // Prepare social links for database (ensure it's a string)
    const social_links = prepareForDatabase(capability.social_links || []);
    
    // Prepare additional files for database
    const additional_files = prepareForDatabase(capability.files?.additionalFiles || []);
    
    // Upsert to Supabase
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
        docs: capability.files?.documentation || capability.docs, // Documentation URL
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
