
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  ChevronRight, 
  Beaker, 
  Brain, A
  rrowRight, 
  Sparkle,
  FileText,
  Image,
  Package,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/animations/Reveal';

const CreateScienceGent = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    totalSupply: '',
    description: '',
    profileImage: null,
    website: '',
    twitter: '',
    github: '',
    persona: '',
    selectedCapabilities: [],
    initialLiquidity: ''
  });

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, profileImage: e.target.files[0] }));
    }
  };

  const handleCapabilityToggle = (capabilityId) => {
    setFormData(prev => {
      if (prev.selectedCapabilities.includes(capabilityId)) {
        return {
          ...prev,
          selectedCapabilities: prev.selectedCapabilities.filter(id => id !== capabilityId)
        };
      } else {
        return {
          ...prev,
          selectedCapabilities: [...prev.selectedCapabilities, capabilityId]
        };
      }
    });
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 6));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1: // Basic Information
        return formData.name && formData.symbol && formData.totalSupply;
      case 2: // Persona Customization
        return formData.persona.length >= 10;
      case 3: // Capability Selection
        return formData.selectedCapabilities.length > 0;
      case 4: // Liquidity Settings
        return formData.initialLiquidity && !isNaN(parseFloat(formData.initialLiquidity));
      case 5: // Review & Launch
        return true;
      default:
        return false;
    }
  };

  const handleLaunch = () => {
    // Mock submission success - in a real app, this would call the blockchain
    setCurrentStep(6);
    
    // Redirect to the details page after a short delay
    setTimeout(() => {
      // In a real app, this would be the actual address of the created ScienceGent
      navigate('/sciencegent/0x123456789abcdef');
    }, 5000);
  };

  // Mock capabilities data
  const mockCapabilities = [
    { id: 'mol-viz', name: 'Molecule Visualization', domain: 'Chemistry', fee: 0.05 },
    { id: 'spec-analysis', name: 'Spectroscopy Analysis', domain: 'Chemistry', fee: 0.08 },
    { id: 'react-sim', name: 'Reaction Simulation', domain: 'Chemistry', fee: 0.07 },
    { id: 'dna-seq', name: 'DNA Sequencing', domain: 'Genomics', fee: 0.09 },
    { id: 'prot-fold', name: 'Protein Folding', domain: 'Protein Analysis', fee: 0.1 },
    { id: 'drug-dock', name: 'Drug Docking', domain: 'Drug Discovery', fee: 0.15 }
  ];

  // Calculate total capability fees
  const calculateTotalCapabilityFees = () => {
    return formData.selectedCapabilities.reduce((total, id) => {
      const capability = mockCapabilities.find(cap => cap.id === id);
      return total + (capability ? capability.fee : 0);
    }, 0);
  };

  // Calculate launch fee (1000 DSI tokens)
  const launchFee = 1000;

  // Render the steps
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Enter the basic details for your ScienceGent and its associated token
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="e.g., SpectrumAI" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                  />
                  <p className="text-xs text-muted-foreground">
                    This will be used for both your AI agent and token
                  </p>
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="symbol">Token Symbol</Label>
                  <Input 
                    id="symbol" 
                    name="symbol" 
                    placeholder="e.g., SPEC" 
                    maxLength={6}
                    value={formData.symbol} 
                    onChange={handleInputChange} 
                  />
                  <p className="text-xs text-muted-foreground">
                    A short symbol for your token (max 6 characters)
                  </p>
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="totalSupply">Total Supply</Label>
                  <Input 
                    id="totalSupply" 
                    name="totalSupply" 
                    type="number" 
                    placeholder="e.g., 1000000" 
                    value={formData.totalSupply} 
                    onChange={handleInputChange} 
                  />
                  <p className="text-xs text-muted-foreground">
                    The total number of tokens that will be created
                  </p>
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    placeholder="Describe what your ScienceGent does and its purpose..." 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    rows={4}
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="profileImage">Profile Picture</Label>
                  <div className="flex items-center gap-4">
                    {formData.profileImage ? (
                      <div className="relative w-20 h-20 rounded-full overflow-hidden">
                        <img 
                          src={URL.createObjectURL(formData.profileImage)} 
                          alt="Profile" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
                        <Image className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                    <Input 
                      id="profileImage" 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                      className="max-w-xs"
                    />
                  </div>
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input 
                    id="website" 
                    name="website" 
                    placeholder="https://..." 
                    value={formData.website} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="twitter">Twitter (Optional)</Label>
                    <Input 
                      id="twitter" 
                      name="twitter" 
                      placeholder="https://twitter.com/..." 
                      value={formData.twitter} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="github">GitHub (Optional)</Label>
                    <Input 
                      id="github" 
                      name="github" 
                      placeholder="https://github.com/..." 
                      value={formData.github} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 2:
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
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Capability Selection</CardTitle>
              <CardDescription>
                Select the capabilities that your ScienceGent will have
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4">
                  {mockCapabilities.map((capability) => (
                    <div 
                      key={capability.id} 
                      className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                        formData.selectedCapabilities.includes(capability.id)
                          ? 'border-science-400 bg-science-50'
                          : 'border-border hover:border-science-200'
                      }`}
                      onClick={() => handleCapabilityToggle(capability.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                          <div className="mt-1 w-10 h-10 rounded-full bg-science-100 flex items-center justify-center text-science-700">
                            <Beaker size={18} />
                          </div>
                          <div>
                            <h3 className="font-medium">{capability.name}</h3>
                            <p className="text-xs text-muted-foreground mb-2">{capability.domain}</p>
                            <div className="flex items-center text-xs font-medium text-science-700 bg-science-100 w-fit px-2 py-0.5 rounded-full">
                              <DollarSign size={10} className="mr-0.5" />
                              <span>{capability.fee} ETH</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          formData.selectedCapabilities.includes(capability.id)
                            ? 'bg-science-500 border-science-500 text-white'
                            : 'border-muted-foreground'
                        }`}>
                          {formData.selectedCapabilities.includes(capability.id) && (
                            <Check className="w-3 h-3" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Selected Capabilities</span>
                    <span>{formData.selectedCapabilities.length}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>Total Capability Fee</span>
                    <span>{calculateTotalCapabilityFees().toFixed(2)} ETH</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Liquidity Settings</CardTitle>
              <CardDescription>
                Set the initial liquidity for your ScienceGent token
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-3">
                  <Label htmlFor="initialLiquidity">Initial Liquidity (virtualETH)</Label>
                  <Input 
                    id="initialLiquidity" 
                    name="initialLiquidity" 
                    type="number" 
                    step="0.01"
                    min="0.01"
                    placeholder="e.g., 0.5" 
                    value={formData.initialLiquidity} 
                    onChange={handleInputChange} 
                  />
                  <p className="text-xs text-muted-foreground">
                    The amount of virtualETH to set the initial price. This does not require real ETH upfront.
                  </p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg space-y-3">
                  <h4 className="font-medium">What is virtualETH?</h4>
                  <p className="text-sm text-muted-foreground">
                    virtualETH is a synthetic representation of ETH used to initialize your token's price. 
                    You don't need to deposit real ETH until your token is ready to migrate to a public DEX. 
                    This amount will determine your initial token price.
                  </p>
                </div>
                
                <div className="p-4 border border-science-200 rounded-lg bg-science-50">
                  <h4 className="flex items-center font-medium text-science-700 mb-2">
                    <Sparkle className="w-4 h-4 mr-2" />
                    <span>Initial Pricing</span>
                  </h4>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-science-600">Initial Token Price</span>
                      <span className="font-medium text-science-700">
                        {formData.initialLiquidity && formData.totalSupply 
                          ? `${(parseFloat(formData.initialLiquidity) / (parseInt(formData.totalSupply) * 0.99)).toFixed(8)} ETH`
                          : '0.00000000 ETH'
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-science-600">Token Distribution</span>
                      <span className="font-medium text-science-700">
                        {formData.totalSupply 
                          ? `${parseInt(formData.totalSupply) * 0.99} tokens (99%)`
                          : '0 tokens (99%)'
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-science-600">Admin Distribution</span>
                      <span className="font-medium text-science-700">
                        {formData.totalSupply 
                          ? `${parseInt(formData.totalSupply) * 0.01} tokens (1%)`
                          : '0 tokens (1%)'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Review & Launch</CardTitle>
              <CardDescription>
                Review your ScienceGent details and launch it to the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <FileText className="w-5 h-5 text-science-600" />
                    <span>Summary</span>
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Token Name</div>
                        <div className="font-medium">{formData.name || 'Not set'}</div>
                      </div>
                      
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Token Symbol</div>
                        <div className="font-medium">{formData.symbol || 'Not set'}</div>
                      </div>
                      
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Total Supply</div>
                        <div className="font-medium">{formData.totalSupply || 'Not set'}</div>
                      </div>
                      
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Initial Liquidity</div>
                        <div className="font-medium">{formData.initialLiquidity || 'Not set'} virtualETH</div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Selected Capabilities</div>
                      <div className="font-medium">
                        {formData.selectedCapabilities.length > 0 
                          ? formData.selectedCapabilities.map(id => {
                              const cap = mockCapabilities.find(c => c.id === id);
                              return cap?.name;
                            }).join(', ')
                          : 'None'
                        }
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium flex items-center gap-2 mt-4">
                    <DollarSign className="w-5 h-5 text-science-600" />
                    <span>Fees & Costs</span>
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 bg-muted rounded-lg">
                      <span className="text-muted-foreground">Launch Fee</span>
                      <span className="font-medium">{launchFee} DSI</span>
                    </div>
                    
                    <div className="flex justify-between p-3 bg-muted rounded-lg">
                      <span className="text-muted-foreground">virtualETH Amount</span>
                      <span className="font-medium">{formData.initialLiquidity || '0'} ETH</span>
                    </div>
                    
                    <div className="flex justify-between p-3 bg-muted rounded-lg">
                      <span className="text-muted-foreground">Capability Fees</span>
                      <span className="font-medium">{calculateTotalCapabilityFees().toFixed(2)} ETH</span>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="flex justify-between p-3 bg-science-50 text-science-800 rounded-lg">
                      <span className="font-medium">Total Cost Now</span>
                      <span className="font-bold">{launchFee} DSI</span>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mt-1">
                      The virtualETH and capability fees will be paid from collected trading fees when your token is migrated to an external DEX.
                    </p>
                  </div>
                  
                  <div className="mt-6 p-4 border border-amber-200 bg-amber-50 rounded-lg">
                    <h4 className="font-medium text-amber-800 mb-2">Important Information</h4>
                    <ul className="space-y-2 text-sm text-amber-700">
                      <li>Once created, your token's parameters cannot be changed</li>
                      <li>1% of the total supply will be locked for 30 days and sent to the admin wallet</li>
                      <li>99% of the total supply will be added to the liquidity pool</li>
                      <li>You will need to enable trading manually after launch</li>
                      <li>Your token will need to collect sufficient trading fees to migrate to an external DEX</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <Card className="w-full">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-6">
                  <Check className="w-8 h-8" />
                </div>
                
                <h2 className="text-2xl font-bold mb-2">ScienceGent Created!</h2>
                <p className="text-muted-foreground mb-8 max-w-md">
                  Congratulations! Your ScienceGent has been successfully created. You will be redirected to your ScienceGent details page momentarily.
                </p>
                
                <div className="flex justify-center">
                  <Button 
                    onClick={() => navigate('/sciencegent/0x123456789abcdef')}
                    className="bg-science-600 hover:bg-science-700 text-white gap-2"
                  >
                    <span>View My ScienceGent</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  const stepInfo = [
    { title: 'Basic Information', description: 'Set name, symbol, and description' },
    { title: 'Persona Customization', description: 'Define AI behavior and personality' },
    { title: 'Capability Selection', description: 'Choose specialized capabilities' },
    { title: 'Liquidity Settings', description: 'Set initial token economics' },
    { title: 'Review & Launch', description: 'Verify details and launch' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-3">Create ScienceGent</h1>
              <p className="text-muted-foreground">
                Create your own AI agent with specialized scientific capabilities and an associated token
              </p>
            </div>
          </Reveal>
          
          {currentStep < 6 && (
            <Reveal delay={100}>
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Step {currentStep} of 5</span>
                    <span>•</span>
                    <span>{stepInfo[currentStep-1].title}</span>
                  </div>
                  <div className="flex md:hidden items-center gap-1 text-sm text-muted-foreground">
                    <span>{currentStep}/5</span>
                  </div>
                  <div className="text-sm text-muted-foreground hidden md:block">
                    {stepInfo[currentStep-1].description}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-secondary rounded-full" />
                  <div className="relative z-10 flex justify-between">
                    {stepInfo.map((step, index) => (
                      <div
                        key={index}
                        className={`flex flex-col items-center ${
                          index + 1 === currentStep
                            ? 'text-science-600'
                            : index + 1 < currentStep
                            ? 'text-muted-foreground'
                            : 'text-muted-foreground/50'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                            index + 1 === currentStep
                              ? 'bg-science-600 text-white'
                              : index + 1 < currentStep
                              ? 'bg-muted-foreground text-white'
                              : 'bg-secondary text-muted-foreground'
                          }`}
                        >
                          {index + 1 < currentStep ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>
                        <span className="text-xs font-medium hidden md:block">{step.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          )}
          
          <Reveal delay={200}>
            <div className="max-w-3xl mx-auto">
              {renderStep()}
              
              {currentStep < 6 && (
                <div className="flex justify-between mt-8">
                  {currentStep > 1 ? (
                    <Button variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  
                  {currentStep < 5 ? (
                    <Button 
                      className="bg-science-600 hover:bg-science-700 text-white"
                      onClick={nextStep}
                      disabled={!validateCurrentStep()}
                    >
                      <span>Continue</span>
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    currentStep === 5 && (
                      <Button 
                        className="bg-science-600 hover:bg-science-700 text-white"
                        onClick={handleLaunch}
                      >
                        <span>Launch ScienceGent</span>
                        <Sparkle className="ml-2 h-4 w-4" />
                      </Button>
                    )
                  )}
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateScienceGent;
