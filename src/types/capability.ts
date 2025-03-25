
export interface CapabilityStats {
  usageCount: number;
  rating: number;
  revenue: number;
}

export interface CapabilitySocialLink {
  type: string;
  url: string;
}

export interface CapabilityDeveloperInfo {
  name?: string;
  email?: string;
  bio?: string;
  social_links?: CapabilitySocialLink[];
}

export interface CapabilityFiles {
  documentation?: string;
  integrationGuide?: string;
  additionalFiles?: Array<{name: string, url: string}> | string[];
}

export interface Capability {
  id: string;
  name: string;
  domain: string;
  description: string;
  detailed_description?: string;  // Add this field
  price: number;
  creator: string;
  createdAt?: string;
  stats: CapabilityStats;
  features: string[];
  display_image?: string;
  developer_profile_pic?: string;
  social_links?: CapabilitySocialLink[];
  developer_info?: CapabilityDeveloperInfo;
  files?: CapabilityFiles;
  docs?: string; // For backward compatibility
}

export interface CapabilityDetail extends Capability {
  feeInETH?: any; // ethers.BigNumber from blockchain
}

export interface SupabaseCapability {
  id: string;
  name: string;
  domain: string;
  description: string;
  detailed_description?: string;  // Add this field
  price: number;
  creator: string;
  created_at?: string;
  usage_count: number;
  rating: number;
  revenue: number;
  features: string[];
  display_image?: string;
  developer_profile_pic?: string;
  social_links?: string;
  developer_social_links?: string;
  additional_files?: string;
  docs?: string;
  developer_name?: string;
  developer_email?: string;
  bio?: string;
  last_synced_at?: string;
}

// Helper function to map Supabase record to Capability type
export const mapSupabaseToCapability = (record: SupabaseCapability): Capability => {
  let socialLinks: CapabilitySocialLink[] = [];
  try {
    if (record.social_links) {
      if (typeof record.social_links === 'string') {
        socialLinks = JSON.parse(record.social_links);
      } else if (Array.isArray(record.social_links)) {
        socialLinks = record.social_links;
      }
    }
  } catch (error) {
    console.error('Error parsing social links:', error);
  }
  
  let developerSocialLinks: CapabilitySocialLink[] = [];
  try {
    if (record.developer_social_links) {
      if (typeof record.developer_social_links === 'string') {
        developerSocialLinks = JSON.parse(record.developer_social_links);
      } else if (Array.isArray(record.developer_social_links)) {
        developerSocialLinks = record.developer_social_links;
      }
    }
  } catch (error) {
    console.error('Error parsing developer social links:', error);
  }
  
  let additionalFiles: Array<{name: string, url: string}> | string[] = [];
  try {
    if (record.additional_files) {
      if (typeof record.additional_files === 'string') {
        additionalFiles = JSON.parse(record.additional_files);
      } else if (Array.isArray(record.additional_files)) {
        additionalFiles = record.additional_files;
      }
    }
  } catch (error) {
    console.error('Error parsing additional files:', error);
  }
  
  return {
    id: record.id,
    name: record.name,
    domain: record.domain,
    description: record.description,
    detailed_description: record.detailed_description,
    price: record.price,
    creator: record.creator,
    createdAt: record.created_at,
    stats: {
      usageCount: record.usage_count || 0,
      rating: record.rating || 4.5,
      revenue: record.revenue || 0
    },
    features: record.features || [],
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
      documentation: record.docs,
      additionalFiles: additionalFiles
    },
    docs: record.docs // For backward compatibility
  };
};
