import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader, Star } from 'lucide-react';
import FileCard from '@/components/dashboard/FileCard';
import { useFileDataStatus } from '@/hooks/useFileData';
import MediaViewer from '@/components/viewers/MediaViewer';
import { BASE_URL } from '@/components/common/BaseUrl';
import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '@/hooks/AuthProvider';
import { Button } from '@/components/ui/button';

export default function Favorites() {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const { token } = useAuth()
  const [mediaViewerOpen, setMediaViewerOpen] = useState(false);


  // const favoritesHardCoded = [
  //   {
  //     id: '1',
  //     type: 'video',
  //     title: 'Barcelona Trip',
  //     thumbnail: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //     isFavorite: true
  //   },
  //   {
  //     id: '2',
  //     type: 'image',
  //     title: 'Jerusalem',
  //     thumbnail: 'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //     isFavorite: true
  //   },
  //   {
  //     id: '3',
  //     type: 'image',
  //     title: 'Barcelona',
  //     thumbnail: 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //     isFavorite: true
  //   },
  //   {
  //     id: '4',
  //     type: 'document',
  //     title: 'Project Proposal',
  //     isFavorite: true
  //   },
  //   {
  //     id: '5',
  //     type: 'image',
  //     title: 'City Lights',
  //     thumbnail: 'https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //     isFavorite: true
  //   },
  //   {
  //     id: '6',
  //     type: 'document',
  //     title: 'Product Specs',
  //     isFavorite: true
  //   },
  //   {
  //     id: '7',
  //     type: 'video',
  //     title: 'Family Gathering',
  //     thumbnail: 'https://images.pexels.com/photos/7879909/pexels-photo-7879909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //     isFavorite: true
  //   },
  //   {
  //     id: '8',
  //     type: 'document',
  //     title: 'Marketing Strategy',
  //     isFavorite: true
  //   }
  // ];

  // const { data: favorites, loading } = useFileDataStatus("favorite");  // or "archived" or "deleted"
  const {
    data: favorites,
    meta,
    loading,
    filters,
    setFilters,
  } = useFileDataStatus("favorite", {
    page: 1,
    limit: 15,
    sort_by: "createdAt",
    sort_order: "DESC",
  });
  const getThumbnail = (fileType: string) => {
    if (fileType === 'image') {
      return "https://thumbnail-bucket-cloudyfile.s3.ap-south-1.amazonaws.com/uploads/generic/picture_12236741.png"
    }
    if (fileType === 'video') {
      return "https://thumbnail-bucket-cloudyfile.s3.ap-south-1.amazonaws.com/uploads/generic/5617bgr.jpg"
    }

  }


  const handleFileClick = (file: any, index: number) => {

    if (file.fileType === 'application' || file.fileType === 'document') {
      openUrl(file.id)
      return
    }



    if (file.fileType === 'image' || file.fileType === 'video' || file.fileType === 'audio') {
      setCurrentMediaIndex(index);
      setMediaViewerOpen(true);
    }
  };
  const getFileUrlById = async (fileId: number): Promise<string> => {

    const response = await axios.get(`${BASE_URL}/file/read/${fileId}`, {
      headers: { "x-auth-token": `Bearer ${token}` },
    });
    const fileUrl = response.data?.data
    return fileUrl;
  };

  const openUrl = async (fileId: number) => {
    // event.preventDefault(); // Stop default anchor behavior

    try {
      const url = await getFileUrlById(fileId);
      window.open(url, '_blank'); // Open the signed URL in a new tab
    } catch (err) {
      console.error('Failed to fetch file URL:', err);
    }
  };
  return (
    <DashboardLayout title="Favorites">
      <div className="space-y-6">
        {
          loading ? <Loader className='animate-spin' /> :


            <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  Favorite Files
                </CardTitle>
                <CardDescription>
                  Quick access to your most important files
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {favorites.map((file, index) => (
                    <FileCard
                      fileId={file.id}
                      key={file.id}
                      type={file.fileType as 'audio' | 'application' | 'image' | 'video'}
                      title={file.fileName}
                      thumbnail={file.thumbnailUrl ? file.thumbnailUrl : getThumbnail(file.fileType)}
                      isFavorite={file.isFavorite!}
                      onClick={() => handleFileClick(file, index)}

                    />
                  ))}
                </div>
              </CardContent>
              {
                mediaViewerOpen &&
                <MediaViewer
                  open={mediaViewerOpen}
                  onOpenChange={setMediaViewerOpen}
                  files={favorites || []}
                  currentIndex={currentMediaIndex}
                  onIndexChange={setCurrentMediaIndex}
                />
              }
            </Card>
        }

        <div className="flex gap-4 mt-4 justify-center">
          <Button
            disabled={filters.page === 1}
            variant={'ghost'}
            onClick={() => setFilters({ ...filters, page: (filters.page || 1) - 1 })}
          >
            Previous
          </Button>
          <Button
            variant={'ghost'}
            disabled={meta! && filters.page === meta.total_pages || favorites.length === 0}
            onClick={() => setFilters({ ...filters, page: (filters.page || 1) + 1 })}
          >
            Next
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}