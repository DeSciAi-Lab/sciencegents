import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Loader2, AlertCircle } from "lucide-react";
import { useDeveloperProfile } from '@/hooks/useDeveloperProfile';
import { uploadProfilePicture } from '@/services/developerProfileService';
import { toast } from '@/components/ui/use-toast';
import { useAccount } from 'wagmi';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription } from '@/components/ui/alert';

const DeveloperProfileTab: React.FC = () => {
  try {
    // Try using the hook - this will throw if used outside of WagmiProvider
    const { profile, isLoading, updateProfile, refreshProfile } = useDeveloperProfile();
    const { address } = useAccount();
    
    // Setup form with react-hook-form
    const form = useForm({
      defaultValues: {
        name: '',
        email: '',
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
    
    // Load profile data when it's available
    useEffect(() => {
      if (profile) {
        console.log("Loading profile data into form:", profile);
        form.reset({
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
    }, [profile, form]);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setProfilePicture(file);
        
        // Create a preview URL
        const objectUrl = URL.createObjectURL(file);
        setPictureUrl(objectUrl);
      }
    };
    
    const onSubmit = async (formData: any) => {
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
          setUploadingImage(true);
          console.log("Uploading profile picture...");
          try {
            picUrl = await uploadProfilePicture(profilePicture, address);
            
            if (!picUrl) {
              throw new Error("Failed to upload profile picture");
            }
            
            console.log("Profile picture uploaded successfully:", picUrl);
          } catch (uploadError) {
            console.error("Error uploading image:", uploadError);
            toast({
              title: "Error",
              description: "Failed to upload profile picture. Your profile data will still be saved.",
              variant: "destructive",
            });
          } finally {
            setUploadingImage(false);
          }
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
          
          // Reset profile picture state since it's already uploaded
          setProfilePicture(null);
          
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
          <CardContent className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-6">
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email (not publicly visible)</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="your@email.com" />
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
                          <Input {...field} placeholder="Brief description about yourself as a developer" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://twitter.com/username" />
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
                            <Input {...field} placeholder="https://t.me/username" />
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
                            <Input {...field} placeholder="https://github.com/username" />
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
                            <Input {...field} placeholder="https://yourdomain.com" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="space-y-2">
                    <FormLabel>Profile Picture</FormLabel>
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="h-32 w-32">
                        {pictureUrl ? (
                          <AvatarImage src={pictureUrl} alt="Profile" />
                        ) : null}
                        <AvatarFallback className="text-2xl">
                          {form.getValues("name") ? form.getValues("name")[0]?.toUpperCase() : address?.substring(2, 4).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => document.getElementById('profileUpload')?.click()}
                        disabled={uploadingImage}
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
                        <p className="text-xs text-muted-foreground">
                          Selected: {profilePicture.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" disabled={isSaving || uploadingImage}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Profile'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  } catch (error) {
    // Catch the WagmiProviderNotFoundError
    console.error("Error in DeveloperProfileTab:", error);
    
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
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
};

export default DeveloperProfileTab;
