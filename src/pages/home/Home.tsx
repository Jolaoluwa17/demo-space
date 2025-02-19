import { useCallback, useEffect, useRef } from 'react';
import { LuCopyright } from 'react-icons/lu';

import './home.css';
import TheFuture from '@/components/home/theFuture/TheFuture';
import AboutUs from '@/components/home/aboutus/AboutUs';
import AppFeatures from '@/components/home/appFeatures/AppFeatures';
import ExpandPotential from '@/components/home/expandPotential/ExpandPotential';
import HeroSection from '@/components/home/heroSection/HeroSection';
import AskQuestions from '@/components/home/questions/Questions';
import HomeNavBar from '@/components/home/homeNavBar/HomeNavBar';
import ContactUs from '@/components/home/contactUs/ContactUs';
import { useSearchParams } from 'react-router-dom';

interface Props {
  darkmode: boolean;
}

const Home: React.FC<Props> = ({ darkmode }) => {
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const homeRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToFeatures = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToHome = () => {
    if (homeRef.current) {
      homeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContactUs = useCallback(() => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [contactRef]);

  const [searchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get('help') === 'true') {
      handleScrollToContactUs();
    }
  }, [searchParams, handleScrollToContactUs]);

  return (
    <div className="home_root" ref={homeRef}>
      <HomeNavBar
        featuresBtn={handleScrollToFeatures}
        homeBtn={handleScrollToHome}
        darkmode={darkmode}
      />
      <HeroSection darkmode={darkmode} />
      <AboutUs />
      <div ref={featuresRef}>
        <AppFeatures />
      </div>
      <div className="expand_potential_component">
        <ExpandPotential />
      </div>
      <AskQuestions contactBtn={handleScrollToContactUs} />
      <TheFuture />
      <div ref={contactRef}>
        <ContactUs />
      </div>
      <div className="home_footer">
        <LuCopyright /> Copyright 2024. All Right Reserved.
      </div>
    </div>
  );
};

export default Home;
