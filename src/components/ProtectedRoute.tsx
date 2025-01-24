import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import TokenStore from '../stores/token-store';

interface ProtectedRouteProps {
  isProtected: boolean; 
  redirectTo: string; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isProtected, redirectTo }) => {
  const hasToken = !!TokenStore.token;

  if (isProtected && !hasToken) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!isProtected && hasToken) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;