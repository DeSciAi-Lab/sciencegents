
export interface ScienceGentFormData {
  name: string;
  symbol: string;
  totalSupply: string;
  description: string;
  profileImage: File | null;
  website: string;
  twitter: string;
  github: string;
  telegram?: string; // Added telegram field
  persona: string;
  selectedCapabilities: string[];
  initialLiquidity: string;
  domain?: string; // Added domain field
  agentFee?: string; // Added agent fee field
}

export interface Capability {
  id: string;
  name: string;
  domain: string;
  fee: number;
}
