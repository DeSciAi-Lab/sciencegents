
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
  const [tokenPrice, setTokenPrice] = useState("0.00000000");
  
  useEffect(() => {
    if (formData.initialLiquidity && formData.totalSupply) {
      const price = (parseFloat(formData.initialLiquidity) / (parseFloat(formData.totalSupply) * 0.99)).toFixed(8);
      setTokenPrice(price);
    }
  }, [formData.initialLiquidity, formData.totalSupply]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Initial Liquidity Settings</h3>
        <p className="text-sm text-gray-500 mb-6">
          Set the initial liquidity amount in virtual ETH. This will determine the starting price of your token.
        </p>
      </div>
      
      <div className="space-y-6">
        <div>
          <Label htmlFor="initialLiquidity" className="text-base">Virtual ETH Amount</Label>
          <Input 
            id="initialLiquidity" 
            name="initialLiquidity" 
            type="number" 
            step="0.01"
            min="0.01"
            placeholder="Enter virtual ETH amount (e.g. 2.0)" 
            value={formData.initialLiquidity} 
            onChange={handleInputChange} 
            className="mt-2"
          />
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md border">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-600">Initial Token Price</div>
            <div className="text-sm font-medium text-gray-900">{tokenPrice} ETH</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-600">USD Equivalent</div>
            <div className="text-sm font-medium text-blue-700">
              ${(parseFloat(tokenPrice || "0") * 3500).toFixed(6)}
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-md p-4 border border-blue-100">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800 mb-1">What is virtualETH?</h3>
              <p className="text-sm text-blue-700">
                virtualETH is a synthetic representation of ETH used to initialize your token's price. 
                You don't need to deposit real ETH until your token is ready to migrate to a public DEX. 
                This amount will determine your initial token price.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquiditySettings;
