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
  capabilityFees?: number; // Optional field for total capability fees in ETH
  adminLockAmount?: string;
  adminLockRemainingTime?: string;
  isAdminTokensUnlocked?: boolean;
}

// Token statistics from blockchain
export interface TokenStats {
  tokenReserve: string;
  ethReserve: string;
  virtualETH: string;
  collectedFees: string;
  currentPrice: string;
  migrationEligible: boolean;
  tradingEnabled?: boolean;
  creator?: string;
  creationTimestamp?: string;
  maturityDeadline?: string;
  migrated?: boolean;
  lpUnlockTime?: string;
  lockedLPAmount?: string;
  tokenAge?: number;
  remainingMaturityTime?: number;
  maturityProgress?: number;
}

// Capability details as retrieved from blockchain
export interface CapabilityDetail {
  id: string;
  description: string;
  feeInETH: string; // Fee in wei as string (for large numbers)
  creator: string;
  domain?: string; // Optional field added for categorization
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
  capabilities?: string[];
  tokenAge?: number;
}
