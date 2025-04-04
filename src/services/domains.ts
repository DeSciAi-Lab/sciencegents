import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

// Define domain type
export interface Domain {
  id: string;
  name: string;
  created_at?: string;
  creator_address?: string;
  custom?: boolean;
}

// Fetch all domains from Supabase
export const getAllDomains = async (): Promise<Domain[]> => {
  try {
    const { data, error } = await supabase
      .from('domains')
      .select('*')
      .order('name');
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching domains:', error);
    // Fall back to default domains if there's an error
    return getDefaultDomains();
  }
};

// Get domains including a specific domain ID
export const getDomainsIncluding = async (domainName: string): Promise<Domain[]> => {
  const allDomains = await getAllDomains();
  
  // Check if the domain already exists
  const exists = allDomains.some(domain => 
    domain.name.toLowerCase() === domainName.toLowerCase()
  );
  
  // If it doesn't exist, add it to the list (but don't save it yet)
  if (!exists && domainName.trim()) {
    allDomains.push({
      id: 'new',
      name: domainName,
      custom: true
    });
  }
  
  return allDomains;
};

// Create a new domain in Supabase
export const createDomain = async (name: string, creator_address?: string): Promise<Domain | null> => {
  try {
    // Check if domain already exists
    const { data: existingDomains } = await supabase
      .from('domains')
      .select('id')
      .ilike('name', name)
      .limit(1);
    
    if (existingDomains && existingDomains.length > 0) {
      // Return existing domain
      return existingDomains[0] as Domain;
    }
    
    // Create new domain
    const newDomain: Domain = {
      id: uuidv4(),
      name: name.trim(),
      creator_address,
      custom: true
    };
    
    const { data, error } = await supabase
      .from('domains')
      .insert([newDomain])
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error creating domain:', error);
    return null;
  }
};

// Get default domains (fallback if Supabase fails)
export const getDefaultDomains = (): Domain[] => {
  return [
    { id: '11111111-1111-1111-1111-111111111111', name: 'General Science' },
    { id: '22222222-2222-2222-2222-222222222222', name: 'Chemistry' },
    { id: '33333333-3333-3333-3333-333333333333', name: 'Physics' },
    { id: '44444444-4444-4444-4444-444444444444', name: 'Biology' },
    { id: '55555555-5555-5555-5555-555555555555', name: 'Biochemistry' },
    { id: '66666666-6666-6666-6666-666666666666', name: 'Materials Science' },
    { id: '77777777-7777-7777-7777-777777777777', name: 'Protein Analysis' },
    { id: '88888888-8888-8888-8888-888888888888', name: 'Drug Discovery' },
    { id: '99999999-9999-9999-9999-999999999999', name: 'Genomics' },
    { id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', name: 'Quantum Simulations' },
  ];
};

// Insert the default domains into Supabase if the table is empty
export const initializeDefaultDomains = async (): Promise<void> => {
  try {
    // Check if domains table is empty
    const { count, error: countError } = await supabase
      .from('domains')
      .select('id', { count: 'exact', head: true });
    
    if (countError) throw countError;
    
    // If domains table is empty, insert default domains
    if (count === 0) {
      const defaultDomains = getDefaultDomains().map(domain => ({
        ...domain,
        custom: false
      }));
      
      const { error } = await supabase
        .from('domains')
        .insert(defaultDomains);
      
      if (error) throw error;
      
      console.log('Default domains initialized');
    }
  } catch (error) {
    console.error('Error initializing default domains:', error);
  }
}; 