
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, FlaskConical, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Reveal from '@/components/animations/Reveal';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-b from-science-100/50 to-science-200/30 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-science-100/50 to-science-200/30 blur-3xl" />
        <div className="absolute top-[40%] left-[20%] w-[20%] h-[20%] rounded-full bg-gradient-to-tr from-genius-200/40 to-genius-300/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-24 md:py-32 lg:py-40 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Preheading */}
          <Reveal delay={100}>
            <div className="inline-flex items-center gap-2 bg-science-50 text-science-800 px-3 py-1 rounded-full text-sm font-medium mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-science-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-science-500"></span>
              </span>
              <span>Revolutionizing DeSci with AI</span>
            </div>
          </Reveal>

          {/* Main heading */}
          <Reveal delay={200}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight text-balance mb-6">
              Build, Deploy, and Monetize 
              <span className="relative">
                <span className="relative z-10 text-science-700"> Science-Focused </span>
                <span className="absolute bottom-0 left-0 right-0 h-3 bg-science-100 rounded-sm transform translate-y-2 -z-10"></span>
              </span> 
              AI Agents
            </h1>
          </Reveal>

          {/* Description */}
          <Reveal delay={300}>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              ScienceGents Protocol enables anyone to create and monetize specialized AI agents 
              with associated ERC20 tokens that can be traded on decentralized exchanges.
            </p>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal delay={400}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button 
                onClick={() => navigate('/create-sciencegent')}
                size="lg" 
                className="bg-science-600 hover:bg-science-700 text-white w-full sm:w-auto group transition-all"
              >
                <span>Create ScienceGent</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                onClick={() => navigate('/sciencegents')}
                variant="outline"
                size="lg"
                className="border-science-200 hover:border-science-300 hover:bg-science-50 w-full sm:w-auto transition-all"
              >
                Explore ScienceGents
              </Button>
            </div>
          </Reveal>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Reveal delay={500} direction="up">
              <div className="glass-card px-6 py-7 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
                <div className="w-12 h-12 flex items-center justify-center bg-science-100 text-science-700 rounded-full mb-4">
                  <Brain className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium mb-2">Advanced AI Capabilities</h3>
                <p className="text-muted-foreground text-sm">
                  Leverage specialized scientific capabilities to create powerful research assistants.
                </p>
              </div>
            </Reveal>

            <Reveal delay={600} direction="up">
              <div className="glass-card px-6 py-7 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
                <div className="w-12 h-12 flex items-center justify-center bg-science-100 text-science-700 rounded-full mb-4">
                  <FlaskConical className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium mb-2">Domain-specific Tools</h3>
                <p className="text-muted-foreground text-sm">
                  Access specialized capabilities from chemistry, genomics, physics, and more.
                </p>
              </div>
            </Reveal>

            <Reveal delay={700} direction="up">
              <div className="glass-card px-6 py-7 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
                <div className="w-12 h-12 flex items-center justify-center bg-science-100 text-science-700 rounded-full mb-4">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium mb-2">Token Economics</h3>
                <p className="text-muted-foreground text-sm">
                  Create and trade tokens tied to your AI agent with built-in monetization.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
