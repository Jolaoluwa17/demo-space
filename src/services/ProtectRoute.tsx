import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const accessToken = sessionStorage.getItem('token');

  return accessToken ? element : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
