import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStores } from '../stores/root-store-context';

interface ProtectedRouteProps {
  isProtected: boolean; 
  redirectTo: string; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isProtected, redirectTo }) => {
  const { token: { token } } = useStores();
  
  const hasToken = !!token;

  if (isProtected && !hasToken) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!isProtected && hasToken) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;