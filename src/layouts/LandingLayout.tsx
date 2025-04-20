import { ReactNode } from 'react';
import Footer from '@/components/landing/Footer';
import LandingNav from '@/components/landing/LandingNav';

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
      <LandingNav />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}