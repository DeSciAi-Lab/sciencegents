
export interface ScienceGentFormData {
  name: string;
  symbol: string;
  totalSupply: string;
  description: string;
  profileImage: File | null;
  website: string;
  twitter: string;
  github: string;
  telegram?: string;
  domain?: string;
  agentFee?: string;
  persona: string;
  selectedCapabilities: string[];
  initialLiquidity: string;
  // New developer information fields
  developerName?: string;
  developerEmail?: string;
  bio?: string;
  developerTwitter?: string;
  developerTelegram?: string;
  developerGithub?: string;
  developerWebsite?: string;
}

export interface Capability {
  id: string;
  name: string;
  domain: string;
  fee: number;
}
