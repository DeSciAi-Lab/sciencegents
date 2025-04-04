import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ethers } from 'ethers';
import { contractConfig } from '@/utils/contractConfig';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const UpdateDeveloperData: React.FC = () => {
  const [developerAddress, setDeveloperAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const updateDeveloperData = async () => {
    if (!ethers.utils.isAddress(developerAddress)) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid Ethereum address",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // Initialize factory contract
      const factoryContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsFactory,
        [
          "function getTokensOfCreator(address creator) view returns (address[])",
          "function getCapabilitiesOfCreator(address creator) view returns (uint256[])"
        ],
        provider
      );

      // Fetch data from blockchain
      const [tokens, capabilities] = await Promise.all([
        factoryContract.getTokensOfCreator(developerAddress),
        factoryContract.getCapabilitiesOfCreator(developerAddress)
      ]);

      // Convert capabilities to strings for storage
      const capabilityIds = capabilities.map(c => c.toString());

      // Update developer profile in Supabase
      const { data, error } = await supabase
        .from('developer_profiles')
        .update({
          created_sciencegents: tokens,
          created_capabilities: capabilityIds
        })
        .eq('wallet_address', developerAddress.toLowerCase());

      if (error) throw error;

      toast({
        title: "Update Successful",
        description: `Updated ${tokens.length} ScienceGents and ${capabilityIds.length} capabilities`
      });

    } catch (error) {
      console.error('Error updating developer data:', error);
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update developer data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Developer Data</CardTitle>
        <CardDescription>
          Fetch and update a developer's created ScienceGents and capabilities from the blockchain
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            placeholder="Developer Wallet Address"
            value={developerAddress}
            onChange={(e) => setDeveloperAddress(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={updateDeveloperData} 
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Developer Data"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpdateDeveloperData; 