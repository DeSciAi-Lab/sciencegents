
// Import ethers for BigNumber type compatibility
import { BigNumber } from "ethers";

// ScienceGent blockchain data format
export interface ScienceGentData {
  address: string;
  name: string;
  symbol: string;
  totalSupply: string;
  creator: string;
  isAdmin: boolean;
  adminAddress: string;
  description?: string;
  profilePic?: string;
  website?: string;
  socialLinks?: Record<string, string>;
  tradingEnabled: boolean;
  isMigrated: boolean;
  creationTimestamp: number;
  maturityDeadline: number;
  capabilities: string[];
  capabilityFees?: number; // Optional field for total capability fees in ETH
}

// Token statistics from blockchain
export interface TokenStats {
  tokenReserve: string;
  ethReserve: string;
  virtualETH: string;
  collectedFees: string;
  currentPrice: string;
  migrationEligible: boolean;
  remainingMaturityTime?: number;
}

// Capability details as retrieved from blockchain
export interface CapabilityDetail {
  id: string;
  description: string;
  feeInETH: string; // Fee in wei as string (for large numbers)
  creator: string;
  domain?: string; // Optional field added for categorization
}
