
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2, Plus, Trash2, Upload, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { fetchDeveloperProfile, upsertDeveloperProfile, uploadProfilePicture } from '@/services/developerProfileService';
import { DeveloperProfile, SocialLink } from '@/types/profile';

const DeveloperProfileTab: React.FC = () => {
  const { address } = useAccount();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<DeveloperProfile>({
    wallet_address: address || '',
    developer_name: '',
    developer_email: '',
    bio: '',
    developer_twitter: '',
    developer_telegram: '',
    developer_github: '',
    developer_website: '',
    additional_social_links: []
  });

  // Fetch developer profile on mount
  useEffect(() => {
    const loadProfile = async () => {
      if (!address) return;
      
      setIsLoading(true);
      try {
        const profile = await fetchDeveloperProfile(address);
        if (profile) {
          setFormData(profile);
          if (profile.profile_pic) {
            setProfileImagePreview(profile.profile_pic);
          }
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        toast({
          title: "Error",
          description: "Failed to load profile. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProfile();
  }, [address, toast]);

  // Update wallet address when it changes
  useEffect(() => {
    if (address) {
      setFormData(prev => ({ ...prev, wallet_address: address }));
    }
  }, [address]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle profile image change
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image size should be less than 5MB",
          variant: "destructive"
        });
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Please upload an image file",
          variant: "destructive"
        });
        return;
      }
      
      setProfileImage(file);
      const url = URL.createObjectURL(file);
      setProfileImagePreview(url);
    }
  };

  // Remove profile image
  const removeProfileImage = () => {
    setProfileImage(null);
    if (!formData.profile_pic) {
      setProfileImagePreview(null);
    } else {
      setProfileImagePreview(formData.profile_pic);
    }
  };

  // Add social link
  const addSocialLink = () => {
    setFormData(prev => ({
      ...prev,
      additional_social_links: [...(prev.additional_social_links || []), { type: '', url: '' }]
    }));
  };

  // Remove social link
  const removeSocialLink = (index: number) => {
    setFormData(prev => {
      const newLinks = [...(prev.additional_social_links || [])];
      newLinks.splice(index, 1);
      return { ...prev, additional_social_links: newLinks };
    });
  };

  // Update social link
  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    setFormData(prev => {
      const newLinks = [...(prev.additional_social_links || [])];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return { ...prev, additional_social_links: newLinks };
    });
  };

  // Save profile
  const saveProfile = async () => {
    if (!address) {
      toast({
        title: "Error",
        description: "Wallet not connected. Please connect your wallet.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSaving(true);
    try {
      let profilePicUrl = formData.profile_pic;
      
      // Upload profile image if changed
      if (profileImage) {
        const uploadedUrl = await uploadProfilePicture(profileImage, address);
        if (uploadedUrl) {
          profilePicUrl = uploadedUrl;
        }
      }
      
      // Save profile data
      const updatedProfile = await upsertDeveloperProfile({
        ...formData,
        profile_pic: profilePicUrl
      });
      
      if (updatedProfile) {
        setFormData(updatedProfile);
        if (profileImage) {
          setProfileImage(null);
        }
        
        toast({
          title: "Success",
          description: "Developer profile updated successfully."
        });
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="w-full bg-white shadow-sm border-0">
      <CardHeader>
        <CardTitle>Developer Profile</CardTitle>
        <CardDescription>
          Manage your developer information that will be shown on ScienceGents and Capabilities you create
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Picture */}
        <div className="space-y-2">
          <Label htmlFor="profile-picture">Profile Picture</Label>
          <div className="flex items-start">
            {profileImagePreview ? (
              <div className="relative w-32 h-32 border rounded-full overflow-hidden">
                <img 
                  src={profileImagePreview} 
                  alt="Profile preview" 
                  className="w-full h-full object-cover"
                />
                <Button
                  onClick={removeProfileImage}
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 w-6 h-6 rounded-full"
                >
                  <X size={14} />
                </Button>
              </div>
            ) : (
              <div className="w-32 h-32 border-2 border-dashed border-gray-200 rounded-full flex flex-col items-center justify-center cursor-pointer hover:border-gray-300 transition-colors"
                   onClick={() => document.getElementById('profile-image-upload')?.click()}>
                <Upload size={24} className="text-gray-400 mb-2" />
                <p className="text-xs text-gray-500">Upload</p>
              </div>
            )}
            <input 
              type="file"
              id="profile-image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleProfileImageChange}
            />
          </div>
          <p className="text-xs text-gray-500">This image will be shown on ScienceGents and Capabilities you create.</p>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="developer_name">Name</Label>
            <Input
              id="developer_name"
              name="developer_name"
              value={formData.developer_name || ''}
              onChange={handleInputChange}
              placeholder="Your name or team name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="developer_email">Email</Label>
            <Input
              id="developer_email"
              name="developer_email"
              type="email"
              value={formData.developer_email || ''}
              onChange={handleInputChange}
              placeholder="Your contact email"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio || ''}
            onChange={handleInputChange}
            placeholder="Tell users about your background, expertise, and experience"
            rows={4}
          />
        </div>

        {/* Social Links */}
        <div className="space-y-3">
          <Label>Social Links</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="developer_twitter">Twitter</Label>
              <Input
                id="developer_twitter"
                name="developer_twitter"
                value={formData.developer_twitter || ''}
                onChange={handleInputChange}
                placeholder="https://twitter.com/yourusername"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="developer_github">GitHub</Label>
              <Input
                id="developer_github"
                name="developer_github"
                value={formData.developer_github || ''}
                onChange={handleInputChange}
                placeholder="https://github.com/yourusername"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="developer_telegram">Telegram</Label>
              <Input
                id="developer_telegram"
                name="developer_telegram"
                value={formData.developer_telegram || ''}
                onChange={handleInputChange}
                placeholder="https://t.me/yourusername"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="developer_website">Website</Label>
              <Input
                id="developer_website"
                name="developer_website"
                value={formData.developer_website || ''}
                onChange={handleInputChange}
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
        </div>

        {/* Additional Social Links */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Additional Social Links</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addSocialLink}
              className="text-xs"
            >
              <Plus size={16} className="mr-1" />
              Add Link
            </Button>
          </div>
          
          {formData.additional_social_links && formData.additional_social_links.length > 0 ? (
            <div className="space-y-3">
              {formData.additional_social_links.map((link, index) => (
                <div key={index} className="flex items-end gap-2">
                  <div className="flex-1 space-y-2">
                    <Label>Platform</Label>
                    <Input
                      placeholder="Platform name (e.g. Discord, Medium)"
                      value={link.type}
                      onChange={(e) => updateSocialLink(index, 'type', e.target.value)}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label>URL</Label>
                    <Input
                      placeholder="https://..."
                      value={link.url}
                      onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                    />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeSocialLink(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No additional social links added.</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={saveProfile} 
          disabled={isSaving}
          className="ml-auto"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : 'Save Profile'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DeveloperProfileTab;
