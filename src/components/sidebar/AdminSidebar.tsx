import { logout } from '@/services/features/auth/authSlice';
import { motion, useAnimationControls } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardIcon from '@/icons/DashboardIcon';
import UserIcon from '@/icons/UserIcon';
import EvaluationIcon from '@/icons/EvaluationIcon';
import SkillGapProgramIcon from '@/icons/SkillGapProgramIcon';
import './sideBar.css';
import AdminLogOutIcon from '@/icons/AdminLogOutIcon';
import AdminNavigationLink from '../navigationLink/AdminNavigationLink';

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
    width: '260px',
    transition: {
      type: 'spring',
      damping: 15,
      duration: 0.5,
    },
  },
};

const AdminSidebar = () => {
  const containerControls = useAnimationControls();
  const location = useLocation();
  const pathname = location.pathname;
  const navigator = useNavigate();
  const baseRoute = '/admin/dashboard';
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigator('/auth/login');
  };
  return (
    <motion.nav
      variants={containerVariants}
      animate={containerControls}
      className="sidebar admin_sidebar"
      style={{ border: 'none' }}
    >
      <div className="sidebar_header">
        <img src="/images/SideBarTechWingsLogo.svg" alt="" />
      </div>
      <div
        className="sidebar_links"
        style={{ padding: '0px 20px', boxSizing: 'border-box' }}
      >
        <AdminNavigationLink
          name="Dashboard"
          isActive={
            pathname === `${baseRoute}` ||
            pathname.startsWith(`${baseRoute}/overview`)
          }
          link={`${baseRoute}`}
        >
          <DashboardIcon
            color={
              pathname === `${baseRoute}` ||
              pathname.startsWith(`${baseRoute}/overview`)
                ? '#4274BA'
                : '#7d868e'
            }
            colorTwo={
              pathname === `${baseRoute}` ||
              pathname.startsWith(`${baseRoute}/overview`)
                ? '#a8c0e3'
                : '#7d868e'
            }
          />
        </AdminNavigationLink>
        <AdminNavigationLink
          name="User Management"
          isActive={pathname.startsWith(`${baseRoute}/user-management`)}
          link={`${baseRoute}/user-management`}
        >
          <UserIcon
            color={
              pathname.startsWith(`${baseRoute}/user-management`)
                ? '#4274BA'
                : '#7d868e'
            }
          />
        </AdminNavigationLink>
        <AdminNavigationLink
          name="Evaluation"
          isActive={pathname.startsWith(`${baseRoute}/evaluation`)}
          link={`${baseRoute}/evaluation`}
        >
          <EvaluationIcon
            color={
              pathname.startsWith(`${baseRoute}/evaluation`)
                ? '#4274BA'
                : '#7d868e'
            }
          />
        </AdminNavigationLink>
        <AdminNavigationLink
          name="Skill Gap Programs"
          isActive={pathname.startsWith(`${baseRoute}/skill-gap-program`)}
          link={`${baseRoute}/skill-gap-program`}
        >
          <SkillGapProgramIcon
            color={
              pathname.startsWith(`${baseRoute}/skill-gap-program`)
                ? '#4274BA'
                : '#7d868e'
            }
          />
        </AdminNavigationLink>
      </div>
      <div className="admin_logout_btn_container">
        <div className="admin_logout_btn" onClick={handleLogout}>
          <AdminLogOutIcon />
          <div style={{ paddingLeft: '20px', paddingBottom: '6px' }}>
            Log Out
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default AdminSidebar;
