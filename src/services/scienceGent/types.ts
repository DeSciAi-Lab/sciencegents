
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
  stats: {
    volume24h: number;
    transactions: number;
    holders: number;
  };
  capabilities: string[];
}
