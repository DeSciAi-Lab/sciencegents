
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScienceGentCard from '@/components/ui/ScienceGentCard';
import Reveal from '@/components/animations/Reveal';

const Featured = () => {
  const navigate = useNavigate();

  // Mock data for featured ScienceGents
  const featuredGents = [
    {
      id: '1',
      name: 'SpectrumAI',
      address: '0x1a2b3c4d5e6f7g8h9i0j',
      marketCap: 450000,
      tokenPrice: 0.00235,
      age: '3 months',
      roi: 18.7,
      domain: 'Chemistry',
      featured: true
    },
    {
      id: '2',
      name: 'GenomicsGPT',
      address: '0x2b3c4d5e6f7g8h9i0j1a',
      marketCap: 780000,
      tokenPrice: 0.00412,
      age: '5 months',
      roi: 24.5,
      domain: 'Genomics',
      featured: true
    },
    {
      id: '3',
      name: 'QuantumSolver',
      address: '0x3c4d5e6f7g8h9i0j1a2b',
      marketCap: 620000,
      tokenPrice: 0.00327,
      age: '2 months',
      roi: 12.3,
      domain: 'Physics',
      featured: true
    }
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div className="mb-6 md:mb-0">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Featured ScienceGents
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-muted-foreground max-w-2xl">
                Discover top-performing AI agents with specialized scientific capabilities
                and their associated tokens.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <Button
              onClick={() => navigate('/explore')}
              variant="outline" 
              className="group border-science-200 hover:border-science-300"
            >
              <span>View All ScienceGents</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGents.map((gent, index) => (
            <Reveal key={gent.id} delay={300 + (index * 100)} direction="up">
              <ScienceGentCard {...gent} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
