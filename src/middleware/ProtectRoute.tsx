import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ReactElement;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  allowedRoles,
}) => {
  const accessToken = sessionStorage.getItem('token');
  const userType = sessionStorage.getItem('userType');

  if (!accessToken) {
    return <Navigate to="/auth/login" />;
  }

  if (allowedRoles.includes(userType || '')) {
    return element;
  }

  return <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
