import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Heart, Share2, Trash2, ExternalLink, FileText, FileImage, Pause, AudioLinesIcon, Music2, Music2Icon, Music } from 'lucide-react';
import { useState } from 'react';

interface FileCardProps {
  fileId: number;
  type: 'audio' | 'document' | 'image' | 'video';
  title: string;
  thumbnail?: string;
  isFavorite?: boolean;
  onClick?: () => void;

}

export default function FileCard({fileId, type, title, thumbnail, isFavorite = false, onClick }: FileCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);
  const [isPlaying, setIsPlaying] = useState(false);
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };


  return (
    <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-200 hover:shadow-md hover:bg-white/90 dark:hover:bg-gray-900/90 h-full"
      

    >   
      <div className="relative aspect-video group cursor-pointer" onClick={handleCardClick}>
        {type === 'audio' && (
          <div className="w-full h-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative w-20 h-20  rounded-full flex items-center justify-center">
              {/* <div className="absolute w-14 h-14 border-2 border-white rounded-full"></div> */}
              {/* <div className="w-12 h-1 bg-blue-100 rounded-full"></div> */}
              {/* <AudioLinesIcon className="h-10 w-10 text-white  relative bottom-16 mt-2 left-24" /> */}
              {/* <Button
                size="icon"
                variant="outline"
                className="h-14 w-14 rounded-full bg-black/30 border-white text-white opacity-100 transition-opacity"
              > */}
                <Music  className='w-10 h-10'/>
              {/* </Button> */}
            </div>
          </div>
        )}

        {type === 'document' && (
          <div className="w-full h-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">

            {
              thumbnail ?
                <img
                  src={thumbnail || "https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                  alt={title}
                  className="w-full h-[105%] object-cover rounded-md "
                /> :
                <FileText className="h-10 w-10 text-orange-500" />
            }
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        )}

        {(type === 'image' || type === 'video') && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>


            <div className="w-full h-full p-2 flex justify-center items-center">


              <img
                src={thumbnail || "https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                alt={title}
                className="w-full h-[105%] object-cover rounded-md "
              />
            </div>
            {type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                {/* <Button
                  size="icon"
                  variant="outline"
                  className="h-10  w-10 rounded-full bg-black/30 border-white text-white opacity-70 group-hover:opacity-100 transition-opacity"
                  onClick={() => setIsPlaying(!isPlaying)}
                > */}
                  {/* {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                    )} */}
                    {/* <Play className="h-5 w-5" /> */}
                {/* </Button> */}
              </div>
            )}
          </>
        )}

        
      </div>

      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium truncate w-fit" title={title}>
              {
                title.length < 10 ? title : title.slice(0,9) + '...'
              }
            </h3>
          </div>
          
          <div className=" flex gap-x-4">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 rounded-full bg-black/20 backdrop-blur-sm border-white/30 text-white"
            onClick={() => setFavorite(!favorite)}
          >
            <Heart className={`h-4 w-4 ${favorite ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 rounded-full bg-black/20 backdrop-blur-sm border-white/30 text-white"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 rounded-full bg-black/20 backdrop-blur-sm border-white/30 text-white"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <ExternalLink className="h-4 w-4" 
            onClick={handleCardClick}
            
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}