
import { supabase } from "@/integrations/supabase/client";
import { DeveloperProfile } from "@/types/profile";

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
    
    return data as DeveloperProfile;
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
    
    const { data, error } = await supabase
      .from('developer_profiles')
      .upsert(profile)
      .select()
      .single();
    
    if (error) {
      console.error("Error upserting developer profile:", error);
      throw error;
    }
    
    return data as DeveloperProfile;
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
