
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

// Type for direct Supabase database records
export interface SupabaseCapability {
  id: string;
  name: string;
  domain: string;
  description: string;
  price: number;
  creator: string;
  created_at: string;
  docs?: string;
  usage_count?: number;
  rating?: number;
  revenue?: number;
  features?: string[];
  last_synced_at?: string;
}

// Function to convert Supabase format to our app format
export function mapSupabaseToCapability(record: SupabaseCapability): Capability {
  return {
    id: record.id,
    name: record.name,
    domain: record.domain,
    description: record.description,
    price: record.price,
    creator: record.creator,
    createdAt: record.created_at,
    docs: record.docs,
    stats: {
      usageCount: record.usage_count || 0,
      rating: record.rating || 4.5,
      revenue: record.revenue || 0
    },
    features: record.features || [],
    last_synced_at: record.last_synced_at
  };
}
