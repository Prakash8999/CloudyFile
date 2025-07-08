import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClockIcon } from 'lucide-react';
import FileCard from './FileCard';
import { useFileDataLatest } from '@/hooks/useFileData';
import MediaViewer from '../viewers/MediaViewer';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../common/BaseUrl';
import { useAuth } from '@/hooks/AuthProvider';
import DateRangePicker from './DatePicker';

export default function LatestSection() {
  const [mediaViewerOpen, setMediaViewerOpen] = useState(false);
  const [startDate, setStartDate] = useState<string> ();
  const [endDate, setEndDate] = useState<string>();
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const { token } = useAuth()

  const { data: files } = useFileDataLatest(startDate, endDate)
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

  console.log(" start ",startDate);

  return (
    <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg mt-6 w-full">

      <CardHeader className="pb-2 flex flex-row justify-between">
        <CardTitle className="flex items-center gap-2">
          <ClockIcon className="h-5 w-5" />
          Latest
        </CardTitle>
        <DateRangePicker onChange={(start, end) => {
          console.log("Selected range: ", start, end);
          setStartDate(start ?? "")
          setEndDate(end ?? "")
          // You can pass these to your hook or API
        }} />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <FileCard
              key={file.id}
              fileId={file.id}
              type={file.fileType as 'audio' | 'application' | 'image' | 'video'}
              title={file.fileName}
              thumbnail={file.thumbnailUrl ? file.thumbnailUrl : getThumbnail(file.fileType)}
              isFavorite={file.isFavorite ? file.isFavorite : false}
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
          files={files || []}
          currentIndex={currentMediaIndex}
          onIndexChange={setCurrentMediaIndex}
        />
      }
    </Card>
  );
}