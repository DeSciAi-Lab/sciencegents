
// This file re-exports functionality from the supabase directory
import { fetchScienceGentFromSupabase } from './fetch';
import { saveScienceGentToSupabase } from './save';
import { 
  syncCapabilitiesToSupabase,
  syncCapabilityDetailsToSupabase
} from './capabilities';

export {
  fetchScienceGentFromSupabase,
  saveScienceGentToSupabase,
  syncCapabilitiesToSupabase,
  syncCapabilityDetailsToSupabase
};
