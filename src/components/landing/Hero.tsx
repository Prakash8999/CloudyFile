import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Cloud, Shield, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden pt-16 md:pt-20 pb-16">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-800 px-3 py-1 text-sm text-blue-600 dark:text-blue-300 mb-6">
              <span className="font-medium">New</span>
              <span className="ml-2 text-blue-500 dark:text-blue-400">Enhanced encryption & AI file organization</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              All Your Files.
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> One Secure Cloud.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
              Effortlessly store, share, and access your data from anywhere. Cloudyfile makes managing your digital assets simple and secure.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/dashboard">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Log In
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-4 md:gap-8">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-sm">AES-256 Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500" />
                <span className="text-sm">Lightning-fast Uploads</span>
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-blue-500" />
                <span className="text-sm">Access Anywhere</span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-2/5 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-20 transform -rotate-6"></div>
              <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="h-36 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center p-6">
                  <div className="w-full h-full bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <svg className="w-20 h-20 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium">Storage</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">5 GB free</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
                    <div className="h-full w-3/5 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold">128</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Files</span>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold">18</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Folders</span>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold">3.2</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">GB</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}