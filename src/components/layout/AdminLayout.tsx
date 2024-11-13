import React, { ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from '../sidebar/AdminSidebar';
import AdminHeader from '../header/AdminHeader';

interface LayoutProps {
  children?: ReactNode;
}
const AdminLayout: React.FC<LayoutProps> = () => {
  const userName = 'Emmanuel Alabi';
  const location = useLocation();
  const pathname = location.pathname.substring(1);

  const activeLink = (() => {
    if (pathname.startsWith('admin/dashboard/user-management')) {
      return 'User Management';
    }
    if (pathname.startsWith('admin/dashboard/evaluation')) {
      return 'Evaluation';
    }
    if (pathname.startsWith('admin/dashboard/skill-gap-program')) {
      return 'Skill Gap';
    }
    if (pathname.startsWith('admin/dashboard/profile')) {
      return 'Profile';
    }
    if (pathname.startsWith('admin/dashboard')) {
      return 'Dashboard';
    }
    return pathname.charAt(0).toUpperCase() + pathname.slice(1);
  })();

  return (
    <div className="layout_root">
      <div className="sidebar_mobile_container">
        <AdminSidebar />
      </div>
      <div className={`content_wrapper open admin_open`}>
        <AdminHeader activeLink={activeLink} userName={userName} />
        <main className="main_content" style={{ backgroundColor: '#f2f2f2' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
