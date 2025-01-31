import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import './appFeatures.css';
import AppFeaturesAnalysisIcon from '@/icons/AppFeaturesAnalysisIcon';
import AppFeaturesEvaluation from '@/icons/AppFeaturesEvaluation';
import AppFeaturesEyeIcon from '@/icons/AppFeaturesEyeIcon';
import AppFeaturesPhoneIcon from '@/icons/AppFeaturesPhoneIcon';
import AppFeaturesRetinaIcon from '@/icons/AppFeaturesRetinaIcon';
import AppFeaturesUserIcon from '@/icons/AppFeaturesUserIcon';

const AppFeatures = () => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [rightAnimationStart, setRightAnimationStart] = useState(false);

  const appFeaturesLeftData = [
    {
      icon: <AppFeaturesEvaluation />,
      title: 'Evaluate Your Skills',
      subTitle:
        'Get comprehensive feedback on your technical knowledge and practical skills, helping you understand your strengths and areas for improvement.',
    },
    {
      icon: <AppFeaturesAnalysisIcon />,
      title: 'Bridge Skill Gaps',
      subTitle:
        'Receive tailored recommendations for skill gap positions, enabling you to gain hands-on experience and bridge the gaps in your expertise.',
    },
    {
      icon: <AppFeaturesPhoneIcon />,
      title: 'Mobile and Web Access',
      subTitle:
        'Our evaluator app is accessible on iOS, Android, and web platforms, giving you the flexibility to evaluate and improve your skills on any device, anywhere.',
    },
  ];

  const appFeaturesRightData = [
    {
      icon: <AppFeaturesEyeIcon />,
      title: 'Join the Talent Pool',
      subTitle:
        'Become a certified professional and connect with potential employers, opening doors to new career opportunities through our talent pool.',
    },
    {
      icon: <AppFeaturesUserIcon />,
      title: 'Personalized Profile',
      subTitle:
        'Create a personalized profile that tracks your progress, highlights your certifications, and showcases your skills to potential employers.',
    },
    {
      icon: <AppFeaturesRetinaIcon />,
      title: 'Retina Ready Graphics',
      subTitle:
        'Experience crisp and clear visuals with our evaluator apps Retina Ready Display, enhancing your learning and evaluation experience with stunning clarity.',
    },
  ];

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, delay: i * 0.4 },
    }),
  };

  useEffect(() => {
    if (isInView) {
      // Start the left side animation
      setAnimationStarted(true);
      
      // Calculate the delay for the right side animation
      // Wait for left side animations to complete
      const rightDelay = appFeaturesLeftData.length * 0.4 * 1000;
      
      // Reset right animation first
      setRightAnimationStart(false);
      
      // Start right animation after delay
      const timer = setTimeout(() => {
        setRightAnimationStart(true);
      }, rightDelay);
  
      return () => clearTimeout(timer);
    } else {
      // Reset both animations when out of view
      setAnimationStarted(false);
      setRightAnimationStart(false);
    }
  }, [isInView, appFeaturesLeftData.length]); // Include appFeaturesLeftData.length in the dependency array
  

  return (
    <div className="app_features_root">
      <div className="app_features_title">APP FEATURES</div>
      <div className="app_features_subTitle">
        Explore the ultimate skill evaluation app, designed to support all your
        learning and career growth needs. With a suite of advanced features,
        you'll have everything you need to assess, improve, and track your
        skills at your fingertips.
      </div>
      <div className="app_features_content">
        <motion.div
          className="left"
          ref={containerRef}
          initial="hidden"
          animate={animationStarted ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {appFeaturesLeftData.map((feature, index) => (
            <motion.div
              className="app_features_card"
              key={index}
              variants={cardVariants}
              custom={index}
            >
              {feature.icon}
              <div className="app_features_card_title">{feature.title}</div>
              <div className="app_features_card_subTitle">
                {feature.subTitle}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="middle">
          <img
            src="/images/DemoPhone.svg"
            alt=""
            className="app_features_middle_img"
          />
        </div>

        <motion.div
          className="right"
          initial="hidden"
          animate={rightAnimationStart ? 'visible' : 'hidden'}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {appFeaturesRightData.map((feature, index) => (
            <motion.div
              className="app_features_card"
              key={index}
              variants={cardVariants}
              custom={index}
            >
              {feature.icon}
              <div className="app_features_card_title">{feature.title}</div>
              <div className="app_features_card_subTitle">
                {feature.subTitle}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="app_features_star">
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

export default AppFeatures;