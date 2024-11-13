import { Outlet } from 'react-router-dom';

const EvaluationRoot = () => {
  return (
    <div style={{ maxWidth: '1440px' }}>
      <Outlet />
    </div>
  );
};

export default EvaluationRoot;
