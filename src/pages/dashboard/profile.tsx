import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { FileText, Star, BarChart2, Mail, Github, Twitter, Linkedin, Upload } from 'lucide-react';
import FileCard from '@/components/dashboard/FileCard';

export default function Profile() {
  const recentFiles = [
    {
      id: '1',
      type: 'document',
      title: "Friday's Presentation",
      isFavorite: false
    },
    {
      id: '2',
      type: 'image',
      title: 'Barcelona',
      thumbnail: 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFavorite: true
    },
    {
      id: '3',
      type: 'document',
      title: 'Project Proposal',
      isFavorite: true
    }
  ];

  return (
    <DashboardLayout title="Profile">
      <div className="space-y-6">
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
          <CardHeader className="pb-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-800 shadow-md">
                  <AvatarImage src="https://github.com/shadcn.png" alt="John Doe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl mb-1">John Doe</CardTitle>
                  <CardDescription className="text-base">Product Designer</CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                      Pro Member
                    </Badge>
                    <Badge variant="outline">
                      San Francisco, CA
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button size="sm" variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Change Photo
                </Button>
                <Button size="sm">
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-6">
              <p className="text-muted-foreground max-w-2xl">
                Product designer with 5+ years of experience. Specializing in UI design, brand strategy, and Figma prototyping. Passionate about creating intuitive and beautiful interfaces that users love.
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            
            <Separator className="my-6" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-4 bg-white/80 dark:bg-gray-900/80 rounded-lg border border-gray-100 dark:border-gray-800">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-2">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-2xl font-bold">126</span>
                <span className="text-sm text-muted-foreground">Files</span>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-white/80 dark:bg-gray-900/80 rounded-lg border border-gray-100 dark:border-gray-800">
                <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-full mb-2">
                  <Star className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-2xl font-bold">18</span>
                <span className="text-sm text-muted-foreground">Favorites</span>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-white/80 dark:bg-gray-900/80 rounded-lg border border-gray-100 dark:border-gray-800">
                <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-full mb-2">
                  <BarChart2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-2xl font-bold">3.2GB</span>
                <span className="text-sm text-muted-foreground">Used Storage</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
          <CardContent className="p-6">
            <Tabs defaultValue="files">
              <TabsList className="mb-6">
                <TabsTrigger value="files">Recent Files</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="stats">Storage Stats</TabsTrigger>
              </TabsList>
              
              <TabsContent value="files">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recentFiles.map((file) => (
                    <FileCard
                      key={file.id}
                      type={file.type as 'audio' | 'application' | 'image' | 'video'}
                      title={file.title}
                      thumbnail={file.thumbnail}
                      isFavorite={file.isFavorite}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="activity">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                      <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">You uploaded a new document</p>
                      <p className="text-sm text-muted-foreground">Friday's Presentation.pptx</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-full">
                      <Star className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium">You starred a file</p>
                      <p className="text-sm text-muted-foreground">Barcelona.jpg</p>
                      <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-full">
                      <Upload className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium">You uploaded 5 files</p>
                      <p className="text-sm text-muted-foreground">To Design Assets folder</p>
                      <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="stats">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Storage Usage</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>3.2 GB of 5 GB used</span>
                        <span className="font-medium">64%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[64%] rounded-full"></div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="mt-2">
                      Upgrade Storage
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">Files by Type</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span>Documents</span>
                        </div>
                        <span>1.2 GB</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                          <span>Images</span>
                        </div>
                        <span>0.8 GB</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span>Videos</span>
                        </div>
                        <span>1.0 GB</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                          <span>Other</span>
                        </div>
                        <span>0.2 GB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}