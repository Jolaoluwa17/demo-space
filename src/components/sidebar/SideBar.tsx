import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion, useAnimationControls } from 'framer-motion';

import './sideBar.css';
import NavigationLink from '../navigationLink/NavigationLink';
import SidebarOverviewIcon from '@/icons/SidebarOverviewIcon';
import LogOutIcon from '@/icons/LogOutIcon';
import SidebarEvaluationIcon from '@/icons/SidebarEvaluationIcon';
import SidebarProgress from '@/icons/SidebarProgress';
import SidebarSkillGapIcon from '@/icons/SidebarSkillGapIcon';
import SidebarProfileIcon from '@/icons/SidebarProfileIcon';
import { logout } from '@/services/features/auth/authSlice';

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

interface Props {
  examInProgress: boolean;
  darkmode: boolean;
}

const Sidebar: React.FC<Props> = ({ examInProgress, darkmode }) => {
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
      className={`sidebar ${darkmode ? 'darkmode_theme' : ''}`}
    >
      <div className="sidebar_header">
        <img
          src="/images/ProficioNextLogo.png"
          alt="Proficio Next "
          className="proficioNext_logo_size"
          loading="lazy"
        />
      </div>
      <div className="sidebar_links">
        <NavigationLink
          name="Home"
          isActive={
            pathname === `${baseRoute}` ||
            pathname.startsWith(`${baseRoute}/overview`)
          }
          link={`${baseRoute}`}
          disabled={examInProgress}
          darkmode={darkmode}
        >
          <SidebarOverviewIcon
            color={
              pathname === `${baseRoute}` ||
              pathname.startsWith(`${baseRoute}/overview`)
                ? '#007BFF'
                : darkmode ? 'white' : '#6A757E'
            }
          />
        </NavigationLink>
        <NavigationLink
          name="Evaluation"
          isActive={pathname.startsWith(`${baseRoute}/evaluation`)}
          link={`${baseRoute}/evaluation`}
          disabled={examInProgress}
          darkmode={darkmode}
        >
          <SidebarEvaluationIcon
            color={
              pathname.startsWith(`${baseRoute}/evaluation`)
                ? '#007BFF'
                : darkmode ? 'white' : '#6A757E'
            }
          />
        </NavigationLink>
        <NavigationLink
          name="Progress"
          isActive={pathname.startsWith(`${baseRoute}/progress`)}
          link={`${baseRoute}/progress`}
          disabled={examInProgress}
          darkmode={darkmode}
        >
          <SidebarProgress
            color={
              pathname.startsWith(`${baseRoute}/progress`)
                ? '#007BFF'
                : darkmode ? 'white' : '#6A757E'
            }
          />
        </NavigationLink>
        <NavigationLink
          name="Skill Gap"
          isActive={pathname.startsWith(`${baseRoute}/skill-gap`)}
          link={`${baseRoute}/skill-gap`}
          disabled={examInProgress}
          darkmode={darkmode}
        >
          <SidebarSkillGapIcon
            color={
              pathname.startsWith(`${baseRoute}/skill-gap`)
                ? '#007BFF'
                : darkmode ? 'white' : '#6A757E'
            }
          />
        </NavigationLink>
        <NavigationLink
          name="Profile"
          isActive={pathname.startsWith(`${baseRoute}/profile`)}
          link={`${baseRoute}/profile`}
          disabled={examInProgress}
          darkmode={darkmode}
        >
          <SidebarProfileIcon
            color={
              pathname.startsWith(`${baseRoute}/profile`)
                ? '#007BFF'
                : darkmode ? 'white' : '#6A757E'
            }
          />
        </NavigationLink>
      </div>
      <div className="logout_btn_container">
        <div
          className="logout_btn"
          onClick={examInProgress ? undefined : handleLogout}
          style={{
            cursor: examInProgress ? 'not-allowed' : '',
            opacity: examInProgress ? '0.5' : '',
          }}
        >
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
