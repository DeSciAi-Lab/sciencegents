
import { fetchCapabilitiesFromSupabase, fetchCapabilityById } from "@/services/capabilityService";
import { Capability, CapabilitySocialLink } from "@/types/capability";

// Mock capabilities data (this will be used as fallback if Supabase fetch fails)
export const capabilities: Capability[] = [
  {
    id: 'mol-viz-3d',
    name: 'Molecule Visualization (3D)',
    domain: 'Chemistry',
    description: 'Advanced 3D molecular visualization capability that enables ScienceGents to render and interact with complex molecular structures in three dimensions. This capability supports various molecular representations (ball-and-stick, space-filling, ribbon, etc.) and allows for real-time rotation, zooming, and manipulation of molecular models.',
    price: 0.25,
    creator: '0x8a7b7c6d5e4f3g2h1i0j',
    createdAt: '2023-10-01T00:00:00Z',
    docs: 'https://example.com/docs/mol-viz-3d',
    stats: {
      usageCount: 47,
      rating: 4.8,
      revenue: 11.75
    },
    features: [
      'Real-time 3D rendering of molecular structures',
      'Multiple visualization modes (ball-and-stick, space-filling, etc.)',
      'Interactive rotation, zooming, and manipulation',
      'Support for common molecular file formats (PDB, MOL, XYZ, etc.)',
      'Measurement tools for bond lengths, angles, and dihedral angles',
      'Screenshot and export capabilities'
    ]
  },
  {
    id: 'mol-dock',
    name: 'Molecular Docking',
    domain: 'Drug Discovery',
    description: 'A sophisticated molecular docking capability that simulates the interaction between small molecules (ligands) and protein targets. This capability helps researchers predict binding affinities, identify potential drug candidates, and understand molecular interactions in the context of drug discovery and development.',
    price: 0.35,
    creator: '0x7c6d5e4f3g2h1i0j8a9b',
    createdAt: '2023-09-15T00:00:00Z',
    docs: 'https://example.com/docs/mol-dock',
    stats: {
      usageCount: 38,
      rating: 4.6,
      revenue: 13.3
    },
    features: [
      'Flexible ligand docking algorithms',
      'Multiple scoring functions for binding affinity prediction',
      'Support for protein flexibility and induced fit',
      'Batch processing for virtual screening',
      'Visualization of binding poses and interactions',
      'Integration with molecular dynamics simulations'
    ]
  },
  {
    id: 'spec-analysis',
    name: 'Spectroscopy Analysis',
    domain: 'Chemistry',
    description: 'A comprehensive spectroscopy analysis capability that processes and interprets various spectroscopic data, including NMR, IR, UV-Vis, and mass spectrometry. This capability assists researchers in structure elucidation, compound identification, and quality control by providing automated peak assignment, spectrum prediction, and comparison.',
    price: 0.3,
    creator: '0x5e4f3g2h1i0j8a9b7c6d',
    createdAt: '2023-11-05T00:00:00Z',
    docs: 'https://example.com/docs/spec-analysis',
    stats: {
      usageCount: 52,
      rating: 4.9,
      revenue: 15.6
    },
    features: [
      'Multi-spectral data processing and analysis',
      'Automated peak detection and assignment',
      'Structure verification and elucidation',
      'Spectrum prediction from chemical structures',
      'Database search and matching algorithms',
      'Batch processing and reporting capabilities'
    ]
  }
];

// Function to parse JSON data safely
const safeJsonParse = <T>(jsonString: any, defaultValue: T): T => {
  if (!jsonString) return defaultValue;
  try {
    if (typeof jsonString === 'string') {
      return JSON.parse(jsonString) as T;
    }
    return jsonString as T;
  } catch (e) {
    console.error('Error parsing JSON:', e);
    return defaultValue;
  }
};

