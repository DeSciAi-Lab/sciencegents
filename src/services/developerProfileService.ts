
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
    
    const { data, error } = await supabase
      .from('developer_profiles')
      .select('*')
      .eq('wallet_address', walletAddress)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No profile found
        console.log(`No developer profile found for wallet ${walletAddress}`);
        return null;
      }
      console.error("Error fetching developer profile:", error);
      throw error;
    }
    
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
    
    return transformedData;
  } catch (error) {
    console.error("Error in fetchDeveloperProfile:", error);
    return null;
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
    
    // Convert typed SocialLink array to regular JSON for Supabase
    // This is the key change - we need to transform the SocialLink[] to a JSON format
    // that Supabase can accept (Json type from Supabase's types)
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
      additional_social_links: profile.additional_social_links as unknown as Json
    };
    
    const { data, error } = await supabase
      .from('developer_profiles')
      .upsert(supabaseData)
      .select();
    
    if (error) {
      console.error("Error upserting developer profile:", error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      throw new Error("No data returned after upsert");
    }
    
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
    return null;
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
    if (!file || !walletAddress) return null;
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${walletAddress}_${Date.now()}.${fileExt}`;
    const filePath = `developer_profiles/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('sciencegents')
      .upload(filePath, file);
      
    if (uploadError) {
      console.error("Error uploading profile picture:", uploadError);
      throw uploadError;
    }
    
    const { data: urlData } = supabase.storage
      .from('sciencegents')
      .getPublicUrl(filePath);
      
    return urlData.publicUrl;
  } catch (error) {
    console.error("Error in uploadProfilePicture:", error);
    return null;
  }
};
