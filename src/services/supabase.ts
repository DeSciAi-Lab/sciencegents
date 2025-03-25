
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/integrations/supabase/types";

// Create a Supabase client configured for the current environment
export const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase credentials");
  }
  
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
};
