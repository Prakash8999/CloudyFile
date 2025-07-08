import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, RefreshCw, X } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDeleteFile, useFileDataStatus } from '@/hooks/useFileData';
import dayjs from 'dayjs';
import { formatFileSize } from '@/lib/utils';
import { useState } from 'react';
import DeleteModel from '@/components/common/DeleteModel';


export default function Recycle() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // const deletedFiles = [
  //   {
  //     id: '1',
  //     name: 'presentation-final.pptx',
  //     deleted: 'May 15, 2023',
  //     size: '4.2 MB',
  //     type: 'Document',
  //     expiresIn: '20 days'
  //   },
  //   {
  //     id: '2',
  //     name: 'team-photo.jpg',
  //     deleted: 'May 14, 2023',
  //     size: '2.8 MB',
  //     type: 'Image',
  //     expiresIn: '19 days'
  //   },
  //   {
  //     id: '3',
  //     name: 'project-notes.docx',
  //     deleted: 'May 12, 2023',
  //     size: '1.5 MB',
  //     type: 'Document',
  //     expiresIn: '17 days'
  //   },
  //   {
  //     id: '4',
  //     name: 'vacation-video.mp4',
  //     deleted: 'May 08, 2023',
  //     size: '128.4 MB',
  //     type: 'Video',
  //     expiresIn: '13 days'
  //   },
  //   {
  //     id: '5',
  //     name: 'meeting-recording.mp3',
  //     deleted: 'May 03, 2023',
  //     size: '24.6 MB',
  //     type: 'Audio',
  //     expiresIn: '8 days'
  //   },
  //   {
  //     id: '6',
  //     name: 'outdated-logo.ai',
  //     deleted: 'Apr 28, 2023',
  //     size: '8.3 MB',
  //     type: 'Design',
  //     expiresIn: '3 days'
  //   }
  // ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Document':
      case 'Application':
        return 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      case 'Image':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      case 'Video':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'Audio':
        return 'bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 border-pink-200 dark:border-pink-800';
      default:
        return 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
  };

  const { data: deletedFiles } = useFileDataStatus("deleted");  // or "archived" or "deleted"
  const expireIn = (date: string) => {
    const expireAt = dayjs(date).add(1, 'month');
    const today = dayjs();

    const remainingDays = expireAt.diff(today, 'day'); // difference in days
    const expireFormat = expireAt.format('MMMM D, YYYY');

    return {
      expireAt: expireFormat,
      daysLeft: remainingDays,
    };
  };

  const { updateStatus, loadingId } = useDeleteFile();

  const [fileIds, setFileIds] = useState<number[]>()
  const handleDelete = (ids: number[]) => {
    setFileIds(ids)
    setDeleteModalOpen(true)
  }

  // const handleDeleteAll = 
  


  return (
    <DashboardLayout title="Recycle Bin">
      <div className="space-y-6">
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Trash2 className="h-5 w-5" />
                  Recycle Bin
                </CardTitle>
                <CardDescription>
                  Recently deleted files that can be restored
                </CardDescription>
              </div>
              <Button variant="outline" onClick={()=> handleDelete( deletedFiles.map((file )=> file.id))} >
                Empty Recycle Bin
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Deleted</TableHead>
                  <TableHead>Expires In</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deletedFiles.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell className="font-medium">{file.fileName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getTypeColor(file.fileType === 'application' ? 'Document' : file.fileType)}>
                        {file.fileType === 'application' ? 'Document' : file.fileType}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatFileSize(file.fileSize)}</TableCell>
                    <TableCell>{dayjs(file.deletedAt).format('MMMM D, YYYY')}</TableCell>
                    <TableCell>{expireIn(file.deletedAt!).daysLeft} Days</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => updateStatus("isDeleted", false, file.id)}>
                          <RefreshCw className={`mr-2 h-3 w-3 ${loadingId === file.id ? 'animate-spin' : ''}`} />
                          Restore
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-200 hover:bg-red-50 text-red-600 hover:text-red-700" onClick={() => handleDelete([file.id])}>
                          <X className="mr-2 h-3 w-3" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <DeleteModel open={deleteModalOpen} onOpenChange={setDeleteModalOpen} fileIds={fileIds!} />

    </DashboardLayout>
  );
}