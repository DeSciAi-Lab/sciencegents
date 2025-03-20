
// Capability types and interfaces
export interface Capability {
  id: string;
  name: string;
  domain: string;
  description: string;
  price: number; // ETH
  creator: string;
  createdAt: string;
  docs?: string;
  stats: {
    usageCount: number;
    rating: number;
    revenue: number; // ETH
  };
  features: string[];
}

// Mock capabilities data
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

// Function to get a capability by ID
export const getCapabilityById = (id: string): Capability | undefined => {
  return capabilities.find(capability => capability.id === id);
};

// Function to get all capabilities
export const getAllCapabilities = (): Capability[] => {
  return capabilities;
};
