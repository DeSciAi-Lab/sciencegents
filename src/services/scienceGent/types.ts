
// Import ethers for BigNumber type compatibility
import { BigNumber } from "ethers";

// ScienceGent blockchain data format
export interface ScienceGentData {
  address: string;
  name: string;
  symbol: string;
  totalSupply: string;
  creator: string;
  description?: string;
  profilePic?: string;
  website?: string;
  socialLinks?: Record<string, string>;
  tradingEnabled?: boolean;
  isMigrated: boolean;
  creationTimestamp?: number;
  maturityDeadline?: number;
  capabilities: string[];
  capabilityFees?: number; // Added for capability fees
  adminLockAmount?: string;
  adminLockRemainingTime?: string;
  isAdminTokensUnlocked?: boolean;
  persona?: string;
  domain?: string;
  agentFee?: number;
  virtualETH?: string; // Added virtual ETH
  // New developer information fields
  developerName?: string;
  developerEmail?: string;
  bio?: string;
  developerTwitter?: string;
  developerTelegram?: string;
  developerGithub?: string;
  developerWebsite?: string;
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
  // Derived properties
  tokenAge?: number;
  remainingMaturityTime?: number;
  maturityProgress?: number;
  // Additional properties
  capabilityFees?: number;
  totalLiquidity?: number;
  holdersCount?: number;
  transactions?: number;
  uniswapPair?: string;
}

// Capability details as retrieved from blockchain
export interface CapabilityDetail {
  id: string;
  description: string;
  feeInETH: string; // Fee in wei as string (for large numbers)
  creator: string;
  domain?: string; // Optional field added for categorization
  // Adding these fields to resolve type errors
  name?: string;
  price?: number; // Converted price in ETH (for UI display)
  stats?: {
    usageCount: number;
    rating: number;
    revenue: number;
  };
  features?: string[];
  fee?: number;
}

// Formatted ScienceGent data for UI display
export interface FormattedScienceGent {
  address: string;
  name: string;
  symbol: string;
  description?: string;
  profilePic?: string;
  website?: string;
  socialLinks?: Record<string, string>;
  isMigrated: boolean;
  totalSupply?: string;
  tokenPrice?: number;
  marketCap?: number;
  maturityProgress?: number;
  virtualEth?: number;
  collectedFees?: number;
  remainingMaturityTime?: number;
  creationTimestamp?: number;
  migrationEligible?: boolean;
  capabilities?: any[]; // Changed from string[] to any[] to support complex capability objects
  tokenAge?: number;
  persona?: string;
  domain?: string;
  agentFee?: number;
  formattedAge?: string;
  created_at?: string; // Adding this to match existing code
  creator?: string; // Added creator
  tradingEnabled?: boolean; // Added trading enabled
  adminLockAmount?: string;
  adminLockRemainingTime?: string;
  adminLockIsUnlocked?: boolean;
  liquidity?: number;
  formattedPrice?: string;
  formattedPriceUsd?: string;
  formattedMarketCap?: string;
  formattedMarketCapUsd?: string;
  formattedLiquidity?: string;
  formattedLiquidityUsd?: string;
  holdersCount?: number;
  transactions?: number;
  uniswapPair?: string;
  capabilityFees?: number;
  // Additional fields
  age?: string;
}
