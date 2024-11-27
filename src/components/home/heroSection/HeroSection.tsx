import HomeNavBar from '../homeNavBar/HomeNavBar';
import './heroSection.css';
import { IoLogoGooglePlaystore, IoLogoApple } from 'react-icons/io5';

interface Props {
  featuresBtn: (value: unknown) => void;
}

const HeroSection: React.FC<Props> = ({ featuresBtn }) => {
  return (
    <div className="hero_section_root">
      <HomeNavBar featuresBtn={featuresBtn} />
      <div className="hero_section_content">
        <div className="content_container">
          <div className="content_title">
            Unlock Your <span className="full">Full</span> Potential in Tech
          </div>
          <div className="content_subTitle">
            Join Our Elite Skill Gap Programs And Master The Technologies
            Shaping The Future.
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
      <div className="hero_section_img3">
        <img
          src="/images/LandingPageImg3.svg"
          alt=""
          className="hero_section_img3_3"
          loading="lazy"
        />
      </div>
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
