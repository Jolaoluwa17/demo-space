import { useEffect, useRef, useState } from 'react';
import './expandPotential.css';
import { motion, useInView } from 'framer-motion';

const ExpandPotential = () => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const containerRef = useRef(null);

  // Use useInView with correct options
  const isInView = useInView(containerRef, {
    once: false,
    amount: 0.2  // Using 'amount' instead of 'threshold'
  });

  useEffect(() => {
    if (isInView) {
      setAnimationStarted(true);
    } else {
      setAnimationStarted(false);
    }
  }, [isInView]);

  const slideFromBottomVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <div className="expand_potential_root">
      <div className="expand_potential_container" ref={containerRef}>
        <motion.div
          className="expand_potential_title"
          variants={slideFromBottomVariants}
          initial="hidden"
          animate={animationStarted ? 'visible' : 'hidden'}
        >
          Expand Your Potential ✨
        </motion.div>

        <motion.div
          className="expand_potential_subTitle"
          variants={slideFromBottomVariants}
          initial="hidden"
          animate={animationStarted ? 'visible' : 'hidden'}
        >
          Everything you need to <span>elevate your skills and progress </span>
          toward your goals, every day.
        </motion.div>

        <div className="laptop_picture">
          <img
            src="/images/LaptopView.svg"
            alt=""
            className="laptop_picture_main"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default ExpandPotential;