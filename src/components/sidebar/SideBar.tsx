import { motion, useAnimationControls } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

import './sideBar.css';
import NavigationLink from '../navigationLink/NavigationLink';
import SidebarOverviewIcon from '../../icons/SidebarOverviewIcon';
import LogOutIcon from '../../icons/LogOutIcon';
import SidebarEvaluationIcon from '../../icons/SidebarEvaluationIcon';
import SidebarProgress from '../../icons/SidebarProgress';
import SidebarSkillGapIcon from '../../icons/SidebarSkillGapIcon';
import SidebarProfileIcon from '../../icons/SidebarProfileIcon';

const containerVariants = {
  close: {
    width: '50px',
    transition: {
      type: 'spring',
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: '236px',
    transition: {
      type: 'spring',
      damping: 15,
      duration: 0.5,
    },
  },
};

const Sidebar = () => {
  const containerControls = useAnimationControls();
  const location = useLocation();
  const pathname = location.pathname;

  const navigator = useNavigate()

  return (
    <motion.nav
      variants={containerVariants}
      animate={containerControls}
      className="sidebar"
    >
      <div className="sidebar_header">
        <img src="/images/SideBarTechWingsLogo.svg" alt="" />
      </div>
      <div className="sidebar_links">
        <NavigationLink
          name="Overview"
          isActive={pathname === '/' || pathname.startsWith('/overview')}
          link="/"
        >
          <SidebarOverviewIcon
            color={
              pathname === '/' || pathname.startsWith('/overview')
                ? '#4274BA'
                : '#7d868e'
            }
          />
        </NavigationLink>
        <NavigationLink
          name="Evaluation"
          isActive={pathname.startsWith('/evaluation')}
          link="/evaluation"
        >
          <SidebarEvaluationIcon
            color={pathname.startsWith('/evaluation') ? '#4274BA' : '#7d868e'}
          />
        </NavigationLink>
        <NavigationLink
          name="Progress"
          isActive={pathname.startsWith('/progress')}
          link="/progress"
        >
          <SidebarProgress
            color={pathname === '/progress' ? '#4274BA' : '#7d868e'}
          />
        </NavigationLink>
        <NavigationLink
          name="Skill Gap"
          isActive={pathname.startsWith('/skill-gap')}
          link="/skill-gap"
        >
          <SidebarSkillGapIcon
            color={pathname === '/skill-gap' ? '#4274BA' : '#7d868e'}
          />
        </NavigationLink>
        <NavigationLink
          name="Profile"
          isActive={pathname.startsWith('/profile')}
          link="/profile"
        >
          <SidebarProfileIcon
            color={pathname === '/profile' ? '#4274BA' : '#7d868e'}
          />
        </NavigationLink>
      </div>
      <div className="logout_btn_container" onClick={() => navigator("/auth/login")}>
        <div className="logout_btn">
          <LogOutIcon />
          <div style={{ paddingLeft: '20px', paddingBottom: '6px' }}>
            Log Out
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Sidebar;
