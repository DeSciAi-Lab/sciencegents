import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Star, Upload, Info, Plus } from "lucide-react";
import { UserCapability } from '@/hooks/useUserDashboard';
import { supabase } from '@/integrations/supabase/client';

interface CapabilityDetailViewProps {
  capability: UserCapability;
  onBack: () => void;
}

const CapabilityDetailView: React.FC<CapabilityDetailViewProps> = ({ 
  capability, 
  onBack 
}) => {
  const [usageCount, setUsageCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [revenue, setRevenue] = useState<number>(0);

  useEffect(() => {
    const fetchUsageCount = async () => {
      try {
        setIsLoading(true);
        // Count distinct sciencegent_address entries for this capability
        const { data, error, count } = await supabase
          .from('sciencegent_capabilities')
          .select('sciencegent_address', { count: 'exact' })
          .eq('capability_id', capability.id);

        if (error) throw error;
        
        const currentUsageCount = count || 0;
        setUsageCount(currentUsageCount);

        // Fetch capability price
        const { data: capabilityData, error: priceError } = await supabase
          .from('capabilities')
          .select('price')
          .eq('id', capability.id)
          .single();

        if (priceError) throw priceError;

        // Calculate revenue
        const price = capabilityData?.price || 0;
        const calculatedRevenue = currentUsageCount * price;
        setRevenue(calculatedRevenue);

      } catch (error) {
        console.error('Error fetching usage count and revenue:', error);
        setUsageCount(0);
        setRevenue(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsageCount();
  }, [capability.id]);

  const renderRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={20} 
          className={i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
        />
      );
    }
    return <div className="flex">{stars}</div>;
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle>Capability Details</CardTitle>
        </div>
        <CardDescription>Manage your capability and track metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-purple-500 flex items-center justify-center text-white text-2xl font-bold">
              {capability.name.charAt(0)}
            </div>
          </div>
          
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold">{capability.name}</h2>
            </div>
            
            <div className="flex items-center gap-3 text-sm mb-4">
              <Badge variant="outline" className="bg-gray-50 font-normal">
                {capability.id}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-muted-foreground">Agents using</div>
                <div className="text-xl font-semibold">
                  {isLoading ? (
                    <div className="animate-pulse bg-gray-200 h-6 w-12 rounded"></div>
                  ) : (
                    usageCount
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-muted-foreground">Revenue</div>
                <div className="text-xl font-semibold">
                  {isLoading ? (
                    <div className="animate-pulse bg-gray-200 h-6 w-24 rounded"></div>
                  ) : (
                    `${revenue} ETH`
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-muted-foreground">Rating</div>
                <div className="flex items-center gap-2">
                  {renderRating(capability.rating || 4.3)}
                  <span className="text-lg font-semibold">{capability.rating || 4.3}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6 mt-6">
          <h2 className="text-xl font-semibold mb-6">Update</h2>
          
          <div className="space-y-8">
            <div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-medium">1.</span>
                <span>Update the SDKs</span>
              </div>
              
              <div className="space-y-6 ml-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-sm">Documentation (optional)</div>
                  </div>
                  <div className="border rounded-md p-4 flex items-center justify-center cursor-pointer hover:bg-gray-50">
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <Upload size={20} />
                      <span>No file chosen (under 2MB)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                    <Info size={14} />
                    <span>Detailed documentation about your capability's functionality, limitations, and use cases.</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-sm">Integration Guide (optional)</div>
                  </div>
                  <div className="border rounded-md p-4 flex items-center justify-center cursor-pointer hover:bg-gray-50">
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <Upload size={20} />
                      <span>No file chosen (under 2MB)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                    <Info size={14} />
                    <span>Provide step-by-step instructions for integrating your capability.</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-sm">Others (optional)</div>
                  </div>
                  <div className="border rounded-md p-4 flex items-center justify-center cursor-pointer hover:bg-gray-50">
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <Upload size={20} />
                      <span>No file chosen (under 2MB)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                    <Info size={14} />
                    <span>Any additional files that might help users understand or implement your capability.</span>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button className="flex items-center gap-2">
                    <Plus size={16} />
                    Add more
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CapabilityDetailView;
