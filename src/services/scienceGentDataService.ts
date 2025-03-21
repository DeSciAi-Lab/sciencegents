
// This file is now just a re-export of the modular service
// It's maintained for backward compatibility with existing code
// New code should import directly from the scienceGent folder

import {
  fetchScienceGentFromBlockchain,
  fetchTokenStatsFromBlockchain,
  syncAllScienceGentsFromBlockchain,
  syncScienceGent,
} from './scienceGent';

import {
  saveScienceGentToSupabase,
  fetchScienceGentFromSupabase,
} from './scienceGent/supabase';

export {
  // Blockchain interactions
  fetchScienceGentFromBlockchain,
  fetchTokenStatsFromBlockchain,
  syncAllScienceGentsFromBlockchain as syncAllScienceGents,
  
  // Supabase operations
  saveScienceGentToSupabase,
  fetchScienceGentFromSupabase,
  
  // Single entity synchronization
  syncScienceGent,
}

// Type exports need to use 'export type' syntax
export type {
  ScienceGentData,
  TokenStats,
  CapabilityDetail,
  FormattedScienceGent
} from './scienceGent';
