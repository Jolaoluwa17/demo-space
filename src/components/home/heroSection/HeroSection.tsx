import { useRef } from 'react';
import './heroSection.css';
import { motion, useInView } from 'framer-motion';

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const textVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (delay: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut', delay },
    }),
  };

  return (
    <div className="hero_section_root">
      <div className="hero_section_content">
        <div className="content_container">
          <motion.div
            className="content_title"
            initial={{ y: 100, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
            ref={ref}
            variants={textVariants}
            custom={0}
          >
            Unlock Your <span className="full">Full</span> Potential in Tech
          </motion.div>
          <motion.div
            className="content_subTitle"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            ref={ref}
            variants={textVariants}
            custom={1}
          >
            Evaluate your skills, bridge gaps, and connect with top employers.
          </motion.div>
          <motion.div
            className="download_our"
            initial={{ y: 100, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
            ref={ref}
            variants={textVariants}
            custom={2}
          >
            Download our app
          </motion.div>
          <motion.div
            className="download_btn_container"
            initial={{ y: 100, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
            ref={ref}
            variants={textVariants}
            custom={5}
          >
            <div className="the_future_download_btn">
              <img src="/images/AppStore.svg" alt="" className="btn_img" />
            </div>
            <div className="the_future_download_btn">
              <img src="/images/PlayStore.svg" alt="" className="btn_img" />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="hero_section_img2">
        <img
          src="/images/LandingPageImg2.svg"
          alt=""
          className="hero_section_img2_2"
          loading="lazy"
        />
      </div>
      <div className="hero_section_img1">
        <img
          src="/images/LandingPageImg1.png"
          alt=""
          className="hero_section_img1"
        />
      </div>

      {/* orange rectangle */}
      <div className="hero_section_img3">
        <img
          src="/images/LandingPageImg3.svg"
          alt=""
          className="hero_section_img3_3"
          loading="lazy"
        />
      </div>
      {/* blue rectangle */}
      <div className="hero_section_img4">
        <img
          src="/images/LandingPageImg4.svg"
          alt=""
          className="hero_section_img4_4"
          loading="lazy"
        />
      </div>

      <div className="hero_section_rhode1">
        <img
          src="/images/RhodeIsland.svg"
          alt=""
          className="rhodes"
          loading="lazy"
        />
      </div>
      <div className="hero_section_rhode2">
        <img
          src="/images/RhodeIsland.svg"
          alt=""
          className="rhodes"
          loading="lazy"
        />
      </div>
      <div className="hero_section_star1">
        <img
          src="/images/SoftStar.svg"
          alt=""
          className="star"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default HeroSection;
