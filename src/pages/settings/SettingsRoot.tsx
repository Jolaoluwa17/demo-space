import { Outlet } from 'react-router-dom';

const SettingsRoot = () => {
  return (
    <div style={{maxWidth: "1440px"}}>
      <Outlet />
    </div>
  );
};

export default SettingsRoot;
