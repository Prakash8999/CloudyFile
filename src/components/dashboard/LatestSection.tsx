import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClockIcon } from 'lucide-react';
import FileCard from './FileCard';

export default function LatestSection() {
  const files = [
    {
      id: '1',
      type: 'audio',
      title: 'Aya_Alkurdi.mp3',
      isFavorite: false
    },
    {
      id: '2',
      type: 'document',
      title: "Friday's Presentation",
      isFavorite: false
    },
    {
      id: '3',
      type: 'image',
      title: 'Jerusalem',
      thumbnail: 'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFavorite: true
    },
    {
      id: '4',
      type: 'image',
      title: 'Budapest',
      thumbnail: 'https://images.pexels.com/photos/732657/pexels-photo-732657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFavorite: false
    },
    {
      id: '5',
      type: 'video',
      title: 'Venice Travel Video',
      thumbnail: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFavorite: false
    },
    {
      id: '6',
      type: 'video',
      title: 'Spain Trip',
      thumbnail: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFavorite: false
    },
    {
      id: '7',
      type: 'document',
      title: 'Life Goals',
      isFavorite: false
    },
    {
      id: '8',
      type: 'image',
      title: 'Barcelona',
      thumbnail: 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFavorite: true
    }
  ];

  return (
    <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <ClockIcon className="h-5 w-5" />
          Latest
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => (
            <FileCard
              key={file.id}
              type={file.type as 'audio' | 'document' | 'image' | 'video'}
              title={file.title}
              thumbnail={file.thumbnail}
              isFavorite={file.isFavorite}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}