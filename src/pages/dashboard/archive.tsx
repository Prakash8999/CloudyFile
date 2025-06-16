import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Archive as ArchiveIcon, Clock, Download } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDeleteFile, useFileDataStatus } from '@/hooks/useFileData';
import dayjs from 'dayjs';
import { formatFileSize } from '@/lib/utils';

export default function Archive() {
  // const archives = [
  //   {
  //     id: '1',
  //     name: 'Project Alpha Backup',
  //     created: 'Mar 15, 2023',
  //     size: '2.4 GB',
  //     files: 128,
  //     status: 'Completed'
  //   },
  //   {
  //     id: '2',
  //     name: 'Client Documents Archive',
  //     created: 'Feb 22, 2023',
  //     size: '1.7 GB',
  //     files: 96,
  //     status: 'Completed'
  //   },
  //   {
  //     id: '3',
  //     name: 'Design Assets Bundle',
  //     created: 'Jan 08, 2023',
  //     size: '4.2 GB',
  //     files: 215,
  //     status: 'Completed'
  //   },
  //   {
  //     id: '4',
  //     name: 'Marketing Campaign Media',
  //     created: 'Dec 12, 2022',
  //     size: '3.8 GB',
  //     files: 178,
  //     status: 'Completed'
  //   },
  //   {
  //     id: '5',
  //     name: 'Team Photos 2022',
  //     created: 'Nov 30, 2022',
  //     size: '1.2 GB',
  //     files: 64,
  //     status: 'Completed'
  //   },
  //   {
  //     id: '6',
  //     name: 'Website Backup Q3',
  //     created: 'Sep 28, 2022',
  //     size: '0.8 GB',
  //     files: 42,
  //     status: 'Completed'
  //   }
  // ];
    const { data:archives, loading } = useFileDataStatus("archived");  // or "archived" or "deleted"
    const { updateStatus } = useDeleteFile();
  

  return (
    <DashboardLayout title="Archive">
      <div className="space-y-6">
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArchiveIcon className="h-5 w-5" />
              Archived Content
            </CardTitle>
            <CardDescription>
              Access and restore your archived files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Files</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {archives.map((archive) => (
                  <TableRow key={archive.id}>
                    <TableCell className="font-medium">{archive.fileName}</TableCell>
                    <TableCell className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {dayjs(archive.updatedAt).format('MMMM D, YYYY')}
                    </TableCell>
                    <TableCell>{formatFileSize(archive.fileSize)}</TableCell>
                    {/* <TableCell>{archive.files}</TableCell> */}
                    <TableCell>1</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                        "archive.status"
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" onClick={()=> updateStatus("isArchived", false, archive.id)}>
                        <Download className="mr-2 h-4 w-4" />
                        Restore
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}