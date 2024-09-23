import HomeNavBar from '../homeNavBar/HomeNavBar';
import './heroSection.css';
import { IoLogoGooglePlaystore, IoLogoApple } from 'react-icons/io5';

const HeroSection = () => {
  return (
    <div className="hero_section_root">
      <HomeNavBar />
      <div className="hero_section_content">
        <div className="content_container">
          <div className="content_title">
            Unlock Your <span className="full">Full</span> Potential in Tech
          </div>
          <div className="content_subTitle">
            Join our elite skill gap programs and master The technologies
            shaping the future.
          </div>
          <div className="download_our">Download our app</div>
          <div className="download_btn_container">
            <div className="download_btn">
              <IoLogoApple fontSize={30} /> COMING SOON
            </div>
            <div className="download_btn">
              <IoLogoGooglePlaystore fontSize={28} /> COMING SOON
            </div>
          </div>
        </div>
      </div>
      <div className="hero_section_img2">
        <img
          src="/images/LandingPageImg2.svg"
          alt=""
          className="hero_section_img2_2"
        />
      </div>
      <div className="hero_section_img1">
        <img
          src="/images/LandingPageImg1.svg"
          alt=""
          className="hero_section_img1"
        />
      </div>
      <div className="hero_section_img3">
        <img
          src="/images/LandingPageImg3.svg"
          alt=""
          className="hero_section_img3_3"
        />
      </div>
      <div className="hero_section_img4">
        <img
          src="/images/LandingPageImg4.svg"
          alt=""
          className="hero_section_img4_4"
        />
      </div>
      <div className="hero_section_rhode1">
        <img src="/images/RhodeIsland.svg" alt="" className="rhodes" />
      </div>
      <div className="hero_section_rhode2">
        <img src="/images/RhodeIsland.svg" alt="" className="rhodes" />
      </div>
      <div className="hero_section_star1">
        <img src="/images/SoftStar.svg" alt="" className="star" />
      </div>
    </div>
  );
};

export default HeroSection;
