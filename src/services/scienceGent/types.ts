/**
 * ScienceGent token data from blockchain
 */
export interface ScienceGentData {
  address: string;
  name: string;
  symbol: string;
  totalSupply: string; // Stored as string to handle large numbers
  creator: string;
  isMigrated: boolean;
  creationTimestamp: number;
  maturityDeadline: number;
  capabilities: string[];
  description?: string;
  createdAt?: string;
  createdOnChainAt?: string;
  profile_pic?: string;
  website?: string;
  agent_fee?: string | number;
  socials?: Record<string, string>;
  persona?: string;
  developer_name?: string;
  developer_email?: string;
  bio?: string;
  developer_twitter?: string;
  developer_telegram?: string;
  developer_github?: string;
  developer_website?: string;
}

/**
 * Token statistics from blockchain
 */
export interface TokenStats {
  tokenReserve: string; // Stored as string to handle large numbers
  ethReserve: string; // Stored as string to handle large numbers
  virtualETH: string; // Stored as string to handle large numbers
  collectedFees: string; // Stored as string to handle large numbers
  tradingEnabled: boolean;
  creator: string;
  creationTimestamp: number;
  maturityDeadline: number;
  migrated: boolean;
  lpUnlockTime: number;
  lockedLPAmount: string; // Stored as string to handle large numbers
  currentPrice: string; // Stored as string to handle large numbers
  migrationEligible: boolean;
  volume24h?: string; // Stored as string to handle large numbers
  transactions?: number;
  holders?: number;
}

/**
 * Capability details from blockchain
 */
export interface CapabilityDetail {
  id: string;
  name: string;
  description: string;
  feeInETH: string; // Stored as string to handle large numbers
  creator: string;
  domain?: string;
  price?: number; // Add price property for UI display convenience
}

/**
 * Formatted ScienceGent for UI
 */
export interface FormattedScienceGent {
  id: string;
  address: string;
  name: string;
  symbol: string;
  description?: string;
  domain?: string;
  marketCap?: number;
  tokenPrice?: number;
  age?: string;
  formattedAge?: string;
  maturityStatus?: string;
  capabilities?: string[];
  isMigrated?: boolean;
  migrationEligible?: boolean;
  virtualETH?: number;
  collectedFees?: number;
  maturityProgress?: number;
  remainingMaturityTime?: number;
}
