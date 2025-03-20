
export interface Capability {
  id: string;
  name: string;
  domain: string;
  description: string;
  price: number;
  creator: string;
  createdAt: string;
  docs?: string;
  stats: {
    usageCount: number;
    rating: number;
    revenue: number;
  };
  features: string[];
  last_synced_at?: string;
}
