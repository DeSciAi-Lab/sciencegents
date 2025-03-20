
export interface ScienceGentFormData {
  name: string;
  symbol: string;
  totalSupply: string;
  description: string;
  profileImage: File | null;
  website: string;
  twitter: string;
  github: string;
  persona: string;
  selectedCapabilities: string[];
  initialLiquidity: string;
}

export interface Capability {
  id: string;
  name: string;
  domain: string;
  fee: number;
}
