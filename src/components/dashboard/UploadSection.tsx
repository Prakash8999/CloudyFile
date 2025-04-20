import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import UploadModal from '@/components/common/UploadModal';

export default function UploadSection() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  return (
    <>
      <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
        <CardHeader className="pb-0">
          <CardTitle className="text-2xl">Upload Files</CardTitle>
          <CardDescription>
            Securely store and share your files in the cloud.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Quickly upload and organize your files with our drag-and-drop interface.
                Your data is encrypted and backed up automatically.
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                onClick={() => setUploadModalOpen(true)}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Now
              </Button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <img 
                src="https://images.pexels.com/photos/4126724/pexels-photo-4126724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Cloud upload illustration" 
                className="max-w-full h-auto rounded-lg object-cover shadow-md"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <UploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />
    </>
  );
}