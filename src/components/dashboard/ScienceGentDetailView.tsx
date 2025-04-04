import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Star, RefreshCw } from "lucide-react";
import { DashboardScienceGent } from '@/hooks/useUserDashboard';
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useEthPriceContext } from '@/context/EthPriceContext';
import { fetchTokenStats } from '@/services/scienceGent';

interface ScienceGentDetailViewProps {
  scienceGent: DashboardScienceGent;
  onBack: () => void;
}

const ScienceGentDetailView: React.FC<ScienceGentDetailViewProps> = ({ 
  scienceGent, 
  onBack 
}) => {
  // Use the actual values from scienceGent for initial state
  const [agentFee, setAgentFee] = useState(String(scienceGent.agent_fee || '3'));
  const [detailedDescription, setDetailedDescription] = useState(
    scienceGent.detailed_description || scienceGent.description || 'xxxxxxx xxxxxx xxxxxx xx\nxxxx xxxx xx\nxxxx xxxx xxxx xx\nxxxx. xxxx\nxxx. mxxxxxx xxxxxx'
  );
  const [persona, setPersona] = useState(
    scienceGent.persona || 'new custom instructions to set'
  );
  const [addCapabilityId, setAddCapabilityId] = useState('');
  const [removeCapabilityId, setRemoveCapabilityId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingStats, setIsFetchingStats] = useState(false);
  const [tokenAddress, setTokenAddress] = useState(scienceGent.address);
  const { ethPrice } = useEthPriceContext();
  const [maturityValue, setMaturityValue] = useState(scienceGent.maturityProgress || 75);
  const [tokenStats, setTokenStats] = useState({
    interactions: scienceGent.interactions || 0,
    revenue: (scienceGent.agent_fee || 0) * (scienceGent.interactions || 0),
    holders: scienceGent.holders || 0
  });
  
  // Load current capabilities
  const [capabilities, setCapabilities] = useState<{id: string, name: string, rating: number}[]>([]);
  
  // Fetch current capabilities on load
  useEffect(() => {
    const fetchCapabilities = async () => {
      if (!scienceGent.capabilities || scienceGent.capabilities.length === 0) {
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('capabilities')
          .select('id, name')
          .in('id', scienceGent.capabilities);
          
        if (error) throw error;
        
        if (data) {
          // Create capability objects with default rating of 4
          const formattedCapabilities = data.map(cap => ({
            id: cap.id,
            name: cap.name || cap.id,
            rating: 4
          }));
          
          setCapabilities(formattedCapabilities);
        }
      } catch (error) {
        console.error("Error fetching capabilities:", error);
      }
    };
    
    fetchCapabilities();
    
    // Fetch initial token stats
    handleFetchTokenStats();
  }, [scienceGent.capabilities]);
  
  const handleRateCapability = (capabilityId: string, rating: number) => {
    // Find and update the rating for the specific capability
    setCapabilities(prev => 
      prev.map(cap => 
        cap.id === capabilityId ? { ...cap, rating } : cap
      )
    );
    
    // This would send the rating to your backend
    toast({
      title: "Rating Saved",
      description: `Rated capability ${capabilityId} with ${rating} stars`,
    });
  };
  
  const handleAddCapability = async () => {
    if (!addCapabilityId) {
      toast({
        title: "Error",
        description: "Please enter a capability ID",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Check if capability exists first
      const { data: capabilityExists } = await supabase
        .from('capabilities')
        .select('id, name')
        .eq('id', addCapabilityId)
        .single();
        
      if (!capabilityExists) {
        toast({
          title: "Error",
          description: "Capability not found",
          variant: "destructive"
        });
        return;
      }
      
      // Add capability to ScienceGent
      const { error } = await supabase
        .from('sciencegent_capabilities')
        .insert({
          sciencegent_address: scienceGent.address,
          capability_id: addCapabilityId,
          added_at: new Date().toISOString()
        });
        
      if (error) throw error;
      
      // Add the capability to local state too
      setCapabilities(prev => [
        ...prev, 
        { 
          id: capabilityExists.id, 
          name: capabilityExists.name || capabilityExists.id,
          rating: 4
        }
      ]);
      
      toast({
        title: "Success",
        description: "Capability added successfully",
      });
      
      setAddCapabilityId('');
    } catch (error) {
      console.error("Error adding capability:", error);
      toast({
        title: "Error",
        description: "Failed to add capability",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleRemoveCapability = async () => {
    if (!removeCapabilityId) {
      toast({
        title: "Error",
        description: "Please enter a capability ID",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Remove capability from ScienceGent
      const { error } = await supabase
        .from('sciencegent_capabilities')
        .delete()
        .eq('sciencegent_address', scienceGent.address)
        .eq('capability_id', removeCapabilityId);
        
      if (error) throw error;
      
      // Remove the capability from local state too
      setCapabilities(prev => prev.filter(cap => cap.id !== removeCapabilityId));
      
      toast({
        title: "Success",
        description: "Capability removed successfully",
      });
      
      setRemoveCapabilityId('');
    } catch (error) {
      console.error("Error removing capability:", error);
      toast({
        title: "Error",
        description: "Failed to remove capability",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleUpdateAgentFee = async () => {
    if (!agentFee || isNaN(parseFloat(agentFee))) {
      toast({
        title: "Error",
        description: "Please enter a valid fee amount",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Update agent fee in Supabase
      const { error } = await supabase
        .from('sciencegents')
        .update({ agent_fee: parseFloat(agentFee) })
        .eq('address', scienceGent.address);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Agent fee updated successfully",
      });
    } catch (error) {
      console.error("Error updating agent fee:", error);
      toast({
        title: "Error",
        description: "Failed to update agent fee",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleFetchTokenStats = async () => {
    if (!scienceGent.address) {
      toast({
        title: "Error",
        description: "No token address available",
        variant: "destructive"
      });
      return;
    }
    
    setIsFetchingStats(true);
    try {
      // Call the fetchTokenStats function with the required parameters
      const stats = await fetchTokenStats(scienceGent.address, ethPrice);
      
      if (stats && !stats.error) {
        // Update the tokenStats with data from Supabase and Moralis
        setTokenStats({
          interactions: stats.interactions,
          revenue: stats.revenue,
          holders: stats.holders
        });
        
        toast({
          title: "Stats Updated",
          description: "Token statistics have been refreshed"
        });
      } else if (stats.error) {
        throw new Error(stats.error);
      }
    } catch (error) {
      console.error("Error fetching token stats:", error);
      toast({
        title: "Error",
        description: "Failed to fetch token statistics",
        variant: "destructive"
      });
    } finally {
      setIsFetchingStats(false);
    }
  };
  
  const handleUpdateDetailedDescription = async () => {
    if (!detailedDescription.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid description",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Update description in Supabase
      const { error } = await supabase
        .from('sciencegents')
        .update({ description: detailedDescription })
        .eq('address', scienceGent.address);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Description updated successfully",
      });
    } catch (error) {
      console.error("Error updating description:", error);
      toast({
        title: "Error",
        description: "Failed to update description",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleUpdatePersona = async () => {
    if (!persona.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid persona",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Update persona in Supabase
      const { error } = await supabase
        .from('sciencegents')
        .update({ persona: persona })
        .eq('address', scienceGent.address);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Persona updated successfully",
      });
    } catch (error) {
      console.error("Error updating persona:", error);
      toast({
        title: "Error",
        description: "Failed to update persona",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderRating = (rating: number, capabilityId: string) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={18} 
          className={`cursor-pointer ${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          onClick={() => handleRateCapability(capabilityId, i)}
        />
      );
    }
    return <div className="flex">{stars}</div>;
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <CardTitle>ScienceGent Details</CardTitle>
        </div>
        <CardDescription>Manage your ScienceGent token and AI agent</CardDescription>
      </CardHeader>
      <CardContent className="space-y-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
              {scienceGent.symbol ? scienceGent.symbol.charAt(0) : 'S'}
            </div>
            <h2 className="text-xl font-bold">{scienceGent.name}</h2>
            <div className="flex items-center gap-1">
              <span className="font-semibold">${scienceGent.symbol}</span>
              <span className="text-xs text-gray-400">
                {scienceGent.address.substring(0, 6)}...{scienceGent.address.slice(-4)}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <div className="border rounded-md p-4">
              <h3 className="text-sm text-muted-foreground mb-1">Interactions</h3>
              <p className="text-xl font-bold">{tokenStats.interactions}</p>
            </div>
            <div className="border rounded-md p-4">
              <h3 className="text-sm text-muted-foreground mb-1">Revenue</h3>
              <p className="text-xl font-bold">{tokenStats.revenue.toFixed(2)}</p>
            </div>
            <div className="border rounded-md p-4">
              <h3 className="text-sm text-muted-foreground mb-1">Holders</h3>
              <p className="text-xl font-bold">{tokenStats.holders}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Maturity Status</h3>
          <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
            <div 
              className="h-full rounded-full bg-blue-500" 
              style={{ width: `${maturityValue}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">{maturityValue}%</p>
          <p className="text-sm text-muted-foreground mt-2">
            Migration condition: trading fee &gt;= 3.4 ETH (2x virtualETH + capability fees)
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Update</h3>
          
          <div className="space-y-8">
            <div>
              <h4 className="font-medium mb-3">1. Rate the capabilities you are using for your agent</h4>
              <div className="space-y-3">
                {capabilities.map((capability) => (
                  <div key={capability.id} className="flex flex-col gap-1 p-3 border rounded-md">
                    <div className="flex justify-between items-center">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        {capability.id}
                      </Badge>
                      {renderRating(capability.rating, capability.id)}
                    </div>
                    <p className="text-sm">{capability.name}</p>
                  </div>
                ))}
                
                {capabilities.length === 0 && (
                  <p className="text-muted-foreground text-sm">No capabilities added yet.</p>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">2. Add and Remove a capability from Sciencegent</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="capability ID" 
                    value={addCapabilityId}
                    onChange={(e) => setAddCapabilityId(e.target.value)}
                  />
                  <Button onClick={handleAddCapability} disabled={isSubmitting}>Add</Button>
                </div>
                <div className="flex gap-2">
                  <Input 
                    placeholder="capability ID" 
                    value={removeCapabilityId}
                    onChange={(e) => setRemoveCapabilityId(e.target.value)}
                  />
                  <Button variant="destructive" onClick={handleRemoveCapability} disabled={isSubmitting}>Remove</Button>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">3. Update Agent Fee per interaction (in DSI)</h4>
              <div className="flex gap-2 w-full max-w-md">
                <Input 
                  type="number" 
                  min="0"
                  step="0.1"
                  value={agentFee}
                  onChange={(e) => setAgentFee(e.target.value)}
                />
                <Button onClick={handleUpdateAgentFee} disabled={isSubmitting}>Update</Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">4. Update the Detailed Markdown Description</h4>
              <Textarea 
                className="min-h-[150px]"
                value={detailedDescription}
                onChange={(e) => setDetailedDescription(e.target.value)}
              />
              <Button className="mt-3" onClick={handleUpdateDetailedDescription} disabled={isSubmitting}>Update</Button>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">5. Update Persona</h4>
              <Textarea 
                className="min-h-[100px]"
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
              />
              <Button className="mt-3" onClick={handleUpdatePersona} disabled={isSubmitting}>Update</Button>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Refresh Token Stats</h4>
              <Button 
                variant="outline" 
                onClick={handleFetchTokenStats} 
                disabled={isFetchingStats}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isFetchingStats ? 'animate-spin' : ''}`} />
                Refresh Stats
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScienceGentDetailView;
