import { Outlet, useLocation } from 'react-router-dom';

import './layout.css';
import Header from '../header/Header';
import Sidebar from '../sidebar/SideBar';

interface LayoutProps {
  examInProgress: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  examInProgress,
}) => {
  const userName = 'Emmanuel Alabi';
  const location = useLocation();
  const pathname = location.pathname.substring(1);

  const activeLink = (() => {
    if (pathname.startsWith('dashboard/evaluation')) {
      return 'Evaluation';
    }
    if (pathname.startsWith('dashboard/progress')) {
      return 'Progress';
    }
    if (pathname.startsWith('dashboard/skill-gap')) {
      return 'Skill Gap';
    }
    if (pathname.startsWith('dashboard/profile')) {
      return 'Profile';
    }
    if (pathname.startsWith('dashboard')) {
      return 'Overview';
    }
    return pathname.charAt(0).toUpperCase() + pathname.slice(1);
  })();

  return (
    <div className="layout_root">
      <div className="sidebar_mobile_container">
        <Sidebar
          examInProgress={examInProgress}
        />
      </div>
      <div className={`content_wrapper open`}>
        <Header activeLink={activeLink} userName={userName} />
        <main className="main_content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
