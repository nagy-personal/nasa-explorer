import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import FeaturesGrid from '../components/Home/FeaturesGrid';
import StatsSection from '../components/Home/StatsSection';
import CallToAction from '../components/Home/CallToAction';

const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      <HeroSection />
      <FeaturesGrid />
      <StatsSection />
      <CallToAction />
    </div>
  );
};

export default Home; 