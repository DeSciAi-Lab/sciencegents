
import { Capability } from "@/types/capability";
import { isAdminWallet } from "@/services/walletService";

// Export from supabase.ts
export {
  fetchCapabilitiesFromSupabase,
  fetchCapabilityById,
  upsertCapabilityToSupabase
} from './supabase';

// Export from blockchain.ts
export {
  fetchCapabilityIdsFromBlockchain,
  fetchCapabilityDetailsFromBlockchain,
  registerCapabilityOnBlockchain
} from './blockchain';

// Export from admin.ts
export {
  syncCapabilitiesWithBlockchain,
  upsertCapability
} from './admin';

// Export type using export type syntax for isolatedModules
export type { Capability };

// Export wallet-related functions
export { isAdminWallet };
