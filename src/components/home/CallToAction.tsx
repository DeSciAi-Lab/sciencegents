
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Reveal from '@/components/animations/Reveal';
import { AIAgentIcon, ChemistryIcon, GenomicsIcon, QuantumIcon } from '@/components/icons/ScienceIcons';

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <div className="relative py-20 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-full h-full bg-gradient-to-br from-science-50/80 to-science-100/30 rounded-3xl -skew-y-6 transform-gpu" />
        <div className="absolute top-0 left-0 w-20 h-20 bg-science-200/20 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-science-200/30 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto glass-panel p-8 md:p-14 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Create Your 
                  <span className="text-science-700"> Scientific AI Agent?</span>
                </h2>
              </Reveal>
              
              <Reveal delay={100}>
                <p className="text-muted-foreground mb-8">
                  Launch your own ScienceGent with specialized capabilities and an 
                  associated token. Start generating revenue from your scientific expertise.
                </p>
              </Reveal>

              <Reveal delay={150}>
                <ul className="space-y-3 mb-8">
                  {[
                    'Create a customized AI agent with scientific capabilities',
                    'Launch an associated ERC20 token',
                    'Earn fees from token trading',
                    'Migrate to Uniswap when eligible'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CircleCheck className="h-5 w-5 text-science-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              
              <Reveal delay={200}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => navigate('/create-sciencegent')}
                    className="bg-science-600 hover:bg-science-700 text-white group transition-all"
                    size="lg"
                  >
                    <span>Get Started Now</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button 
                    onClick={() => navigate('/sciencegents')}
                    variant="outline"
                    size="lg"
                    className="border-science-200 hover:border-science-300 hover:bg-science-50 transition-all"
                  >
                    Explore Examples
                  </Button>
                </div>
              </Reveal>
            </div>
            
            <div className="relative">
              <Reveal delay={300} direction="none">
                <div className="relative aspect-square max-w-md mx-auto md:ml-auto">
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4">
                    {/* Feature Icons - Using our custom icons */}
                    <div className="relative glass-panel flex flex-col justify-center items-center p-6 transform transition-all hover:scale-105 hover:shadow-md">
                      <AIAgentIcon className="h-10 w-10 text-science-600 mb-3" />
                      <span className="text-sm font-medium text-center">AI Agents</span>
                      <div className="absolute -z-10 inset-0 bg-gradient-to-br from-science-100/40 to-transparent rounded-2xl" />
                    </div>
                    
                    <div className="relative glass-panel flex flex-col justify-center items-center p-6 transform transition-all hover:scale-105 hover:shadow-md">
                      <ChemistryIcon className="h-10 w-10 text-science-600 mb-3" />
                      <span className="text-sm font-medium text-center">Chemistry Tools</span>
                      <div className="absolute -z-10 inset-0 bg-gradient-to-br from-science-100/40 to-transparent rounded-2xl" />
                    </div>
                    
                    <div className="relative glass-panel flex flex-col justify-center items-center p-6 transform transition-all hover:scale-105 hover:shadow-md">
                      <GenomicsIcon className="h-10 w-10 text-science-600 mb-3" />
                      <span className="text-sm font-medium text-center">Genomics Analysis</span>
                      <div className="absolute -z-10 inset-0 bg-gradient-to-br from-science-100/40 to-transparent rounded-2xl" />
                    </div>
                    
                    <div className="relative glass-panel flex flex-col justify-center items-center p-6 transform transition-all hover:scale-105 hover:shadow-md">
                      <QuantumIcon className="h-10 w-10 text-science-600 mb-3" />
                      <span className="text-sm font-medium text-center">Quantum Models</span>
                      <div className="absolute -z-10 inset-0 bg-gradient-to-br from-science-100/40 to-transparent rounded-2xl" />
                    </div>
                  </div>
                </div>
              </Reveal>
              
              {/* Animated decorative elements */}
              <div className="absolute -z-10 top-0 right-0 w-32 h-32 bg-science-100/50 rounded-full blur-xl animate-spin-slow" />
              <div className="absolute -z-10 bottom-0 left-0 w-24 h-24 bg-science-200/30 rounded-full blur-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
