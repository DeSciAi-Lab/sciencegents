
// This file is now just a reexport from the capability module
// to maintain backward compatibility with existing imports

export {
  fetchCapabilitiesFromSupabase,
  fetchCapabilityById,
  isAdminWallet,
  upsertCapability,
  syncCapabilitiesWithBlockchain,
  fetchCapabilityIdsFromBlockchain,
  fetchCapabilityDetailsFromBlockchain
} from '@/services/capability';
