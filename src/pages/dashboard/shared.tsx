import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Share2, Users, Clock, Eye, Edit, Shield } from 'lucide-react';
import FolderCard from '@/components/dashboard/FolderCard';
import FileCard from '@/components/dashboard/FileCard';
import MediaViewer from '@/components/viewers/MediaViewer';
import DocumentViewer from '@/components/viewers/DocumentViewer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Shared() {
  const navigate = useNavigate();
  const [mediaViewerOpen, setMediaViewerOpen] = useState(false);
  const [documentViewerOpen, setDocumentViewerOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [currentDocumentIndex, setCurrentDocumentIndex] = useState(0);

  // Mock shared folders data
  const sharedFolders = [
    {
      id: 'shared-1',
      type: 'images' as const,
      name: 'Marketing Assets',
      fileCount: 156,
      lastEdit: 'Yesterday',
      sharedBy: {
        id: '1',
        name: 'Sarah Wilson',
        avatar: 'https://github.com/shadcn.png',
        email: 'sarah@company.com'
      },
      role: 'write',
      sharedDate: '2 days ago',
      sharedUsers: [
        { id: '1', avatar: 'https://github.com/shadcn.png', name: 'Sarah Wilson' },
        { id: '2', avatar: 'https://github.com/shadcn.png', name: 'Mike Johnson' },
        { id: '3', avatar: 'https://github.com/shadcn.png', name: 'Lisa Chen' },
      ]
    },
    {
      id: 'shared-2',
      type: 'videos' as const,
      name: 'Training Videos',
      fileCount: 24,
      lastEdit: 'Last week',
      sharedBy: {
        id: '2',
        name: 'David Brown',
        avatar: 'https://github.com/shadcn.png',
        email: 'david@company.com'
      },
      role: 'read',
      sharedDate: '1 week ago',
      sharedUsers: [
        { id: '1', avatar: 'https://github.com/shadcn.png', name: 'David Brown' },
        { id: '2', avatar: 'https://github.com/shadcn.png', name: 'Emma Davis' },
      ]
    },
    {
      id: 'shared-3',
      type: 'audio' as const,
      name: 'Podcast Episodes',
      fileCount: 48,
      lastEdit: '3 days ago',
      sharedBy: {
        id: '3',
        name: 'Alex Rodriguez',
        avatar: 'https://github.com/shadcn.png',
        email: 'alex@company.com'
      },
      role: 'write',
      sharedDate: '5 days ago',
      sharedUsers: [
        { id: '1', avatar: 'https://github.com/shadcn.png', name: 'Alex Rodriguez' },
        { id: '2', avatar: 'https://github.com/shadcn.png', name: 'Maria Garcia' },
        { id: '3', avatar: 'https://github.com/shadcn.png', name: 'Tom Wilson' },
        { id: '4', avatar: 'https://github.com/shadcn.png', name: 'Jane Smith' },
      ]
    }
  ];

  // Mock shared files data
  const sharedFiles = [
    {
      id: 'file-1',
      type: 'document',
      title: 'Q4 Financial Report',
      sharedBy: {
        id: '1',
        name: 'Sarah Wilson',
        avatar: 'https://github.com/shadcn.png',
        email: 'sarah@company.com'
      },
      role: 'read',
      sharedDate: '1 hour ago',
      pages: 24,
      url: '/documents/q4-report.pdf',
      isFavorite: false
    },
    {
      id: 'file-2',
      type: 'image',
      title: 'Product Mockup',
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      sharedBy: {
        id: '2',
        name: 'Mike Johnson',
        avatar: 'https://github.com/shadcn.png',
        email: 'mike@company.com'
      },
      role: 'write',
      sharedDate: '3 hours ago',
      isFavorite: true
    },
    {
      id: 'file-3',
      type: 'video',
      title: 'Product Demo',
      thumbnail: 'https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      sharedBy: {
        id: '3',
        name: 'Lisa Chen',
        avatar: 'https://github.com/shadcn.png',
        email: 'lisa@company.com'
      },
      role: 'read',
      sharedDate: '1 day ago',
      isFavorite: false
    },
    {
      id: 'file-4',
      type: 'document',
      title: 'Project Proposal',
      sharedBy: {
        id: '4',
        name: 'David Brown',
        avatar: 'https://github.com/shadcn.png',
        email: 'david@company.com'
      },
      role: 'write',
      sharedDate: '2 days ago',
      pages: 15,
      url: '/documents/project-proposal.pdf',
      isFavorite: false
    },
    {
      id: 'file-5',
      type: 'image',
      title: 'Brand Guidelines',
      thumbnail: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      url: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      sharedBy: {
        id: '5',
        name: 'Emma Davis',
        avatar: 'https://github.com/shadcn.png',
        email: 'emma@company.com'
      },
      role: 'read',
      sharedDate: '3 days ago',
      isFavorite: false
    },
    {
      id: 'file-6',
      type: 'audio',
      title: 'Team Meeting Recording',
      sharedBy: {
        id: '6',
        name: 'Alex Rodriguez',
        avatar: 'https://github.com/shadcn.png',
        email: 'alex@company.com'
      },
      role: 'write',
      sharedDate: '1 week ago',
      isFavorite: false
    }
  ];

  // Separate media files and documents for viewers
  const mediaFiles = sharedFiles.filter(file => file.type === 'image' || file.type === 'video').map(file => ({
    id: file.id,
    type: file.type as 'image' | 'video',
    title: file.title,
    thumbnail: file.thumbnail,
    url: file.url
  }));

  const documentFiles = sharedFiles.filter(file => file.type === 'document').map(file => ({
    id: file.id,
    title: file.title,
    pages: file.pages || 10,
    url: file.url || '/documents/default.pdf'
  }));

  const handleFileClick = (file: any) => {
    if (file.type === 'document') {
      const docIndex = documentFiles.findIndex(doc => doc.id === file.id);
      setCurrentDocumentIndex(docIndex);
      setDocumentViewerOpen(true);
    } else if (file.type === 'image' || file.type === 'video') {
      const mediaIndex = mediaFiles.findIndex(media => media.id === file.id);
      setCurrentMediaIndex(mediaIndex);
      setMediaViewerOpen(true);
    }
  };

  const handleFolderClick = (folderId: string) => {
    navigate(`/dashboard/folder/${folderId}`);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'read':
        return <Eye className="h-3 w-3" />;
      case 'write':
        return <Edit className="h-3 w-3" />;
      case 'admin':
        return <Shield className="h-3 w-3" />;
      default:
        return <Eye className="h-3 w-3" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'write':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'read':
        return 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
      default:
        return 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <DashboardLayout title="Shared with Me">
      <div className="space-y-6">
        {/* Header */}
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Shared with Me
            </CardTitle>
            <CardDescription>
              Files and folders that others have shared with you
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Content Tabs */}
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
          <CardContent className="p-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Shared</TabsTrigger>
                <TabsTrigger value="folders">Folders ({sharedFolders.length})</TabsTrigger>
                <TabsTrigger value="files">Files ({sharedFiles.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-8">
                {/* Shared Folders */}
                {sharedFolders.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-lg font-medium">Shared Folders</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {sharedFolders.map((folder) => (
                        <div key={folder.id} className="relative">
                          <FolderCard
                            id={folder.id}
                            type={folder.type}
                            name={folder.name}
                            fileCount={folder.fileCount}
                            lastEdit={folder.lastEdit}
                            sharedUsers={folder.sharedUsers}
                            onClick={() => handleFolderClick(folder.id)}
                          />
                          <div className="absolute top-2 right-2 flex items-center gap-1">
                            <Badge variant="outline" className={`text-xs ${getRoleColor(folder.role)}`}>
                              {getRoleIcon(folder.role)}
                              <span className="ml-1 capitalize">{folder.role}</span>
                            </Badge>
                          </div>
                          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                            <Avatar className="h-4 w-4">
                              <AvatarImage src={folder.sharedBy.avatar} />
                              <AvatarFallback className="text-xs">
                                {folder.sharedBy.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span>Shared by {folder.sharedBy.name}</span>
                            <Clock className="h-3 w-3" />
                            <span>{folder.sharedDate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shared Files */}
                {sharedFiles.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Share2 className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-lg font-medium">Shared Files</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {sharedFiles.map((file) => (
                        <div key={file.id} className="relative">
                          <FileCard
                            type={file.type as 'audio' | 'document' | 'image' | 'video'}
                            title={file.title}
							key={1}
                            thumbnail={file.thumbnail}
                            isFavorite={file.isFavorite}
                            onClick={() => handleFileClick(file)}
                          />
                          <div className="absolute top-2 right-2 flex items-center gap-1">
                            <Badge variant="outline" className={`text-xs ${getRoleColor(file.role)}`}>
                              {getRoleIcon(file.role)}
                              <span className="ml-1 capitalize">{file.role}</span>
                            </Badge>
                          </div>
                          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                            <Avatar className="h-4 w-4">
                              <AvatarImage src={file.sharedBy.avatar} />
                              <AvatarFallback className="text-xs">
                                {file.sharedBy.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span>Shared by {file.sharedBy.name}</span>
                            <Clock className="h-3 w-3" />
                            <span>{file.sharedDate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="folders">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sharedFolders.map((folder) => (
                    <div key={folder.id} className="relative">
                      <FolderCard
                        id={folder.id}
                        type={folder.type}
                        name={folder.name}
                        fileCount={folder.fileCount}
                        lastEdit={folder.lastEdit}
                        sharedUsers={folder.sharedUsers}
                        onClick={() => handleFolderClick(folder.id)}
                      />
                      <div className="absolute top-2 right-2 flex items-center gap-1">
                        <Badge variant="outline" className={`text-xs ${getRoleColor(folder.role)}`}>
                          {getRoleIcon(folder.role)}
                          <span className="ml-1 capitalize">{folder.role}</span>
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <Avatar className="h-4 w-4">
                          <AvatarImage src={folder.sharedBy.avatar} />
                          <AvatarFallback className="text-xs">
                            {folder.sharedBy.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>Shared by {folder.sharedBy.name}</span>
                        <Clock className="h-3 w-3" />
                        <span>{folder.sharedDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="files">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {sharedFiles.map((file) => (
                    <div key={file.id} className="relative">
                      <FileCard
                        type={file.type as 'audio' | 'document' | 'image' | 'video'}
                        title={file.title}
                        thumbnail={file.thumbnail}
                        isFavorite={file.isFavorite}
                        onClick={() => handleFileClick(file)}
                      />
                      <div className="absolute top-2 right-2 flex items-center gap-1">
                        <Badge variant="outline" className={`text-xs ${getRoleColor(file.role)}`}>
                          {getRoleIcon(file.role)}
                          <span className="ml-1 capitalize">{file.role}</span>
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <Avatar className="h-4 w-4">
                          <AvatarImage src={file.sharedBy.avatar} />
                          <AvatarFallback className="text-xs">
                            {file.sharedBy.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>Shared by {file.sharedBy.name}</span>
                        <Clock className="h-3 w-3" />
                        <span>{file.sharedDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Media Viewer */}
      <MediaViewer
        open={mediaViewerOpen}
        onOpenChange={setMediaViewerOpen}
        files={mediaFiles}
        currentIndex={currentMediaIndex}
        onIndexChange={setCurrentMediaIndex}
      />

      {/* Document Viewer */}
      <DocumentViewer
        open={documentViewerOpen}
        onOpenChange={setDocumentViewerOpen}
        files={documentFiles}
        currentIndex={currentDocumentIndex}
        onIndexChange={setCurrentDocumentIndex}
      />
    </DashboardLayout>
  );
}