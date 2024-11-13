import { Outlet } from 'react-router-dom';

const UserManagementRoot = () => {
  return (
    <div style={{ maxWidth: '1440px' }}>
      <Outlet />
    </div>
  );
};

export default UserManagementRoot;
