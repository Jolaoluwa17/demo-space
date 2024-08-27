import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div style={{ height: '100%' }}>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
