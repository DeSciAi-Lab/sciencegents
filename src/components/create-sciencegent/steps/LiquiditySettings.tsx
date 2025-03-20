
import React from 'react';
import { Sparkle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScienceGentFormData } from '@/types/sciencegent';

interface LiquiditySettingsProps {
  formData: ScienceGentFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const LiquiditySettings: React.FC<LiquiditySettingsProps> = ({ formData, handleInputChange }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Liquidity Settings</CardTitle>
        <CardDescription>
          Set the initial liquidity for your ScienceGent token
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-3">
            <Label htmlFor="initialLiquidity">Initial Liquidity (virtualETH)</Label>
            <Input 
              id="initialLiquidity" 
              name="initialLiquidity" 
              type="number" 
              step="0.01"
              min="0.01"
              placeholder="e.g., 0.5" 
              value={formData.initialLiquidity} 
              onChange={handleInputChange} 
            />
            <p className="text-xs text-muted-foreground">
              The amount of virtualETH to set the initial price. This does not require real ETH upfront.
            </p>
          </div>
          
          <div className="bg-muted p-4 rounded-lg space-y-3">
            <h4 className="font-medium">What is virtualETH?</h4>
            <p className="text-sm text-muted-foreground">
              virtualETH is a synthetic representation of ETH used to initialize your token's price. 
              You don't need to deposit real ETH until your token is ready to migrate to a public DEX. 
              This amount will determine your initial token price.
            </p>
          </div>
          
          <div className="p-4 border border-science-200 rounded-lg bg-science-50">
            <h4 className="flex items-center font-medium text-science-700 mb-2">
              <Sparkle className="w-4 h-4 mr-2" />
              <span>Initial Pricing</span>
            </h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-science-600">Initial Token Price</span>
                <span className="font-medium text-science-700">
                  {formData.initialLiquidity && formData.totalSupply 
                    ? `${(parseFloat(formData.initialLiquidity) / (parseInt(formData.totalSupply) * 0.99)).toFixed(8)} ETH`
                    : '0.00000000 ETH'
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-science-600">Token Distribution</span>
                <span className="font-medium text-science-700">
                  {formData.totalSupply 
                    ? `${parseInt(formData.totalSupply) * 0.99} tokens (99%)`
                    : '0 tokens (99%)'
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-science-600">Admin Distribution</span>
                <span className="font-medium text-science-700">
                  {formData.totalSupply 
                    ? `${parseInt(formData.totalSupply) * 0.01} tokens (1%)`
                    : '0 tokens (1%)'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiquiditySettings;
