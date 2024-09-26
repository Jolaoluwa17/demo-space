import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './homeNavBar.css';
import { useNavigate } from 'react-router-dom';

interface Props {
  featuresBtn: (value: unknown) => void;
}

const HomeNavBar: React.FC<Props> = ({ featuresBtn }) => {
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const getStartedRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const toggleGetStarted = () => {
    setIsGetStartedOpen(!isGetStartedOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      getStartedRef.current &&
      !getStartedRef.current.contains(event.target as Node)
    ) {
      setIsGetStartedOpen(false);
    }
  };

  useEffect(() => {
    if (isGetStartedOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isGetStartedOpen]);

  return (
    <div className="home_nav_bar_root">
      <div className="homeNav_techwings_logo">
        <img src="/images/SideBarTechWingsLogo.svg" alt="" />
      </div>
      <div className="home_nav_btn_container">
        <div className="home_nav_btn">Home</div>
        <div className="home_nav_btn" onClick={featuresBtn}>
          Features
        </div>
        <div className="get_started_container" ref={getStartedRef}>
          <div className="home_nav_getStarted" onClick={toggleGetStarted}>
            Get Started
          </div>

          {/* Animate the get started options */}
          {isGetStartedOpen && (
            <motion.div
              className="get_started_options"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="get_started_options_tab"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/auth/login');
                  setIsGetStartedOpen(false);
                }}
              >
                Login
              </div>
              <div
                className="get_started_options_tab"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/auth/signup');
                  setIsGetStartedOpen(false);
                }}
              >
                Sign Up
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeNavBar;
