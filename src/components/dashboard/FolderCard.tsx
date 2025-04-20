import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Folder, FileImage, FileVideo, Music } from 'lucide-react';

interface FolderCardProps {
  type: 'images' | 'videos' | 'audio';
  fileCount: number;
  lastEdit: string;
  sharedUsers: { id: string; avatar?: string; name: string }[];
}

export default function FolderCard({ type, fileCount, lastEdit, sharedUsers }: FolderCardProps) {
  return (
    <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-200 hover:shadow-md hover:bg-white/90 dark:hover:bg-gray-900/90">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="mt-1">
            {type === 'images' && (
              <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-500 dark:text-purple-400">
                <FileImage className="h-8 w-8" />
              </div>
            )}
            {type === 'videos' && (
              <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 dark:text-blue-400">
                <FileVideo className="h-8 w-8" />
              </div>
            )}
            {type === 'audio' && (
              <div className="w-16 h-16 rounded-2xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-500 dark:text-pink-400">
                <Music className="h-8 w-8" />
              </div>
            )}
          </div>
          
          <div className="flex -space-x-2">
            {sharedUsers.map((user) => (
              <Avatar key={user.id} className="border-2 border-white dark:border-gray-900 h-7 w-7">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-xs">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}
            {sharedUsers.length > 3 && (
              <div className="flex items-center justify-center h-7 w-7 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-white dark:border-gray-900 text-xs">
                +{sharedUsers.length - 3}
              </div>
            )}
          </div>
        </div>
        
        <h3 className="text-lg font-medium mt-4 capitalize">
          {type}
        </h3>
        
        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {fileCount.toLocaleString()} Files
        </div>
        
        <div className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          Last Edit: {lastEdit}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button size="sm" variant="ghost">
          Open
        </Button>
      </CardFooter>
    </Card>
  );
}