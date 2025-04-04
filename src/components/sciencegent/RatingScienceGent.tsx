import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface RatingScienceGentProps {
  scienceGentAddress: string;
  onRatingComplete?: () => void;
}

const RatingScienceGent: React.FC<RatingScienceGentProps> = ({ 
  scienceGentAddress,
  onRatingComplete 
}) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmitRating = async () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating before submitting",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // First, get the current rating and number of ratings
      const { data, error } = await supabase
        .from('sciencegents')
        .select('rating, number_of_ratings')
        .eq('address', scienceGentAddress)
        .single();
        
      if (error) throw error;
      
      // Calculate the new average rating
      const currentRating = data.rating || 0;
      const numberOfRatings = data.number_of_ratings || 0;
      
      // Calculate the new average: (currentRating * numberOfRatings + newRating) / (numberOfRatings + 1)
      const newNumberOfRatings = numberOfRatings + 1;
      const newAverageRating = (currentRating * numberOfRatings + rating) / newNumberOfRatings;
      
      // Update the rating and number_of_ratings in the database
      const { error: updateError } = await supabase
        .from('sciencegents')
        .update({
          rating: newAverageRating,
          number_of_ratings: newNumberOfRatings
        })
        .eq('address', scienceGentAddress);
        
      if (updateError) throw updateError;
      
      // Save the user's rating to localStorage to remember they've rated
      localStorage.setItem(`rated_${scienceGentAddress}`, 'true');
      
      toast({
        title: "Rating Submitted",
        description: "Thank you for rating this ScienceGent!",
      });
      
      // Call the callback if provided
      if (onRatingComplete) {
        onRatingComplete();
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast({
        title: "Error",
        description: "Failed to submit rating. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="border rounded-lg p-4 bg-gray-50 space-y-4">
      <h3 className="text-sm font-medium">Rate this ScienceGent</h3>
      <p className="text-sm text-gray-500">
        How was your experience with this AI assistant?
      </p>
      
      <div className="flex items-center justify-center space-x-1">
        {[1, 2, 3, 4, 5].map((starNumber) => (
          <button
            key={starNumber}
            type="button"
            onClick={() => setRating(starNumber)}
            onMouseEnter={() => setHoveredRating(starNumber)}
            onMouseLeave={() => setHoveredRating(0)}
            className="focus:outline-none"
          >
            <Star
              className={`h-8 w-8 ${
                (hoveredRating ? hoveredRating >= starNumber : rating >= starNumber)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              } transition-colors`}
            />
          </button>
        ))}
      </div>
      
      <Button 
        onClick={handleSubmitRating}
        disabled={rating === 0 || isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Submitting..." : "Submit Rating"}
      </Button>
    </div>
  );
};

export default RatingScienceGent; 