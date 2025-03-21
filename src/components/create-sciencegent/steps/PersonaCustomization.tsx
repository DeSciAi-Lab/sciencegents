
import React from 'react';
import { Brain, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScienceGentFormData } from '@/types/sciencegent';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

interface PersonaCustomizationProps {
  formData: ScienceGentFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PersonaCustomization: React.FC<PersonaCustomizationProps> = ({ formData, handleInputChange }) => {
  const samplePersonas = [
    {
      title: "Chemistry Expert",
      sample: "You are a chemistry expert specializing in spectroscopy and molecular analysis. You excel at explaining complex chemical concepts in simple terms and can help analyze spectral data. When asked about chemical reactions, you provide balanced equations and mechanisms. You always cite recent scientific literature when appropriate and prefer to use analogies to explain difficult concepts. You never make claims without scientific basis and avoid speculation in areas outside chemistry."
    },
    {
      title: "Genomics Specialist",
      sample: "You are a genomics specialist with expertise in DNA sequencing, gene editing, and bioinformatics. You have deep knowledge of CRISPR technology, next-generation sequencing methods, and genetic analysis tools. When discussing genetic mutations, you explain their potential impacts on protein structure and function. You always maintain a balanced view on ethical considerations in genetics and provide context about limitations of current technologies. You never make definitive health predictions based on limited genetic information."
    },
    {
      title: "Physics Educator",
      sample: "You are a physics educator who specializes in making quantum mechanics and relativity accessible to students. You have extensive experience explaining theoretical physics through everyday examples and visual metaphors. When responding to questions, you first establish what the questioner already knows, then build on that foundation. You always acknowledge when multiple interpretations exist in theoretical physics and avoid presenting speculation as fact. You never use complex mathematics without first explaining the intuition behind the equations."
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Persona Customization</CardTitle>
          <Popover>
            <PopoverTrigger>
              <HelpCircle className="h-5 w-5 text-muted-foreground" />
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">What is a Persona?</h4>
                <p className="text-sm text-muted-foreground">
                  The persona defines how your AI assistant will behave, what knowledge it claims to have, and how it communicates with users. A well-crafted persona creates a more engaging and useful AI experience.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <CardDescription>
          Customize your ScienceGent's personality, expertise, and communication style
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="persona">Custom Persona Instructions</Label>
              <div className="text-xs text-muted-foreground">
                {formData.persona.length}/2000 characters
              </div>
            </div>
            <Textarea 
              id="persona" 
              name="persona" 
              placeholder="You are a chemistry expert specialized in spectroscopy. You're helpful, precise, and always explain complex topics in simple terms..." 
              value={formData.persona} 
              onChange={handleInputChange} 
              rows={10}
              maxLength={2000}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Write custom instructions for your AI agent. These will shape its knowledge, behavior, and how it responds to users.
            </p>
          </div>
          
          <div className="grid gap-5 pt-3">
            <h4 className="text-sm font-medium">Example Personas</h4>
            
            <div className="grid gap-4 md:grid-cols-3">
              {samplePersonas.map((persona, index) => (
                <div 
                  key={index} 
                  className="bg-muted p-4 rounded-lg border hover:border-science-300 cursor-pointer"
                  onClick={() => {
                    const event = {
                      target: {
                        name: "persona",
                        value: persona.sample
                      }
                    } as React.ChangeEvent<HTMLTextAreaElement>;
                    handleInputChange(event);
                  }}
                >
                  <h5 className="font-medium text-sm mb-2">{persona.title}</h5>
                  <p className="text-xs text-muted-foreground line-clamp-4">
                    {persona.sample}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 border border-science-200 rounded-lg bg-science-50">
            <h4 className="flex items-center font-medium text-science-700 mb-2">
              <Brain className="w-4 h-4 mr-2" />
              <span>Effective Persona Tips</span>
            </h4>
            <ul className="space-y-2 text-sm text-science-600">
              <li>Be specific about areas of expertise (e.g., "quantum physics" instead of just "physics")</li>
              <li>Define tone and communication style (e.g., "conversational but technically precise")</li>
              <li>Include both what it should do and what it should avoid</li>
              <li>Specify how to handle uncertainty or questions outside its domain</li>
              <li>Consider giving it a distinct perspective or approach to science</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonaCustomization;
