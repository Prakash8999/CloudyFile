import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud, Image } from 'lucide-react';
import FileCard from '@/components/dashboard/FileCard';
import { useEffect, useState } from 'react';
import UploadModal from '@/components/common/UploadModal';
import axios from 'axios';
import { BASE_URL } from '@/components/common/BaseUrl';
import { useAuth } from '@/hooks/AuthProvider';
import { FileAttributes } from '@/types/FileAttributes';
import { toast, Toaster } from 'sonner';

export default function Photos() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [photos, setPhotos] = useState<FileAttributes[]>([]);
  const [loading, setLoading] = useState(false)

  // const photos = [
  //   {
  //     id: '1',
  //     title: 'Jerusalem',
  //     thumbnail: 'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //     isFavorite: true
  //   },
  //   {
  //     id: '2',
  //     title: 'Budapest',
  //     thumbnail: 'https://images.pexels.com/photos/732657/pexels-photo-732657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //     isFavorite: false
  //   },
  //   {
  //     id: '3',
  //     title: 'Barcelona',
  //     thumbnail: 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //     isFavorite: true
  //   },
  //   {
  //     id: '4',
  //     title: 'Sunset Beach',
  //     thumbnail: 'https://images.pexels.com/photos/1009136/pexels-photo-1009136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //     isFavorite: false
  //   },
  //   {
  //     id: '5',
  //     title: 'Mountain View',
  //     thumbnail: 'https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //     isFavorite: false
  //   },
  //   {
  //     id: '6',
  //     title: 'City Lights',
  //     thumbnail: 'https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //     isFavorite: true
  //   },
  //   {
  //     id: '7',
  //     title: 'Forest Trail',
  //     thumbnail: 'https://images.pexels.com/photos/1572386/pexels-photo-1572386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //     isFavorite: false
  //   },
  //   {
  //     id: '8',
  //     title: 'Northern Lights',
  //     thumbnail: 'https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //     isFavorite: false
  //   }
  // ];
  const { token, dataPost } = useAuth()
  const fileData = async () => {
    try {
      setLoading(true)

      const response = await axios.get(`${BASE_URL}/file/read?fileType=image`, {
        headers: { "x-auth-token": `Bearer ${token}` }
      });
      console.log("response ", response.data.data)
      setPhotos(response.data.data)
      setLoading(false)
    } catch (error: any) {
      console.log("error", error)
      toast.error(error.response?.data?.message)
    }
  }
  useEffect(() => {
    fileData()
  }, [dataPost.file])


  return (
    <DashboardLayout title="Photo Gallery">
      <div className="space-y-6">
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Photo Gallery
                </CardTitle>
                <CardDescription>
                  Browse and manage your photo collection
                </CardDescription>
              </div>
              <Button onClick={() => setUploadModalOpen(true)}>
                <UploadCloud className="mr-2 h-4 w-4" />
                Upload Photos
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <FileCard
                  key={photo.id}
                  type="image"
                  title={photo.fileName}
                  thumbnail={photo.thumbnailUrl ? photo.thumbnailUrl : "https://thumbnail-bucket-time.s3.eu-north-1.amazonaws.com/uploads/generic/picture_12236741.png"}
                  isFavorite={photo.isFavorite ? photo.isFavorite : false}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <UploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />
      <Toaster richColors />
    </DashboardLayout>
  );
}