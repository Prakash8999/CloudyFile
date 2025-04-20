import LandingLayout from '@/layouts/LandingLayout';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Showcase from '@/components/landing/Showcase';
import TrustSection from '@/components/landing/TrustSection';
import PricingCTA from '@/components/landing/PricingCTA';

export default function Landing() {
  return (
    <LandingLayout>
      <Hero />
      <Features />
      <Showcase />
      <TrustSection />
      <PricingCTA />
    </LandingLayout>
  );
}