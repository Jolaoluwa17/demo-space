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
import { logout } from '../../services/features/auth/authSlice';
import { useDispatch } from 'react-redux';

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
  const navigator = useNavigate();
  const baseRoute = '/dashboard';
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigator('/auth/login');
  };

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
          name="Home"
          isActive={
            pathname === `${baseRoute}` ||
            pathname.startsWith(`${baseRoute}/overview`)
          }
          link={`${baseRoute}`}
        >
          <SidebarOverviewIcon
            color={
              pathname === `${baseRoute}` ||
              pathname.startsWith(`${baseRoute}/overview`)
                ? '#4274BA'
                : '#7d868e'
            }
          />
        </NavigationLink>
        <NavigationLink
          name="Evaluation"
          isActive={pathname.startsWith(`${baseRoute}/evaluation`)}
          link={`${baseRoute}/evaluation`}
        >
          <SidebarEvaluationIcon
            color={
              pathname.startsWith(`${baseRoute}/evaluation`)
                ? '#4274BA'
                : '#7d868e'
            }
          />
        </NavigationLink>
        <NavigationLink
          name="Progress"
          isActive={pathname.startsWith(`${baseRoute}/progress`)}
          link={`${baseRoute}/progress`}
        >
          <SidebarProgress
            color={
              pathname.startsWith(`${baseRoute}/progress`)
                ? '#4274BA'
                : '#7d868e'
            }
          />
        </NavigationLink>
        <NavigationLink
          name="Skill Gap"
          isActive={pathname.startsWith(`${baseRoute}/skill-gap`)}
          link={`${baseRoute}/skill-gap`}
        >
          <SidebarSkillGapIcon
            color={
              pathname.startsWith(`${baseRoute}/skill-gap`)
                ? '#4274BA'
                : '#7d868e'
            }
          />
        </NavigationLink>
        <NavigationLink
          name="Profile"
          isActive={pathname.startsWith(`${baseRoute}/profile`)}
          link={`${baseRoute}/profile`}
        >
          <SidebarProfileIcon
            color={
              pathname.startsWith(`${baseRoute}/profile`)
                ? '#4274BA'
                : '#7d868e'
            }
          />
        </NavigationLink>
      </div>
      <div className="logout_btn_container">
        <div className="logout_btn" onClick={handleLogout}>
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
