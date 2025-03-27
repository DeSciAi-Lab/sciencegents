
// Token data types for ScienceGent
export interface ScienceGentData {
  address: string;
  name: string;
  symbol: string;
  totalSupply: string;
  creator: string;
  creationTimestamp: number;
  maturityDeadline: number;
  isMigrated?: boolean;
  capabilities: string[];
  socials?: any;
  description?: string;
  createdAt?: string;
  createdOnChainAt?: string;
  profile_pic?: string;
  website?: string;
  developer_name?: string;
  developer_email?: string;
  bio?: string;
  developer_twitter?: string;
  developer_telegram?: string;
  developer_github?: string;
  developer_website?: string;
  persona?: string;
  agent_fee?: number;
}

// Token statistics from blockchain
export interface TokenStats {
  tokenReserve: string;
  ethReserve: string;
  virtualETH: string;
  collectedFees: string;
  tradingEnabled: boolean;
  creator: string;
  creationTimestamp: number;
  maturityDeadline: number;
  migrated: boolean;
  lpUnlockTime: number;
  lockedLPAmount: string;
  currentPrice: string;
  migrationEligible: boolean;
  volume24h?: string;
  transactions?: number;
  holders?: number;
}

// Capability Details - Enhanced with more properties for UI
export interface CapabilityDetail {
  id: string;
  name?: string; // Added for UI display
  description: string;
  feeInETH: string;
  creator: string;
  domain?: string;
  price?: number; // Added for UI display (formatted ETH value)
  stats?: {
    usageCount?: number;
    rating?: number;
    revenue?: number;
  };
  features?: string[]; // Added for UI display
}

// Formatted ScienceGent Data for UI
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
  maturityProgress?: number;
  virtualETH?: number;
  collectedFees?: number;
  remainingMaturityTime?: number;
}
