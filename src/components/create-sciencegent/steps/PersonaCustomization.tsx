
import React from 'react';
import { Brain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScienceGentFormData } from '@/types/sciencegent';

interface PersonaCustomizationProps {
  formData: ScienceGentFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PersonaCustomization: React.FC<PersonaCustomizationProps> = ({ formData, handleInputChange }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Persona Customization</CardTitle>
        <CardDescription>
          Customize your ScienceGent's personality and behavior
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-3">
            <Label htmlFor="persona">Custom Persona Instructions</Label>
            <Textarea 
              id="persona" 
              name="persona" 
              placeholder="You are a chemistry expert specialized in spectroscopy. You're helpful, precise, and always explain complex topics in simple terms..." 
              value={formData.persona} 
              onChange={handleInputChange} 
              rows={10}
            />
            <p className="text-xs text-muted-foreground">
              Write custom instructions for your AI agent. These will be used to shape its behavior and responses.
            </p>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">Example Format</h4>
            <p className="text-sm text-muted-foreground">
              You are [role], an expert in [domain]. You have expertise in [specific skills]. 
              When asked about [topic], you [response style]. You always [behavior pattern].
              You never [things to avoid].
            </p>
          </div>
          
          <div className="p-4 border border-science-200 rounded-lg bg-science-50">
            <h4 className="flex items-center font-medium text-science-700 mb-2">
              <Brain className="w-4 h-4 mr-2" />
              <span>Pro Tips</span>
            </h4>
            <ul className="space-y-2 text-sm text-science-600">
              <li>Be specific about your ScienceGent's domain expertise</li>
              <li>Define how it should interact with scientific questions</li>
              <li>Specify both what it should do and what it should avoid</li>
              <li>Set clear boundaries for knowledge and capabilities</li>
              <li>This persona will be used by the AI Chat system when users interact with your ScienceGent</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonaCustomization;
