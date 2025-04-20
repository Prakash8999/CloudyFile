import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import FileCard from '@/components/dashboard/FileCard';

export default function Favorites() {
  const favorites = [
    {
      id: '1',
      type: 'video',
      title: 'Barcelona Trip',
      thumbnail: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFavorite: true
    },
    {
      id: '2',
      type: 'image',
      title: 'Jerusalem',
      thumbnail: 'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFavorite: true
    },
    {
      id: '3',
      type: 'image',
      title: 'Barcelona',
      thumbnail: 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFavorite: true
    },
    {
      id: '4',
      type: 'document',
      title: 'Project Proposal',
      isFavorite: true
    },
    {
      id: '5',
      type: 'image',
      title: 'City Lights',
      thumbnail: 'https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFavorite: true
    },
    {
      id: '6',
      type: 'document',
      title: 'Product Specs',
      isFavorite: true
    },
    {
      id: '7',
      type: 'video',
      title: 'Family Gathering',
      thumbnail: 'https://images.pexels.com/photos/7879909/pexels-photo-7879909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFavorite: true
    },
    {
      id: '8',
      type: 'document',
      title: 'Marketing Strategy',
      isFavorite: true
    }
  ];

  return (
    <DashboardLayout title="Favorites">
      <div className="space-y-6">
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
              {favorites.map((file) => (
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
      </div>
    </DashboardLayout>
  );
}