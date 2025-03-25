
import React from 'react';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const DetailedDescription: React.FC = () => {
  const {
    detailedDescription,
    setDetailedDescription,
    features,
    addFeature,
    removeFeature
  } = useCapabilityWizard();
  
  const [newFeature, setNewFeature] = React.useState('');
  
  const handleAddFeature = () => {
    if (newFeature.trim()) {
      addFeature(newFeature.trim());
      setNewFeature('');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Detailed Description of the Capability</h2>
      
      <div className="bg-blue-50 rounded-md p-4 mb-6 flex items-start">
        <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
        <p className="text-sm text-blue-700">
          This can be filled and updated later also from user dashboard. Use markdown to format.
        </p>
      </div>
      
      <div className="space-y-6">
        <div>
          <Label htmlFor="detailed-description" className="mb-2 block">Detailed Description</Label>
          <Textarea
            id="detailed-description"
            placeholder="Input text"
            value={detailedDescription}
            onChange={(e) => setDetailedDescription(e.target.value)}
            className="min-h-72 resize-y"
          />
        </div>
        
        <div>
          <Label className="mb-2 block">Features (optional)</Label>
          <div className="flex space-x-3 mb-3">
            <Input 
              placeholder="e.g. Real-time 3D rendering"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddFeature();
                }
              }}
            />
            <Button 
              type="button" 
              onClick={handleAddFeature}
              disabled={!newFeature.trim()}
            >
              Add
            </Button>
          </div>
          
          {features.length > 0 ? (
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <span>{feature}</span>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeFeature(index)}
                    className="text-red-500 text-xs"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No features added yet.</p>
          )}
        </div>
        
        <Button type="button">Save</Button>
      </div>
    </div>
  );
};

export default DetailedDescription;
