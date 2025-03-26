
import React, { useState } from 'react';
import { ScienceGentFormData } from '@/types/sciencegent';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb } from 'lucide-react';

interface PersonaCustomizationProps {
  formData: ScienceGentFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PersonaCustomization: React.FC<PersonaCustomizationProps> = ({ formData, handleInputChange }) => {
  const [charCount, setCharCount] = useState<number>(formData.persona?.length || 0);
  
  const handlePersonaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    handleInputChange(e);
  };
  
  const samplePersonas = [
    {
      title: "Chemistry Expert",
      content: "You are a chemistry expert specializing in spectroscopy and molecular analysis. You excel at explaining complex chemical concepts in simple terms and can help analyze spectral data."
    },
    {
      title: "Genomics Specialist",
      content: "You are a genomics specialist with expertise in DNA sequencing, gene editing, and bioinformatics. You have deep knowledge of CRISPR technology and next-generation sequencing methods."
    },
    {
      title: "Physics Educator",
      content: "You are a physics educator who specializes in making quantum mechanics and relativity accessible to students. You have extensive experience explaining theoretical physics through everyday examples."
    }
  ];

  const effectiveTips = [
    "Be specific about areas of expertise (e.g., \"quantum physics\" instead of just \"physics\")",
    "Define tone and communication style (e.g., \"conversational but technically precise\")",
    "Include both what it should do and what it should avoid",
    "Specify how to handle uncertainty or questions outside its domain",
    "Consider giving it a distinct perspective or approach to science"
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-2">
        Customize your ScienceGent's personality, expertise, and communication style
      </h2>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <Label htmlFor="persona">Custom Persona Instructions</Label>
          <span className="text-sm text-muted-foreground">{charCount}/2000 characters</span>
        </div>
        <Textarea 
          id="persona" 
          name="persona" 
          placeholder="You are an chemistry expert pecialized in spectroscopy. You're helpful, precise, and always explain complex topics in simple terms..." 
          value={formData.persona} 
          onChange={handlePersonaChange} 
          rows={8}
          maxLength={2000}
          className="font-mono text-sm"
        />
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Example Personas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {samplePersonas.map((persona, index) => (
            <div 
              key={index} 
              className="bg-orange-100 hover:bg-orange-200 p-4 rounded cursor-pointer"
              onClick={() => {
                const event = {
                  target: {
                    name: "persona",
                    value: persona.content
                  }
                } as React.ChangeEvent<HTMLTextAreaElement>;
                handleInputChange(event);
                setCharCount(persona.content.length);
              }}
            >
              <h4 className="font-medium mb-2">{persona.title}</h4>
              <p className="text-sm text-gray-700 line-clamp-4">{persona.content}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-6">
        <div className="flex items-center mb-3">
          <Lightbulb className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="font-medium text-blue-700">Effective Persona Tips</h3>
        </div>
        <ul className="list-disc pl-5 space-y-1">
          {effectiveTips.map((tip, index) => (
            <li key={index} className="text-sm text-blue-700">{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PersonaCustomization;
