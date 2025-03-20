
import React from 'react';
import { FileText, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScienceGentFormData } from '@/types/sciencegent';
import { LAUNCH_FEE, calculateTotalCapabilityFees, mockCapabilities } from '../utils';

interface ReviewAndLaunchProps {
  formData: ScienceGentFormData;
}

const ReviewAndLaunch: React.FC<ReviewAndLaunchProps> = ({ formData }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Review & Launch</CardTitle>
        <CardDescription>
          Review your ScienceGent details and launch it to the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <FileText className="w-5 h-5 text-science-600" />
              <span>Summary</span>
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Token Name</div>
                  <div className="font-medium">{formData.name || 'Not set'}</div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Token Symbol</div>
                  <div className="font-medium">{formData.symbol || 'Not set'}</div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Total Supply</div>
                  <div className="font-medium">{formData.totalSupply || 'Not set'}</div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Initial Liquidity</div>
                  <div className="font-medium">{formData.initialLiquidity || 'Not set'} virtualETH</div>
                </div>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Selected Capabilities</div>
                <div className="font-medium">
                  {formData.selectedCapabilities.length > 0 
                    ? formData.selectedCapabilities.map(id => {
                        const cap = mockCapabilities.find(c => c.id === id);
                        return cap?.name;
                      }).join(', ')
                    : 'None'
                  }
                </div>
              </div>
            </div>
            
            <h3 className="text-lg font-medium flex items-center gap-2 mt-4">
              <DollarSign className="w-5 h-5 text-science-600" />
              <span>Fees & Costs</span>
            </h3>
            
            <div className="space-y-2">
              <div className="flex justify-between p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">Launch Fee</span>
                <span className="font-medium">{LAUNCH_FEE} DSI</span>
              </div>
              
              <div className="flex justify-between p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">virtualETH Amount</span>
                <span className="font-medium">{formData.initialLiquidity || '0'} ETH</span>
              </div>
              
              <div className="flex justify-between p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">Capability Fees</span>
                <span className="font-medium">{calculateTotalCapabilityFees(formData.selectedCapabilities).toFixed(2)} ETH</span>
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex justify-between p-3 bg-science-50 text-science-800 rounded-lg">
                <span className="font-medium">Total Cost Now</span>
                <span className="font-bold">{LAUNCH_FEE} DSI</span>
              </div>
              
              <p className="text-xs text-muted-foreground mt-1">
                The virtualETH and capability fees will be paid from collected trading fees when your token is migrated to an external DEX.
              </p>
            </div>
            
            <div className="mt-6 p-4 border border-amber-200 bg-amber-50 rounded-lg">
              <h4 className="font-medium text-amber-800 mb-2">Important Information</h4>
              <ul className="space-y-2 text-sm text-amber-700">
                <li>Once created, your token's parameters cannot be changed</li>
                <li>1% of the total supply will be locked for 30 days and sent to the admin wallet</li>
                <li>99% of the total supply will be added to the liquidity pool</li>
                <li>You will need to enable trading manually after launch</li>
                <li>Your token will need to collect sufficient trading fees to migrate to an external DEX</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewAndLaunch;
