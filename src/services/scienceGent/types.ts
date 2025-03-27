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
  socials?: Record<string, string>; // Added to fix type error
  tradingEnabled?: boolean;
  isMigrated: boolean;
  creationTimestamp?: number;
  maturityDeadline?: number;
  capabilities: string[];
  capabilityFees?: number; // Optional field for total capability fees in ETH
  adminLockAmount?: string;
  adminLockRemainingTime?: string;
  isAdminTokensUnlocked?: boolean;
  persona?: string;
  domain?: string;
  agentFee?: number;
  // New developer information fields
  developerName?: string;
  developerEmail?: string;
  bio?: string;
  developerTwitter?: string;
  developerTelegram?: string;
  developerGithub?: string;
  developerWebsite?: string;
  // Added to fix type errors
  createdAt?: string | number;
  createdOnChainAt?: string | number;
}

// Token statistics from blockchain
export interface TokenStats {
  tokenReserve: string;
  ethReserve: string;
  virtualETH: string;
  collectedFees: string;
  tradingEnabled: boolean;
  creator: string;
  creationTimestamp: number; // Changed from string to number
  maturityDeadline: number; // Changed from string to number
  migrated: boolean; // Changed from isMigrated to migrated to match contract response
  isMigrated?: boolean; // Added to fix type error
  lpUnlockTime: number; // Changed from string to number
  lockedLPAmount: string;
  currentPrice: string;
  migrationEligible: boolean;
  // Derived properties
  tokenAge?: number;
  remainingMaturityTime?: number;
  maturityProgress?: number;
  // Added to fix type errors
  volume24h?: number;
  transactions?: number;
  holders?: number;
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
  persona?: string;
  domain?: string;
  agentFee?: number;
  formattedAge?: string; // Add this property to the interface
}
