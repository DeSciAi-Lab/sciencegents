
// Capability types for the application

/**
 * Core capability interface used throughout the application
 */
export interface Capability {
  id: string;
  name: string;
  description: string;
  domain: string;
  creator: string;
  price: number;
  createdAt: string;
  stats: {
    usageCount: number;
    rating: number;
    revenue: number;
  };
  docs?: string;
  features: string[];
  // New fields
  display_image?: string;
  developer_profile_pic?: string;
  social_links?: {type: string, url: string}[];
  developer_info?: {
    name?: string;
    email?: string;
    bio?: string;
    social_links?: {type: string, url: string}[];
  };
  files?: {
    documentation?: string;
    integrationGuide?: string;
    additionalFiles?: string[];
  };
}

/**
 * Interface for capability data stored in Supabase
 */
export interface SupabaseCapability {
  id: string;
  name: string;
  description: string;
  domain: string;
  creator: string;
  price: number;
  created_at: string;
  usage_count: number;
  rating: number;
  revenue: number;
  docs?: string;
  features: string[];
  last_synced_at: string;
  // New fields
  display_image?: string;
  developer_profile_pic?: string;
  social_links?: string; // Stored as JSON string
  developer_social_links?: string; // Stored as JSON string
  additional_files?: string; // Stored as JSON string
  developer_name?: string;
  developer_email?: string;
  bio?: string;
}

/**
 * Maps Supabase capability data to application capability format
 */
export const mapSupabaseToCapability = (record: SupabaseCapability): Capability => {
  // Parse JSON strings to objects or default to empty arrays
  let socialLinks: {type: string, url: string}[] = [];
  let developerSocialLinks: {type: string, url: string}[] = [];
  let additionalFiles: string[] = [];

  try {
    if (record.social_links) {
      socialLinks = JSON.parse(record.social_links);
    }
  } catch (e) {
    console.error('Error parsing social links:', e);
  }

  try {
    if (record.developer_social_links) {
      developerSocialLinks = JSON.parse(record.developer_social_links);
    }
  } catch (e) {
    console.error('Error parsing developer social links:', e);
  }

  try {
    if (record.additional_files) {
      additionalFiles = JSON.parse(record.additional_files);
    }
  } catch (e) {
    console.error('Error parsing additional files:', e);
  }

  return {
    id: record.id,
    name: record.name,
    description: record.description,
    domain: record.domain,
    creator: record.creator,
    price: record.price,
    createdAt: record.created_at,
    stats: {
      usageCount: record.usage_count || 0,
      rating: record.rating || 4.5,
      revenue: record.revenue || 0
    },
    docs: record.docs,
    features: record.features || [],
    // New fields
    display_image: record.display_image,
    developer_profile_pic: record.developer_profile_pic,
    social_links: socialLinks,
    developer_info: {
      name: record.developer_name,
      email: record.developer_email,
      bio: record.bio,
      social_links: developerSocialLinks
    },
    files: {
      additionalFiles: additionalFiles
    }
  };
};
