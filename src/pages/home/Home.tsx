import { LuCopyright } from 'react-icons/lu';
import { useRef } from 'react';

import './home.css';
import TheFuture from '@/components/home/theFuture/TheFuture';
import AboutUs from '@/components/home/aboutus/AboutUs';
import AppFeatures from '@/components/home/appFeatures/AppFeatures';
import ExpandPotential from '@/components/home/expandPotential/ExpandPotential';
import HeroSection from '@/components/home/heroSection/HeroSection';
import AskQuestions from '@/components/home/questions/Questions';

const Home = () => {
  const featuresRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToFeatures = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home_root">
      <HeroSection featuresBtn={handleScrollToFeatures} />
      <AboutUs />
      <div ref={featuresRef}>
        <AppFeatures />
      </div>
      <div className="expand_potential_component">
        <ExpandPotential />
      </div>
      <AskQuestions />
      <TheFuture />
      <div className="home_footer">
        <LuCopyright /> Copyright 2024. All Right Reserved.
      </div>
    </div>
  );
};

export default Home;
