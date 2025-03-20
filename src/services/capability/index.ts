
// Export functionality from supabase.ts
export {
  fetchCapabilitiesFromSupabase,
  fetchCapabilityById,
  upsertCapabilityToSupabase
} from './supabase';

// Export functionality from blockchain.ts
export {
  fetchCapabilityIdsFromBlockchain,
  fetchCapabilityDetailsFromBlockchain,
  registerCapabilityOnBlockchain
} from './blockchain';

// Export functionality from admin.ts
export {
  syncCapabilitiesWithBlockchain,
  upsertCapability
} from './admin';

// Re-export everything in a unified API
import { Capability } from "@/types/capability";
import { fetchCapabilitiesFromSupabase, fetchCapabilityById } from "./supabase";
import { fetchCapabilityIdsFromBlockchain, fetchCapabilityDetailsFromBlockchain } from "./blockchain";
import { syncCapabilitiesWithBlockchain, upsertCapability } from "./admin";
import { isAdminWallet } from "@/services/walletService";

// Export everything
export {
  // Types
  Capability,
  
  // Supabase operations
  fetchCapabilitiesFromSupabase,
  fetchCapabilityById,
  
  // Blockchain operations
  fetchCapabilityIdsFromBlockchain,
  fetchCapabilityDetailsFromBlockchain,
  
  // Admin operations
  syncCapabilitiesWithBlockchain,
  upsertCapability,
  
  // Wallet operations
  isAdminWallet
};
