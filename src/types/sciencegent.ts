
export interface ScienceGent {
  id: string;
  name: string;
  address: string;
  symbol: string;
  description?: string;
  profilePic?: string;
  creatorAddress?: string;
  developerName?: string;
  bio?: string;
  developerTwitter?: string;
  developerGithub?: string;
  developerWebsite?: string;
  website?: string;
  socials?: {
    twitter?: string;
    github?: string;
    telegram?: string;
  };
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
  isMatured?: boolean;
  maturityProgress?: number;
  remainingMaturityTime?: number;
}
