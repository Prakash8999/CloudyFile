import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  VideoIcon, 
  Image as ImageIcon, 
  FileText, 
  BarChart2, 
  Star, 
  Archive, 
  Trash2, 
  Settings, 
  User,
  Music,
  Share2
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

export default function Sidebar() {
  const location = useLocation();
  
  const navigationItems = [
    { name: 'Home', href: '/dashboard', icon: Home, new: false },
    { name: 'Videos', href: '/dashboard/videos', icon: VideoIcon, new: true },
    { name: 'Photo Gallery', href: '/dashboard/photos', icon: ImageIcon, new: false },
    { name: 'Documents', href: '/dashboard/documents', icon: FileText, new: true },
    { name: 'Audios', href: '/dashboard/audios', icon: Music, new: true },
    { name: 'Shared with Me', href: '/dashboard/shared', icon: Share2, new: false },
    { name: 'Favorites', href: '/dashboard/favorites', icon: Star, new: false },
    { name: 'Archive', href: '/dashboard/archive', icon: Archive, new: false },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2, new: false },
    { name: 'Recycle', href: '/dashboard/recycle', icon: Trash2, new: false },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings, new: false },
    { name: 'Profile', href: '/dashboard/profile', icon: User, new: false },
  ];

  return (
    <div className="w-16 md:w-64 h-screen bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-4 flex items-center justify-center md:justify-start">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <span className="text-xl font-bold hidden md:block">Cloudyfile</span>
        </Link>
      </div>
      
      <ScrollArea className="flex-1 py-2">
        <nav className="space-y-1 px-2">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'group flex flex-col md:flex-row items-center justify-center md:justify-start px-4 py-3 rounded-lg transition-all duration-200 ease-in-out',
                location.pathname === item.href 
                  ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400'
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="hidden md:block ml-3 font-medium">{item.name}</span>
              {item.new && (
                <Badge variant="outline" className="ml-auto hidden md:flex h-5 bg-blue-50 text-blue-600 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800">
                  New
                </Badge>
              )}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      
      {/* <div className="p-4">
        <div className="rounded-lg bg-gradient-to-br from-blue-900 to-indigo-900 shadow-lg p-4 md:p-6 text-white overflow-hidden relative">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl"></div>
          
          <h3 className="font-bold text-center md:text-left">Cloud Pro ✨</h3>
          <p className="text-xs text-blue-100 mt-1 mb-2 text-center md:text-left">Get unlimited storage and more</p>
          
          <Button size="sm" variant="outline" className="w-full bg-white/10 border-white/20 hover:bg-white/20 text-white">
            See Plans
          </Button>
        </div>
      </div> */}
    </div>
  );
}