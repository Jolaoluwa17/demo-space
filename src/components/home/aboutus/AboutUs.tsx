import './aboutUs.css';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-100px' }); // ✅ Use `once: false`

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      // ✅ Explicitly type `i` as `number`
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2 },
    }),
  };

  return (
    <div className="about_us_root">
      <div className="about_us_container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="about_us_title">About Us</div>
        </div>
        <div className="about_us_subTitle">
          Discover how our mission, approach, and community are dedicated to
          empowering you with the skills and opportunities needed to excel in
          the tech industry.
        </div>
        <motion.div
          className="about_us_card_container"
          ref={containerRef}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {aboutUsCards.map((card, index) => (
            <motion.div
              className="about_us_card"
              key={index}
              variants={cardVariants}
              custom={index} // ✅ Custom index for staggered animation
            >
              <IoCheckmarkCircleSharp
                size={23}
                color="#007BFF"
                style={{ flexShrink: 0 }}
              />
              <div className="about_us_card_content">
                <div className="title">{card.title}</div>
                <div className="subTitle">{card.subTitle}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="about_us_star">
        <img
          src="/images/SoftStar.svg"
          alt=""
          className="star"
          loading="lazy"
        />
      </div>
      <div className="about_us_rhode1">
        <img
          src="/images/RhodeIsland.svg"
          alt=""
          className="rhodes"
          loading="lazy"
        />
      </div>
      <div className="about_us_rhode2">
        <img
          src="/images/RhodeIsland.svg"
          alt=""
          className="rhodes"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default AboutUs;
