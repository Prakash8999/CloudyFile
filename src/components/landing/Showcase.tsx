import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Showcase() {
  return (
    <section className="py-20 bg-blue-50/50 dark:bg-blue-950/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-md opacity-20"></div>
              <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <img 
                  src="/vite.svg" 
                  alt="Dashboard Preview" 
                  className="absolute top-3 left-3 h-6 w-6" 
                />
                <img 
                  src="https://images.pexels.com/photos/7172996/pexels-photo-7172996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Dashboard Preview" 
                  className="w-full h-auto" 
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full filter blur-xl opacity-20"></div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Experience the 
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> intuitive interface</span>
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Our modern dashboard makes navigating through your files a breeze. Visually organize your content in a way that makes sense to you with customizable views.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <span className="font-medium">Intuitive organization</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Drag-and-drop interface for effortless file management
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <span className="font-medium">Preview without downloading</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    View documents, images, and videos directly in your browser
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <span className="font-medium">Collaboration tools</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Comment, share, and work together in real-time
                  </p>
                </div>
              </li>
            </ul>
            
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Try It Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}