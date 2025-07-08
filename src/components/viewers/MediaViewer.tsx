import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight, Loader, Music } from 'lucide-react';
import { FileAttributes } from '@/types/FileAttributes';
import { useFileDataById } from '@/hooks/useFileData';

// interface MediaFile {
//   id: string;
//   type: 'image' | 'video';
//   title: string;
//   thumbnail?: string;
//   url?: string;
// }

interface MediaViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  files: FileAttributes[];
  currentIndex: number;
  // fileId : number;
  shared?: boolean;
  onIndexChange: (index: number) => void;
}

export default function MediaViewer({
  open,
  onOpenChange,
  files,

  currentIndex,
  // fileId,
  shared,
  onIndexChange
}: MediaViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  // const [currentFileUrl, setCurrentFileUrl] = useState('');
  const currentFile = files[currentIndex];
  console.log("currentFile", currentFile);

console.log("current file url", currentFile);
  const { data: urlData, loading } = useFileDataById(currentFile.id, open, shared)
  console.log("urlData ", urlData);




  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);



  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') return;

      if (!open) return;
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onIndexChange(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < files.length - 1) {
        onIndexChange(currentIndex + 1);
      } else if (e.key === 'Escape') {
        onOpenChange(false);
      }

      if (e.code === "Space") {
        e.preventDefault(); // Prevents scrolling
        if (!videoRef.current) return;

        if (videoRef.current.paused) {
          videoRef.current.play();
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }

      if (e.code === "Space" || e.key === " ") {
        e.preventDefault(); // Prevents scrolling
        if (!audioRef.current) return;
        if (audioRef.current.paused) {
          audioRef.current.play();
          setIsPlaying(true);
        } else {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }

    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, currentIndex, files.length, onIndexChange, onOpenChange]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < files.length - 1) {
      onIndexChange(currentIndex + 1);
    }
  };

  if (!currentFile) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-none w-screen h-screen p-0 bg-black/95 border-0">
        <DialogTitle className="sr-only">Media Viewer</DialogTitle>
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 h-10 w-10"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 h-12 w-12 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 h-12 w-12 ${currentIndex === files.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            onClick={handleNext}
            disabled={currentIndex === files.length - 1}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Media Content */}
          {
            loading ? <Loader className='animate-spin' /> :

              <div className="w-screen h-screen flex items-center justify-center p-8 ">



                {currentFile.fileType === 'image' ? (
                  // <TransformWrapper >
                  //   <TransformComponent>
                  <img
                    src={urlData}
                    alt={currentFile.fileName}
                    className="w-full h-full object-contain p-5"
                  />

                  //</div> </TransformComponent>
                  //  </TransformWrapper> 


                ) : currentFile.fileType === 'video' ? (
                  <div className="relative w-full h-full">
                    <video
                      src={urlData}
                      poster={currentFile.thumbnailUrl!}
                      className="w-full h-full object-contain"
                      controls
                      autoPlay
                      ref={videoRef}

                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />
                  </div>
                ) : currentFile.fileType === 'audio' ? (
                  // <div className='w-full flex justify-center flex-col items-center gap-y-5'>
                  //   <Music className='w-10 h-10 text-white' />


                  //   <audio
                  //     src={"urlData"}
                  //     className="w-2/3"
                  //     controls
                  //     autoPlay
                  //     ref={audioRef}
                  //     onPlay={() => setIsPlaying(true)}
                  //     onPause={() => setIsPlaying(false)}
                  //   />
                  // </div>

                  <div className="w-[90%] flex flex-col items-center gap-y-4 p-6 bg-zinc-900 rounded-lg shadow-lg">
                    {/* Music Icon */}
                    <div className="bg-zinc-800 p-4 rounded-full">
                      <Music className="w-8 h-8 text-white" />
                    </div>

                    {/* File Name */}
                    <p className="text-white text-sm font-medium truncate w-4/5 text-center">
                      {currentFile?.fileName || 'Unknown audio'}
                    </p>

                    {/* Audio Player */}
                    <audio
                      src={urlData}
                      className="w-4/5 max-w-lg rounded-md bg-white"
                      controls
                      autoPlay
                      ref={audioRef}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />

                    {/* Playback Status */}
                    <p className="text-xs text-white/60">
                      {isPlaying ? 'Playing...' : 'Paused'}
                    </p>
                  </div>

                ) : null}
              </div>}

          {/* File Info */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 z-50 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-1">
            <p className="text-white text-sm font-medium">{currentFile.fileName}</p>
            <p className="text-white/70 text-xs text-center">
              {currentIndex + 1} of {files.length}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}