
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

// Capability Details
export interface CapabilityDetail {
  id: string;
  description: string;
  feeInETH: string;
  creator: string;
  domain?: string;
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
