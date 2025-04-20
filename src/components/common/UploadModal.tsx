import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { FileImage, FileVideo, FileText, Upload, X } from 'lucide-react';

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UploadModal({ open, onOpenChange }: UploadModalProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: activeTab === 'images' 
      ? { 'image/*': [] } 
      : activeTab === 'videos' 
      ? { 'video/*': [] } 
      : activeTab === 'documents' 
      ? { 'application/pdf': [], 'text/plain': [], 'application/msword': [], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [] } 
      : undefined
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length === 0) {
      toast.error('Please select files to upload');
      return;
    }

    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        toast.success(`${files.length} files uploaded successfully`);
        setFiles([]);
        onOpenChange(false);
      }
    }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>
            Upload your files to Cloudyfile. Supported formats include images, videos, and documents.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All Files</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/50' 
                  : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center gap-2">
                <Upload className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isDragActive
                    ? "Drop the files here..."
                    : "Drag & drop files here, or click to select files"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Supports images, videos, documents, and more
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="images" className="mt-0">
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/50' 
                  : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center gap-2">
                <FileImage className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isDragActive
                    ? "Drop the images here..."
                    : "Drag & drop images here, or click to select"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Supports JPG, PNG, GIF, SVG, WebP
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="videos" className="mt-0">
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/50' 
                  : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center gap-2">
                <FileVideo className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isDragActive
                    ? "Drop the videos here..."
                    : "Drag & drop videos here, or click to select"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Supports MP4, MOV, AVI, WebM
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="mt-0">
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/50' 
                  : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center gap-2">
                <FileText className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isDragActive
                    ? "Drop the documents here..."
                    : "Drag & drop documents here, or click to select"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Supports PDF, DOC, DOCX, TXT, XLS, XLSX
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {files.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Selected Files ({files.length})</h4>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {files.map((file, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between rounded-md bg-gray-100 dark:bg-gray-800 p-2"
                >
                  <div className="flex items-center gap-2 truncate">
                    {file.type.includes('image') ? (
                      <FileImage className="h-4 w-4 text-blue-500" />
                    ) : file.type.includes('video') ? (
                      <FileVideo className="h-4 w-4 text-red-500" />
                    ) : (
                      <FileText className="h-4 w-4 text-orange-500" />
                    )}
                    <span className="text-sm truncate">{file.name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {isUploading && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Uploading...</span>
              <span className="text-sm">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}
        
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={isUploading || files.length === 0}>
            {isUploading ? 'Uploading...' : 'Upload Files'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}