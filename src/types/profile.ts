/**
 * Interface representing a developer profile
 */
export interface DeveloperProfile {
  wallet_address: string;
  developer_name?: string;
  bio?: string;
  profile_pic?: string;
  developer_twitter?: string;
  developer_telegram?: string;
  developer_github?: string;
  developer_website?: string;
  additional_social_links?: SocialLink[];
  created_sciencegents?: string[];
  created_capabilities?: string[];
  created_at?: string;
  updated_at?: string;
}

/**
 * Interface representing a social link
 */
export interface SocialLink {
  type: string;
  url: string;
}
