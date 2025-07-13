import { Card, CardContent } from '@/components/ui/card';
import { Lock, Brain, Zap, BarChart2, Smartphone, Clock } from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: 'Secure Storage',
      description: 'End-to-end encryption keeps your files safe and protected.',
      icon: Lock,
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Smart Organization',
      description: 'AI-powered file categorization and tagging that saves you time and keeps everything organized. Coming soon in an upcoming update!',
      icon: Brain,
      color: 'from-purple-400 to-purple-600'
    }
    ,
    {
      title: 'Recent Files',
      description: 'Quickly access your recently opened or uploaded files from the dashboard.',
      icon: Clock,
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      title: 'Access Anywhere',
      description: 'Seamlessly access your files across all your devices with our mobile and desktop apps.',
      icon: Smartphone,
      color: 'from-orange-400 to-orange-600'
    },
    {
      title: 'Lightning Fast',
      description: 'Optimized upload and download speeds with multi-part transfers and smart compression.',
      icon: Zap,
      color: 'from-amber-400 to-amber-600'
    },
    {
      title: 'Usage Insights',
      description: 'Detailed analytics on storage usage, file access, and collaboration patterns.',
      icon: BarChart2,
      color: 'from-pink-400 to-pink-600'
    },
  ];

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            A smarter way to
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> manage your files</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Cloudyfile combines powerful technology with intuitive design to make file management effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-200 hover:shadow-md hover:bg-white/90 dark:hover:bg-gray-900/90">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}