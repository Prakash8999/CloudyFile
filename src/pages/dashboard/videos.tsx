import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud, Video } from 'lucide-react';
import FileCard from '@/components/dashboard/FileCard';
import { useState } from 'react';
import UploadModal from '@/components/common/UploadModal';

export default function Videos() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const videos = [
    {
      id: '1',
      title: 'Barcelona Trip',
      thumbnail: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFavorite: true
    },
    {
      id: '2',
      title: 'Italy Vacation',
      thumbnail: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFavorite: false
    },
    {
      id: '3',
      title: 'Conference Presentation',
      thumbnail: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFavorite: false
    },
    {
      id: '4',
      title: 'Product Demo',
      thumbnail: 'https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFavorite: false
    },
    {
      id: '5',
      title: 'Family Gathering',
      thumbnail: 'https://images.pexels.com/photos/7879909/pexels-photo-7879909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFavorite: true
    },
    {
      id: '6',
      title: 'Nature Documentary',
      thumbnail: 'https://images.pexels.com/photos/3573555/pexels-photo-3573555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFavorite: false
    },
  ];

  return (
    <DashboardLayout title="Videos">
      <div className="space-y-6">
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  My Videos
                </CardTitle>
                <CardDescription>
                  Manage your video collection
                </CardDescription>
              </div>
              <Button onClick={() => setUploadModalOpen(true)}>
                <UploadCloud className="mr-2 h-4 w-4" />
                Upload Video
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <FileCard
                  key={video.id}
                  type="video"
                  title={video.title}
                  thumbnail={video.thumbnail}
                  isFavorite={video.isFavorite}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <UploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />
    </DashboardLayout>
  );
}