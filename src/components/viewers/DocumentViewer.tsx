import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCw,
  Download,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

interface DocumentFile {
  id: string;
  title: string;
  pages?: number;
  url?: string;
}

interface DocumentViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  files: DocumentFile[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export default function DocumentViewer({ 
  open, 
  onOpenChange, 
  files, 
  currentIndex, 
  onIndexChange 
}: DocumentViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [showSidebar, setShowSidebar] = useState(true);
  const currentFile = files[currentIndex];
  const totalPages = currentFile?.pages || 10; // Default to 10 pages for demo

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onIndexChange(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < files.length - 1) {
        onIndexChange(currentIndex + 1);
      } else if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, currentIndex, files.length, onIndexChange, onOpenChange]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
      setCurrentPage(1);
    }
  };

  const handleNext = () => {
    if (currentIndex < files.length - 1) {
      onIndexChange(currentIndex + 1);
      setCurrentPage(1);
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  if (!currentFile) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-none w-screen h-screen p-0 bg-gray-100 dark:bg-gray-900 border-0">
        <DialogTitle className="sr-only">Document Viewer</DialogTitle>
        <div className="relative w-full h-full flex">
          {/* Sidebar */}
          {showSidebar && (
            <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-sm truncate">{currentFile.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {totalPages} pages
                </p>
              </div>
              
              <ScrollArea className="flex-1 p-2">
                <div className="grid grid-cols-2 gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`aspect-[3/4] border-2 rounded-lg overflow-hidden transition-all ${
                        currentPage === i + 1
                          ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="w-full h-full bg-white dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {i + 1}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Toolbar */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSidebar(!showSidebar)}
                >
                  {showSidebar ? (
                    <PanelLeftClose className="h-4 w-4" />
                  ) : (
                    <PanelLeftOpen className="h-4 w-4" />
                  )}
                </Button>
                
                <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
                
                <Button variant="ghost" size="sm" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                
                <span className="text-sm font-medium min-w-[60px] text-center">
                  {zoom}%
                </span>
                
                <Button variant="ghost" size="sm" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                
                <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
                
                <Button variant="ghost" size="sm">
                  <RotateCw className="h-4 w-4" />
                </Button>
                
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                
                <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className={currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous Doc
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNext}
                  disabled={currentIndex === files.length - 1}
                  className={currentIndex === files.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  Next Doc
                  <ChevronRight className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onOpenChange(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Document Content */}
            <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-4">
              <div className="flex justify-center">
                <div 
                  className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                  style={{ 
                    width: `${(595 * zoom) / 100}px`, 
                    height: `${(842 * zoom) / 100}px` 
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <div className="text-center">
                      <p className="text-lg font-medium mb-2">Page {currentPage}</p>
                      <p className="text-sm">{currentFile.title}</p>
                      <p className="text-xs mt-4 opacity-70">
                        Document content would be rendered here
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Page Navigation */}
            <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-2 flex items-center justify-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <span className="text-sm font-medium px-4">
                {currentPage} / {totalPages}
              </span>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}