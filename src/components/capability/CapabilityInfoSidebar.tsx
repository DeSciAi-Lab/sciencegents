
import React from 'react';
import { Info, Beaker, Check } from 'lucide-react';
import Reveal from '@/components/animations/Reveal';

const CapabilityInfoSidebar: React.FC = () => {
  return (
    <>
      <Reveal delay={150}>
        <div className="glass-card p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Info size={18} className="text-science-600" />
            <span>About Capabilities</span>
          </h2>
          
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              Capabilities are specialized functions that enhance ScienceGents with domain-specific features. 
              As a capability creator, you define what your capability does and set a fee.
            </p>
            
            <div className="flex items-start gap-2">
              <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
              <p>Capability fees are paid when a ScienceGent migrates to an external DEX.</p>
            </div>
            
            <div className="flex items-start gap-2">
              <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
              <p>Well-documented capabilities with clear integration guides attract more users.</p>
            </div>
            
            <div className="flex items-start gap-2">
              <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
              <p>All capability data is stored on-chain for transparency and security.</p>
            </div>
            
            <div className="flex items-start gap-2">
              <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
              <p>After ScienceGent migration, creators can continue to earn fees from new integrations.</p>
            </div>
          </div>
        </div>
      </Reveal>
      
      <Reveal delay={200}>
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Beaker size={18} className="text-science-600" />
            <span>Creating Great Capabilities</span>
          </h2>
          
          <div className="space-y-3 text-sm">
            <div>
              <h3 className="font-medium">Be Specific</h3>
              <p className="text-muted-foreground">Focus on a single, well-defined scientific function.</p>
            </div>
            
            <div>
              <h3 className="font-medium">Explain Clearly</h3>
              <p className="text-muted-foreground">Describe exactly what your capability does and its limitations.</p>
            </div>
            
            <div>
              <h3 className="font-medium">Price Appropriately</h3>
              <p className="text-muted-foreground">Set fees based on the value and complexity of your capability.</p>
            </div>
            
            <div>
              <h3 className="font-medium">Document Well</h3>
              <p className="text-muted-foreground">Provide comprehensive documentation and integration guides.</p>
            </div>
          </div>
        </div>
      </Reveal>
    </>
  );
};

export default CapabilityInfoSidebar;
