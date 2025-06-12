import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud, FileText, Loader } from 'lucide-react';
import FileCard from '@/components/dashboard/FileCard';
import { useState } from 'react';
import UploadModal from '@/components/common/UploadModal';
import { useFileData } from '@/hooks/useFileData';
import MediaViewer from '@/components/viewers/MediaViewer';

export default function Audios() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [mediaViewerOpen, setMediaViewerOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // const audios = [
  //   {
  //     id: '1',
  //     title: 'Project Proposal',
  //     isFavorite: true
  //   },
  //   {
  //     id: '2',
  //     title: 'Financial Report Q1',
  //     isFavorite: false
  //   },
  //   {
  //     id: '3',
  //     title: 'Meeting Minutes',
  //     isFavorite: false
  //   },
  //   {
  //     id: '4',
  //     title: 'Product Specs',
  //     isFavorite: true
  //   },
  //   {
  //     id: '5',
  //     title: 'Client Contract',
  //     isFavorite: false
  //   },
  //   {
  //     id: '6',
  //     title: 'Research Paper',
  //     isFavorite: false
  //   },
  //   {
  //     id: '7',
  //     title: 'Team Handbook',
  //     isFavorite: false
  //   },
  //   {
  //     id: '8',
  //     title: 'Marketing Strategy',
  //     isFavorite: true
  //   }
  // ];

  const { data: audios, loading } = useFileData('audio')

  const handlePhotoClick = (index: number) => {
    setCurrentMediaIndex(index);
    setMediaViewerOpen(true);
  };
  return (
    <DashboardLayout title="Audios">
      <div className="space-y-6">
        {
          loading ? <Loader className='animate-spin' /> :

            <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      My Audios
                    </CardTitle>
                    <CardDescription>
                      Manage all your audio files
                    </CardDescription>
                  </div>
                  <Button onClick={() => setUploadModalOpen(true)}>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Upload Audio
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {audios.map((audio, index) => (
                    <FileCard
                      fileId={audio.id}
                      key={audio.id}
                      type="audio"
                      title={audio.fileName}
                      isFavorite={audio.isFavorite ? true : false}
                      onClick={() => handlePhotoClick(index)}

                    />
                  ))}
                </div>
              </CardContent>
            </Card>}
      </div>
      <UploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />



      {
        mediaViewerOpen &&
        <MediaViewer
          open={mediaViewerOpen}
          onOpenChange={setMediaViewerOpen}
          files={audios || []}
          currentIndex={currentMediaIndex}
          onIndexChange={setCurrentMediaIndex}

        />
      }

    </DashboardLayout>
  );
}