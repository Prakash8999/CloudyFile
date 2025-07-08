import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderIcon, Plus } from 'lucide-react';
import FolderCard from './FolderCard';
import CreateFolderModal from '@/components/common/CreateFolderModel';
import { useFolderDataGeneric } from '@/hooks/useFolder';
import { dateFormat } from '@/lib/utils';

export default function FoldersSection() {
  const [createFolderModalOpen, setCreateFolderModalOpen] = useState(false);
  // const [folders, setFolders] = useState([]);

  // const folders = [
  //   {
  //     id: '1',
  //     type: 'images',
  //     name: 'Travel Photos',
  //     fileCount: 1734430,
  //     lastEdit: 'May 3rd 2021',
  //     sharedUsers: [
  //       { id: '1', avatar: 'https://github.com/shadcn.png', name: 'Alex' },
  //       { id: '2', avatar: 'https://github.com/shadcn.png', name: 'Beth' },
  //       { id: '3', avatar: 'https://github.com/shadcn.png', name: 'Carlos' },
  //       { id: '4', avatar: 'https://github.com/shadcn.png', name: 'Dana' },
  //       { id: '5', avatar: 'https://github.com/shadcn.png', name: 'Ethan' },
  //       { id: '6', avatar: 'https://github.com/shadcn.png', name: 'Fiona' },
  //       { id: '7', avatar: 'https://github.com/shadcn.png', name: 'George' },
  //       { id: '8', avatar: 'https://github.com/shadcn.png', name: 'Helen' },
  //       { id: '9', avatar: 'https://github.com/shadcn.png', name: 'Ivan' },
  //     ]
  //   },
  //   {
  //     id: '2',
  //     type: 'videos',
  //     name: 'Project Videos',
  //     fileCount: 34430,
  //     lastEdit: 'May 25th 2023',
  //     sharedUsers: [
  //       { id: '1', avatar: 'https://github.com/shadcn.png', name: 'Alex' },
  //       { id: '2', avatar: 'https://github.com/shadcn.png', name: 'Beth' },
  //     ]
  //   },
  //   {
  //     id: '3',
  //     type: 'audio',
  //     name: 'Music Collection',
  //     fileCount: 34430,
  //     lastEdit: 'Jun 10th 2020',
  //     sharedUsers: [
  //       { id: '1', avatar: 'https://github.com/shadcn.png', name: 'Alex' },
  //     ]
  //   }
  // ];

  const {data:folders } = useFolderDataGeneric({"isDeleted":false} )



  return (
    <>
      <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg mt-6">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FolderIcon className="h-5 w-5" />
              Folders
            </CardTitle>
            <Button
              onClick={() => setCreateFolderModalOpen(true)}
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Folder
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {folders.map((folder,index) => (
              <FolderCard
                key={index}
                uuid= {folder.uuid}
                // id={folder.id}
                // name={folder.name}
                // fileCount={folder.fileCount}
                fileCount={folder.filesCount}
                folderName={folder.name}
                // lastEdit={folder.lastEdit}
                lastEdit={dateFormat(folder.updatedAt)}
                // sharedUsers={[{ id: "1", avatar: 'https://github.com/shadcn.png', name: 'Alex' }]}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <CreateFolderModal
        open={createFolderModalOpen}
        onOpenChange={setCreateFolderModalOpen}
      />
    </>
  );
}