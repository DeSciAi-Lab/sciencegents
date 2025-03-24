import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import { useDeveloperProfile } from '@/hooks/useDeveloperProfile';
import { uploadProfilePicture } from '@/services/developerProfileService';
import { toast } from '@/components/ui/use-toast';
import { useAccount } from 'wagmi';

const DeveloperProfileTab: React.FC = () => {
  const { address } = useAccount();
  const { profile, isLoading, updateProfile, refreshProfile } = useDeveloperProfile();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    twitter: '',
    telegram: '',
    github: '',
    website: '',
  });
  
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [pictureUrl, setPictureUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Load profile data when it's available
  useEffect(() => {
    if (profile) {
      console.log("Loading profile data:", profile);
      setFormData({
        name: profile.developer_name || '',
        email: profile.developer_email || '',
        bio: profile.bio || '',
        twitter: profile.developer_twitter || '',
        telegram: profile.developer_telegram || '',
        github: profile.developer_github || '',
        website: profile.developer_website || '',
      });
      
      if (profile.profile_pic) {
        setPictureUrl(profile.profile_pic);
      }
    }
  }, [profile]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);
      
      // Create a preview URL
      const objectUrl = URL.createObjectURL(file);
      setPictureUrl(objectUrl);
      
      // Cleanup the URL when component unmounts
      return () => URL.revokeObjectURL(objectUrl);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      console.log("Preparing to save profile data:", formData);
      
      // First upload profile picture if changed
      let picUrl = profile?.profile_pic || null;
      
      if (profilePicture) {
        console.log("Uploading profile picture...");
        picUrl = await uploadProfilePicture(profilePicture, address);
        
        if (!picUrl) {
          throw new Error("Failed to upload profile picture");
        }
        
        console.log("Profile picture uploaded successfully:", picUrl);
      }
      
      // Now update the profile with all data
      const updateData = {
        wallet_address: address,
        developer_name: formData.name,
        developer_email: formData.email,
        bio: formData.bio,
        developer_twitter: formData.twitter,
        developer_telegram: formData.telegram,
        developer_github: formData.github,
        developer_website: formData.website,
        profile_pic: picUrl,
        // Keep any existing social links
        additional_social_links: profile?.additional_social_links || []
      };
      
      console.log("Updating profile with data:", updateData);
      
      const updated = await updateProfile(updateData);
      
      if (updated) {
        console.log("Profile updated successfully:", updated);
        toast({
          title: "Success",
          description: "Your developer profile has been updated successfully"
        });
        
        // Refresh profile data to show the latest changes
        await refreshProfile();
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save profile",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Developer Profile</CardTitle>
          <CardDescription>Loading your profile...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-60 flex items-center justify-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Developer Profile</CardTitle>
        <CardDescription>
          Your public profile information that will be displayed on capabilities and ScienceGents you create.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Display Name</label>
                <Input 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name or pseudonym"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email (not publicly visible)</label>
                <Input 
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <Input 
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Brief description about yourself as a developer"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Twitter</label>
                  <Input 
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    placeholder="@username"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Telegram</label>
                  <Input 
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleInputChange}
                    placeholder="@username"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">GitHub</label>
                  <Input 
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    placeholder="username"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Website</label>
                  <Input 
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://yourdomain.com"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Profile Picture</label>
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-32 w-32">
                    {pictureUrl ? (
                      <AvatarImage src={pictureUrl} alt="Profile" />
                    ) : null}
                    <AvatarFallback className="text-2xl">
                      {formData.name ? formData.name[0]?.toUpperCase() : address?.substring(2, 4).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => document.getElementById('profileUpload')?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                  <input
                    id="profileUpload"
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {profilePicture && (
                    <p className="text-xs text-muted-foreground">
                      Selected: {profilePicture.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DeveloperProfileTab;
