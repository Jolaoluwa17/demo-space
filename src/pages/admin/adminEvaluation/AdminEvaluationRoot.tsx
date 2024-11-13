import { Outlet } from 'react-router-dom';

const AdminEvaluationRoot = () => {
  return (
    <div style={{ maxWidth: '1440px' }}>
      <Outlet />
    </div>
  );
};

export default AdminEvaluationRoot;
