import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Extract token and userId from query params
  const tokenFromParams = searchParams.get('token');
  const userIdFromParams = searchParams.get('id');

  const accessToken = sessionStorage.getItem('token') || tokenFromParams;

  useEffect(() => {
    if (tokenFromParams) {
      sessionStorage.setItem('token', tokenFromParams);
    }
    if (userIdFromParams) {
      sessionStorage.setItem('id', userIdFromParams);
    }
  }, [tokenFromParams, userIdFromParams]);

  // If no accessToken, redirect to login
  if (!accessToken) {
    return <Navigate to="/auth/login" />;
  }

  // If accessToken exists, allow access regardless of role
  return element;
};

export default ProtectedRoute;
