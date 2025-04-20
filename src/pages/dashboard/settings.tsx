import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  return (
    <DashboardLayout title="Settings">
      <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Account Settings
          </CardTitle>
          <CardDescription>
            Manage your account preferences and settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general">
            <TabsList className="mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input id="company" defaultValue="Acme Inc." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="utc-8">
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc-12">UTC-12:00</SelectItem>
                        <SelectItem value="utc-8">UTC-08:00 (PST)</SelectItem>
                        <SelectItem value="utc-5">UTC-05:00 (EST)</SelectItem>
                        <SelectItem value="utc+0">UTC+00:00 (GMT)</SelectItem>
                        <SelectItem value="utc+1">UTC+01:00 (CET)</SelectItem>
                        <SelectItem value="utc+8">UTC+08:00 (CST)</SelectItem>
                        <SelectItem value="utc+9">UTC+09:00 (JST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button>Save Changes</Button>
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Theme & Appearance</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="darkMode" className="text-base">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable dark mode for the interface
                      </p>
                    </div>
                    <Switch id="darkMode" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="compactMode" className="text-base">Compact Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Show more content with reduced spacing
                      </p>
                    </div>
                    <Switch id="compactMode" />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="privacy" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Security Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="2fa" className="text-base">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch id="2fa" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Change Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="••••••••" />
                  </div>
                  
                  <div className="pt-2">
                    <Button>Update Password</Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Privacy Controls</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="fileSharing" className="text-base">Default File Sharing</Label>
                      <p className="text-sm text-muted-foreground">
                        Choose who can access your shared files by default
                      </p>
                    </div>
                    <Select defaultValue="specific">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="specific">Specific People</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="analytics" className="text-base">Usage Analytics</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow us to collect anonymous usage data
                      </p>
                    </div>
                    <Switch id="analytics" defaultChecked />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="fileShared" className="text-base">File Shared With Me</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when someone shares a file with you
                      </p>
                    </div>
                    <Switch id="fileShared" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="commentNotif" className="text-base">Comments</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about comments on your files
                      </p>
                    </div>
                    <Switch id="commentNotif" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="storageNotif" className="text-base">Storage Limits</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when you're reaching storage limits
                      </p>
                    </div>
                    <Switch id="storageNotif" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketingNotif" className="text-base">Marketing</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about new features and promotions
                      </p>
                    </div>
                    <Switch id="marketingNotif" />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="billing" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Billing Information</h3>
                
                <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium">Current Plan</p>
                      <h4 className="text-xl font-bold">Free</h4>
                    </div>
                    <Button>Upgrade to Pro</Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Storage</span>
                      <span className="font-medium">5 GB / 5 GB</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-full rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <Card className="bg-white/80 dark:bg-gray-900/80">
                    <CardHeader className="pb-3">
                      <CardTitle>Free</CardTitle>
                      <div className="text-2xl font-bold">$0<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>5 GB Storage</p>
                      <p>Basic file sharing</p>
                      <p>30-day file recovery</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-200 dark:border-blue-800">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle>Pro</CardTitle>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                          Popular
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold">$12<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>100 GB Storage</p>
                      <p>Advanced file sharing</p>
                      <p>90-day file recovery</p>
                      <p>Priority support</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/80 dark:bg-gray-900/80">
                    <CardHeader className="pb-3">
                      <CardTitle>Enterprise</CardTitle>
                      <div className="text-2xl font-bold">$49<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>5 TB Storage</p>
                      <p>Advanced security</p>
                      <p>1-year file recovery</p>
                      <p>24/7 premium support</p>
                      <p>Custom branding</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}