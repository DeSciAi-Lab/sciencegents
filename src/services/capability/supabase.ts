
import { supabase } from "@/integrations/supabase/client";
import { Capability, SupabaseCapability, mapSupabaseToCapability } from "@/types/capability";
import { toast } from "@/components/ui/use-toast";

// Supabase URL and key from our configuration
const SUPABASE_URL = "https://pwlptpkzbnjcccgfbkck.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3bHB0cGt6Ym5qY2NjZ2Zia2NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyNzUwMTAsImV4cCI6MjA1Nzg1MTAxMH0.tDmiZeDYqM2ui3NjLg3JjqqIy90gXXnSzEauKqGGiYg";

// Function to fetch all capabilities from Supabase
export const fetchCapabilitiesFromSupabase = async (): Promise<Capability[]> => {
  try {
    console.log("Fetching capabilities from Supabase...");
    const { data, error } = await supabase
      .from('capabilities')
      .select('*');

    if (error) {
      console.error('Error fetching capabilities:', error);
      throw error;
    }

    console.log("Capabilities fetched successfully:", data?.length || 0);
    // Convert Supabase records to Capability format
    return (data || []).map(record => mapSupabaseToCapability(record as SupabaseCapability));
  } catch (error) {
    console.error('Error in fetchCapabilitiesFromSupabase:', error);
    throw error;
  }
};

// Function to fetch a specific capability by ID from Supabase
export const fetchCapabilityById = async (id: string): Promise<Capability | null> => {
  try {
    console.log(`Fetching capability with ID ${id} from Supabase...`);
    const { data, error } = await supabase
      .from('capabilities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        console.log(`No capability found with ID ${id}`);
        return null;
      }
      console.error('Error fetching capability:', error);
      throw error;
    }

    console.log(`Capability with ID ${id} fetched successfully:`, data ? 'Found' : 'Not found');
    // Convert Supabase record to Capability format
    return data ? mapSupabaseToCapability(data as SupabaseCapability) : null;
  } catch (error) {
    console.error(`Error in fetchCapabilityById for ID ${id}:`, error);
    throw error;
  }
};

// Function to upload a file to Supabase storage
export const uploadFileToStorage = async (
  file: File,
  bucket: string = 'sciencegents',
  folder: string = 'capability_files'
): Promise<{ path: string; url: string }> => {
  try {
    console.log(`Uploading file ${file.name} to ${bucket}/${folder}...`);
    
    // Create a unique file name to avoid collisions
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;
    
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        contentType: file.type,
        cacheControl: '3600'
      });
    
    if (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
    
    // Get public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
    
    console.log(`File uploaded successfully: ${publicUrl}`);
    
    return {
      path: filePath,
      url: publicUrl
    };
  } catch (error) {
    console.error('Error in uploadFileToStorage:', error);
    throw error;
  }
};

// Function to insert or update a capability in Supabase
export const upsertCapabilityToSupabase = async (capability: Capability, isAdmin: boolean): Promise<void> => {
  try {
    console.log("Attempting to upsert capability:", capability.id);
    
    if (!isAdmin) {
      throw new Error("Only admin wallet can perform this operation");
    }
    
    // Convert Capability to Supabase format
    const supabaseRecord = {
      id: capability.id,
      name: capability.name,
      domain: capability.domain,
      description: capability.description,
      price: capability.price,
      creator: capability.creator,
      created_at: capability.createdAt,
      docs: capability.docs,
      usage_count: capability.stats.usageCount,
      rating: capability.stats.rating,
      revenue: capability.stats.revenue,
      features: capability.features,
      display_image: capability.display_image, 
      developer_profile_pic: capability.developer_profile_pic,
      social_links: capability.social_links ? JSON.stringify(capability.social_links) : '[]',
      developer_social_links: capability.developer_info?.social_links ? JSON.stringify(capability.developer_info.social_links) : '[]',
      additional_files: capability.files?.additionalFiles ? JSON.stringify(capability.files.additionalFiles) : '[]',
      developer_name: capability.developer_info?.name || null,
      developer_email: capability.developer_info?.email || null,
      bio: capability.developer_info?.bio || null,
      last_synced_at: new Date().toISOString()
    };

    console.log("Upserting capability with data:", supabaseRecord);
    
    // Attempt to use the Supabase client first
    try {
      const { error } = await supabase
        .from('capabilities')
        .upsert(supabaseRecord);
        
      if (error) {
        console.warn("Supabase client upsert failed, falling back to direct API call:", error);
        throw error; // Throw to trigger fallback
      }
      
      console.log("Capability upsert successful via Supabase client");
      return;
    } catch (clientError) {
      console.log("Falling back to direct API call due to:", clientError);
      // If Supabase client fails, try direct API call as fallback
      const response = await fetch(`${SUPABASE_URL}/rest/v1/capabilities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify(supabaseRecord)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error upserting capability via direct API:', errorData);
        throw new Error(`Failed to upsert capability: ${response.status}`);
      }
      
      console.log("Capability upsert successful via direct API");
    }
  } catch (error) {
    console.error('Admin verification or upsert failed:', error);
    throw error;
  }
};
