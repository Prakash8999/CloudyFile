import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderIcon } from 'lucide-react';
import FolderCard from './FolderCard';

export default function FoldersSection() {
  const folders = [
    {
      type: 'images',
      fileCount: 1734430,
      lastEdit: 'May 3rd 2021',
      sharedUsers: [
        { id: '1', avatar: 'https://github.com/shadcn.png', name: 'Alex' },
        { id: '2', avatar: 'https://github.com/shadcn.png', name: 'Beth' },
        { id: '3', avatar: 'https://github.com/shadcn.png', name: 'Carlos' },
        { id: '4', avatar: 'https://github.com/shadcn.png', name: 'Dana' },
        { id: '5', avatar: 'https://github.com/shadcn.png', name: 'Ethan' },
        { id: '6', avatar: 'https://github.com/shadcn.png', name: 'Fiona' },
        { id: '7', avatar: 'https://github.com/shadcn.png', name: 'George' },
        { id: '8', avatar: 'https://github.com/shadcn.png', name: 'Helen' },
        { id: '9', avatar: 'https://github.com/shadcn.png', name: 'Ivan' },
      ]
    },
    {
      type: 'videos',
      fileCount: 34430,
      lastEdit: 'May 25th 2023',
      sharedUsers: [
        { id: '1', avatar: 'https://github.com/shadcn.png', name: 'Alex' },
        { id: '2', avatar: 'https://github.com/shadcn.png', name: 'Beth' },
      ]
    },
    {
      type: 'audio',
      fileCount: 34430,
      lastEdit: 'Jun 10th 2020',
      sharedUsers: [
        { id: '1', avatar: 'https://github.com/shadcn.png', name: 'Alex' },
      ]
    }
  ];

  return (
    <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <FolderIcon className="h-5 w-5" />
          Folders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {folders.map((folder) => (
            <FolderCard
              key={folder.type}
              type={folder.type as 'images' | 'videos' | 'audio'}
              fileCount={folder.fileCount}
              lastEdit={folder.lastEdit}
              sharedUsers={folder.sharedUsers}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}