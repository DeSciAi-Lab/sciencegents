import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Star, Upload, Info, Plus, Loader2, CheckCircle, Save } from "lucide-react";
import { UserCapability } from '@/hooks/useUserDashboard';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

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
  const [description, setDescription] = useState(capability.description || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>(capability.displayImage || '');
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [logoUpdateSuccess, setLogoUpdateSuccess] = useState(false);

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
  
  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast({
          title: "File too large",
          description: "Please select an image under 2MB",
          variant: "destructive"
        });
        return;
      }
      setLogoFile(file);
      // Create a temporary preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Reset success state when new file is selected
      setLogoUpdateSuccess(false);
    }
  };

  const handleSaveLogo = async () => {
    if (!logoFile) return;
    
    try {
      setIsUploadingLogo(true);
      
      // Upload the logo to Supabase Storage
      const fileExt = logoFile.name.split('.').pop();
      const fileName = `capability_logos/${capability.id}_${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('capability_documents')
        .upload(fileName, logoFile, {
          cacheControl: '3600',
          upsert: true
        });
        
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('capability_documents')
        .getPublicUrl(fileName);
        
      const logoUrl = urlData.publicUrl;
      
      // Update the capability in the database
      const { error: updateError } = await supabase
        .from('capabilities')
        .update({ display_image: logoUrl })
        .eq('id', capability.id);
        
      if (updateError) throw updateError;
      
      // Update success state and show toast
      setLogoUpdateSuccess(true);
      toast({
        title: "Logo updated successfully",
        description: "Your capability logo has been updated",
      });
      
      // Also update the original URL so it persists on future renders
      capability.displayImage = logoUrl;
      
    } catch (error) {
      console.error('Error updating logo:', error);
      toast({
        title: "Logo update failed",
        description: "Failed to update logo. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleUpdateCapability = async () => {
    try {
      setIsUpdating(true);

      // Upload logo if changed
      let logoUrl = capability.displayImage;
      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop();
        const fileName = `${capability.id}-logo.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('capability-logos')
          .upload(fileName, logoFile, {
            upsert: true
          });

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('capability-logos')
          .getPublicUrl(fileName);

        logoUrl = publicUrl;
      }

      // Update capability details
      const { error: updateError } = await supabase
        .from('capabilities')
        .update({
          description: description,
          display_image: logoUrl
        })
        .eq('id', capability.id);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: "Capability details updated successfully"
      });

    } catch (error) {
      console.error('Error updating capability:', error);
      toast({
        title: "Update failed",
        description: "Failed to update capability details. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
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
          <div className="flex-shrink-0 flex flex-col items-center">
            <label 
              htmlFor="logo-upload" 
              className="cursor-pointer block"
            >
              {logoPreview ? (
                <img 
                  src={logoPreview} 
                  alt="Capability logo" 
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                  {capability.name.charAt(0)}
                </div>
              )}
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
              <div className="mt-2 text-sm text-center text-gray-500">
                Click to update logo
              </div>
            </label>
            
            {/* Save logo button - only show when a new file is selected */}
            {logoFile && !logoUpdateSuccess && (
              <Button 
                onClick={handleSaveLogo} 
                size="sm"
                className="mt-3"
                disabled={isUploadingLogo}
              >
                {isUploadingLogo ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Logo
                  </>
                )}
              </Button>
            )}
            
            {/* Success indicator */}
            {logoUpdateSuccess && (
              <div className="mt-3 flex items-center text-green-600 text-sm">
                <CheckCircle className="mr-1 h-4 w-4" />
                Saved!
              </div>
            )}
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
          <h2 className="text-xl font-semibold mb-6">Update Details</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a detailed description of your capability..."
                className="min-h-[150px]"
              />
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                <Info size={14} />
                <span>This description will be visible to users browsing your capability.</span>
              </div>
            </div>

            <Button 
              onClick={handleUpdateCapability}
              disabled={isUpdating}
              className="w-full md:w-auto"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Capability'
              )}
            </Button>
          </div>
        </div>

        <div className="border-t pt-6 mt-6">
          <h2 className="text-xl font-semibold mb-6">Documentation</h2>
          
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
