
import { supabase } from "@/integrations/supabase/client";
import { DeveloperProfile, SocialLink } from "@/types/profile";
import { Json } from "@/integrations/supabase/types";

/**
 * Fetches a developer profile by wallet address
 * @param walletAddress Ethereum wallet address
 * @returns The developer profile or null if not found
 */
export const fetchDeveloperProfile = async (walletAddress: string): Promise<DeveloperProfile | null> => {
  try {
    if (!walletAddress) return null;
    
    console.log("Fetching profile for wallet:", walletAddress);
    
    const { data, error } = await supabase
      .from('developer_profiles')
      .select('*')
      .eq('wallet_address', walletAddress)
      .maybeSingle();
    
    if (error) {
      console.error("Error fetching developer profile:", error);
      throw error;
    }
    
    if (!data) {
      console.log(`No developer profile found for wallet ${walletAddress}`);
      return null;
    }
    
    console.log("Raw data from Supabase:", data);
    
    // Transform Supabase JSON to typed SocialLink array
    const socialLinks: SocialLink[] = Array.isArray(data.additional_social_links) 
      ? data.additional_social_links.map((link: any) => ({
          type: link.type || '',
          url: link.url || ''
        }))
      : [];
    
    const transformedData: DeveloperProfile = {
      wallet_address: data.wallet_address,
      developer_name: data.developer_name,
      developer_email: data.developer_email,
      bio: data.bio,
      profile_pic: data.profile_pic,
      developer_twitter: data.developer_twitter,
      developer_telegram: data.developer_telegram,
      developer_github: data.developer_github,
      developer_website: data.developer_website,
      additional_social_links: socialLinks,
      created_at: data.created_at,
      updated_at: data.updated_at
    };
    
    console.log("Transformed profile:", transformedData);
    return transformedData;
  } catch (error) {
    console.error("Error in fetchDeveloperProfile:", error);
    throw error;
  }
};

/**
 * Updates or creates a developer profile
 * @param profile Developer profile data
 * @returns The updated profile or null if the operation failed
 */
export const upsertDeveloperProfile = async (profile: DeveloperProfile): Promise<DeveloperProfile | null> => {
  try {
    if (!profile.wallet_address) {
      throw new Error("Wallet address is required");
    }
    
    console.log("Starting profile upsert operation");
    
    // Prepare the social links for Supabase
    const socialLinksForSupabase = profile.additional_social_links 
      ? profile.additional_social_links.map(link => ({
          type: link.type || '',
          url: link.url || ''
        }))
      : [];
    
    // Create a Supabase-compatible object
    const supabaseData = {
      wallet_address: profile.wallet_address,
      developer_name: profile.developer_name || null,
      developer_email: profile.developer_email || null,
      bio: profile.bio || null,
      profile_pic: profile.profile_pic || null,
      developer_twitter: profile.developer_twitter || null,
      developer_telegram: profile.developer_telegram || null,
      developer_github: profile.developer_github || null,
      developer_website: profile.developer_website || null,
      additional_social_links: socialLinksForSupabase as unknown as Json
    };
    
    // Debug to see what we're sending to Supabase
    console.log("Upserting profile with data:", supabaseData);
    
    const { data, error } = await supabase
      .from('developer_profiles')
      .upsert(supabaseData)
      .select();
    
    if (error) {
      console.error("Error upserting developer profile:", error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      console.error("No data returned after upsert");
      throw new Error("No data returned after upsert");
    }
    
    console.log("Upsert response from Supabase:", data);
    
    // Transform back to typed DeveloperProfile
    const transformedData = data[0];
    const socialLinks: SocialLink[] = Array.isArray(transformedData.additional_social_links) 
      ? transformedData.additional_social_links.map((link: any) => ({
          type: link.type || '',
          url: link.url || ''
        }))
      : [];
    
    return {
      wallet_address: transformedData.wallet_address,
      developer_name: transformedData.developer_name,
      developer_email: transformedData.developer_email,
      bio: transformedData.bio,
      profile_pic: transformedData.profile_pic,
      developer_twitter: transformedData.developer_twitter,
      developer_telegram: transformedData.developer_telegram,
      developer_github: transformedData.developer_github,
      developer_website: transformedData.developer_website,
      additional_social_links: socialLinks,
      created_at: transformedData.created_at,
      updated_at: transformedData.updated_at
    };
  } catch (error) {
    console.error("Error in upsertDeveloperProfile:", error);
    throw error; 
  }
};

/**
 * Uploads a profile picture for a developer
 * @param file The image file
 * @param walletAddress The developer's wallet address
 * @returns URL of the uploaded image or null if upload failed
 */
export const uploadProfilePicture = async (file: File, walletAddress: string): Promise<string | null> => {
  try {
    if (!file || !walletAddress) {
      console.error("Missing file or wallet address for upload");
      return null;
    }
    
    console.log("Starting profile picture upload for wallet:", walletAddress);
    
    // Check if sciencegents bucket exists
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error("Error listing buckets:", bucketsError);
      throw bucketsError;
    }
    
    const sciencegentsBucketExists = buckets?.some(bucket => bucket.name === 'sciencegents');
    
    if (!sciencegentsBucketExists) {
      console.log("Creating sciencegents bucket");
      // This will require admin privileges, might fail for regular users
      const { error: createBucketError } = await supabase.storage.createBucket('sciencegents', { 
        public: true 
      });
      
      if (createBucketError) {
        console.error("Error creating bucket:", createBucketError);
        // If bucket creation fails, try upload anyway - bucket might exist despite the error
      }
    }
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${walletAddress}_${Date.now()}.${fileExt}`;
    const filePath = `developer_profiles/${fileName}`;
    
    console.log(`Uploading file to ${filePath}`);
    
    const { error: uploadError } = await supabase.storage
      .from('sciencegents')
      .upload(filePath, file, {
        contentType: file.type,
        cacheControl: '3600'
      });
      
    if (uploadError) {
      console.error("Error uploading profile picture:", uploadError);
      throw uploadError;
    }
    
    const { data: urlData } = supabase.storage
      .from('sciencegents')
      .getPublicUrl(filePath);
      
    console.log("File uploaded, public URL:", urlData.publicUrl);
    return urlData.publicUrl;
  } catch (error) {
    console.error("Error in uploadProfilePicture:", error);
    return null;
  }
};
