import { Shield, Clock, Layout, Aperture } from 'lucide-react';

export default function TrustSection() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why choose 
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Cloudyfile</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Trusted by over 1 million users worldwide, our platform is built on three core principles.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Uncompromising Security</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your data is encrypted both in transit and at rest with military-grade encryption standards.
            </p>
          </div>
          
          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              <Layout className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Beautiful Simplicity</h3>
            <p className="text-gray-600 dark:text-gray-400">
              A thoughtfully designed interface that makes complex file management intuitive and enjoyable.
            </p>
          </div>
          
          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Reliable Performance</h3>
            <p className="text-gray-600 dark:text-gray-400">
              99.99% uptime with global distributed servers ensures your files are always accessible.
            </p>
          </div>
          
          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mb-4">
              <Aperture className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Continuous Innovation</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We're constantly improving our platform with new features and enhanced performance.
            </p>
          </div>
        </div>
        
        <div className="mt-16 bg-blue-50 dark:bg-blue-950/20 rounded-xl p-8 shadow-sm border border-blue-100 dark:border-blue-900/30">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Trusted by companies worldwide</h3>
            <div className="flex flex-wrap justify-center items-center gap-12 mt-8 opacity-70">
              <div className="w-24 h-8 bg-gray-400 dark:bg-gray-600 rounded"></div>
              <div className="w-24 h-8 bg-gray-400 dark:bg-gray-600 rounded"></div>
              <div className="w-24 h-8 bg-gray-400 dark:bg-gray-600 rounded"></div>
              <div className="w-24 h-8 bg-gray-400 dark:bg-gray-600 rounded"></div>
              <div className="w-24 h-8 bg-gray-400 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}