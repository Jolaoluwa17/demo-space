import './theFuture.css';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TheFuture = () => {
  // Use the hook with correct type destructuring
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const { ref: subTitleRef, inView: subTitleInView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const { ref: btnContainerRef, inView: btnContainerInView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  return (
    <div className="the_future_root">
      <div className="the_future_container">
        <div className="left">
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: titleInView ? 1 : 0,
              y: titleInView ? 0 : 50,
              transition: { duration: 0.5 },
            }}
            className="the_future_title"
          >
            The Future of <span>Skill Evaluation and Career</span> Growth
          </motion.div>
          <motion.div
            ref={subTitleRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: subTitleInView ? 1 : 0,
              y: subTitleInView ? 0 : 50,
              transition: { duration: 0.5, delay: 0.3 },
            }}
            className="the_future_subTitle"
          >
            Go borderless on mobile! Download the app and sign up to assess your
            skills, bridge gaps, and unlock new career opportunities from
            anywhere in the world.
          </motion.div>
          <motion.div
            ref={btnContainerRef}
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: btnContainerInView ? 1 : 0,
              x: btnContainerInView ? 0 : 50,
              transition: { duration: 0.5, delay: 0.6 },
            }}
            className="the_future_download_btn_conatiner"
          >
            <div className="the_future_download_btn">
              <img src="/images/AppStore.svg" alt="" className="btn_img" />
            </div>
            <div className="the_future_download_btn">
              <img src="/images/PlayStore.svg" alt="" className="btn_img" />
            </div>
          </motion.div>
        </div>
        <div className="right">
          <img
            src="/images/TheFuture.svg"
            alt=""
            className="the_future_phone_img"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default TheFuture;