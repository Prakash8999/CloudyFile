import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud, FileText, Loader } from 'lucide-react';
import FileCard from '@/components/dashboard/FileCard';
import { useState } from 'react';
import UploadModal from '@/components/common/UploadModal';
import { useFileData } from '@/hooks/useFileData';
import axios from 'axios';
import { BASE_URL } from '@/components/common/BaseUrl';
import { useAuth } from '@/hooks/AuthProvider';

export default function Documents() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  // const [documentViewerOpen, setDocumentViewerOpen] = useState(false);
  // const [currentDocumentIndex, setCurrentDocumentIndex] = useState(0);
const [newLoading, setNewLoading] = useState(false)
  // const documents = [
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

  // const { data: documents, loading } = useFileData('application')
    const {
    data: documents,
    meta,
    loading,
    filters,
    setFilters,
  } = useFileData("application", {
    page: 1,
    limit: 15,
    sort_by: "createdAt",
    sort_order: "DESC",
  });

  // const handleDocumentClick = (index: number) => {
  //   setCurrentDocumentIndex(index);
  //   setDocumentViewerOpen(true);
  // };

const {token} = useAuth()
  const getFileUrlById = async (fileId: number): Promise<string> => {
  setNewLoading(true)
  
    const response = await axios.get(`${BASE_URL}/file/read/${fileId}`, {
    headers: { "x-auth-token": `Bearer ${token}` },
  });
const fileUrl = response.data?.data
setNewLoading(false)
  return fileUrl;
};

const openUrl = async ( fileId: number) => {
  // event.preventDefault(); // Stop default anchor behavior

  try {
    const url = await getFileUrlById(fileId); 
    window.open(url, '_blank'); // Open the signed URL in a new tab
  } catch (err) {
    console.error('Failed to fetch file URL:', err);
  }
};

  return (
    <DashboardLayout title="Documents">
      <div className="space-y-6">
        {
          loading ? <Loader className='animate-spin' /> :

            <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      My Documents
                    </CardTitle>
                    <CardDescription>
                      Manage all your document files
                    </CardDescription>
                  </div>
                  <Button onClick={() => setUploadModalOpen(true)}>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Upload Document
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${newLoading ? 'cursor-wait' : ''}`}>
                  {documents.map((document) => (
                    <FileCard
                      fileId={document.id}
                      key={document.id}
                      type='application'
                      newLoading = {newLoading}
                      title={document.fileName}
                      isFavorite={document.isFavorite ? true : false}
                      onClick={() => openUrl(document.id)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>}
            


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
            disabled={meta! && filters.page === meta.total_pages || documents.length === 0}
            onClick={() => setFilters({ ...filters, page: (filters.page || 1) + 1 })}
          >
            Next
          </Button>
        </div>

      </div>
      <UploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />
      {/* {
        documentViewerOpen &&
        <DocumentViewer
          open={documentViewerOpen}
          onOpenChange={setDocumentViewerOpen}
          files={documents || []}
          currentIndex={currentDocumentIndex}
          onIndexChange={setCurrentDocumentIndex}
        />
      } */}


    </DashboardLayout>
  );
}