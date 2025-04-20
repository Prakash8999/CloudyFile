import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useTheme } from '@/components/theme/theme-provider';

export default function LandingNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <span className="text-xl font-bold">Cloudyfile</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link to="/#features" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Features
            </Link>
            <Link to="/#pricing" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Pricing
            </Link>
            <Link to="/#about" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              About
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </nav>
          
          <div className="hidden md:flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                Log In
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="sm">
                Get Started
              </Button>
            </Link>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link 
              to="/" 
              className="block py-2 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/#features" 
              className="block py-2 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/#pricing" 
              className="block py-2 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/#about" 
              className="block py-2 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-2 space-y-2">
              <Link 
                to="/dashboard" 
                className="block w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button variant="outline" className="w-full">
                  Log In
                </Button>
              </Link>
              <Link 
                to="/dashboard" 
                className="block w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full">
                  Get Started
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  setTheme(theme === 'dark' ? 'light' : 'dark');
                  setMobileMenuOpen(false);
                }}
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}