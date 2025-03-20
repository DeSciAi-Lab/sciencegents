
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScienceGentFormData } from '@/types/sciencegent';
import { LAUNCH_FEE, calculateTotalCapabilityFeesSynchronous } from '../utils';
import { getAllCapabilities } from '@/data/capabilities';
import { Capability } from '@/types/capability';
import { Loader2 } from 'lucide-react';
import useScienceGentCreation, { CreationStatus } from '@/hooks/useScienceGentCreation';
import TransactionStatus from '../TransactionStatus';

interface ReviewAndLaunchProps {
  formData: ScienceGentFormData;
  onSubmit: () => void;
}

const ReviewAndLaunch: React.FC<ReviewAndLaunchProps> = ({ formData, onSubmit }) => {
  const [capabilities, setCapabilities] = useState<Capability[]>([]);
  const [loadingCapabilities, setLoadingCapabilities] = useState(true);
  const { status, error, createToken, launchFee } = useScienceGentCreation();

  useEffect(() => {
    const fetchCapabilities = async () => {
      try {
        setLoadingCapabilities(true);
        const fetchedCapabilities = await getAllCapabilities();
        setCapabilities(fetchedCapabilities);
      } catch (error) {
        console.error('Error fetching capabilities:', error);
      } finally {
        setLoadingCapabilities(false);
      }
    };

    fetchCapabilities();
  }, []);

  const handleLaunch = async () => {
    const tokenAddress = await createToken(formData);
    if (tokenAddress) {
      onSubmit();
    }
  };

  const totalCapabilityFees = calculateTotalCapabilityFeesSynchronous(
    formData.selectedCapabilities,
    capabilities
  );

  const selectedCapabilityNames = formData.selectedCapabilities.map(capId => {
    const cap = capabilities.find(c => c.id === capId);
    return cap ? cap.name : capId;
  });

  const isLoading = loadingCapabilities || status === CreationStatus.CheckingWallet ||
    status === CreationStatus.CheckingAllowance || status === CreationStatus.ApprovingDSI ||
    status === CreationStatus.Creating;

  const isButtonDisabled = isLoading || status === CreationStatus.Success || status === CreationStatus.Error;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Review & Launch</CardTitle>
        <CardDescription>
          Review your ScienceGent details and launch
        </CardDescription>
      </CardHeader>
      <CardContent>
        {status !== CreationStatus.Idle && (
          <div className="mb-6">
            <TransactionStatus status={status} error={error} />
          </div>
        )}

        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="p-4 rounded-lg border bg-muted/30">
              <h3 className="font-medium mb-1">Basic Information</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="text-sm">{formData.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Symbol</p>
                  <p className="text-sm">{formData.symbol}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Supply</p>
                  <p className="text-sm">{formData.totalSupply} tokens</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Initial Liquidity</p>
                  <p className="text-sm">{formData.initialLiquidity} ETH</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border bg-muted/30">
              <h3 className="font-medium mb-1">AI Agent Persona</h3>
              <p className="text-sm whitespace-pre-wrap">{formData.persona}</p>
            </div>
            
            <div className="p-4 rounded-lg border bg-muted/30">
              <h3 className="font-medium mb-1">Selected Capabilities</h3>
              {loadingCapabilities ? (
                <div className="flex items-center gap-2 py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">Loading capabilities...</span>
                </div>
              ) : (
                <>
                  {selectedCapabilityNames.length > 0 ? (
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {selectedCapabilityNames.map((name, index) => (
                        <li key={index}>{name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No capabilities selected</p>
                  )}
                </>
              )}
            </div>
            
            <div className="p-4 rounded-lg border bg-science-50 border-science-200">
              <h3 className="font-medium mb-3">Launch Fees</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Platform Fee</span>
                  <span>{launchFee} DSI</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Virtual ETH (Initial Pool)</span>
                  <span>{formData.initialLiquidity} ETH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Capability Fees</span>
                  <span>{totalCapabilityFees.toFixed(2)} ETH</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-medium">
                  <span>Total Launch Fee</span>
                  <span>{launchFee} DSI</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Note: Virtual ETH and capability fees are not charged upfront. They will be 
                  covered by trading fees collected from your token.
                </p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleLaunch}
            disabled={isButtonDisabled}
            className="w-full bg-science-600 hover:bg-science-700 text-white"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Launch ScienceGent
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewAndLaunch;
