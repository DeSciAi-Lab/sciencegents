import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';
import ReactMarkdown from 'react-markdown';
import { Skeleton } from '@/components/ui/skeleton';

interface GeneralInfoProps {
  scienceGent: any;
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({ scienceGent }) => {
  const [detailedDescription, setDetailedDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Check for various possible field names in the scienceGent object
    if (scienceGent?.detailed_description) {
      setDetailedDescription(scienceGent.detailed_description);
      return;
    } else if (scienceGent?.detailedDescription) {
      setDetailedDescription(scienceGent.detailedDescription);
      return;
    } else if (scienceGent?.description && scienceGent.description.length > 50) {
      // Only use description if it's substantial
      setDetailedDescription(scienceGent.description);
      return;
    }
    
    // Otherwise, fetch it from Supabase
    const fetchDetailedDescription = async () => {
      if (!scienceGent?.address) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Query for both possible field names
        const response = await supabase
          .from('sciencegents')
          .select('description, detailed_description')
          .eq('address', scienceGent.address.toLowerCase())
          .single();
        
        if (response.error) {
          throw response.error;
        }
        
        // Use a type assertion to handle the response data
        const data = response.data as {
          description?: string;
          detailed_description?: string;
        } | null;
        
        // Check for both field names in the response
        const descriptionText = data?.detailed_description || data?.description;
        
        if (descriptionText) {
          setDetailedDescription(descriptionText);
        } else {
          // Set a default message if no description is found
          setDetailedDescription(
            "This ScienceGent provides advanced capabilities for scientific research and analysis. The detailed description will appear here."
          );
        }
      } catch (err: any) {
        console.error('Error fetching detailed description:', err);
        setError(err.message || 'Failed to load detailed description');
        // Set a fallback message when there's an error
        setDetailedDescription(
          "This ScienceGent provides advanced capabilities for scientific research and analysis. The detailed description will appear here."
        );
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDetailedDescription();
  }, [scienceGent]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Description</CardTitle>
        <CardDescription>Comprehensive information about this ScienceGent</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-5/6" />
          </div>
        ) : (
          <div className="prose prose-sm md:prose-base max-w-none">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : detailedDescription ? (
              <ReactMarkdown className="break-words">
                {detailedDescription}
              </ReactMarkdown>
            ) : (
              <p>No detailed description available.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GeneralInfo;
