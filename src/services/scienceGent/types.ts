// Type definitions for ScienceGent data structures

export interface ScienceGentData {
  address: string;
  name: string;
  symbol: string;
  totalSupply: string;
  creator: string;
  tradingEnabled: boolean;
  isMigrated: boolean;
  capabilities: string[];
  adminLockAmount: string;
  adminLockRemainingTime: string;
  isAdminTokensUnlocked: boolean;
  capabilityFees?: number; // Added optional property for capability fees
}

export interface TokenStats {
  tokenReserve: string;
  ethReserve: string;
  virtualETH: string;
  collectedFees: string;
  tradingEnabled: boolean;
  creator: string;
  creationTimestamp: string;
  maturityDeadline: string;
  migrated: boolean;
  lpUnlockTime: string;
  lockedLPAmount: string;
  currentPrice: string;
  migrationEligible: boolean;
  // Added derived properties
  tokenAge?: number;              // Age in seconds
  remainingMaturityTime?: number; // Remaining time until maturity in seconds
  maturityProgress?: number;      // Progress percentage (0-100)
}

export interface CapabilityDetail {
  id: string;
  description: string;
  feeInETH: string;
  creator: string;
}

export interface FormattedScienceGent {
  address: string;
  name: string;
  symbol: string;
  description?: string;
  domain: string;
  totalSupply: number;
  marketCap: number;
  tokenPrice: number;
  priceChange24h: number;
  totalLiquidity: number;
  maturityProgress: number;
  virtualEth: number;
  creatorAddress: string;
  createdOnChainAt: string;
  isMigrated: boolean;
  // Added new properties
  migrationEligible: boolean;
  remainingMaturityTime: number;
  collectedFees: number;
  stats: {
    volume24h: number;
    transactions: number;
    holders: number;
  };
  capabilities: any[]; // Using any[] to match the existing type
}
