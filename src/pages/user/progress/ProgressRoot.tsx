import { Outlet } from 'react-router-dom';

const ProgressRoot = () => {
  return (
    <div style={{ maxWidth: '1440px' }}>
      <Outlet />
    </div>
  );
};

export default ProgressRoot;
