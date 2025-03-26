
import React, { useState, useEffect } from 'react';
import { ScienceGentFormData } from '@/types/sciencegent';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Info } from 'lucide-react';

interface LiquiditySettingsProps {
  formData: ScienceGentFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const LiquiditySettings: React.FC<LiquiditySettingsProps> = ({ formData, handleInputChange }) => {
  const [tokenPrice, setTokenPrice] = useState<string>("0.000000");
  
  // Calculate token price whenever initialLiquidity changes
  useEffect(() => {
    if (formData.initialLiquidity && formData.totalSupply) {
      const liquidityEth = parseFloat(formData.initialLiquidity);
      const totalSupply = parseFloat(formData.totalSupply);
      
      // 99% of tokens go to liquidity pool
      const tokensInPool = totalSupply * 0.99;
      
      if (liquidityEth > 0 && tokensInPool > 0) {
        const price = liquidityEth / tokensInPool;
        setTokenPrice(price.toFixed(8));
      } else {
        setTokenPrice("0.000000");
      }
    }
  }, [formData.initialLiquidity, formData.totalSupply]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">
          Customize your ScienceGent's personality, expertise, and communication style
        </h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <Label htmlFor="initialLiquidity">Initial Liquidity (virtual ETH)</Label>
          <Input
            id="initialLiquidity"
            name="initialLiquidity"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="e.g. 2 ETH"
            value={formData.initialLiquidity}
            onChange={handleInputChange}
            className="mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="tokenPrice">Price</Label>
          <div className="flex items-center gap-2 mt-2">
            <Input
              id="tokenPrice"
              type="text"
              placeholder="e.g. 0.00000000202 ETH"
              value={`${tokenPrice} ETH`}
              readOnly
              className="bg-gray-50"
            />
            <div className="bg-gray-100 border border-gray-300 px-4 py-2 rounded">
              ${parseFloat(tokenPrice) * 3000} 
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-8">
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <Info className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-blue-700 mb-2">What is virtualETH?</h3>
            <p className="text-sm text-blue-700">
              virtualETH is a synthetic representation of ETH used to initialize your token's price. You don't need to
              deposit real ETH. The virtual ETH will be swapped with real ETH taking from trading fee during
              migration to migrate to a external DEX (Uniswap). This amount will determine your initial token price.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquiditySettings;
