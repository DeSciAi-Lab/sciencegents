import React, { useState, useEffect } from 'react';
import { ScienceGentFormData } from '@/types/sciencegent';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Info } from 'lucide-react';
import { useEthPriceContext } from '@/context/EthPriceContext';

interface LiquiditySettingsProps {
  formData: ScienceGentFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const LiquiditySettings: React.FC<LiquiditySettingsProps> = ({ formData, handleInputChange }) => {
  const [tokenPriceEth, setTokenPriceEth] = useState<string>("0.000000000000");
  const [tokenPriceUsd, setTokenPriceUsd] = useState<string>("0.000000000000");
  const { ethPrice } = useEthPriceContext();
  
  // Calculate token price whenever initialLiquidity or totalSupply changes
  useEffect(() => {
    if (formData.initialLiquidity && formData.totalSupply) {
      const liquidityEth = parseFloat(formData.initialLiquidity);
      const totalSupply = parseFloat(formData.totalSupply);
      
      if (liquidityEth > 0 && totalSupply > 0) {
        // Calculate ETH price directly using initial liquidity / total supply
        const priceEth = liquidityEth / totalSupply;
        setTokenPriceEth(priceEth.toFixed(12));
        
        // Calculate USD price as initial liquidity * ETH price / total supply
        if (ethPrice) {
          const priceUsd = (liquidityEth * ethPrice) / totalSupply;
          setTokenPriceUsd(priceUsd.toFixed(12));
        }
      } else {
        setTokenPriceEth("0.000000000000");
        setTokenPriceUsd("0.000000000000");
      }
    } else {
      setTokenPriceEth("0.000000000000");
      setTokenPriceUsd("0.000000000000");
    }
  }, [formData.initialLiquidity, formData.totalSupply, ethPrice]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">
          Set the virtual ETH amount to set the initial price of your token and initialize the pool
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
            <div className="flex-1">
              <Input
                id="tokenPriceEth"
                type="text"
                readOnly
                className="bg-gray-50 w-full font-mono"
                value={`${tokenPriceEth} ETH`}
              />
            </div>
            <div className="flex-1">
              <div className="bg-gray-100 border border-gray-300 px-4 py-2 rounded w-full h-10 flex items-center font-mono">
                ${tokenPriceUsd}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Token price = Initial Liquidity ÷ Total Supply
          </p>
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
