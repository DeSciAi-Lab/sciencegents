import React from 'react';
import { Image, Link } from 'lucide-react';
import { ScienceGentFormData } from '@/types/sciencegent';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
interface BasicInfoProps {
  formData: ScienceGentFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange?: (name: string, value: string) => void;
}
const domains = ["General Science", "Chemistry", "Physics", "Biology", "Biochemistry", "Materials Science", "Protein Analysis", "Drug Discovery", "Genomics"];
const BasicInfo: React.FC<BasicInfoProps> = ({
  formData,
  handleInputChange,
  handleFileChange,
  handleSelectChange
}) => {
  return <div className="space-y-6">
      <div>
        
        <p className="text-sm text-gray-500 mb-6">
          Enter the basic details of your ScienceGent. This information will be used to create your token.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">ScienceGent Name</Label>
          <Input id="name" name="name" placeholder="e.g. Spectrum AI" value={formData.name} onChange={handleInputChange} className="mt-2" />
        </div>
        
        <div>
          <Label htmlFor="symbol">Ticker</Label>
          <Input id="symbol" name="symbol" placeholder="e.g. SPEC" maxLength={6} value={formData.symbol} onChange={handleInputChange} className="mt-2" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="totalSupply">Total Supply</Label>
          <Input id="totalSupply" name="totalSupply" type="number" placeholder="e.g. 1000000000" value={formData.totalSupply} onChange={handleInputChange} className="mt-2" />
        </div>
        
        <div>
          <Label htmlFor="domain">Domain</Label>
          <Select value={formData.domain || "General Science"} onValueChange={value => handleSelectChange?.("domain", value)}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select Domain" />
            </SelectTrigger>
            <SelectContent>
              {domains.map(domain => <SelectItem key={domain} value={domain}>
                  {domain}
                </SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="profileImage">Logo</Label>
          <div className="flex items-center gap-4 mt-2">
            {formData.profileImage ? <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <img src={URL.createObjectURL(formData.profileImage)} alt="Profile" className="w-full h-full object-cover" />
              </div> : <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <Image className="w-6 h-6 text-gray-400" />
              </div>}
            <Input id="profileImage" type="file" accept="image/*" onChange={handleFileChange} />
          </div>
        </div>
        
        <div>
          <Label htmlFor="agentFee">Agent Fee per Interaction (DSI)</Label>
          <Input id="agentFee" name="agentFee" type="number" min="0" step="0.1" placeholder="e.g. 2" value={formData.agentFee} onChange={handleInputChange} className="mt-2" />
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" placeholder="Short Description of your ScienceGent (40 words max)" value={formData.description} onChange={handleInputChange} rows={3} className="mt-2" />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Socials (Optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="website">Website</Label>
            <Input id="website" name="website" placeholder="https://..." value={formData.website} onChange={handleInputChange} className="mt-2" />
          </div>
          
          <div>
            <Label htmlFor="twitter">Twitter</Label>
            <Input id="twitter" name="twitter" placeholder="https://..." value={formData.twitter} onChange={handleInputChange} className="mt-2" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <Label htmlFor="telegram">Telegram</Label>
            <Input id="telegram" name="telegram" placeholder="https://..." value={formData.telegram || ''} onChange={handleInputChange} className="mt-2" />
          </div>
          
          <div>
            <Label htmlFor="github">Github</Label>
            <Input id="github" name="github" placeholder="https://..." value={formData.github} onChange={handleInputChange} className="mt-2" />
          </div>
        </div>
      </div>
    </div>;
};
export default BasicInfo;