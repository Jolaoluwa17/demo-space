import AboutUs from '../../components/home/aboutus/AboutUs';
import AppFeatures from '../../components/home/appFeatures/AppFeatures';
import ExpandPotential from '../../components/home/expandPotential/ExpandPotential';
import HeroSection from '../../components/home/heroSection/HeroSection';
import AskQuestions from '../../components/home/questions/Questions';
import TheFuture from '../../components/home/theFuture/TheFuture';
import { LuCopyright } from 'react-icons/lu';
import './home.css';

const Home = () => {
  return (
    <div className="home_root">
      <HeroSection />
      <AboutUs />
      <AppFeatures />
      <ExpandPotential />
      <AskQuestions />
      <TheFuture />
      <div className="home_footer">
        <LuCopyright /> Copyright 2024. All Right Reserved.
      </div>
    </div>
  );
};

export default Home;