// Function to get a capability by ID from Supabase
export const getCapabilityById = async (id: string): Promise<Capability | undefined> => {
  try {
    console.log(`Getting capability with ID ${id}...`);
    const capability = await fetchCapabilityById(id);
    if (capability) {
      console.log(`Found capability ${id} in Supabase`);
      
      // Parse JSON fields safely
      const socialLinks = safeJsonParse<CapabilitySocialLink[]>(capability.social_links, []);
      
      // Handle the additional_files property safely
      let additionalFiles = [];
      if (capability.additional_files) {
        additionalFiles = safeJsonParse(capability.additional_files, []);
      } else if (capability.files?.additionalFiles) {
        additionalFiles = capability.files.additionalFiles;
      }
      
      const files = {
        documentation: capability.docs,
        additionalFiles: additionalFiles
      };
      
      return {
        ...capability,
        social_links: socialLinks,
        files,
        stats: {
          usageCount: capability.usage_count || capability.stats?.usageCount || 0,
          rating: capability.rating || capability.stats?.rating || 4.5,
          revenue: capability.revenue || capability.stats?.revenue || 0
        }
      } as Capability;
    } else {
      console.log(`Capability ${id} not found in Supabase, using fallback`);
      return capabilities.find(capability => capability.id === id);
    }
  } catch (error) {
    console.error('Error fetching capability from Supabase:', error);
    console.log(`Using fallback for capability ${id}`);
    // Fallback to mock data
    return capabilities.find(capability => capability.id === id);
  }
};

// Cache control for capabilities to ensure fresh data
let lastFetchTime = 0;
let cachedCapabilities: Capability[] | null = null;
const CACHE_TTL = 10 * 1000; // 10 seconds cache lifetime

// Function to get all capabilities from Supabase with improved caching
export const getAllCapabilities = async (forceRefresh = false): Promise<Capability[]> => {
  try {
    const now = Date.now();
    
    // Return cached data if it's still fresh and we're not forcing a refresh
    if (!forceRefresh && cachedCapabilities && (now - lastFetchTime) < CACHE_TTL) {
      console.log("Using cached capabilities data");
      return cachedCapabilities;
    }
    
    console.log("Getting fresh capabilities data...");
    const supabaseCapabilities = await fetchCapabilitiesFromSupabase();
    
    if (supabaseCapabilities && supabaseCapabilities.length > 0) {
      console.log(`Got ${supabaseCapabilities.length} capabilities from Supabase`);
      
      // Transform capabilities to ensure they have all required fields
      const validCapabilities = supabaseCapabilities.map(cap => {
        // Parse JSON fields safely
        const socialLinks = safeJsonParse<CapabilitySocialLink[]>(cap.social_links, []);
        
        // Handle the additional_files property safely
        let additionalFiles = [];
        if (cap.additional_files) {
          additionalFiles = safeJsonParse(cap.additional_files, []);
        } else if (cap.files?.additionalFiles) {
          additionalFiles = cap.files.additionalFiles;
        }
        
        const files = {
          documentation: cap.docs,
          additionalFiles: additionalFiles
        };
        
        return {
          ...cap,
          social_links: socialLinks,
          files,
          stats: {
            usageCount: cap.usage_count || cap.stats?.usageCount || 0,
            rating: cap.rating || cap.stats?.rating || 4.5,
            revenue: cap.revenue || cap.stats?.revenue || 0
          }
        } as Capability;
      });
      
      // Update cache
      cachedCapabilities = validCapabilities;
      lastFetchTime = now;
      return validCapabilities;
    } else {
      console.log("No capabilities found in Supabase, using fallback");
      // Update cache with fallback data
      cachedCapabilities = capabilities;
      lastFetchTime = now;
      return capabilities;
    }
  } catch (error) {
    console.error('Error fetching capabilities from Supabase:', error);
    console.log("Using fallback capabilities");
    
    // If we have cached data, still use it even on error
    if (cachedCapabilities) {
      return cachedCapabilities;
    }
    
    // Otherwise fallback to mock data
    return capabilities;
  }
};

// Function to refresh capabilities data (to be called after adding new capability)
export const refreshCapabilities = async (): Promise<Capability[]> => {
  console.log("Forcing capabilities refresh...");
  return getAllCapabilities(true);
};
