import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import './homeNavBar.css';
import HamBurgerIcon from '@/icons/HamBurgerIcon';

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

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div className="home_nav_bar_root">
      <div className="main">
        <div className="homeNav_techwings_logo">
          <img
            src="/images/proficioNext.svg"
            alt=""
            className="homeNav_techwings_logo_main"
          />
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
                  className="get_started_options_tab_admin"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/admin/login');
                    setIsGetStartedOpen(false);
                  }}
                >
                  Admin
                </div>
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
        <div className="mobile_home_nav_btn_container">
          <div onClick={toggleMenu}>
            {!showMenu ? (
              <HamBurgerIcon />
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#007BFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Always render the mobile nav bar options and slide it in and out */}
      <motion.div
        className="home_mobile_nav_bar_options"
        initial={{ x: '100%' }}
        animate={{ x: showMenu ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div
          className="home_mobile_nav_bar_options_btn"
          onClick={() => {
            setShowMenu(false);
            navigate('/');
          }}
        >
          Home
        </div>
        <div
          className="home_mobile_nav_bar_options_btn"
          onClick={() => {
            setShowMenu(false);
            featuresBtn(null);
          }}
        >
          Features
        </div>
        <div
          className="home_mobile_nav_bar_options_btn"
          onClick={() => {
            setShowMenu(false);
            navigate('/auth/login');
          }}
        >
          Login
        </div>
        <div
          className="home_mobile_nav_bar_options_btn"
          onClick={() => {
            setShowMenu(false);
            navigate('/auth/signup');
          }}
        >
          Sign Up
        </div>
      </motion.div>
    </div>
  );
};

export default HomeNavBar;
