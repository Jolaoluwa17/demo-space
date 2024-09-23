import CheckAboutUsIcon from '../../../icons/CheckAboutUsIcon';
import './aboutUs.css';

const AboutUs = () => {
  const aboutUsCards = [
    {
      title: 'OUR MISSION',
      subTitle:
        'Dedicated to closing skill gaps and accelerating your tech career.',
    },
    {
      title: 'OUR VISION',
      subTitle: `Building a tech-savvy workforce ready for tomorrow's challenges.`,
    },
    {
      title: 'OUR APPROACH',
      subTitle:
        'Focused on real-world skills that directly enhance your job performance.',
    },
    {
      title: 'OUR PROMISE',
      subTitle:
        'Supporting your success with certifications and job opportunities through VetPro.',
    },
    {
      title: 'OUR VALUES',
      subTitle:
        'Driven by quality education, innovation, and continuous improvement.',
    },
    {
      title: 'OUR COMMUNITY',
      subTitle:
        'Join a thriving community of tech professionals and innovators.',
    },
  ];

  return (
    <div className="about_us_root">
      <div className="about_us_container">
        <div className="about_us_title">About Us</div>
        <div className="about_us_subTitle">
          Discover how our mission, approach, and community are dedicated to
          empowering you with the skills and opportunities needed to
          excel in the tech industry.
        </div>
        <div className="about_us_card_container">
          {aboutUsCards.map((card, index) => (
            <div className="about_us_card" key={index}>
              <CheckAboutUsIcon />
              <div className="about_us_card_content">
                <div className="title">{card.title}</div>
                <div className="subTitle">{card.subTitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="about_us_star">
        <img src="/images/SoftStar.svg" alt="" className="star" />
      </div>
      <div className="about_us_rhode1">
        <img src="/images/RhodeIsland.svg" alt="" className="rhodes" />
      </div>
      <div className="about_us_rhode2">
        <img src="/images/RhodeIsland.svg" alt="" className="rhodes" />
      </div>
    </div>
  );
};

export default AboutUs;
