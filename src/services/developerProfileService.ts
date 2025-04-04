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
    if (!walletAddress) {
      console.log("No wallet address provided");
      return null;
    }
    
    console.log("Fetching profile for wallet:", walletAddress);
    
    const { data, error } = await supabase
      .from('developer_profiles')
      .select('*')
      .eq('wallet_address', walletAddress.toLowerCase())
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
    const socialLinks: SocialLink[] = data.additional_social_links && 
      typeof data.additional_social_links === 'object' && 
      Array.isArray(data.additional_social_links) 
      ? data.additional_social_links.map((link: any) => ({
          type: link.type || '',
          url: link.url || ''
        }))
      : [];
    
    const transformedData: DeveloperProfile = {
      wallet_address: data.wallet_address,
      developer_name: data.developer_name,
      bio: data.bio,
      profile_pic: data.profile_pic,
      developer_twitter: data.developer_twitter,
      developer_telegram: data.developer_telegram,
      developer_github: data.developer_github,
      developer_website: data.developer_website,
      additional_social_links: socialLinks,
      created_sciencegents: data.created_sciencegents || [],
      created_capabilities: data.created_capabilities || [],
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
      console.error("Wallet address is required");
      throw new Error("Wallet address is required");
    }
    
    console.log("Starting profile upsert operation for wallet:", profile.wallet_address);
    
    // Always store wallet address in lowercase to ensure consistent lookups
    const normalizedWalletAddress = profile.wallet_address.toLowerCase();
    
    // Prepare the social links for Supabase
    const socialLinksForSupabase = profile.additional_social_links 
      ? profile.additional_social_links.map(link => ({
          type: link.type || '',
          url: link.url || ''
        }))
      : [];
    
    // Create a Supabase-compatible object
    const supabaseData = {
      wallet_address: normalizedWalletAddress,
      developer_name: profile.developer_name || null,
      bio: profile.bio || null,
      profile_pic: profile.profile_pic || null,
      developer_twitter: profile.developer_twitter || null,
      developer_telegram: profile.developer_telegram || null,
      developer_github: profile.developer_github || null,
      developer_website: profile.developer_website || null,
      additional_social_links: socialLinksForSupabase as unknown as Json,
      created_sciencegents: profile.created_sciencegents || [],
      created_capabilities: profile.created_capabilities || [],
      updated_at: new Date().toISOString() // Ensure updated_at is set
    };
    
    // Debug to see what we're sending to Supabase
    console.log("Upserting profile with data:", supabaseData);
    
    // Check if profile exists first
    const { data: existingProfile, error: checkError } = await supabase
      .from('developer_profiles')
      .select('wallet_address')
      .eq('wallet_address', normalizedWalletAddress)
      .maybeSingle();
    
    if (checkError) {
      console.error("Error checking if profile exists:", checkError);
      throw checkError;
    }
    
    let result;
    
    if (existingProfile) {
      // Update existing profile
      console.log("Updating existing profile for wallet:", normalizedWalletAddress);
      result = await supabase
        .from('developer_profiles')
        .update(supabaseData)
        .eq('wallet_address', normalizedWalletAddress)
        .select();
    } else {
      // Insert new profile
      console.log("Creating new profile for wallet:", normalizedWalletAddress);
      result = await supabase
        .from('developer_profiles')
        .insert(supabaseData)
        .select();
    }
    
    if (result.error) {
      console.error("Error upserting developer profile:", result.error);
      throw result.error;
    }
    
    if (!result.data || result.data.length === 0) {
      console.error("No data returned after upsert");
      throw new Error("No data returned after upsert");
    }
    
    console.log("Upsert response from Supabase:", result.data);
    
    // Transform back to typed DeveloperProfile
    const transformedData = result.data[0];
    const socialLinks: SocialLink[] = transformedData.additional_social_links && 
      typeof transformedData.additional_social_links === 'object' && 
      Array.isArray(transformedData.additional_social_links) 
      ? transformedData.additional_social_links.map((link: any) => ({
          type: link.type || '',
          url: link.url || ''
        }))
      : [];
    
    return {
      wallet_address: transformedData.wallet_address,
      developer_name: transformedData.developer_name,
      bio: transformedData.bio,
      profile_pic: transformedData.profile_pic,
      developer_twitter: transformedData.developer_twitter,
      developer_telegram: transformedData.developer_telegram,
      developer_github: transformedData.developer_github,
      developer_website: transformedData.developer_website,
      additional_social_links: socialLinks,
      created_sciencegents: transformedData.created_sciencegents || [],
      created_capabilities: transformedData.created_capabilities || [],
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
    
    // Always store wallet address in lowercase to ensure consistent lookups
    const normalizedWalletAddress = walletAddress.toLowerCase();
    
    console.log("Starting profile picture upload for wallet:", normalizedWalletAddress);
    
    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      console.error("File is not an image:", file.type);
      throw new Error("Only image files are allowed");
    }
    
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      console.error("File is too large:", file.size);
      throw new Error("File size must be less than 5MB");
    }
    
    // Upload the file
    const fileExt = file.name.split('.').pop();
    const fileName = `${normalizedWalletAddress}_${Date.now()}.${fileExt}`;
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
    throw error; // Re-throw the error to be handled by the caller
  }
};
