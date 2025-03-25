import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Loader2, AlertCircle, Save, PencilIcon, Twitter, Github, Globe, MessageCircle } from "lucide-react";
import { useDeveloperProfile } from '@/hooks/useDeveloperProfile';
import { uploadProfilePicture } from '@/services/developerProfileService';
import { toast } from '@/components/ui/use-toast';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useWallet } from '@/hooks/useWallet';
import { Separator } from "@/components/ui/separator";

const DeveloperProfileTab: React.FC = () => {
  const { profile, isLoading, updateProfile, refreshProfile, error, isWalletConnected } = useDeveloperProfile();
  const { connect, address } = useWallet();
  
  // Setup form with react-hook-form
  const form = useForm({
    defaultValues: {
      name: '',
      bio: '',
      twitter: '',
      telegram: '',
      github: '',
      website: '',
    }
  });
  
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [pictureUrl, setPictureUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Load profile data when it's available
  useEffect(() => {
    if (profile) {
      form.reset({
        name: profile.developer_name || '',
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
  }, [profile, form]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setUploadError("Please select an image file (JPG, PNG, etc.)");
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("Image size should be less than 5MB");
        return;
      }
      
      setProfilePicture(file);
      
      // Create a preview URL
      const objectUrl = URL.createObjectURL(file);
      setPictureUrl(objectUrl);
    }
  };

  const handleConnectWallet = async () => {
    try {
      await connect();
      // After connection, refresh the profile if possible
      if (address) {
        setTimeout(() => {
          refreshProfile();
        }, 500);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to your wallet. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const onSubmit = async (formData: any) => {
    if (!isWalletConnected) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true);
    setUploadError(null);
    
    try {
      // First upload profile picture if changed
      let picUrl = profile?.profile_pic || null;
      
      if (profilePicture) {
        setUploadingImage(true);
        try {
          if (address) {
            picUrl = await uploadProfilePicture(profilePicture, address);
            
            if (!picUrl) {
              throw new Error("Failed to upload profile picture");
            }
          }
        } catch (uploadError: any) {
          console.error("Error uploading image:", uploadError);
          setUploadError(uploadError.message || "Failed to upload profile picture");
          toast({
            title: "Image Upload Error",
            description: uploadError.message || "Failed to upload profile picture. Your profile data will still be saved.",
            variant: "destructive",
          });
        } finally {
          setUploadingImage(false);
        }
      }
      
      // Now update the profile with all data
      const updateData = {
        developer_name: formData.name,
        bio: formData.bio,
        developer_twitter: formData.twitter,
        developer_telegram: formData.telegram,
        developer_github: formData.github,
        developer_website: formData.website,
        profile_pic: picUrl,
        // Keep any existing social links
        additional_social_links: profile?.additional_social_links || []
      };
      
      const updated = await updateProfile(updateData);
      
      if (updated) {
        toast({
          title: "Success",
          description: "Your developer profile has been updated successfully"
        });
        
        // Reset profile picture state since it's already uploaded
        setProfilePicture(null);
        
        // Refresh profile data to show the latest changes
        await refreshProfile();
        
        // Exit edit mode
        setIsEditing(false);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error: any) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save profile",
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
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }
  
  if (error || !isWalletConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Developer Profile</CardTitle>
          <CardDescription>
            Connect your wallet to access your developer profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Wallet connection required. Please connect your wallet to view and edit your developer profile.
            </AlertDescription>
          </Alert>
          <div className="p-8 text-center">
            <Button onClick={handleConnectWallet}>
              Connect Wallet
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // View mode when not editing
  if (!isEditing) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Developer Profile</CardTitle>
            <CardDescription>
              Your public profile information that will be displayed on capabilities and ScienceGents you create.
            </CardDescription>
          </div>
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32 mb-4">
                {pictureUrl ? (
                  <AvatarImage src={pictureUrl} alt="Profile" />
                ) : null}
                <AvatarFallback className="text-2xl">
                  {profile?.developer_name ? profile.developer_name[0]?.toUpperCase() : address?.substring(2, 4).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="text-lg font-semibold text-center">{profile?.developer_name || "Unnamed Developer"}</div>
              <div className="text-sm text-gray-500 text-center break-all">{address}</div>
            </div>
            
            <div className="flex-1">
              <div className="space-y-4">
                {profile?.bio && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Bio</h3>
                    <p className="text-sm">{profile.bio}</p>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Social Links</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {profile?.developer_twitter && (
                      <a 
                        href={profile.developer_twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                      >
                        <Twitter size={16} />
                        <span>Twitter</span>
                      </a>
                    )}
                    
                    {profile?.developer_github && (
                      <a 
                        href={profile.developer_github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                      >
                        <Github size={16} />
                        <span>GitHub</span>
                      </a>
                    )}
                    
                    {profile?.developer_website && (
                      <a 
                        href={profile.developer_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                      >
                        <Globe size={16} />
                        <span>Website</span>
                      </a>
                    )}
                    
                    {profile?.developer_telegram && (
                      <a 
                        href={profile.developer_telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                      >
                        <MessageCircle size={16} />
                        <span>Telegram</span>
                      </a>
                    )}
                    
                    {(!profile?.developer_twitter && !profile?.developer_github && 
                      !profile?.developer_website && !profile?.developer_telegram) && (
                      <p className="text-sm text-gray-500 italic">No social links added yet</p>
                    )}
                  </div>
                </div>
                
                {profile?.additional_social_links && profile.additional_social_links.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Additional Links</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {profile.additional_social_links.map((link, index) => (
                        link.url && (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                          >
                            <Globe size={16} />
                            <span>{link.type || "Link"}</span>
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 border-t p-4 flex justify-end">
          <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Profile</Button>
        </CardFooter>
      </Card>
    );
  }
  
  // Edit mode
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Developer Profile</CardTitle>
        <CardDescription>
          Update your profile information that will be displayed on capabilities and ScienceGents you create.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 order-2 md:order-1 space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Your name or pseudonym" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Brief description about yourself as a developer" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Social Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <div className="bg-gray-100 flex items-center justify-center px-3 border border-r-0 rounded-l">
                                <Twitter size={16} className="text-gray-500" />
                              </div>
                              <Input 
                                {...field} 
                                placeholder="https://twitter.com/username" 
                                className="rounded-l-none"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="github"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <div className="bg-gray-100 flex items-center justify-center px-3 border border-r-0 rounded-l">
                                <Github size={16} className="text-gray-500" />
                              </div>
                              <Input 
                                {...field} 
                                placeholder="https://github.com/username" 
                                className="rounded-l-none"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <div className="bg-gray-100 flex items-center justify-center px-3 border border-r-0 rounded-l">
                                <Globe size={16} className="text-gray-500" />
                              </div>
                              <Input 
                                {...field} 
                                placeholder="https://yourdomain.com" 
                                className="rounded-l-none"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="telegram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telegram</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <div className="bg-gray-100 flex items-center justify-center px-3 border border-r-0 rounded-l">
                                <MessageCircle size={16} className="text-gray-500" />
                              </div>
                              <Input 
                                {...field} 
                                placeholder="https://t.me/username" 
                                className="rounded-l-none"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center md:w-64 order-1 md:order-2">
                <FormLabel className="self-start mb-2">Profile Picture</FormLabel>
                <div className="flex flex-col items-center gap-4 w-full">
                  <Avatar className="h-32 w-32">
                    {pictureUrl ? (
                      <AvatarImage src={pictureUrl} alt="Profile" />
                    ) : null}
                    <AvatarFallback className="text-2xl">
                      {form.getValues("name") ? form.getValues("name")[0]?.toUpperCase() : address?.substring(2, 4).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  {uploadError && (
                    <Alert variant="destructive" className="mt-2 p-2 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{uploadError}</AlertDescription>
                    </Alert>
                  )}
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => document.getElementById('profileUpload')?.click()}
                    disabled={uploadingImage}
                    className="w-full"
                  >
                    {uploadingImage ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </>
                    )}
                  </Button>
                  <input
                    id="profileUpload"
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploadingImage}
                  />
                  {profilePicture && (
                    <p className="text-xs text-muted-foreground w-full overflow-hidden text-ellipsis">
                      Selected: {profilePicture.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsEditing(false)}
                disabled={isSaving || uploadingImage}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving || uploadingImage}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DeveloperProfileTab;
