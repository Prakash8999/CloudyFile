import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckIcon } from 'lucide-react';

export default function PricingCTA() {
  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for individuals just getting started',
      features: [
        '5 GB Storage',
        'Basic file sharing',
        'Mobile app access',
        'Email support',
      ],
      buttonText: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '12',
      description: 'Ideal for professionals and small teams',
      features: [
        '100 GB Storage',
        'Advanced sharing & permissions',
        'File versioning',
        'Priority support',
        'No watermarks',
        'Advanced analytics',
      ],
      buttonText: 'Upgrade Now',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: '49',
      description: 'For organizations with advanced needs',
      features: [
        '5 TB Storage',
        'SSO Authentication',
        'Admin controls & audit logs',
        'Dedicated account manager',
        'Custom branding',
        '24/7 phone support',
      ],
      buttonText: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, transparent 
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> pricing</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Choose the plan that works best for your needs, with no hidden fees or complicated pricing structures.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-xl overflow-hidden ${
                plan.highlighted 
                  ? 'bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-200 dark:border-blue-800 shadow-lg' 
                  : 'bg-white/70 dark:bg-gray-900/70 border-gray-200 dark:border-gray-800'
              } backdrop-blur-sm border p-6 shadow-sm`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 transform rotate-45 translate-x-6 -translate-y-3">
                    Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-2">
                    <CheckIcon className={`h-5 w-5 ${plan.highlighted ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'}`} />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/dashboard" className="block">
                <Button 
                  className={`w-full ${
                    plan.highlighted 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' 
                      : ''
                  }`}
                  variant={plan.highlighted ? 'default' : 'outline'}
                >
                  {plan.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            All plans include free cancellation anytime. Need a custom plan?{' '}
            <a href="#" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </section>
  );
}